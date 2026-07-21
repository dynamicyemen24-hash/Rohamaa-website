// ============================================================
// Service Worker - Rahmaa Bainahum PWA (Production Grade v4)
// ============================================================
// Cache naming with version for clean upgrades
const CACHE_VERSION = 'v5';
const CACHES = {
  STATIC: `rh-static-${CACHE_VERSION}`,
  DYNAMIC: `rh-dynamic-${CACHE_VERSION}`,
  IMAGES: `rh-images-${CACHE_VERSION}`,
  FONTS: `rh-fonts-${CACHE_VERSION}`,
};

// Versioned image URLs with cache-busting
function getVersionedImageUrl(url) {
  try {
    const urlObj = new URL(url);
    const timestamp = Date.now();
    urlObj.searchParams.set('v', CACHE_VERSION);
    urlObj.searchParams.set('_t', timestamp.toString());
    return urlObj.toString();
  } catch {
    return url;
  }
}

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/robots.txt',
  '/sitemap.xml',
  '/offline.html',
];

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

/**
 * Safely check if a response is cacheable
 */
function isCacheableResponse(response) {
  if (!response) return false;
  // Only cache successful 2xx responses
  if (response.status < 200 || response.status >= 300) return false;
  // Do not cache partial content
  if (response.status === 206) return false;
  // Verify it's a valid Response object
  try {
    return response.type === 'basic' || response.type === 'cors';
  } catch {
    return false;
  }
}

/**
 * Determine if a request should be cached based on URL and method
 */
function isCacheableRequest(request) {
  // Only cache GET requests
  if (request.method !== 'GET') return false;
  
  const url = new URL(request.url);
  
  // Only cache http/https
  if (!url.protocol.startsWith('http')) return false;
  
  // NEVER cache API calls, auth, or sensitive endpoints
  const neverCachePatterns = [
    '/api/',
    '/auth/',
    '/login',
    '/logout',
    '/refresh',
    '/v1/data/query/',  // Sanity API
    '/v202',             // Sanity API versioned
    '.supabase.co',      // Supabase API
    '/rest/v1/',         // Supabase REST
    'checkout',          // Payment
    'payment',
    'stripe',
  ];
  
  const urlStr = url.toString();
  for (const pattern of neverCachePatterns) {
    if (urlStr.includes(pattern)) return false;
  }
  
  return true;
}

/**
 * Safe fetch with timeout and CORS error handling
 */
async function safeFetch(request, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    const response = await fetch(request, {
      signal: controller.signal,
      // Use same-origin credentials only for same-origin requests
      credentials: request.url.startsWith(self.location.origin) ? 'same-origin' : 'omit',
    });
    return response;
  } catch (error) {
    // AbortError is expected (timeout) - return null silently
    if (error.name === 'AbortError') {
      return null;
    }
    // TypeError means network failure (CORS, offline, DNS) - return null
    if (error instanceof TypeError) {
      return null;
    }
    // For other errors, also return null to prevent uncaught promises
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Update cache in background - ALWAYS handles errors (never rejects)
 */
async function updateCacheInBackground(request, cacheName) {
  if (!isCacheableRequest(request)) return;
  
  try {
    const response = await safeFetch(request);
    if (!isCacheableResponse(response)) return;
    
    const cache = await caches.open(cacheName);
    // Use put with error handling (might fail for opaque responses)
    try {
      await cache.put(request, response.clone());
    } catch {
      // Silently fail - cache put can fail for various reasons
    }
  } catch {
    // Top-level safety net - never reject
  }
}

/**
 * Get offline fallback page
 */
async function getOfflineFallback() {
  try {
    const cache = await caches.open(CACHES.STATIC);
    const response = await cache.match('/offline.html');
    if (response) return response;
  } catch {
    // Fallback to creating a minimal offline response
  }
  
  return new Response(
    '<!DOCTYPE html><html dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>رحماء بينهم - غير متصل</title><style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#fafaf7;color:#1a5c48;text-align:center;padding:20px}div{max-width:400px}h1{font-size:1.5rem;margin-bottom:1rem}p{color:#666;line-height:1.6}</style></head><body><div><h1>🌙 غير متصل بالإنترنت</h1><p>نأسف للإزعاج، يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.<br>جزاك الله خيراً.</p></div></body></html>',
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}

// ============================================================
// LIFECYCLE EVENTS
// ============================================================

// Install: Precache critical static assets
globalThis.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHES.STATIC);
        // Use individual puts instead of addAll to handle partial failures
        await Promise.allSettled(
          STATIC_ASSETS.map(async (url) => {
            try {
              const response = await safeFetch(url);
              if (response && response.ok) {
                await cache.put(url, response);
              }
            } catch {
              // Individual asset failure is non-critical
            }
          })
        );
      } catch {
        // Install failure handling - SW still activates
      }
      await globalThis.skipWaiting();
    })()
  );
});

