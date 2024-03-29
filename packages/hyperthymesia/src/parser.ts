/**
 * Created by SmilingXinyi <smilingxinyi@gmail.com> on 2020/6/2
 */

/**
 * Cookie parsing
 * @param cookie
 */
export function parseCookie(cookie: string): any {
    const cookieStr = cookie.toLowerCase();
    const jsonCookie: any = {};
    cookieStr.split(';').forEach(item => {
        try {
            // @ts-ignore
            const [_, key, value] = item.match(/^(.+?)=([^;]*)/i);
            jsonCookie[key.trim()] = value.trim();
        } catch (e) {
            return null;
        }
    });
    return jsonCookie;
}

/**
 * User-Agent parsing
 * @param userAgent
 */
export function parseUserAgent(userAgent: string): any {
    const userAgentStr = userAgent.toLowerCase();
    let os;
    let
        browser;
    if (userAgentStr.indexOf('windows phone') >= 0) {
        os = 'Windows Phone';
    } else if (userAgentStr.indexOf('windows') >= 0 || userAgentStr.indexOf('win16') >= 0
        || userAgentStr.indexOf('win32') >= 0 || userAgentStr.indexOf('win64') >= 0
        || userAgentStr.indexOf('win95') >= 0 || userAgentStr.indexOf('win98') >= 0
        || userAgentStr.indexOf('winnt') >= 0 || userAgentStr.indexOf('wow64') >= 0) {
        os = 'Windows';
    } else if (userAgentStr.indexOf('android') >= 0) {
        os = 'Android';
    } else if (userAgentStr.indexOf('linux') >= 0 || userAgentStr.indexOf('cros') >= 0
        || userAgentStr.indexOf('x11') >= 0) {
        os = 'Linux';
    } else if (userAgentStr.indexOf('iphone') >= 0 || userAgentStr.indexOf('ipad') >= 0
        || userAgentStr.indexOf('ipod') >= 0 || userAgentStr.indexOf('crios') >= 0
        || userAgentStr.indexOf('fxios') >= 0) {
        os = 'iOS';
    } else if (userAgentStr.indexOf('macintosh') >= 0 || userAgentStr.indexOf('mac_powerpc)') >= 0) {
        os = 'Mac';
    } else {
        os = 'Other';
    }

    if (userAgentStr.indexOf('edge/') >= 0 || userAgentStr.indexOf('iemobile/') >= 0) {
        browser = 'EDGE';
    } else if (userAgentStr.indexOf('opera mini') >= 0) {
        browser = 'OPERA';
    } else if (userAgentStr.indexOf('firefox/') >= 0) {
        browser = 'Firefox';
    } else if (userAgentStr.indexOf('opera/') >= 0 || userAgentStr.indexOf(' opr/') >= 0) {
        browser = 'Opera';
    } else if (userAgentStr.indexOf('chrome/') >= 0) {
        browser = 'Chrome';
    } else if (userAgentStr.indexOf('safari/') >= 0) {
        if (userAgentStr.indexOf('android 1.') >= 0 || userAgentStr.indexOf('android 2.') >= 0
            || userAgentStr.indexOf('android 3.') >= 0 || userAgentStr.indexOf('android 4.') >= 0) {
            browser = 'AOSP';
        } else {
            browser = 'Safari';
        }
    } else if (userAgentStr.indexOf('trident/') >= 0) {
        browser = 'Internet Explorer';
    } else {
        browser = 'Other';
    }

    let mobileDevice = false;
    if (window) {
        mobileDevice = (('ontouchstart' in window)
            || (navigator.maxTouchPoints > 0)
            || (navigator.msMaxTouchPoints > 0));
    }


    return {
        os,
        browser,
        mobileDevice
    };
}

/**
 * Performance parsing
 * @param perf
 */
export function parsePerformance(perf: any): any {
    try {
        const {responseStart} = perf;
        const {responseEnd} = perf;

        return {
            ft: responseEnd - perf.fetchStart,
            wt: perf.workerStart > 0 ? responseEnd - perf.workerStart : 0,
            tt: responseEnd - perf.requestStart,
            dt: responseEnd - responseStart,
            ttfb: responseStart - perf.requestStart,
            hs: Math.abs(perf.transferSize - perf.encodedBodySize || 0),
            dns: perf.domainLookupEnd - perf.domainLookupStart
        };
    } catch (e) {
        return {};
    }
}

type MatchItem = {
    key: string,
    index: number
}

type MathResultItem = {
    [key: string]: string
}

/**
 * URL Pathname Parsing
 * @param schema
 * @param pathname
 */
export function parsePathname(schema: string, pathname: string): any {
    if (!schema.startsWith('/', 0)) {
        throw 'schema dose not start with "/"';
    }

    if (!pathname.startsWith('/', 0)) {
        throw 'pathname dose not start with "/"';
    }

    const pathArr = pathname.split('/').slice(1);
    const schemaArr = schema.split('/').slice(1);

    const matchList = schemaArr.reduce((accumulator, current, index) => {
        if (current.startsWith(':', 0)) {
            accumulator.push({
                key: current.slice(1),
                index
            })
        }
        return accumulator;
    }, [] as Array<MatchItem>);

    // @ts-ignore
    const params = matchList.reduce((accumulator, current) => {
        accumulator[current.key] = pathArr[current.index]
        return accumulator;
    }, {} as MathResultItem);

    return params;
}
