export class Cache {
    static create = async (app) => caches.open(app.name + "." + app.version).then((cache) => cache.add("/"));
    static delete = async (keys, app) => Promise.all(keys
        .filter((key) => key.includes(app.name))
        .filter((key) => !key.includes(app.version))
        .map((key) => caches.delete(key)));
    static clean = async (app) => caches.keys().then((keys) => Cache.delete(keys, app));
    static update = async (request, app) => fetch(request).then((response) => caches
        .open(app.name + "." + app.version)
        .then((cache) => cache.put(request, response.clone()) && response));
    static use = async (request, app) => caches
        .match(request)
        .then((response) => response || Cache.update(request, app));
}
