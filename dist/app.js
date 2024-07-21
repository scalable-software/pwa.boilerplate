import { ServiceWorker } from "@scalable.software/app";
ServiceWorker.register("/service-worker.js", { scope: "/", type: "module" });

// NPM installed component
import { Pin } from "@scalable.software/web.component";

await Pin.loadTemplate("Pin.template.html");
customElements.define(Pin.Tag, Pin);
