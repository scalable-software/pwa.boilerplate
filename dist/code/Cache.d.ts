export declare class Cache {
    private app;
    constructor(app: {
        name: string;
        version: string;
    });
    get name(): string;
    private cache;
    private fetch;
    private delete;
    create: () => Promise<void>;
    clean: () => Promise<any[]>;
    use: (event: any) => Promise<any>;
}
