export type Metadata = {
    name: string;
    version: string;
};
export declare class Cache {
    app: any;
    constructor(app: Metadata);
    /**
     * @returns {string} The name of the cache
     * @description Returns the name of the cache
     */
    get name(): string;
    match: (request: any) => Promise<void | Response>;
    put: (request: any, response: any) => Promise<void>;
}
