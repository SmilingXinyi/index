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
