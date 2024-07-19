import { PWA } from "@scalable.software/pwa.boilerplate";

describe("Given PWA Imported", () => {
  it("then PWA exists", () => {
    expect(PWA).toBeDefined();
  });
});

// Static Method Existence
describe("Given PWA Exists", () => {
  it("then registerServiceWorker static public method exists", () => {
    expect(PWA.registerServiceWorker).toBeDefined();
  });
});
