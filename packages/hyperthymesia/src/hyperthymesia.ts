/**
 * Created by SmilingXinyi <smilingxinyi@gmail.com> on 2020/6/2
 */

import querystring from 'query-string';
import {HyperthymesiaOptions, Level} from './types';
import HyperthymesiaInstance from './interfaces';
import {parseCookie, parsePathname, parsePerformance, parseUserAgent} from './parser';

import {genFingerID, genRandomInt} from './utils';

export default class Hyperthymesia implements HyperthymesiaInstance {
    /**
     * Instance
     */
    static instance: Hyperthymesia;

    /**
     * System infomations
     */
    private readonly sysInfo: any;

    /**
     * Log cache list
     */
    private cacheList: any[];

    /**
     * Service is initialized
     */
    private initialized: boolean;

    /**
     * Default arguments
     */
    private defaultArgs: any;

    /**
     * Normal log
     */
    private readonly targetUrl: string;

    /**
     * Warning log
     */
    private targetUrl4Warning: string;

    /**
     * Failed log
     */
    private targetUrl4Failed: string;

    /**
     * Service initial and get instance
     * @param {Hyperthermia} opts - options
     */
    public static getInstance(opts: HyperthymesiaOptions): Hyperthymesia {
        if (!this.instance) {
            this.instance = new this(opts);
        }
        return this.instance;
    }

    /**
     * Constructor
     * @param opts
     */
    constructor(opts: HyperthymesiaOptions) {
        const {
            targetUrl, targetUrl4Warning, targetUrl4Failed,
            pid, cookieKeys, queryKeys, pathnameKeys, defaultArgs
        } = opts;
        const {search: query, href, pathname} = window.location;
        const {userAgent, platform, language} = navigator;
        const {cookie} = document;
        let initialPerformance;
        try {
            initialPerformance = performance.getEntriesByType('navigation')[0]
        } catch (e) {
            initialPerformance = null;
        }
        const jsonCookie = parseCookie(cookie);
        const jsonUA = parseUserAgent(userAgent);
        const jsonPerf = parsePerformance(initialPerformance);
        const jsonQuery = querystring.parse(query);

        this.targetUrl = targetUrl;
        this.targetUrl4Warning = targetUrl4Warning || targetUrl;
        this.targetUrl4Failed = targetUrl4Failed || targetUrl;
        this.cacheList = [];
        this.initialized = false;
        this.defaultArgs = defaultArgs;


        const deviceInfo: any = {}

        try {
            deviceInfo.sx = window.screen.availWidth;
            deviceInfo.sh = window.screen.availHeight;
            deviceInfo.px = window.pageXOffset;
            deviceInfo.py = window.pageYOffset;
            deviceInfo.dr = window.devicePixelRatio;
        } catch (err) {
            console.warn(err);
        }

        const sysInfo: any = {
            lid: jsonQuery.lid || Date.now().toString() + genRandomInt(100000, 999999),
            pid: pid.toString()
        };

        if (cookieKeys) {
            cookieKeys.forEach(ckey =>
                sysInfo[`c_${ckey.toLowerCase()}`] = jsonCookie[ckey.toLowerCase()]);
        }

        if (queryKeys) {
            queryKeys.forEach(qkey =>
                sysInfo[`q_${qkey.toLowerCase()}`] = jsonQuery[qkey.toLowerCase()]);
        }

        if (pathnameKeys) {
            pathnameKeys.fields.forEach(field =>
                sysInfo[`p_${field.toLowerCase()}`] = parsePathname(pathnameKeys.schema, pathname)[field]);
        }

        this.sysInfo = {...sysInfo};

        const initialInfo = {
            href,
            platform,
            language,
            ...jsonUA,
            deviceInfo,
            perf: jsonPerf
        };

        this.initial(initialInfo);
    }

    /**
     * Initialization
     * @param info - initialization log infomation
     */
    private async initial(info: any) {
        try {
            this.sysInfo.fin2 = await genFingerID();
        } catch (err) {
            console.warn(err);
        }
        this.initialized = true;
        this.log(10000, {
            ...info
        });
    }

    /**
     * Normal log
     * @param id - log ID
     * @param data - payload data
     */
    log(id: number, data: any = null): void {
        this.send(Level.Log, id, data);
    }

    /**
     * Warning log
     * @param id - log ID
     * @param data - payload data
     */
    warn(id: number, data: any = null): void {
        this.send(Level.Warn, id, data);
    }

    /**
     * Failure log
     * @param id - log ID
     * @param data - payload data
     */
    error(id: number, data: any = null): void {
        this.send(Level.Error, id, data);
    }

    /**
     * Send log
     * @param lv - log level
     * @param id - log ID
     * @param data - data
     * @param skipCache - ~~wait for initialization to complete and start send cachelist~~
     */
    private send(
        lv: Level,
        id: string | number,
        data: any,
        skipCache?: boolean
    ): void {
        if (this.initialized) {
            if (!skipCache && this.cacheList.length > 0) {
                // @ts-ignore
                if (window.requestIdleCallback) {
                    // @ts-ignore
                    window.requestIdleCallback(() => this.send.apply(this, [...this.cacheList.shift(), true]))
                } else {
                    // @ts-ignore
                    setTimeout(() => this.send.apply(this, [...this.cacheList.shift(), true]), 0)
                }
            }
        } else {
            this.cacheList.push(arguments);
            return;
        }

        let target = this.targetUrl;

        if (lv === Level.Warn) {
            target = this.targetUrl4Warning
        } else if (lv === Level.Error) {
            target = this.targetUrl4Failed
        }

        const payload: any = {
            lv,
            id,
            d: Date.now(),
            i: JSON.stringify(this.sysInfo),
            o: JSON.stringify(this.defaultArgs)
        };

        if (data) {
            payload.p = JSON.stringify(data);
        }

        const img = new Image();
        const timer = setTimeout(() => {
            img.src = `${target}?${
                querystring.stringify(
                    payload, {
                        skipEmptyString: true
                    }
                )
            }`;
        }, 0);

        img.onload = img.onerror = img.onabort = () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }
}
