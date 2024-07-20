export class App {
  public static register = async (worker, options) => {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register(
          worker,
          options
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
