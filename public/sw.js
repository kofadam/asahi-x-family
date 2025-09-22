// public/sw.js

/**
 * Service Worker for offline learning capability
 * Caches essential content and learning progress
 */

const CACHE_NAME = 'asahi-x-family-v1';
const STATIC_CACHE = 'asahi-static-v1';
const DYNAMIC_CACHE = 'asahi-dynamic-v1';

// Essential files to cache immediately
const STATIC_ASSETS = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/offline.html'
];

// Content to cache for offline learning
const LEARNING_CONTENT = [
  '/content/lessons/core/',
  '/content/scenarios/basic/',
  '/content/cultural-contexts/essential/'
];

// Install event - cache essential assets
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then(cache => {
        return cache.addAll(STATIC_ASSETS);
      }),
      
      // Cache essential learning content
      caches.open(DYNAMIC_CACHE).then(cache => {
        return cache.addAll(LEARNING_CONTENT);
      })
    ]).then(() => {
      console.log('Asahi x Family: Essential content cached for offline use');
      self.skipWaiting(); // Activate immediately
    })
  );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName.startsWith('asahi-') && cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      );
    }).then(() => {
      console.log('Asahi x Family: Service worker activated');
      clients.claim();
    })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
  // Learning content strategy - cache first, then network
  if (event.request.url.includes('/content/') || event.request.url.includes('/lessons/')) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          // Serve from cache, but also fetch fresh version in background
          event.waitUntil(
            fetch(event.request).then(response => {
              if (response.ok) {
                caches.open(DYNAMIC_CACHE).then(cache => {
                  cache.put(event.request, response.clone());
                });
              }
            }).catch(() => {
              // Network failed, cached version is still good
              console.log('Using cached learning content');
            })
          );
          return cachedResponse;
        }
        
        // Not in cache, try network
        return fetch(event.request).then(response => {
          if (response.ok) {
            // Cache successful responses
            caches.open(DYNAMIC_CACHE).then(cache => {
              cache.put(event.request, response.clone());
            });
          }
          return response;
        }).catch(() => {
          // Network failed and not in cache - show offline page for navigation
          if (event.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
          throw error;
        });
      })
    );
    return;
  }
  
  // Static assets strategy - cache first
  if (STATIC_ASSETS.some(asset => event.request.url.endsWith(asset))) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        return cachedResponse || fetch(event.request);
      })
    );
    return;
  }
  
  // Default: network first for everything else
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});

// Background sync for progress updates
self.addEventListener('sync', event => {
  if (event.tag === 'progress-sync') {
    event.waitUntil(syncProgress());
  }
});

/**
 * Sync learning progress when back online
 */
async function syncProgress() {
  try {
    // Get pending progress updates from IndexedDB
    const pendingUpdates = await getPendingProgressUpdates();
    
    if (pendingUpdates.length > 0) {
      // Send to server or sync with cloud storage
      // For now, just update local storage with merged data
      await mergePendingProgress(pendingUpdates);
      console.log('Progress synchronized');
    }
  } catch (error) {
    console.error('Progress sync failed:', error);
  }
}