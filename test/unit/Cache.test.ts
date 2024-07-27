import { Cache } from "../../src/Cache.js";

describe("Given Cache Imported", () => {
  it("then Cache exists", () => {
    expect(Cache).toBeDefined();
  });
});

// Instance Properties Existence
describe("Given Cache Instance", () => {
  let cache: Cache;
  beforeEach(() => {
    cache = new Cache({ name: "app", version: "1.0.0" });
  });
  it("then cache.app private property exists", () => {
    expect(cache["app"]).toBeDefined();
  });
});

// Instance Properties Value
describe("Given cache.app private property exists", () => {
  let cache: Cache;
  describe("and the cache was instantiated with metadata", () => {
    let metadata = { name: "app", version: "1.0.0" };
    beforeEach(() => {
      cache = new Cache(metadata);
    });
    it("then cache.app equals metadata", () => {
      expect(cache["app"]).toEqual(metadata);
    });
  });
});

// Instance Getters Existence
describe("Given Cache Instance", () => {
  let cache: Cache;
  beforeEach(() => {
    cache = new Cache({ name: "app", version: "1.0.0" });
  });
  it("then cache.name public getter exists", () => {
    expect(cache.name).toBeDefined();
  });
});

// Instance Getters Value
describe("Given cache.name getter exists", () => {
  let cache: Cache;
  describe("and the cache was instantiated with metadata", () => {
    let metadata = { name: "app", version: "1.0.0" };
    beforeEach(() => {
      cache = new Cache(metadata);
    });
    it("then cache.name equals 'metadata.name + . + metadata.version'", () => {
      const expectedName = metadata.name + "." + metadata.version;
      expect(cache.name).toBe(expectedName);
    });
  });
});

// Instance Methods Existence
describe("Given Cache Instance", () => {
  let cache: Cache;
  beforeEach(() => {
    cache = new Cache({ name: "app", version: "1.0.0" });
  });
  it("then cache.match private method exists", () => {
    expect(cache["match"]).toBeDefined();
  });
  it("then cache.put private method exists", () => {
    expect(cache["put"]).toBeDefined();
  });
});

// Instance Method Behavior
describe("Given cache.match private method exists", () => {
  let cache: Cache;
  beforeEach(() => {
    cache = new Cache({ name: "app", version: "1.0.0" });
  });
  describe("when response = cache.match(request) is called", () => {
    let response;
    let request = "/";
    beforeEach(async () => {
      response = await cache["match"](request);
    });
    it("then response equals match(request)", async () => {
      const cachedResponse = await caches
        .open(cache.name)
        .then((cache) => cache.match(request));
      expect(response).toEqual(cachedResponse);
    });
  });
});
