import { Cache } from "@scalable.software/app";

describe("Given Cache Imported", () => {
  it("then Cache exists", () => {
    expect(Cache).toBeDefined();
  });
});

// Static Method Existence
describe("Given Cache Exists", () => {
  it("then create static public method exists", () => {
    expect(Cache.create).toBeDefined();
  });
  it("then delete static public method exists", () => {
    expect(Cache.delete).toBeDefined();
  });
  it("then clean static public method exists", () => {
    expect(Cache.clean).toBeDefined();
  });
  it("then update static public method exists", () => {
    expect(Cache.update).toBeDefined();
  });
  it("then use static public method exists", () => {
    expect(Cache.use).toBeDefined();
  });
});
