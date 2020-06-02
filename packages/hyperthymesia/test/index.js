/**
 * @file (index)
 * Created by wuhan01 on 2020/6/2
 */

// for webpack dev server

import Hyperthymesia from '../src/hyperthymesia';

const Hyper = Hyperthymesia.getInstance({
    targetUrl: 'http://xchain.com/v.gif',
    id: 49,
    cookieKeys: ['BAIDUID'],
    queryKeys: ['ch']
});
