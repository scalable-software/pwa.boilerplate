import { Storage } from "../../src/Storage.js";

describe("Given Storage Imported", () => {
  it("then Storage exists", () => {
    expect(Storage).toBeDefined();
  });
});

// Instance Methods Existence
describe("Given Storage Instance", () => {
  let storage: Storage;
  beforeEach(() => {
    storage = new Storage({ name: "app", version: "1.0.0" });
  });
  it("then storage.fetch private method exists", () => {
    expect(storage["fetch"]).toBeDefined();
  });
  it("then storage.insert private method exists", () => {
    expect(storage["insert"]).toBeDefined();
  });
  it("then storage.getInvalid private method exists", () => {
    expect(storage["getInvalid"]).toBeDefined();
  });
  it("then storage.validateProtocol private method exists", () => {
    expect(storage["validateProtocol"]).toBeDefined();
  });
  it("then storage.stale private method exists", () => {
    expect(storage["stale"]).toBeDefined();
  });
  it("then storage.delete private method exists", () => {
    expect(storage["delete"]).toBeDefined();
  });
  it("then storage.keys private method exists", () => {
    expect(storage["keys"]).toBeDefined();
  });
  it("then storage.create public method exists", () => {
    expect(storage.create).toBeDefined();
  });
  it("then storage.update public method exists", () => {
    expect(storage.update).toBeDefined();
  });
  it("then storage.get public method exists", () => {
    expect(storage.get).toBeDefined();
  });
});

// Instance Methods Behavior
describe("Given storage.create public method exists", () => {
  let storage: Storage;
  beforeEach(() => {
    storage = new Storage({ name: "app", version: "1.0.0" });
  });
  describe("when cache.create() is called", () => {
    beforeEach(async () => {
      await storage.create();
    });
    it("then storage.keys() contains key for storage.cache.name", async () => {
      expect(await storage["keys"]()).toContain(storage.cache.name);
    });
  });
});

describe("Given storage.update public method exists", () => {
  let storage: Storage;
  beforeEach(() => {
    storage = new Storage({ name: "app", version: "1.0.4" });
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
      keys.push(storage.cache.name);
      keys.forEach(async (key) => await caches.open(key));
    });
    afterEach(async () => {
      keys.forEach(async (key) => await caches.delete(key));
    });
    describe("when storage.update() is called", () => {
      beforeEach(async () => {
        await storage.update();
      });
      it("then storage.keys() contain key for storage.cache.name", async () => {
        expect(await storage["keys"]()).toContain(storage.cache.name);
      });
      it("then storage.keys() contains key for other key", async () => {
        expect(await storage["keys"]()).toContain(other);
      });
      it("then storage.keys() does not contain invalid keys", async () => {
        const invalidKeys: any[] = keys
          .filter((key) => key !== storage.cache.name)
          .filter((key) => key !== other);
        const cachedKeys = await storage["keys"]();
        invalidKeys.forEach((key) => expect(cachedKeys).not.toContain(key));
      });
    });
  });
});

describe("Given storage.get public method exists", () => {
  let storage: Storage;
  beforeEach(() => {
    storage = new Storage({ name: "app", version: "1.0.0" });
  });
  describe("when cache.get(request) is called", () => {
    let response;
    let request = new Request("/");
    beforeEach(async () => {
      response = await storage.get(request);
    });
    it("then response equals fetch(request)", async () => {
      const fetchedResponse = await fetch(request);
      expect(response).toEqual(fetchedResponse);
    });
    it("then cache contains response for request", async () => {
      const cachedResponse = await caches
        .open(storage.cache.name)
        .then((cache) => cache.match(request));
      expect(cachedResponse).toEqual(response);
    });
  });
});

describe("Given storage.validateProtocol private method exists", () => {
  let storage: Storage;
  beforeEach(() => {
    storage = new Storage({ name: "app", version: "1.0.0" });
  });
  describe("when url is a http protocol", () => {
    let url = "http://scalable.software";
    it("then storage.validateProtocol(url) returns true", () => {
      expect(storage["validateProtocol"](url)).toBe(true);
    });
  });
  describe("when url is a https protocol", () => {
    let url = "https://scalable.software";
    it("then storage.validateProtocol(url) returns true", () => {
      expect(storage["validateProtocol"](url)).toBe(true);
    });
  });
  describe("when url is an invalid protocol", () => {
    let url = "ftp://scalable.software";
    it("then storage.validateProtocol(url) returns false", () => {
      expect(storage["validateProtocol"](url)).toBe(false);
    });
  });
});

