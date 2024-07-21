import { ServiceWorker } from "@scalable.software/app";

describe("Given ServiceWorker Imported", () => {
  it("then ServiceWorker exists", () => {
    expect(ServiceWorker).toBeDefined();
  });
});
