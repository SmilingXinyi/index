import querystring from 'query-string';
import HyperthymesiaInstance, {HyperthymesiaOptions, Level, State, Type} from './interfaces';

export default class Hyperthymesia implements HyperthymesiaInstance {
    static instance: Hyperthymesia;
    private sysInfo: any;
    private targetUrl: string;

    public static getInstance(opts: HyperthymesiaOptions): Hyperthymesia {
        if (!this.instance) {
            this.instance = new this(opts);
        }
        return this.instance;
    }

    constructor(opts: HyperthymesiaOptions) {
        const {targetUrl, id, cookieKeys, queryKeys} = opts;
        const {search: query, href} = location;
        const {userAgent, platform, language} = navigator;
        const {cookie} = document;
        const initialPerformance = performance.getEntriesByType('navigation')[0];
        const jsonCookie = this.parseCookie(cookie);
        const jsonUA = this.parseUserAgent(userAgent);
        const jsonPerf = this.parsePerformance(initialPerformance);
        const jsonQuery = querystring.parse(query);

        this.targetUrl = targetUrl;

        const sysInfo: any = {
            id
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

        this.info('init', {
            ...sysInfo,
            ...initialInfo
        });
    }

    parseCookie(cookie: string) {
        cookie = cookie.toLowerCase();
        const jsonCookie: any = {};
        cookie.split(';').forEach(item => {
            try {
                // @ts-ignore
                const [ori, key, value] = item.match(/^(.+?)=([^;]*)/i);
                jsonCookie[key.trim()] = value.trim();
            }
            catch (e) {
                return null;
            }
        });
        return jsonCookie;
    }

    parseUserAgent(userAgent: string) {
        userAgent = userAgent.toLowerCase();
        let os, browser;
        if (userAgent.indexOf('windows phone') >= 0) {
            os = 'Windows Phone';
        } else if (userAgent.indexOf('windows') >= 0 || userAgent.indexOf('win16') >= 0 || userAgent.indexOf('win32') >= 0 || userAgent.indexOf('win64') >= 0 || userAgent.indexOf('win95') >= 0 || userAgent.indexOf('win98') >= 0 || userAgent.indexOf('winnt') >= 0 || userAgent.indexOf('wow64') >= 0) {
            os = 'Windows';
        } else if (userAgent.indexOf('android') >= 0) {
            os = 'Android';
        } else if (userAgent.indexOf('linux') >= 0 || userAgent.indexOf('cros') >= 0 || userAgent.indexOf('x11') >= 0) {
            os = 'Linux';
        } else if (userAgent.indexOf('iphone') >= 0 || userAgent.indexOf('ipad') >= 0 || userAgent.indexOf('ipod') >= 0 || userAgent.indexOf('crios') >= 0 || userAgent.indexOf('fxios') >= 0) {
            os = 'iOS';
        } else if (userAgent.indexOf('macintosh') >= 0 || userAgent.indexOf('mac_powerpc)') >= 0) {
            os = 'Mac';
        } else {
            os = 'Other';
        }

        if (userAgent.indexOf('edge/') >= 0 || userAgent.indexOf('iemobile/') >= 0) {
            // Unreliable, different versions use EdgeHTML, Webkit, Blink, etc.
            browser = 'EDGE';
        } else if (userAgent.indexOf('opera mini') >= 0) {
            // Unreliable, different modes use Presto, WebView, Webkit, etc.
            browser = 'OPERA'
        } else if (userAgent.indexOf('firefox/') >= 0) {
            browser = 'Firefox';
        } else if (userAgent.indexOf('opera/') >= 0 || userAgent.indexOf(' opr/') >= 0) {
            browser = 'Opera';
        } else if (userAgent.indexOf('chrome/') >= 0) {
            browser = 'Chrome';
        } else if (userAgent.indexOf('safari/') >= 0) {
            if (userAgent.indexOf('android 1.') >= 0 || userAgent.indexOf('android 2.') >= 0 || userAgent.indexOf('android 3.') >= 0 || userAgent.indexOf('android 4.') >= 0) {
                browser = 'AOSP';
            } else {
                browser = 'Safari';
            }
        } else if (userAgent.indexOf('trident/') >= 0) {
            browser = 'Internet Explorer';
        } else {
            browser = 'Other';
        }

        let mobileDevice = (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));

        return {
            os,
            browser,
            mobileDevice
        }
    }

    parsePerformance(perf: any) {
        const responseStart = perf.responseStart;
        const responseEnd = perf.responseEnd;

        return {
            ft: responseEnd - perf.fetchStart,
            wt: perf.workerStart > 0 ? responseEnd - perf.workerStart : 0,
            tt: responseEnd - perf.requestStart,
            dt: responseEnd - responseStart,
            ttfb: responseStart - perf.requestStart,
            hs: Math.abs(perf.transferSize - perf.encodedBodySize || 0),
            dns: perf.domainLookupEnd - perf.domainLookupStart
        };
    };


    log(id: string, t: Type = Type.Action, s: State = State.Load): void {
        this.send(Level.Log, id, null, t, s);
    }

    warn(id: string, t: Type = Type.Action, s: State = State.Load): void {
        this.send(Level.Warn, id, null, t, s);
    }

    error(id: string, t: Type = Type.Action, s: State = State.Load): void {
        this.send(Level.Error, id, null, t, s);
    }

    info(id: string | number, data: any, t: Type = Type.Action, s: State = State.Load): void {
        this.send(Level.Info, id, data, t, s);
    }

    private send(lv: Level, id: string | number, data: any, t: Type, s: State): void {
        const target = this.targetUrl;

        const payload: any = {
            lv,
            id,
            t,
            s,
            n: Date.now()
        };

        if (data) {
            payload.data = encodeURIComponent(JSON.stringify(data));
        }

        const img = new Image();
        const timer = setTimeout(() => {
            img.src = target + '?' + Object.keys(payload).map(key => `${key}=${payload[key]}`).join('&');
        }, 0);

        img.onload = img.onerror = img.onabort = function(){
            if (timer) {
                clearTimeout(timer);
            }
        };
    }
}
