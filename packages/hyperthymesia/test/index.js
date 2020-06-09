/**
 * Created by SmilingXinyi <smilingxinyi@gmail.com> on 2020/6/2
 */

import Hyperthymesia from '../src/hyperthymesia';

const h = Hyperthymesia.getInstance({
    targetUrl: '/v.gif',
    id: 120115,
    cookieKeys: [],
    queryKeys: []
});

h.error('bi001', {hello: 'world'});
