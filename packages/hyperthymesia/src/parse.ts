
export function parseCookie(cookie: string) {
    const cookieStr = cookie.toLowerCase();
    const jsonCookie: any = {};
    cookieStr.split(';').forEach(item => {
        try {
            // @ts-ignore
            const [ori, key, value] = item.match(/^(.+?)=([^;]*)/i);
            jsonCookie[key.trim()] = value.trim();
        } catch (e) {
            return null;
        }
    });
    return jsonCookie;
}

export function parseUserAgent(userAgent: string) {
    const userAgentStr = userAgent.toLowerCase();
    let os; let
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
        // Unreliable, different versions use EdgeHTML, Webkit, Blink, etc.
        browser = 'EDGE';
    } else if (userAgentStr.indexOf('opera mini') >= 0) {
        // Unreliable, different modes use Presto, WebView, Webkit, etc.
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

    const mobileDevice = (('ontouchstart' in window)
        || (navigator.maxTouchPoints > 0)
        || (navigator.msMaxTouchPoints > 0));

    return {
        os,
        browser,
        mobileDevice
    };
}

export function parsePerformance(perf: any) {
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
    }
    catch (e) {
        return {};
    }

}
