// Importmaps do not work with service workers, so we need to use the full path to the file.
import { Cache } from "./dist/code/Index.js";

const cache = new Cache({
  name: "pwa-app",
  version: "v1.2.1",
});

self.oninstall = (event) =>
  event.waitUntil(
    cache
      .create()
      .then(() => self.skipWaiting())
      .catch(console.error)
  );

self.onactivate = (event) =>
  event.waitUntil(
    cache
      .update()
      .then(() => self.clients.claim())
      .catch(console.error)
  );

self.onfetch = (event) =>
  event.respondWith(cache.get(event.request).catch(console.error));
