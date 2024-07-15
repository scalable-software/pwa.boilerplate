import { Pin } from "@scalable.software/pwa.boilerplate";

await Pin.loadTemplate("Pin.template.html");
customElements.define(Pin.Tag, Pin);
