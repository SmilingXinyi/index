/**
 * @file (index)
 * Created by wuhan01 on 2020/6/2
 */

// for webpack dev server

import Hyperthymesia from '../src/hyperthymesia';

const Hyper = Hyperthymesia.getInstance({
    targetUrl: 'http://bjhw-bac-orp-xchain-orp-137055.bjhw.baidu.com:8200/n/ide/v',
    id: 120115,
    cookieKeys: ['BAIDUID'],
    queryKeys: ['ch']
});
