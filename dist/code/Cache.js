export class Cache {
    app;
    constructor(app) {
        this.app = app;
    }
    /**
     * @returns {string} The name of the cache
     * @description Returns the name of the cache
     */
    get name() {
        return this.app.name + "." + this.app.version;
    }
    // UNIT TEST
    match = (request) => caches
        .open(this.name)
        .then((cache) => cache.match(request))
        .catch(console.error);
    // UNIT TEST
    put = (request, response) => caches
        .open(this.name)
        .then((cache) => cache.put(request, response))
        .catch(console.error);
}
