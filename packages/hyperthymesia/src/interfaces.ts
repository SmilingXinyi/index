/**
 * Created by SmilingXinyi <smilingxinyi@gmail.com> on 2020/6/2
 */

export enum Type {
    Action,
    Process,
    Error
}

export enum State {
    Load,
    Loaded,
    Loading,
    Faild,
    Cancel
}

export enum Level {
    Log,
    Warn,
    Error
}

export interface HyperthymesiaOptions {
    /**
     * Request url likes '/v.gif'
     */
    targetUrl: string;

    /**
     * Product ID
     */
    id: string,

    /**
     * Required cookie fields
     */
    cookieKeys: string[];

    /**
     * Require query fields
     */
    queryKeys: string[];
}

export default interface HyperthymesiaInterface {
    log(id: string | number, t: Type, s: State, data: any): void;
    warn(id: string | number, t: Type, s: State, data: any): void;
    error(id: string | number, t: Type, s: State, data: any): void;
}
