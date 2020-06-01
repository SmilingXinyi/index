import conf from 'config';

function hyperthymesia() {
    const isBrowser = typeof window !== 'undefined';
    const ua = parseUserAgent(navigator.userAgent.toLowerCase());
    const jsonCookie = parseCookie(document.cookie);
    const platform = navigator.platform.toLowerCase();
    const prod = '';

    const language = navigator.language;
    const href = location.href;

    // cookie string list  -  example : user
    // channel


    // get conf
}

const parseCookie = cookie => {
    const jsonCookie = {};
    cookie.split(';').forEach(item => {
        const [_, key, value] = item.match(/^(.+?)=([^;]*)/i);
        jsonCookie[key.trim()] = value.trim();
    });
    return jsonCookie;
};

const parseUserAgent = userAgent => {
    let os, oscpu, browser;
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

    var mobileDevice = (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));

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

    console.log(mobileDevice);
    console.log(os, oscpu, browser);

    // 正则解析式
};

const parsePerformance = n => {
    const responseStart = n.responseStart;
    const responseEnd = n.responseEnd;

    return {
        fetchTime: responseEnd - n.fetchStart,
        workerTime: n.workerStart > 0 ? responseEnd - n.workerStart : 0,
        totalTime: responseEnd - n.requestStart,
        downloadTime: responseEnd - responseStart,
        timeToFirstByte: responseStart - n.requestStart,
        headerSize: Math.abs(n.transferSize - n.encodedBodySize || 0),
        dnsLookupTime: n.domainLookupEnd - n.domainLookupStart
    };
};

// 类型 0用户操作，1流程日志，2错误日志
// 操作通过平台配置 string | number:
// 状态 0 用户触发  1 loaded 2 loading faild 3 loading 4 cancel


const info = (type = 0, id, state = 0, data) => {
    send(0, type, id, state, data);
};  // 普通日志
const warn = (type = 0, id, state = 0, data) => {
    send(1, type, id, state, data);
};  // 时/日 警告通知
const error = (type = 0, id, state = 0, data) => {
    send(2, type, id, state, data);
}; // 秒发秒记录秒通知

// data 独立处理
const send = (level, type, id, state, data) => {
    const {target, } = config;

    const payload = {};
    payload.t = Date.now();



    var req = window[id] = new Image();
    let url = url || self.baseURL;
    req.onload = req.onerror = req.onabort = function () {
        window[id] = null;
        if (timer) {
            clearTimeout(timer);
            timer = null;
            callback && callback();
            self.__sendAfrHook && self.__sendAfrHook(pobj, false);
        }
    };

    // new Image()
};


module.exports = {
    hyperthymesia,
    parseCookie,
    parseUserAgent,
    parsePerformance
};
