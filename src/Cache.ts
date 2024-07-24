export type Metadata = { name: string; version: string };

export class Cache {
  constructor(private app: Metadata) {}

  get name() {
    return this.app.name + "." + this.app.version;
  }

  private match = (request) =>
    caches
      .open(this.name)
      .then((cache) => cache.match(request))
      .catch(console.error);

  private put = (request, response) =>
    caches
      .open(this.name)
      .then((cache) => cache.put(request, response.clone()))
      .catch(console.error);

  private insert = (request, response) =>
    this.put(request, response)
      .then(() => response)
      .catch(console.error);

  private fetch = (request) =>
    fetch(request)
      .then((response) => this.insert(request, response))
      .catch(console.error);

  private getInvalid = (keys) =>
    keys
      .filter((key) => key.includes(this.app.name))
      .filter((key) => !key.includes(this.app.version));

  private removeInvalid = (keys) =>
    Promise.all(this.getInvalid(keys).map((key) => caches.delete(key)));

  private validateProtocol = (url) =>
    url.startsWith("http") || url.startsWith("https");

  private sendUpdateMessage = (client) =>
    client.postMessage({
      type: "NEW_VERSION",
      version: this.app.version,
    });

  public notify = (clients) => {
    clients.forEach((client) => this.sendUpdateMessage(client));
  };

  public create = () =>
    caches
      .open(this.name)
      .then((cache) => cache.add("/"))
      .catch(console.error);

  public update = () =>
    caches
      .keys()
      .then((keys) => this.removeInvalid(keys))
      .catch(console.error);

  public get = (request) =>
    this.validateProtocol(request.url) &&
    this.match(request)
      .then((response) => response || this.fetch(request))
      .catch(console.error);
}
