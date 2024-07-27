import {
  defineComponent,
  removeTemplate,
  appendComponent,
  hasSetter,
} from "./Helper.js";

import { App, Attribute, Visible, State } from "@scalable.software/app";

describe("Given App imported", () => {
  it("then App exist", () => {
    expect(App).toBeDefined();
  });
});

/**
 * Static Properties Existence
 */
describe("Given App exist", () => {
  it("then App.Tag static getter exist", () => {
    expect(App.Tag).toBeDefined();
  });
  it("then App.Attributes static getter exist", () => {
    expect(App.Attributes).toBeDefined();
  });
});

/**
 * Static Properties Value
 */
describe("Given App.Tag static getter exists", () => {
  it("then App.Tag is 'pwa-app'", () => {
    expect(App.Tag).toBe("pwa-app");
  });
});
describe("Given App.Attributes static getter exists", () => {
  it("then App.Attributes is Attribute", () => {
    expect(App.Attributes).toBe(Attribute);
  });
});

/**
 * Static Methods Existence
 */
describe("When App exist", () => {
  it("then App.loadTemplate static method exist", () => {
    expect(App.loadTemplate).toBeDefined();
  });
});

/**
 * Static Methods Behavior
 */
describe("Given App.loadTemplate method", () => {
  it("and no template is in html document", () => {
    const template = document.querySelector("template");
    expect(template).toBeNull();
  });
  describe("when App.loadTemplate(filename) is called with valid filename", () => {
    beforeEach(async () => {
      await App.loadTemplate("App.template.html");
    });
    afterEach(() => {
      const template = document.querySelector("template");
      template && template.remove();
    });
    it("then an template is inserted into the html document", async () => {
      const template = document.querySelector("template");
      expect(template).not.toBeNull();
    });
  });
  describe("when App.loadTemplate(filename) is called with invalid filename", () => {
    let errorThrown: boolean = false;
    beforeEach(async () => {
      try {
        await App.loadTemplate("invalid.html");
      } catch (error) {
        errorThrown = true;
      }
    });
    it("then an error was thrown", async () => {
      expect(errorThrown).toBe(true);
    });
  });
});

/**
 * Component State Existence
 */
describe("Given App is defined in custom element registry", () => {
  beforeEach(() => {
    defineComponent(App.Tag, App);
  });
  it("then custom element registry should contain App", () => {
    expect(customElements.get(App.Tag)).toBe(App);
  });
  describe("and HTML Template added to DOM", () => {
    beforeEach(async () => {
      await App.loadTemplate("App.template.html");
    });
    afterEach(() => {
      removeTemplate(App.Tag);
    });
    describe("when App added to DOM", () => {
      let app: App;
      beforeEach(() => {
        app = appendComponent<App>(App.Tag);
      });
      afterEach(() => {
        app.remove();
      });
      it("then app.visible property exist", () => {
        expect(app.visible).toBeDefined();
      });
      it("then app.state property exist", () => {
        expect(app.state).toBeDefined();
      });
    });
  });
});

/**
 * Component State Default Value
 */
describe("Given App is defined in custom element registry", () => {
  beforeEach(() => {
    defineComponent(App.Tag, App);
  });
  it("then custom element registry should contain App", () => {
    expect(customElements.get(App.Tag)).toBe(App);
  });
  describe("and HTML Template added to DOM", () => {
    beforeEach(async () => {
      await App.loadTemplate("App.template.html");
    });
    afterEach(() => {
      removeTemplate(App.Tag);
    });
    describe("when App added to DOM", () => {
      let app: App;
      beforeEach(() => {
        app = appendComponent<App>(App.Tag);
      });
      afterEach(() => {
        app.remove();
      });
      it("Then app.visible is Visible.YES", () => {
        expect(app.visible).toEqual(Visible.YES);
      });
      it("Then app.state is State.DISABLED", () => {
        expect(app.state).toEqual(State.DISABLED);
      });
    });
  });
});

/**
 * Component Operation Existence
 */
describe("Given App is defined in custom element registry", () => {
  beforeEach(() => {
    defineComponent(App.Tag, App);
  });
  it("then custom element registry should contain App", () => {
    expect(customElements.get(App.Tag)).toBe(App);
  });
  describe("and HTML Template added to DOM", () => {
    beforeEach(async () => {
      await App.loadTemplate("App.template.html");
    });
    afterEach(() => {
      removeTemplate(App.Tag);
    });
    describe("when App added to DOM", () => {
      let app: App;
      beforeEach(() => {
        app = appendComponent<App>(App.Tag);
      });
      afterEach(() => {
        app.remove();
      });
      it("then app.show() method exist", () => {
        expect(app.show).toBeDefined();
      });
      it("then app.hide() method exist", () => {
        expect(app.hide).toBeDefined();
      });
      it("then app.enable() method exist", () => {
        expect(app.enable).toBeDefined();
      });
      it("then app.disable() method exist", () => {
        expect(app.disable).toBeDefined();
      });
      it("then app.toggle() method exist", () => {
        expect(app.toggle).toBeDefined();
      });
    });
  });
});

