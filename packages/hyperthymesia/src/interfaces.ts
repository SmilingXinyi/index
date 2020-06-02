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
    Info,
    Log,
    Warn,
    Error
}

export default interface HyperthymesiaInterface {
    log(id: string, t: Type, s: State): void;

    warn(id: string, t: Type, s: State): void;

    error(id: string, t: Type, s: State): void;

    info(id: string, data: any, t: Type, s: State): void;
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
