/**
 * Created by SmilingXinyi <smilingxinyi@gmail.com> on 2020/6/2
 */

import {parsePathname} from '../src/parser';

type testParamsType = {
    name: string;
    branch: string;
}

describe('Parse the pathname of the url', () => {
    const schema = '/test/:name/blob/:branch/index.js';
    const pathname = '/test/path-parse/blob/master/index.js';

    test('should return schema params', () => {
        const params: testParamsType = parsePathname(schema, pathname);
        expect(params).toHaveProperty('name', 'path-parse');
        expect(params).toHaveProperty('branch', 'master');
    });

    test('should return an error that the pathname is incorrect', () => {
        expect(() => parsePathname(schema, pathname.slice(1))).toThrowError(`pathname dose not start with "/"`)
    });

    test('should return an error that the schema is incorrect', () => {
        expect(() => parsePathname(schema.slice(1), pathname)).toThrowError(`schema dose not start with "/"`)
    })
});