/**
 * Component Operation Behavior
 */
describe("Given App is defined in custom element registry", () => {
  beforeEach(() => {
    defineComponent(App.Tag, App);
  });
  it("then custom element registry should contain App", () => {
    expect(customElements.get(App.Tag)).toBe(App);
  });
  describe("and HTML Template added to DOM", () => {
    beforeEach(async () => {
      await App.loadTemplate("App.template.html");
    });
    afterEach(() => {
      removeTemplate(App.Tag);
    });
    describe("when App added to DOM", () => {
      let app: App;
      beforeEach(() => {
        app = appendComponent<App>(App.Tag);
      });
      afterEach(() => {
        app.remove();
      });
      describe("and app.hide()", () => {
        beforeEach(() => {
          app.hide();
        });
        // Component State Value
        it("then app.visible is Visible.NO", () => {
          expect(app.visible).toEqual(Visible.NO);
        });
        // Component Attribute Value
        it("then html attribute visible is Visible.NO", () => {
          expect(app.getAttribute(Attribute.VISIBLE)).toEqual(Visible.NO);
        });
        describe("and app.show()", () => {
          beforeEach(() => {
            app.show();
          });
          // Component State Value
          it("then app.visible is Visible.YES", () => {
            console.log(app["_visible"]);
            expect(app.visible).toEqual(Visible.YES);
          });
          // Component Attribute Value
          it("then html attribute visible does not exist", () => {
            expect(app.getAttribute(Attribute.VISIBLE)).toBeNull();
          });
        });
      });
      describe("and app.enable()", () => {
        let onenable: jasmine.Spy;
        beforeEach(() => {
          onenable = jasmine.createSpy("onenable");
          app.onenable = onenable;
          app.enable();
        });
        // Component State Value
        it("then app.state is State.ENABLED", () => {
          expect(app.state).toEqual(State.ENABLED);
        });
        // Component Attribute Value
        it("then html attribute state is State.ENABLED", () => {
          expect(app.getAttribute(Attribute.STATE)).toEqual(State.ENABLED);
        });
        // Component Event Dispatch
        it("then onenable is called", () => {
          expect(onenable).toHaveBeenCalled();
        });
        describe("and app.disable()", () => {
          let ondisable: jasmine.Spy;
          beforeEach(() => {
            ondisable = jasmine.createSpy("ondisable");
            app.ondisable = ondisable;
            app.disable();
          });
          // Component State Value
          it("then app.state is State.DISABLED", () => {
            expect(app.state).toEqual(State.DISABLED);
          });
          // Component Attribute Value
          it("then html attribute state is State.DISABLED", () => {
            expect(app.getAttribute(Attribute.STATE)).toEqual(State.DISABLED);
          });
          // Component Event Dispatch
          it("then ondisable is called", () => {
            expect(ondisable).toHaveBeenCalled();
          });
        });
      });
      describe("and app.toggle()", () => {
        beforeEach(() => {
          app.toggle();
        });
        // Component State Value
        it("then app.state is State.ENABLED", () => {
          expect(app.state).toEqual(State.ENABLED);
        });
        // Component Attribute Value
        it("then html attribute state is State.ENABLED", () => {
          expect(app.getAttribute(Attribute.STATE)).toEqual(State.ENABLED);
        });
        describe("and app.toggle()", () => {
          beforeEach(() => {
            app.toggle();
          });
          // Component State Value
          it("then app.state is State.DISABLED", () => {
            expect(app.state).toEqual(State.DISABLED);
          });
          // Component Attribute Value
          it("then html attribute state is State.DISABLED", () => {
            expect(app.getAttribute(Attribute.STATE)).toEqual(State.DISABLED);
          });
        });
      });
      describe("and user clicks on app", () => {
        beforeEach(() => {
          app.click();
        });
        it("then app.state is State.ENABLED", () => {
          expect(app.state).toEqual(State.ENABLED);
        });
        it("then html attribute state is State.ENABLED", () => {
          expect(app.getAttribute(Attribute.STATE)).toEqual(State.ENABLED);
        });
      });
    });
  });
});

/**
 * Component Event Existence
 */
describe("Given App is defined in custom element registry", () => {
  beforeEach(() => {
    defineComponent(App.Tag, App);
  });
  it("then custom element registry should contain App", () => {
    expect(customElements.get(App.Tag)).toBe(App);
  });
  describe("and HTML Template added to DOM", () => {
    beforeEach(async () => {
      await App.loadTemplate("App.template.html");
    });
    afterEach(() => {
      removeTemplate(App.Tag);
    });
    describe("when App added to DOM", () => {
      let app: App;
      beforeEach(() => {
        app = appendComponent<App>(App.Tag);
      });
      afterEach(() => {
        app.remove();
      });
      it("then app.onhide setter exist", () => {
        expect(hasSetter(app, "onhide")).toBeTrue();
      });
      it("then app.onshow setter exist", () => {
        expect(hasSetter(app, "onshow")).toBeTrue();
      });
      it("then app.onenable setter exist", () => {
        expect(hasSetter(app, "onenable")).toBeTrue();
      });
      it("then app.ondisable setter exist", () => {
        expect(hasSetter(app, "ondisable")).toBeTrue();
      });
    });
  });
});

