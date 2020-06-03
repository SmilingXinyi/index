/**
 * @file (index)
 * Created by wuhan01 on 2020/6/2
 */

// for webpack dev server

import Hyperthymesia from '../src/hyperthymesia';

const h = Hyperthymesia.getInstance({
    targetUrl: '/v.gif',
    id: 120115,
    cookieKeys: ['BAIDUID'],
    queryKeys: ['ch']
});

h.error('bi001', {hello: 'world'});
