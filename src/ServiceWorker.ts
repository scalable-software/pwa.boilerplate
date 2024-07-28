import { type App } from "./App.js";
export class ServiceWorker {
  private registration: ServiceWorkerRegistration | null = null;

  public constructor(
    private path: string,
    private options: RegistrationOptions
  ) {}

  public register = async () => {
    if (!("serviceWorker" in navigator)) {
      console.error(
        "Service Worker: Service Worker not supported in this browser"
      );
      return;
    }
    try {
      this.registration = await navigator.serviceWorker.register(
        this.path,
        this.options
      );

      this.setupListeners();
      this.logRegistrationState();
    } catch (error) {
      console.error(`Service Worker: Registration failed with ${error}`);
    }
  };

  private setupListeners = () => {
    navigator.serviceWorker.oncontrollerchange = () => {
      console.log("Service Worker: New worker Active.");
    };
    navigator.serviceWorker.onmessage = (event) => {
      if (event.data && event.data.type === "NEW_VERSION") {
        this.update(event.data.version);
      }
    };
  };

  private logRegistrationState = () => {
    if (this.registration.installing) {
      console.log("Service Worker: Installing");
    } else if (this.registration.waiting) {
      console.log("Service Worker: Installed");
    } else if (this.registration.active) {
      console.log("Service Worker: Active");
    }
  };

  private update = (version) => {
    const app = document.querySelector("pwa-app") as App;
    app.update(version);
  };
}
