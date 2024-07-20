import { Cache } from "./cache.js";

const app = {
  name: "pwa-app",
  version: "v1.0.0",
};

self.oninstall = (event) => event.waitUntil(Cache.create(app));

self.onactivate = (event) => event.waitUntil(Cache.clean(app));

self.onfetch = (event) => event.respondWith(Cache.use(event.request, app));
