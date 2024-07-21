export declare class ServiceWorker {
    private path;
    private options;
    private registration;
    constructor(path: string, options: RegistrationOptions);
    register: (worker: any, options: any) => Promise<void>;
    private setupListeners;
    private logRegistrationState;
}
