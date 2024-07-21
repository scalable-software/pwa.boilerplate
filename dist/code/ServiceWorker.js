export class ServiceWorker {
    static register = async (worker, options) => {
        if ("serviceWorker" in navigator) {
            try {
                const registration = await navigator.serviceWorker.register(worker, options);
                navigator.serviceWorker.oncontrollerchange = () => {
                    console.log("Service Worker: New worker Active.");
                };
                if (registration.installing) {
                    console.log("Service Worker: Installing");
                }
                else if (registration.waiting) {
                    console.log("Service Worker: Installed");
                }
                else if (registration.active) {
                    console.log("Service Worker: Active");
                }
            }
            catch (error) {
                console.error(`Service Worker: Registration failed with ${error}`);
            }
        }
    };
}