/**
 * Component Event Dispatching Behavior
 */
describe("Given App is defined in custom element registry", () => {
  beforeEach(() => {
    defineComponent(App.Tag, App);
  });
  it("then custom element registry should contain App", () => {
    expect(customElements.get(App.Tag)).toBe(App);
  });
  describe("and HTML Template added to DOM", () => {
    beforeEach(async () => {
      await App.loadTemplate("App.template.html");
    });
    afterEach(() => {
      removeTemplate(App.Tag);
    });
    describe("when App added to DOM", () => {
      let app: App;
      beforeEach(() => {
        app = appendComponent<App>(App.Tag);
      });
      afterEach(() => {
        app.remove();
      });
      describe("and app.hide()", () => {
        let onhide: jasmine.Spy;
        beforeEach(() => {
          onhide = jasmine.createSpy("onhide");
          app.onhide = onhide;
          app.hide();
        });
        it("then onhide is called", () => {
          expect(onhide).toHaveBeenCalled();
        });
        describe("and app.show()", () => {
          let onshow: jasmine.Spy;
          beforeEach(() => {
            onshow = jasmine.createSpy("onshow");
            app.onshow = onshow;
            app.show();
          });
          it("then onshow is called", () => {
            expect(onshow).toHaveBeenCalled();
          });
        });
      });
      describe("and app.enable()", () => {
        let onenable: jasmine.Spy;
        beforeEach(() => {
          onenable = jasmine.createSpy("onenable");
          app.onenable = onenable;
          app.enable();
        });
        it("then onenable is called", () => {
          expect(onenable).toHaveBeenCalled();
        });
        describe("and app.disable()", () => {
          let ondisable: jasmine.Spy;
          beforeEach(() => {
            ondisable = jasmine.createSpy("ondisable");
            app.ondisable = ondisable;
            app.disable();
          });
          it("then ondisable is called", () => {
            expect(ondisable).toHaveBeenCalled();
          });
        });
      });
      describe("and app.toggle()", () => {
        let onenable: jasmine.Spy;
        beforeEach(() => {
          onenable = jasmine.createSpy("onenable");
          app.onenable = onenable;
          app.toggle();
        });
        it("then onenable is called", () => {
          expect(onenable).toHaveBeenCalled();
        });
        describe("and app.toggle()", () => {
          let ondisable: jasmine.Spy;
          beforeEach(() => {
            ondisable = jasmine.createSpy("ondisable");
            app.ondisable = ondisable;
            app.toggle();
          });
          it("then ondisable is called", () => {
            expect(ondisable).toHaveBeenCalled();
          });
        });
      });
    });
  });
});

/**
 * User Gesture Behavior
 */
describe("Given App is defined in custom element registry", () => {
  beforeEach(() => {
    defineComponent(App.Tag, App);
  });
  it("then custom element registry should contain App", () => {
    expect(customElements.get(App.Tag)).toBe(App);
  });
  describe("and HTML Template added to DOM", () => {
    beforeEach(async () => {
      await App.loadTemplate("App.template.html");
    });
    afterEach(() => {
      removeTemplate(App.Tag);
    });
    describe("when App added to DOM", () => {
      let app: App;
      beforeEach(() => {
        app = appendComponent<App>(App.Tag);
      });
      afterEach(() => {
        app.remove();
      });
      describe("and user clicks on app", () => {
        let onenable: jasmine.Spy;
        beforeEach(() => {
          onenable = jasmine.createSpy("onenable");
          app.onenable = onenable;
          app.click();
        });
        it("then app.state is State.ENABLED", () => {
          expect(app.state).toEqual(State.ENABLED);
        });
        it("then html attribute state is State.ENABLED", () => {
          expect(app.getAttribute(Attribute.STATE)).toEqual(State.ENABLED);
        });
        it("then onenable is called", () => {
          expect(onenable).toHaveBeenCalled();
        });
        describe("and user clicks on app", () => {
          let ondisable: jasmine.Spy;
          beforeEach(() => {
            ondisable = jasmine.createSpy("ondisable");
            app.ondisable = ondisable;
            app.click();
          });
          it("then app.state is State.DISABLED", () => {
            expect(app.state).toEqual(State.DISABLED);
          });
          it("then html attribute state is State.DISABLED", () => {
            expect(app.getAttribute(Attribute.STATE)).toEqual(State.DISABLED);
          });
          it("then ondisable is called", () => {
            expect(ondisable).toHaveBeenCalled();
          });
        });
      });
    });
  });
});
