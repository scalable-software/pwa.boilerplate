// Importmaps do not work with service workers, so we need to use the full path to the file.
import { Storage } from "./dist/code/Storage.js";
import { Clients } from "./dist/code/Clients.js";

const app = {
  name: "pwa-app",
  version: "v1.2.7",
};

const storage = new Storage(app);
const clients = new Clients(self.clients);

self.oninstall = (event) =>
  event.waitUntil(
    storage
      .create()
      .then(() => self.skipWaiting())
      .catch(console.error)
  );

self.onactivate = (event) =>
  event.waitUntil(
    storage
      .update()
      .then(() => clients.notify(app.version))
      .catch(console.error)
  );

self.onfetch = (event) => event.respondWith(storage.get(event.request));
