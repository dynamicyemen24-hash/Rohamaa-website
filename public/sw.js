// ============================================================
// Service Worker - التخزين المؤقت المتقدم والتشغيل دون اتصال
// ============================================================
const CACHE_NAME = 'rohamaa-v2';
const STATIC_CACHE = 'rohamaa-static-v2';
const DYNAMIC_CACHE = 'rohamaa-dynamic-v2';
const IMAGE_CACHE = 'rohamaa-images-v2';
const API_CACHE = 'rohamaa-api-v2';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/robots.txt',
  '/sitemap.xml',
];

// التثبيت - تخزين الملفات الثابتة
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// التنشيط - تنظيف الكاش القديم
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => {
            return name !== STATIC_CACHE && 
                   name !== DYNAMIC_CACHE && 
                   name !== IMAGE_CACHE && 
                   name !== API_CACHE;
          })
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// استراتيجيات التخزين المؤقت
function isImage(request) {
  return request.destination === 'image' || 
         request.url.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i);
}

function isApiRequest(request) {
  return request.url.includes('/api/') || 
         request.url.includes('supabase') ||
         request.url.includes('.netlify');
}

function isStaticAsset(request) {
  return request.url.match(/\.(js|css|woff2?|ttf|json)$/i) ||
         STATIC_ASSETS.includes(new URL(request.url).pathname);
}

// استراتيجية Cache First للصور
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(IMAGE_CACHE);
      // Clone لأن response يمكن استخدامه مرة واحدة فقط
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // إذا فشل الاتصال، أعد الصورة المخزنة مؤقتاً
    const cached = await caches.match(request);
    if (cached) return cached;
    // أعد صورة placeholder
    return new Response(
      '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="#f3f4f6" width="400" height="300"/><text fill="#9ca3af" font-family="Arial" font-size="16" x="50%" y="50%" text-anchor="middle" dy=".3em">تعذر تحميل الصورة</text></svg>',
      { headers: { 'Content-Type': 'image/svg+xml' } }
    );
  }
}

// استراتيجية Network First للـ API
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(API_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;
    // أعد بيانات فارغة
    return new Response(JSON.stringify({ data: [], error: 'offline' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// استراتيجية Stale-While-Revalidate للملفات الثابتة
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cached = await cache.match(request);
  
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => cached);
  
  return cached || fetchPromise;
}

// معالجة الطلبات
self.addEventListener('fetch', (event) => {
  const request = event.request;
  
  // تجاهل طلبات chrome-extension و non-GET
  if (request.method !== 'GET' || !request.url.startsWith('http')) return;
  
  if (isImage(request)) {
    event.respondWith(cacheFirst(request));
  } else if (isApiRequest(request)) {
    event.respondWith(networkFirst(request));
  } else if (isStaticAsset(request)) {
    event.respondWith(staleWhileRevalidate(request));
  } else {
    // استراتيجية Network First للصفحات
    event.respondWith(networkFirst(request));
  }
});

// معالجة الإشعارات
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};
  const options = {
    body: data.body || 'إشعار جديد من مؤسسة رحماء بينهم',
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    vibrate: [200, 100, 200],
    data: { url: data.url || '/' },
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'رحماء بينهم', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil(
    clients.openWindow(url)
  );
});