// Activate: Clean old caches, claim clients
globalThis.addEventListener('activate', (event) => {
  const validCaches = new Set(Object.values(CACHES));
  
  event.waitUntil(
    (async () => {
      // Clean old caches
      try {
        const cacheNames = await caches.keys();
        await Promise.allSettled(
          cacheNames
            .filter((name) => !validCaches.has(name))
            .map(async (name) => {
              try {
                await caches.delete(name);
              } catch {
                // Silently fail on cache deletion
              }
            })
        );
      } catch {
        // Cleanup failure is non-critical
      }
      
      // Claim all clients immediately
      try {
        await globalThis.clients.claim();
      } catch {
        // Claim failure is non-critical
      }
    })()
  );
});

// ============================================================
// CACHE STRATEGIES
// ============================================================

/**
 * Strategy 1: Cache First - Network Update in Background
 * For: Static assets (JS, CSS, images, fonts)
 * Returns cached instantly, updates cache in background
 */
async function cacheFirst(request) {
  try {
    const cached = await caches.match(request);
    
    // Background update - NEVER blocks response, NEVER causes uncaught
    if (cached) {
      updateCacheInBackground(request, CACHES.STATIC).catch(() => {});
      return cached;
    }
    
    // Not in cache, try network
    const response = await safeFetch(request);
    if (response) {
      updateCacheInBackground(request, CACHES.STATIC).catch(() => {});
      return response;
    }
    
    // Network failed too, try offline fallback for navigation
    if (request.mode === 'navigate') {
      return getOfflineFallback();
    }
    
    // No cache, no network, return error response
    return new Response('Offline', { status: 503 });
  } catch {
    // Absolute last resort
    if (request.mode === 'navigate') {
      return getOfflineFallback();
    }
    return new Response('Error', { status: 500 });
  }
}

/**
 * Strategy 2: Network First - Cache Fallback
 * For: Navigation requests, important API calls
 * Tries network first, falls back to cache, then offline
 */
async function networkFirst(request) {
  try {
    const response = await safeFetch(request);
    if (response && response.ok) {
      // Cache successful responses in background
      updateCacheInBackground(request, CACHES.DYNAMIC).catch(() => {});
      return response;
    }
    
    // Network failed or returned error, try cache
    const cached = await caches.match(request);
    if (cached) return cached;
    
    // No cache either, offline fallback for navigation
    if (request.mode === 'navigate') {
      return getOfflineFallback();
    }
    
    return new Response('Offline', { status: 503 });
  } catch {
    // Network error, try cache
    try {
      const cached = await caches.match(request);
      if (cached) return cached;
    } catch {
      // Cache match failed too
    }
    
    if (request.mode === 'navigate') {
      return getOfflineFallback();
    }
    
    return new Response('Offline', { status: 503 });
  }
}

/**
 * Strategy 3: Stale-While-Revalidate (Production Grade)
 * For: Non-critical dynamic content
 * Returns cached immediately, updates in background
 * NEVER causes Uncaught (in promise) - guaranteed
 */
