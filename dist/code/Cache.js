export class Cache {
    app;
    constructor(app) {
        this.app = app;
    }
    get name() {
        return this.app.name + "." + this.app.version;
    }
    cache = async (request, response) => caches
        .open(this.name)
        .then((cache) => cache.put(request, response.clone()) && response);
    fetch = async (request) => fetch(request).then((response) => this.cache(request, response));
    delete = async (keys) => Promise.all(keys
        .filter((key) => key.includes(this.app.name))
        .filter((key) => !key.includes(this.app.version))
        .map((key) => caches.delete(key)));
    create = async () => caches.open(this.name).then((cache) => cache.add("/"));
    clean = async () => caches.keys().then((keys) => this.delete(keys));
    use = async (event) => caches
        .match(event.request)
        .then((response) => response || this.fetch(event.request));
}
