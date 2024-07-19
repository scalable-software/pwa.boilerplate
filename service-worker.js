const app = "pwa-app";
const version = "v1.0.0";

// Create a versioned cache
self.oninstall = (event) =>
  event.waitUntil(
    caches.open(app + "." + version).then((cache) => cache.add("/"))
  );

// Delete outdated caches
self.onactivate = (event) =>
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.includes(app))
          .filter((key) => !key.includes(version))
          .map((key) => caches.delete(key))
      )
    )
  );
