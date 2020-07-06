/**
 * Created by SmilingXinyi <smilingxinyi@gmail.com> on 2020/6/2
 */

import querystring from 'query-string';
import HyperthymesiaInstance, {HyperthymesiaOptions, Level, State, Type} from './interfaces';
import {parseCookie, parsePerformance, parseUserAgent} from './parse';
import {genFingerID, genRandomInt} from './utils';

export default class Hyperthymesia implements HyperthymesiaInstance {
    static instance: Hyperthymesia;

    private sysInfo: any;
    private targetUrl: string;
    private cacheList: any[];
    private initialized: boolean;

    public static getInstance(opts: HyperthymesiaOptions): Hyperthymesia {
        if (!this.instance) {
            this.instance = new this(opts);
        }
        return this.instance;
    }

    constructor(opts: HyperthymesiaOptions) {
        const {
            targetUrl, id, cookieKeys, queryKeys
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
            id,
            lid : jsonQuery.lid || Date.now().toString() + genRandomInt(100000, 999999)
        };

        cookieKeys.forEach(ckey => sysInfo[`c_${ckey.toLowerCase()}`] = jsonCookie[ckey]);
        queryKeys.forEach(qkey => sysInfo[`q_${qkey.toLowerCase()}`] = jsonQuery[qkey]);

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

    private async initial(info: any) {
        this.sysInfo.fin2 = await genFingerID();
        this.initialized = true;
        this.log('init', Type.Process, State.Loaded, {
            ...info
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

    private send(lv: Level, id: string | number, data: any, t: Type = Type.Action, s: State = State.Load, skipCache?: boolean): void {
        if (this.initialized) {
            if (!skipCache && this.cacheList.length > 0) {
                // @ts-ignore
                if (window.requestIdleCallback) {
                    // @ts-ignore
                    window.requestIdleCallback(() => this.send.apply(this, [...this.cacheList.shift(), true]))
                }
                else {
                    // @ts-ignore
                    setTimeout(() => this.send.apply(this, [...this.cacheList.shift(), true]), 0)
                }
            }
        }
        else {
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

export {Level, State, Type} from './interfaces';
