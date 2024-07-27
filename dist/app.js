import { ServiceWorker } from "@scalable.software/app";

const serviceWorker = new ServiceWorker("/service-worker.js", {
  scope: "/",
  type: "module",
});
serviceWorker.register();

import { App } from "@scalable.software/app";

await App.loadTemplate("App.template.html");
customElements.define(App.Tag, App);

// NPM installed component
import { Pin } from "@scalable.software/web.component";

await Pin.loadTemplate("Pin.template.html");
customElements.define(Pin.Tag, Pin);
