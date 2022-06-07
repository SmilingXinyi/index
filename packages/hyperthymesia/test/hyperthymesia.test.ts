/**
 * Created by SmilingXinyi <smilingxinyi@gmail.com> on 2020/9/27
 */

import Hyperthymesia from '../src/hyperthymesia';

describe('Hyperthymesia initialization', () => {
    test('should return new instance', () => {
        const targetUrl = 'http://192.168.1.1/v.gif';

        const h = Hyperthymesia.getInstance({
            targetUrl,
            pid: 1
        });

        expect(h).toHaveProperty('targetUrl', targetUrl);
    });

    test('should return a new instance with sysInfo have pathname params', () => {
        const targetUrl = 'http://192.168.1.1/v.gif';

        const h = new Hyperthymesia({
            targetUrl,
            pid: 1,
            pathnameKeys: {
                fields: ['name', 'branch'],
                schema: '/test/:name/blob/:branch/index.js'
            }
        });

        expect(h).toHaveProperty('sysInfo');

        // @ts-ignore
        expect(h.sysInfo).toHaveProperty('p_name');
        // @ts-ignore
        expect(h.sysInfo).toHaveProperty('p_branch');
    });
});

test('The Hyperthymesia log feature', () => {
    const targetUrl = 'http://192.168.1.1/v.gif';

    const h = Hyperthymesia.getInstance({
        targetUrl,
        pid: 1
    });
});
