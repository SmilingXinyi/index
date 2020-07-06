/**
 * Created by SmilingXinyi <smilingxinyi@gmail.com> on 2020/6/2
 */

/**
 * Log type
 */
export enum Type {
    Action,
    Process,
    Error
}

/**
 * Action state
 */
export enum State {
    Load,
    Loaded,
    Loading,
    Faild,
    Cancel
}

/**
 * Log level
 */
export enum Level {
    Log,
    Warn,
    Error
}

/**
 * Options
 */
export interface HyperthymesiaOptions {
    /**
     * Request url likes '/v.gif'
     */
    targetUrl: string;

    /**
     * Product ID
     */
    pid: string,

    /**
     * Required cookie fields
     */
    cookieKeys?: string[];

    /**
     * Require query fields
     */
    queryKeys?: string[];
}

export default interface HyperthymesiaInterface {

    /**
     * Send 'log' level logs
     * @param id - log id
     * @param t - log type
     * @param s - log state
     * @param data - data
     */
    log(id: string | number, t: Type, s: State, data: any): void;

    /**
     * Send 'warn' level logs
     * @param id - log id
     * @param t - log type
     * @param s - log state
     * @param data - data
     */
    warn(id: string | number, t: Type, s: State, data: any): void;

    /**
     * Send 'error' level logs
     * @param id - log id
     * @param t - log type
     * @param s - log state
     * @param data - data
     */
    error(id: string | number, t: Type, s: State, data: any): void;
}
