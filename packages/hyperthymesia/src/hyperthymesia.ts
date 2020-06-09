/**
 * Created by SmilingXinyi <smilingxinyi@gmail.com> on 2020/6/2
 */

import querystring from 'query-string';
import HyperthymesiaInstance, {
    HyperthymesiaOptions, Level, State, Type
} from './interfaces';
import {parseCookie, parsePerformance, parseUserAgent} from './parse';

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

        const sysInfo: any = {
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

        this.log('1', Type.Process, State.Loaded, {
            ...initialInfo
        });
    }

    log(id: string | number, t: Type, s: State, data: any = null): void {
        if (arguments.length === 2 && typeof t !== 'number') {
            return this.send(Level.Log, id, t);
        }
        this.send(Level.Log, id, data, t, s);
    }

    warn(id: string | number, t: Type, s: State, data: any = null): void {
        if (arguments.length === 2 && typeof t !== 'number') {
            return this.send(Level.Warn, id, t);
        }
        this.send(Level.Warn, id, data, t, s);
    }

    error(id: string | number, t: Type, s: State, data: any = null): void {
        if (arguments.length === 2 && typeof t !== 'number') {
            return this.send(Level.Error, id, t);
        }
        this.send(Level.Error, id, data, t, s);
    }

    /**
     *
     * @param lv - log level
     * @param id - log id
     * @param data - data
     * @param t - log type
     * @param s - log state
     */
    private send(lv: Level, id: string | number, data: any, t: Type = Type.Action, s: State = State.Load): void {
        const target = this.targetUrl;

        const payload: any = {
            lv,
            id,
            t,
            s,
            d: Date.now(),
            i: encodeURIComponent(JSON.stringify(this.sysInfo))
        };

        if (data) {
            payload.p = encodeURIComponent(JSON.stringify(data));
        }

        const img = new Image();
        const timer = setTimeout(() => {
            img.src = `${target}?${Object.keys(payload).map(key => `${key}=${payload[key]}`).join('&')}`;
        }, 0);

        img.onload = img.onerror = img.onabort = () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }
}

export {State, Type} from './interfaces';
