export type Metadata = {
    name: string;
    version: string;
};
export declare class Cache {
    private app;
    constructor(app: Metadata);
    get name(): string;
    private match;
    private put;
    private insert;
    private fetch;
    private getInvalid;
    private removeInvalid;
    private validateProtocol;
    private sendUpdateMessage;
    notify: (clients: any) => void;
    create: () => Promise<void>;
    update: () => Promise<void | any[]>;
    get: (request: any) => Promise<any>;
}
