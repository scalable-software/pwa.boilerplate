export class Cache {
  constructor(private app: { name: string; version: string }) {}

  get name() {
    return this.app.name + "." + this.app.version;
  }

  private cache = async (request, response) =>
    caches
      .open(this.name)
      .then((cache) => cache.put(request, response.clone()) && response);

  private fetch = async (request) =>
    fetch(request).then((response) => this.cache(request, response));

  private delete = async (keys) =>
    Promise.all(
      keys
        .filter((key) => key.includes(this.app.name))
        .filter((key) => !key.includes(this.app.version))
        .map((key) => caches.delete(key))
    );

  public create = async () =>
    caches.open(this.name).then((cache) => cache.add("/"));

  public clean = async () => caches.keys().then((keys) => this.delete(keys));

  public use = async (event) =>
    caches
      .match(event.request)
      .then((response) => response || this.fetch(event.request));
}
