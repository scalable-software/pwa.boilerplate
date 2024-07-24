export class Cache {
    app;
    constructor(app) {
        this.app = app;
    }
    get name() {
        return this.app.name + "." + this.app.version;
    }
    match = (request) => caches
        .open(this.name)
        .then((cache) => cache.match(request))
        .catch(console.error);
    put = (request, response) => caches
        .open(this.name)
        .then((cache) => cache.put(request, response.clone()))
        .catch(console.error);
    insert = (request, response) => this.put(request, response)
        .then(() => response)
        .catch(console.error);
    fetch = (request) => fetch(request)
        .then((response) => this.insert(request, response))
        .catch(console.error);
    getInvalid = (keys) => keys
        .filter((key) => key.includes(this.app.name))
        .filter((key) => !key.includes(this.app.version));
    removeInvalid = (keys) => Promise.all(this.getInvalid(keys).map((key) => caches.delete(key)));
    validateProtocol = (url) => url.startsWith("http") || url.startsWith("https");
    sendUpdateMessage = (client) => client.postMessage({
        type: "NEW_VERSION",
        version: this.app.version,
    });
    notify = (clients) => {
        clients.forEach((client) => this.sendUpdateMessage(client));
    };
    create = () => caches
        .open(this.name)
        .then((cache) => cache.add("/"))
        .catch(console.error);
    update = () => caches
        .keys()
        .then((keys) => this.removeInvalid(keys))
        .catch(console.error);
    get = (request) => this.validateProtocol(request.url) &&
        this.match(request)
            .then((response) => response || this.fetch(request))
            .catch(console.error);
}
