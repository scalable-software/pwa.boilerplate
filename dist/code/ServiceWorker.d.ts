export declare class ServiceWorker {
    private path;
    private options;
    private registration;
    constructor(path: string, options: RegistrationOptions);
    register: () => Promise<void>;
    private setupListeners;
    private logRegistrationState;
    private updateNotice;
}