describe("Given storage.getInvalid private method exists", () => {
  let storage: Storage;
  beforeEach(() => {
    storage = new Storage({ name: "app", version: "1.0.4" });
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
      keys.push(storage.cache.name);
    });
    it("then the list of keys contains the cache.name", () => {
      expect(keys).toContain(storage.cache.name);
    });
    describe("when invalidKeys = cache.getInvalid(keys) is called", () => {
      let invalidKeys;
      beforeEach(() => {
        invalidKeys = storage["getInvalid"](keys);
      });
      it("then invalidKeys do not contain key with cache.name", () => {
        expect(invalidKeys).not.toContain(storage.cache.name);
      });
      it("then invalidKeys contains all invalid keys", () => {
        const expectedKeys = keys
          .filter((key) => key !== storage.cache.name)
          .filter((key) => key !== other);
        expect(invalidKeys).toEqual(expectedKeys);
      });
    });
  });
});

describe("Given storage.fetch private method exist", () => {
  let storage: Storage;
  beforeEach(() => {
    storage = new Storage({ name: "app", version: "1.0.0" });
  });
  describe("when response = storage.fetch(request) is called", () => {
    let response;
    let request = "/";
    beforeEach(async () => {
      response = await storage["fetch"](request);
    });
    it("then response equals fetch(request)", async () => {
      const fetchedResponse = await fetch(request);
      expect(response).toEqual(fetchedResponse);
    });
    it("then cache contains response for request", async () => {
      const cachedResponse = await caches
        .open(storage.cache.name)
        .then((cache) => cache.match(request));
      expect(cachedResponse).toEqual(response);
    });
  });
});

describe("Given storage.insert private method exists", () => {
  let storage: Storage;
  beforeEach(() => {
    storage = new Storage({ name: "app", version: "1.0.0" });
  });
  describe("when results = storage.insert(request,response) is called", () => {
    let results;
    let request = "/";
    let response = new Response("Hello World!");
    beforeEach(async () => {
      results = await storage["insert"](request, response);
    });
    it("then results equals response", () => {
      expect(results).toEqual(response);
    });
    it("then named cache contains response for request", async () => {
      const cachedResponse = await caches
        .open(storage.cache.name)
        .then((cache) => cache.match(request));
      expect(cachedResponse).toEqual(results);
    });
  });
});

describe("Given storage.stale private method exists", () => {
  let storage: Storage;
  beforeEach(() => {
    storage = new Storage({ name: "app", version: "1.0.4" });
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
      keys.push(storage.cache.name);
      keys.forEach(async (key) => await caches.open(key));
    });
    afterEach(async () => {
      keys.forEach(async (key) => await caches.delete(key));
    });
    describe("when storage.stale() is called", () => {
      let invalidKeys;
      beforeEach(async () => {
        invalidKeys = await storage["stale"]();
      });
      it("then invalidKeys do not contain key with cache.name", () => {
        expect(invalidKeys).not.toContain(storage.cache.name);
      });
      it("then invalidKeys do not contains key with other key", () => {
        expect(invalidKeys).not.toContain(other);
      });
    });
  });
});

describe("Given storage.delete private method exists", () => {
  let storage: Storage;
  beforeEach(() => {
    storage = new Storage({ name: "app", version: "1.0.4" });
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
      keys.push(storage.cache.name);
      keys.forEach(async (key) => await caches.open(key));
    });
    describe("when storage.delete(keys) is called", () => {
      beforeEach(async () => {
        await storage["delete"](keys);
      });
      it("then storage.keys() does not contain keys", async () => {
        const cachedKeys = await storage["keys"]();
        keys.forEach((key) => expect(cachedKeys).not.toContain(key));
      });
    });
  });
});

describe("Given storage.keys private method exists", () => {
  let storage: Storage;
  beforeEach(async () => {
    storage = new Storage({ name: "app", version: "1.0.0" });
    await storage.create();
  });
  describe("when storage.keys() is called", () => {
    it("then keys contains cache.name", () => {
      storage["keys"]().then((keys) =>
        expect(keys).toContain(storage.cache.name)
      );
    });
  });
});

describe("Given storage.getInvalidKeys private method exists", () => {
  let storage: Storage;
  beforeEach(() => {
    storage = new Storage({ name: "app", version: "1.0.4" });
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
      keys.push(storage.cache.name);
    });
    it("then the list of keys contains the cache.name", () => {
      expect(keys).toContain(storage.cache.name);
    });
    describe("when invalidKeys = storage.getInvalidKeys(keys) is called", () => {
      let invalidKeys;
      beforeEach(() => {
        invalidKeys = storage["getInvalid"](keys);
      });
      it("then invalidKeys do not contain key with cache.name", () => {
        expect(invalidKeys).not.toContain(storage.cache.name);
      });
      it("then invalidKeys contains all invalid keys", () => {
        const expectedKeys = keys
          .filter((key) => key !== storage.cache.name)
          .filter((key) => key !== other);
        expect(invalidKeys).toEqual(expectedKeys);
      });
    });
  });
});
