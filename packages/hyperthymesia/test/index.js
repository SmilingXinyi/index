/**
 * Created by SmilingXinyi <smilingxinyi@gmail.com> on 2020/6/2
 */

import Hyperthymesia, {Type, State} from '../src/hyperthymesia';

const h = Hyperthymesia.getInstance({
    targetUrl: 'xxxx/v.gif',
    pid: 123456,
    cookieKeys: [],
    queryKeys: []
});


h.log('demo1');
h.warn('demo2', {a: 10});
h.warn('demo3', Type.Error, State.Loaded);
h.error('demo4', Type.Error, State.Faild, 'demo 4');
