import { App } from "@scalable.software/app";
App.register("/service-worker.js", { scope: "/", type: "module" });

// NPM installed component
import { Pin } from "@scalable.software/web.component";

await Pin.loadTemplate("Pin.template.html");
customElements.define(Pin.Tag, Pin);
