// ./dist/Index.js
import { PWA } from "@scalable.software/pwa.boilerplate";
PWA.registerServiceWorker("/service-worker.js");

// NPM install component
import { Pin } from "@scalable.software/web.component";

await Pin.loadTemplate("Pin.template.html");
customElements.define(Pin.Tag, Pin);
