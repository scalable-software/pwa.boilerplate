// ./dist/Index.js
import { pwa } from "@scalable.software/pwa.boilerplate";
console.log("PWA", pwa);

// NPM install component
import { Pin } from "@scalable.software/web.component";

await Pin.loadTemplate("Pin.template.html");
customElements.define(Pin.Tag, Pin);
