import { ServiceWorker } from "@scalable.software/app";

const serviceWorker = new ServiceWorker("/service-worker.js", {
  scope: "/",
  type: "module",
});
serviceWorker.register();

// NPM installed component
import { Pin } from "@scalable.software/web.component";

await Pin.loadTemplate("Pin.template.html");
customElements.define(Pin.Tag, Pin);
