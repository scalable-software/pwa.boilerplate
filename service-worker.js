// Importmaps do not work with service workers, so we need to use the full path to the file.
import { Cache } from "./dist/code/Index.js";

const app = {
  name: "pwa-app",
  version: "v1.2.1",
};

self.oninstall = (event) => event.waitUntil(Cache.create(app));

self.onactivate = (event) => event.waitUntil(Cache.clean(app));

self.onfetch = (event) => event.respondWith(Cache.use(event.request, app));
