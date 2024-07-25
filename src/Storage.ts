export type Metadata = { name: string; version: string };
import { Cache } from "./Cache.js";

export class Storage {
  private app: Metadata;
  public cache: Cache;
  constructor(app) {
    this.app = app;
    this.cache = new Cache(app);
  }

  private getInvalid = (keys) =>
    keys
      .filter((key) => key.includes(this.app.name))
      .filter((key) => !key.includes(this.app.version));

  private keys = () => caches.keys();

  private delete = (keys) =>
    Promise.all(keys.map((key) => caches.delete(key))).catch(console.error);

  private stale = () =>
    this.keys()
      .then((keys) => this.getInvalid(keys))
      .catch(console.error);

  public create = () =>
    caches
      .open(this.cache.name)
      .then((cache) => cache.add("/"))
      .catch(console.error);

  private validateProtocol = (url) =>
    url.startsWith("http") || url.startsWith("https");

  private insert = (request, response) =>
    this.cache
      .put(request, response.clone())
      .then(() => response)
      .catch(console.error);

  private fetch = (request) =>
    fetch(request)
      .then((response) => this.insert(request, response))
      .catch(console.error);

  public update = () =>
    this.stale()
      .then((keys) => this.delete(keys))
      .catch(console.error);

  public get = (request) =>
    this.validateProtocol(request.url) &&
    this.cache
      .match(request)
      .then((response) => response || this.fetch(request))
      .catch(console.error);
}
