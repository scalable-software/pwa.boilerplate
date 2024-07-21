export declare class Cache {
    static create: (app: any) => Promise<void>;
    static delete: (keys: any, app: any) => Promise<any[]>;
    static clean: (app: any) => Promise<any[]>;
    static update: (request: any, app: any) => Promise<Response>;
    static use: (request: any, app: any) => Promise<Response>;
}