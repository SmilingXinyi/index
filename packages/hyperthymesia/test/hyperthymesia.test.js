const {hyperthymesia, parseCookie, parseUserAgent, parsePerformance} = require('..');

describe('hyperthymesia', () => {
    test('demo', () => {
        const mockCookie =
            'BIDUPSID=1A9AC15D9AC7225B615572E279E36C5F; ' +
            'PSTM=1591000453; ' +
            'BAIDUID=1A9AC15D9AC7225B86EDA3626669C8C9:FG=1; ' +
            'BD_HOME=1; ' +
            'H_PS_PSSID=31354_1456_31672_21102_31069_31660_31463_31322_30824_26350; ' +
            'BD_UPN=123253';
        const jsonCookie = parseCookie(mockCookie);
        console.log(jsonCookie);
    })

    test('demo2', () => {
        console.log(navigator.userAgent);

        parseUserAgent(navigator.userAgent);

        // chrome useragent
        // Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36

        // safari
        // Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Safari/605.1.15

        // firefox
        // Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:66.0) Gecko/20100101 Firefox/66.0

        // jsdom
        // Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/16.2.2
    });

    test('demo3', () => {
        console.log(parsePerformance(
            JSON.parse(
                "{\"name\":\"https://www.infoq.cn/article/html5-performance-api-monitoring\",\"entryType\":\"navigation\",\"startTime\":0,\"duration\":2652.3999999990338,\"initiatorType\":\"navigation\",\"nextHopProtocol\":\"http/1.1\",\"workerStart\":0,\"redirectStart\":0,\"redirectEnd\":0,\"fetchStart\":4.649999998946441,\"domainLookupStart\":4.649999998946441,\"domainLookupEnd\":4.649999998946441,\"connectStart\":4.649999998946441,\"connectEnd\":4.649999998946441,\"secureConnectionStart\":0,\"requestStart\":20.454999998037238,\"responseStart\":20.764999997481937,\"responseEnd\":22.720000000845175,\"transferSize\":0,\"encodedBodySize\":2056,\"decodedBodySize\":5070,\"serverTiming\":[],\"workerTiming\":[],\"unloadEventStart\":0,\"unloadEventEnd\":0,\"domInteractive\":240.12500000026193,\"domContentLoadedEventStart\":240.1350000000093,\"domContentLoadedEventEnd\":247.40999999994528,\"domComplete\":2652.299999997922,\"loadEventStart\":2652.330000000802,\"loadEventEnd\":2652.3999999990338,\"type\":\"back_forward\",\"redirectCount\":0}"
            )
        ))
    });
});
