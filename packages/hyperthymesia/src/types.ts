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
 * The URL pathanme schema
 */
type pathnameSchema = {
    fields: string[],
    schema: string
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
    pid: string | number,

    /**
     * Required cookie fields
     */
    cookieKeys?: string[];

    /**
     * Required query fields
     */
    queryKeys?: string[];

    /**
     * Required params of pathname schmea
     */
    pathnameKeys?: pathnameSchema;
}
