export type Metadata = {
    name: string;
    version: string;
};
import { Cache } from "./Cache.js";
export declare class Storage {
    private app;
    cache: Cache;
    constructor(app: any);
    private getInvalid;
    private sendUpdateMessage;
    notify: (clients: any) => void;
    private keys;
    private delete;
    private stale;
    create: () => Promise<void>;
    private validateProtocol;
    private insert;
    private fetch;
    update: () => Promise<void | any[]>;
    get: (request: any) => Promise<any>;
}
