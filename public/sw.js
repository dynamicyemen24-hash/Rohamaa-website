// Service Worker - Rohamaa PWA
const STATIC_CACHE = 'rohamaa-static-v2';
const DYNAMIC_CACHE = 'rohamaa-dynamic-v2';
const API_CACHE = 'rohamaa-api-v2';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/robots.txt',
  '/sitemap.xml',
  '/offline.html',
];

// Install event - cache static assets
globalThis.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => {
      return globalThis.skipWaiting();
    })
  );
});

// Activate event - clean old caches
globalThis.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => {
            return name !== STATIC_CACHE && name !== DYNAMIC_CACHE && name !== API_CACHE;
          })
          .map((name) => caches.delete(name))
      );
    }).then(() => {
      return globalThis.clients.claim();
    })
  );
});

// Helper: Network first with cache fallback
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      // Clone the response BEFORE returning it to avoid "body already used" error
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/offline.html');
    }
    throw error;
  }
}

// Helper: Update cache in background (extracted to reduce nesting)
async function updateCacheInBackground(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
  } catch {
    // Ignore errors in background updates
  }
}

// Helper: Cache first with network update
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) {
    // Update cache in background
    updateCacheInBackground(request, STATIC_CACHE);
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    if (request.mode === 'navigate') {
      return caches.match('/offline.html');
    }
    throw error;
  }
}

// Helper: Stale while revalidate
async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);

  try {
    const response = await fetch(request);
    if (response.ok) {
      // Clone the response BEFORE using it to avoid "body already used" error
      const clonedResponse = response.clone();
      // Update cache in background
      updateCacheInBackgroundClone(request, clonedResponse, DYNAMIC_CACHE);
      return response;
    }
    // If response is not ok, return cached or throw error
    return cached || response;
  } catch (error) {
    // If fetch fails, return cached response or offline page for navigation
    if (cached) {
      return cached;
    }
    if (request.mode === 'navigate') {
      return caches.match('/offline.html');
    }
    throw error;
  }
}

// Helper: Update cache in background with pre-cloned response
async function updateCacheInBackgroundClone(request, response, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    cache.put(request, response);
  } catch {
    // Ignore errors in background updates
  }
}

// Fetch event - handle requests
globalThis.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome-extension and other protocols
  if (!url.protocol.startsWith('http')) return;

  // API requests - Network first
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Static assets - Cache first
  if (
    /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot)$/.test(url.pathname) ||
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/icons/')
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Navigation requests - Network first
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  // Everything else - Stale while revalidate
  event.respondWith(staleWhileRevalidate(request));
});

// Push notification event
globalThis.addEventListener('push', (event) => {
  const data = event.data?.json() || {};

  const options = {
    title: data.title || 'رحماء بينهم',
    body: data.body || 'تحديث جديد من رحماء بينهم',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-96x96.png',
    vibrate: [200, 100, 200],
    data: {
      url: data.url || '/',
    },
    actions: [
      {
        action: 'open',
        title: 'فتح',
      },
      {
        action: 'close',
        title: 'إغلاق',
      },
    ],
  };

  event.waitUntil(
    globalThis.registration.showNotification(options.title, options)
  );
});

// Helper: Handle notification click
async function handleNotificationClick(event) {
  event.notification.close();

  if (event.action === 'close') return;

  const clientList = await globalThis.clients.matchAll({ type: 'window' });
  const url = event.notification.data?.url || '/';

  for (const client of clientList) {
    if (client.url === url && 'focus' in client) {
      return client.focus();
    }
  }

  if (globalThis.clients.openWindow) {
    return globalThis.clients.openWindow(url);
  }
}

// Notification click event
globalThis.addEventListener('notificationclick', (event) => {
  event.waitUntil(handleNotificationClick(event));
});

// Background sync event
globalThis.addEventListener('sync', (event) => {
  if (event.tag === 'sync-donations') {
    event.waitUntil(syncDonations());
  }
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncForms());
  }
});

async function syncDonations() {
  try {
    const db = await openIndexedDB();
    const pendingDonations = await db.getAll('pendingDonations');

    for (const donation of pendingDonations) {
      try {
        const response = await fetch('/api/donations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(donation),
        });

        if (response.ok) {
          await db.delete('pendingDonations', donation.id);
        }
      } catch {
        console.error('Sync failed for donation:', donation.id);
      }
    }
  } catch (error) {
    console.error('Sync donations failed:', error);
  }
}

async function syncForms() {
  try {
    const db = await openIndexedDB();
    const pendingForms = await db.getAll('pendingForms');

    for (const form of pendingForms) {
      try {
        const response = await fetch('/api/forms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });

        if (response.ok) {
          await db.delete('pendingForms', form.id);
        }
      } catch {
        console.error('Sync failed for form:', form.id);
      }
    }
  } catch (error) {
    console.error('Sync forms failed:', error);
  }
}

// IndexedDB helper functions - extracted to avoid deep nesting
function getAllFromStore(db, storeName) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function deleteFromStore(db, storeName, id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// IndexedDB helper
function openIndexedDB() {
  return new Promise((resolve, reject) => {
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
        getAll: (storeName) => getAllFromStore(db, storeName),
        delete: (storeName, id) => deleteFromStore(db, storeName, id),
      });
    };

    request.onerror = () => reject(request.error);
  });
}