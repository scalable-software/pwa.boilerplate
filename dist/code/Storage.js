import { Cache } from "./Cache.js";
export class Storage {
    app;
    cache;
    constructor(app) {
        this.app = app;
        this.cache = new Cache(app);
    }
    getInvalid = (keys) => keys
        .filter((key) => key.includes(this.app.name))
        .filter((key) => !key.includes(this.app.version));
    keys = () => caches.keys();
    delete = (keys) => Promise.all(keys.map((key) => caches.delete(key))).catch(console.error);
    stale = () => this.keys()
        .then((keys) => this.getInvalid(keys))
        .catch(console.error);
    create = () => caches
        .open(this.cache.name)
        .then((cache) => cache.add("/"))
        .catch(console.error);
    validateProtocol = (url) => url.startsWith("http") || url.startsWith("https");
    insert = (request, response) => this.cache
        .put(request, response.clone())
        .then(() => response)
        .catch(console.error);
    fetch = (request) => fetch(request)
        .then((response) => this.insert(request, response))
        .catch(console.error);
    update = () => this.stale()
        .then((keys) => this.delete(keys))
        .catch(console.error);
    get = (request) => this.validateProtocol(request.url) &&
        this.cache
            .match(request)
            .then((response) => response || this.fetch(request))
            .catch(console.error);
}
