import { App } from "@scalable.software/app";

describe("Given App Imported", () => {
  it("then App exists", () => {
    expect(App).toBeDefined();
  });
});

// Static Method Existence
describe("Given App Exists", () => {
  it("then register static public method exists", () => {
    expect(App.register).toBeDefined();
  });
});
