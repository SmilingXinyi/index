/**
 * Created by SmilingXinyi <smilingxinyi@gmail.com> on 2020/6/2
 */

import querystring from 'query-string';
import {
    HyperthymesiaOptions, Level, State, Type
} from './types';
import HyperthymesiaInstance from './interfaces';
import {parseCookie, parsePerformance, parseUserAgent} from './parse';
import {genFingerID, genRandomInt} from './utils';

export {State, Type} from './types';

export default class Hyperthymesia implements HyperthymesiaInstance {
    /**
     * Instance
     */
    static instance: Hyperthymesia;

    /**
     * System infomations
     */
    private sysInfo: any;

    /**
     * Log server url
     */
    private targetUrl: string;

    /**
     * Log cache list
     */
    private cacheList: any[];

    /**
     * Service is initialized
     */
    private initialized: boolean;

    /**
     * Service initial and get instance
     * @param opts
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
            targetUrl, pid, cookieKeys, queryKeys
        } = opts;
        const {search: query, href} = window.location;
        const {userAgent, platform, language} = navigator;
        const {cookie} = document;
        const initialPerformance = performance.getEntriesByType('navigation')[0];
        const jsonCookie = parseCookie(cookie);
        const jsonUA = parseUserAgent(userAgent);
        const jsonPerf = parsePerformance(initialPerformance);
        const jsonQuery = querystring.parse(query);

        this.targetUrl = targetUrl;
        this.cacheList = [];
        this.initialized = false;

        const sysInfo: any = {
            lid: jsonQuery.lid || Date.now().toString() + genRandomInt(100000, 999999),
            pid
        };

        if (cookieKeys) {
            cookieKeys.forEach(ckey => sysInfo[`c_${ckey.toLowerCase()}`] = jsonCookie[ckey.toLowerCase()]);
        }

        if (queryKeys) {
            queryKeys.forEach(qkey => sysInfo[`q_${qkey.toLowerCase()}`] = jsonQuery[qkey.toLowerCase()]);
        }

        this.sysInfo = {...sysInfo};

        const initialInfo = {
            href,
            platform,
            language,
            ...jsonUA,
            perf: jsonPerf
        };

        this.initial(initialInfo);
    }

    /**
     * Initialization
     * @param info - initialization log infomation
     */
    private async initial(info: any) {
        this.sysInfo.fin2 = await genFingerID();
        this.initialized = true;
        this.log('init', Type.Process, State.Loaded, {
            ...info
        });
    }

    /**
     * Normal log
     * @param id - log ID
     * @param t - log type
     * @param s - log state
     * @param data - payload data
     */
    log(id: string | number, t: Type, s: State, data: any = null): void {
        if (arguments.length === 2 && typeof t !== 'number') {
            return this.send(Level.Log, id, t);
        }
        this.send(Level.Log, id, data, t, s);
    }

    /**
     * Warning log
     * @param id - log ID
     * @param t - log type
     * @param s - log state
     * @param data - payload data
     */
    warn(id: string | number, t: Type, s: State, data: any = null): void {
        if (arguments.length === 2 && typeof t !== 'number') {
            return this.send(Level.Warn, id, t);
        }
        this.send(Level.Warn, id, data, t, s);
    }

    /**
     * Failure log
     * @param id - log ID
     * @param t - log type
     * @param s - log state
     * @param data - payload data
     */
    error(id: string | number, t: Type, s: State, data: any = null): void {
        if (arguments.length === 2 && typeof t !== 'number') {
            return this.send(Level.Error, id, t);
        }
        this.send(Level.Error, id, data, t, s);
    }

    /**
     * Send log
     * @param lv - log level
     * @param id - log ID
     * @param data - data
     * @param t - log type
     * @param s - log state
     * @param skipCache - ~~wait for initialization to complete and start send cachelist~~
     */
    private send(
        lv: Level,
        id: string | number,
        data: any,
        t: Type = Type.Action,
        s: State = State.Load,
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

        const target = this.targetUrl;

        const payload: any = {
            lv,
            id,
            t,
            s,
            d: Date.now(),
            i: JSON.stringify(this.sysInfo)
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