async function staleWhileRevalidate(request) {
  // Always try cache first
  let cached;
  try {
    cached = await caches.match(request);
  } catch {
    cached = null;
  }
  
  // Background revalidation - wrapped in ALL safety layers
  // This is the KEY fix: properly handled with .catch() on the promise chain
  const revalidatePromise = (async () => {
    try {
      const response = await safeFetch(request);
      if (!isCacheableResponse(response)) return;
      
      const cache = await caches.open(CACHES.DYNAMIC);
      try {
        await cache.put(request, response.clone());
      } catch {
        // Cache put failure is non-critical
      }
    } catch {
      // Every error at every level is caught
    }
  })();
  
  // Execute revalidation in background - NEVER awaits, NEVER causes uncaught
  revalidatePromise.catch(() => {});
  
  // Return cached or pending network
  if (cached) return cached;
  
  // No cache, wait for network if it's fast
  try {
    const response = await safeFetch(request);
    if (response) return response;
  } catch {
    // Network failed
  }
  
  // Last resort
  if (request.mode === 'navigate') {
    return getOfflineFallback();
  }
  
  return new Response('Offline', { status: 503 });
}

/**
 * Strategy 4: Cache Images with Dedicated Cache
 */
async function cacheImages(request) {
  try {
    const cached = await caches.match(request);
    if (cached) {
      updateCacheInBackground(request, CACHES.IMAGES).catch(() => {});
      return cached;
    }
    
    const response = await safeFetch(request);
    if (response && response.ok) {
      updateCacheInBackground(request, CACHES.IMAGES).catch(() => {});
      return response;
    }
    
    return cached || response || new Response('Not Found', { status: 404 });
  } catch {
    try {
      const cached = await caches.match(request);
      if (cached) return cached;
    } catch {
      // Silently fail
    }
    return new Response('Error', { status: 500 });
  }
}

// ============================================================
// FETCH EVENT - REQUEST ROUTING
// ============================================================

globalThis.addEventListener('fetch', (event) => {
  const request = event.request;
  
  // Only handle GET requests
  if (request.method !== 'GET') return;
  
  const url = new URL(request.url);
  
  // Skip non-http protocols
  if (!url.protocol.startsWith('http')) return;
  
  // ===== NEVER INTERCEPT: API calls, auth, payment =====
  if (
    url.hostname.includes('supabase.co') ||
    url.pathname.includes('/rest/v1/') ||
    url.pathname.includes('/v1/data/query/') ||
    url.pathname.includes('/v202') ||
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/auth/')
  ) {
    // Network only - no cache interference with API
      event.respondWith(
        safeFetch(request).then(response => {
          if (response) return response;
          return new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
        })
      );
    return;
  }
  
  // ===== IMAGES =====
  if (
    url.hostname.includes('unsplash.com') ||
    /\.(png|jpg|jpeg|gif|webp|avif)$/i.test(url.pathname)
  ) {
    // Use stale-while-revalidate for images to ensure fresh visuals
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        const networkPromise = safeFetch(request).then(async (response) => {
          if (response && response.ok) {
            try {
              const cache = await caches.open(CACHES.IMAGES);
              await cache.put(request, response.clone());
            } catch {
              // Cache update failed
            }
          }
          return response;
        }).catch(() => null);

        if (cached) {
          networkPromise.catch(() => {});
          return cached;
        }

        const response = await networkPromise;
        return response || cached || new Response('Not Found', { status: 404 });
      })()
    );
    return;
  }
  
  // ===== STATIC ASSETS (JS, CSS, Fonts) =====
  if (
    /\.(js|css|woff2?|ttf|eot)$/.test(url.pathname) ||
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/icons/')
  ) {
    // Use stale-while-revalidate for static assets to ensure fresh CSS/JS
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        
        // Always try to update in background
        const networkPromise = safeFetch(request).then(async (response) => {
          if (response && response.ok) {
            try {
              const cache = await caches.open(CACHES.STATIC);
              await cache.put(request, response.clone());
            } catch {
              // Cache update failed
            }
          }
          return response;
        }).catch(() => null);

        // For navigation and critical assets, prefer network first
        if (request.mode === 'navigate') {
          try {
            const response = await safeFetch(request);
            if (response && response.ok) {
              try {
                const cache = await caches.open(CACHES.STATIC);
                await cache.put(request, response.clone());
              } catch {
                // Cache update failed
              }
              return response;
            }
          } catch {
            // Network failed
          }
        }

        // Return cached if available
        if (cached) {
          networkPromise.catch(() => {});
          return cached;
        }

        // Wait for network
        const response = await networkPromise;
        return response || cached || getOfflineFallback();
      })()
    );
    return;
  }
  
  // ===== NAVIGATION (HTML pages) =====
  if (request.mode === 'navigate') {
    // Use aggressive network-first for HTML to ensure fresh content
    event.respondWith(
      (async () => {
        try {
          const response = await safeFetch(request);
          if (response && response.ok) {
            // Cache the fresh HTML
            try {
              const cache = await caches.open(CACHES.STATIC);
              await cache.put(request, response.clone());
            } catch {
              // Cache update failed
            }
            return response;
          }
        } catch {
          // Network failed
        }

        // Try cache
        const cached = await caches.match(request);
        if (cached) return cached;

        // Offline fallback
        return getOfflineFallback();
      })()
    );
    return;
  }
  
  // ===== EVERYTHING ELSE: stale-while-revalidate =====
  event.respondWith(staleWhileRevalidate(request));
});

