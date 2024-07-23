import { Cache } from "@scalable.software/app";

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
  it("then cache.insert private method exists", () => {
    expect(cache["insert"]).toBeDefined();
  });
  it("then cache.fetch private method exists", () => {
    expect(cache["fetch"]).toBeDefined();
  });
  it("then cache.getInvalid private method exists", () => {
    expect(cache["getInvalid"]).toBeDefined();
  });
  it("then cache.removeInvalid private method exists", () => {
    expect(cache["removeInvalid"]).toBeDefined();
  });
  it("then cache.create public method exists", () => {
    expect(cache.create).toBeDefined();
  });
  it("then cache.update public method exists", () => {
    expect(cache.update).toBeDefined();
  });
  it("then cache.get public method exists", () => {
    expect(cache.get).toBeDefined();
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

describe("Given cache.insert private method exists", () => {
  let cache: Cache;
  beforeEach(() => {
    cache = new Cache({ name: "app", version: "1.0.0" });
  });
  describe("when results = cache.insert(request,response) is called", () => {
    let results;
    let request = "/";
    let response = new Response("Hello World!");
    beforeEach(async () => {
      results = await cache["insert"](request, response);
    });
    it("then results equals response", () => {
      expect(results).toEqual(response);
    });
    it("then named cache contains response for request", async () => {
      const cachedResponse = await caches
        .open(cache.name)
        .then((cache) => cache.match(request));
      expect(cachedResponse).toEqual(results);
    });
  });
});

describe("Given cache.fetch private method exist", () => {
  let cache: Cache;
  beforeEach(() => {
    cache = new Cache({ name: "app", version: "1.0.0" });
  });
  describe("when response = cache.fetch(request) is called", () => {
    let response;
    let request = "/";
    beforeEach(async () => {
      response = await cache["fetch"](request);
    });
    it("then response equals fetch(request)", async () => {
      const fetchedResponse = await fetch(request);
      expect(response).toEqual(fetchedResponse);
    });
    it("then cache contains response for request", async () => {
      const cachedResponse = await caches
        .open(cache.name)
        .then((cache) => cache.match(request));
      expect(cachedResponse).toEqual(response);
    });
  });
});

describe("Given cache.getInvalid private method exists", () => {
  let cache: Cache;
  beforeEach(() => {
    cache = new Cache({ name: "app", version: "1.0.4" });
  });
  describe("and given a list of keys", () => {
    let keys = [];
    let other = "other";
    beforeEach(() => {
      keys.push("app.1.0.0");
      keys.push("app.1.0.1");
      keys.push("app.1.0.2");
      keys.push("app.1.0.3");
      keys.push(other);
      keys.push(cache.name);
    });
    it("then the list of keys contains the cache.name", () => {
      expect(keys).toContain(cache.name);
    });
    describe("when invalidKeys = cache.getInvalid(keys) is called", () => {
      let invalidKeys;
      beforeEach(() => {
        invalidKeys = cache["getInvalid"](keys);
      });
      it("then invalidKeys do not contain key with cache.name", () => {
        expect(invalidKeys).not.toContain(cache.name);
      });
      it("then invalidKeys contains all invalid keys", () => {
        const expectedKeys = keys
          .filter((key) => key !== cache.name)
          .filter((key) => key !== other);
        expect(invalidKeys).toEqual(expectedKeys);
      });
    });
  });
});

describe("Given cache.removeInvalid private method exists", () => {
  let cache: Cache;
  beforeEach(() => {
    cache = new Cache({ name: "app", version: "1.0.4" });
  });
  describe("and caches for each key in list of key exists", () => {
    let keys = [];
    let other = "other";
    beforeEach(() => {
      keys.push("app.1.0.0");
      keys.push("app.1.0.1");
      keys.push("app.1.0.2");
      keys.push("app.1.0.3");
      keys.push(other);
      keys.push(cache.name);
      keys.forEach(async (key) => await caches.open(key));
    });
    afterEach(async () => {
      keys.forEach(async (key) => await caches.delete(key));
    });
    describe("when cache.removeInvalid(keys) is called", () => {
      beforeEach(async () => {
        await cache["removeInvalid"](keys);
      });
      it("then caches.keys() contain key for cache.name", async () => {
        expect(await caches.keys()).toContain(cache.name);
      });
      it("then caches.keys() contains key for other key", async () => {
        expect(await caches.keys()).toContain(other);
      });
      it("then caches.keys() does not contain invalid keys", async () => {
        const invalidKeys: any[] = keys
          .filter((key) => key !== cache.name)
          .filter((key) => key !== other);
        const cachedKeys = await caches.keys();
        invalidKeys.forEach((key) => expect(cachedKeys).not.toContain(key));
      });
    });
  });
});

describe("Given cache.validateProtocol private method exists", () => {
  let cache: Cache;
  beforeEach(() => {
    cache = new Cache({ name: "app", version: "1.0.0" });
  });
  describe("when url is a http protocol", () => {
    let url = "http://scalable.software";
    it("then cache.validateProtocol(url) returns true", () => {
      expect(cache["validateProtocol"](url)).toBe(true);
    });
  });
  describe("when url is a https protocol", () => {
    let url = "https://scalable.software";
    it("then cache.validateProtocol(url) returns true", () => {
      expect(cache["validateProtocol"](url)).toBe(true);
    });
  });
  describe("when url is an invalid protocol", () => {
    let url = "ftp://scalable.software";
    it("then cache.validateProtocol(url) returns false", () => {
      expect(cache["validateProtocol"](url)).toBe(false);
    });
  });
});

describe("Given cache.create public method exists", () => {
  let cache: Cache;
  beforeEach(() => {
    cache = new Cache({ name: "app", version: "1.0.0" });
  });
  describe("when cache.create() is called", () => {
    beforeEach(async () => {
      await cache.create();
    });
    it("then caches.keys() contains key for cache.name", async () => {
      expect(await caches.keys()).toContain(cache.name);
    });
  });
});

describe("Given cache.update public method exists", () => {
  let cache: Cache;
  beforeEach(() => {
    cache = new Cache({ name: "app", version: "1.0.4" });
  });
  describe("and caches for each key in list of key exists", () => {
    let keys = [];
    let other = "other";
    beforeEach(() => {
      keys.push("app.1.0.0");
      keys.push("app.1.0.1");
      keys.push("app.1.0.2");
      keys.push("app.1.0.3");
      keys.push(other);
      keys.push(cache.name);
      keys.forEach(async (key) => await caches.open(key));
    });
    afterEach(async () => {
      keys.forEach(async (key) => await caches.delete(key));
    });
    describe("when cache.update() is called", () => {
      beforeEach(async () => {
        await cache.update();
      });
      it("then caches.keys() contain key for cache.name", async () => {
        expect(await caches.keys()).toContain(cache.name);
      });
      it("then caches.keys() contains key for other key", async () => {
        expect(await caches.keys()).toContain(other);
      });
      it("then caches.keys() does not contain invalid keys", async () => {
        const invalidKeys: any[] = keys
          .filter((key) => key !== cache.name)
          .filter((key) => key !== other);
        const cachedKeys = await caches.keys();
        invalidKeys.forEach((key) => expect(cachedKeys).not.toContain(key));
      });
    });
  });
});

describe("Given cache.get public method exists", () => {
  let cache: Cache;
  beforeEach(() => {
    cache = new Cache({ name: "app", version: "1.0.0" });
  });
  describe("when cache.get(request) is called", () => {
    let response;
    let request = new Request("/");
    beforeEach(async () => {
      response = await cache.get(request);
    });
    it("then response equals fetch(request)", async () => {
      const fetchedResponse = await fetch(request);
      expect(response).toEqual(fetchedResponse);
    });
    it("then cache contains response for request", async () => {
      const cachedResponse = await caches
        .open(cache.name)
        .then((cache) => cache.match(request));
      expect(cachedResponse).toEqual(response);
    });
  });
});
