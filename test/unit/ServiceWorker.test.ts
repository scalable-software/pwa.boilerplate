import { ServiceWorker } from "@scalable.software/app";

describe("Given ServiceWorker Imported", () => {
  it("then ServiceWorker exists", () => {
    expect(ServiceWorker).toBeDefined();
  });
});

// Static Method Existence
describe("Given ServiceWorker Exists", () => {
  it("then register static public method exists", () => {
    expect(ServiceWorker.register).toBeDefined();
  });
});
