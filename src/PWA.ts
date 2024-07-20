export class PWA {
  public static registerServiceWorker = async (serviceWorker) => {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register(
          serviceWorker,
          { scope: "/", type: "module" }
        );

        if (registration.installing) {
          console.log("Service Worker: Installing");
        } else if (registration.waiting) {
          console.log("Service Worker: Installed");
        } else if (registration.active) {
          console.log("Service Worker: Active");
        }
      } catch (error) {
        console.error(`Registration failed with ${error}`);
      }
    }
  };
}

export const test = "test";
