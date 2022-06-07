/**
 * Created by SmilingXinyi <smilingxinyi@gmail.com> on 2020/6/2
 */

/**
 * Log level
 */
export enum Level {
    Log,
    Warn,
    Error
}

/**
 * The URL pathname schema
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
     * Product ID
     */
    pid: string | number;

    /**
     * Pathname for log likes '/v.gif'
     */
    targetUrl: string;

    /**
     * Pathname for warning
     */
    targetUrl4Warning?: string;

    /**
     * Pathname for fail
     */
    targetUrl4Failed?: string;

    /**
     * Required cookie fields
     */
    cookieKeys?: string[];

    /**
     * Required query fields
     */
    queryKeys?: string[];

    /**
     * Required params of pathname schema
     */
    pathnameKeys?: pathnameSchema;

    /**
     * Default arguments
     */
    defaultArgs?: {[key: string]: string | number | boolean};
}