// ============================================================
// PUSH NOTIFICATIONS
// ============================================================

globalThis.addEventListener('push', (event) => {
  let data;
  try {
    data = event.data?.json() || {};
  } catch {
    data = {};
  }

  const options = {
    title: data.title || 'رحماء بينهم',
    body: data.body || 'تحديث جديد',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-96x96.png',
    vibrate: [200, 100, 200],
    data: { url: data.url || '/' },
    actions: [
      { action: 'open', title: 'فتح' },
      { action: 'close', title: 'إغلاق' },
    ],
  };

  event.waitUntil(
    globalThis.registration.showNotification(options.title, options).catch(() => {})
  );
});

globalThis.addEventListener('notificationclick', (event) => {
  event.waitUntil(
    (async () => {
      try {
        event.notification.close();
        if (event.action === 'close') return;
        
        const url = event.notification.data?.url || '/';
        const clients = await globalThis.clients.matchAll({ type: 'window' });
        
        for (const client of clients) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        
        if (globalThis.clients.openWindow) {
          return globalThis.clients.openWindow(url);
        }
      } catch {
        // Silently fail
      }
    })()
  );
});

// ============================================================
// BACKGROUND SYNC
// ============================================================

globalThis.addEventListener('sync', (event) => {
  if (event.tag === 'sync-donations') {
    event.waitUntil(syncPendingData('/api/donations', 'pendingDonations'));
  }
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncPendingData('/api/forms', 'pendingForms'));
  }
});

async function syncPendingData(apiEndpoint, storeName) {
  try {
    const db = await openIndexedDB();
    const items = await db.getAll(storeName);
    
    await Promise.allSettled(
      items.map(async (item) => {
        try {
          const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
          });
          
          if (response.ok) {
            await db.delete(storeName, item.id);
          }
        } catch {
          // Individual sync failure is non-critical
        }
      })
    );
  } catch {
    // Sync failure is non-critical
  }
}

// ============================================================
// INDEXED DB HELPER
// ============================================================

function openIndexedDB() {
  return new Promise((resolve, reject) => {
    try {
      const request = indexedDB.open('RohamaaDB', 1);
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('pendingDonations')) {
          db.createObjectStore('pendingDonations', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('pendingForms')) {
          db.createObjectStore('pendingForms', { keyPath: 'id' });
        }
      };
      
      request.onsuccess = (event) => {
        const db = event.target.result;
        resolve({
          getAll: (storeName) => {
            return new Promise((resolveGet, rejectGet) => {
              try {
                const transaction = db.transaction(storeName, 'readonly');
                const store = transaction.objectStore(storeName);
                const req = store.getAll();
                req.onsuccess = () => resolveGet(req.result || []);
                req.onerror = () => rejectGet(req.error);
              } catch (e) {
                rejectGet(e);
              }
            });
          },
          delete: (storeName, id) => {
            return new Promise((resolveDelete, rejectDelete) => {
              try {
                const transaction = db.transaction(storeName, 'readwrite');
                const store = transaction.objectStore(storeName);
                const req = store.delete(id);
                req.onsuccess = () => resolveDelete();
                req.onerror = () => rejectDelete(req.error);
              } catch (e) {
                rejectDelete(e);
              }
            });
          },
        });
      };
      
      request.onerror = () => reject(request.error);
    } catch (e) {
      reject(e);
    }
  });
}