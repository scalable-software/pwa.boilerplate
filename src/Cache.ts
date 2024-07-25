export type Metadata = { name: string; version: string };

export class Cache {
  public app;
  constructor(app: Metadata) {
    this.app = app;
  }

  /**
   * @returns {string} The name of the cache
   * @description Returns the name of the cache
   */
  public get name() {
    return this.app.name + "." + this.app.version;
  }

  // UNIT TEST
  public match = (request) =>
    caches
      .open(this.name)
      .then((cache) => cache.match(request))
      .catch(console.error);

  // UNIT TEST
  public put = (request, response) =>
    caches
      .open(this.name)
      .then((cache) => cache.put(request, response))
      .catch(console.error);
}
