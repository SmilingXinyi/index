# Hyperthymesia

Logging library for web

## Usage

### Install package

> npm install --save hyperthymesia

### Example

```javascript
import Hyperthymesia from 'hyperthymesia';

const h = Hyperthymesia.getInstance({
    targetUrl: '',
    pid: '',
    cookieKeys: [],
    queryKeys: []
});

h.log('demo1');
h.warn('demo2', {foo: 1});
h.warn('demo3', Type.Error, State.Loaded);
h.error('demo4', Type.Error, State.Faild, 'hello world');
```

## Performance

| key | field |
|:---:|:------|
|ft|fetchTime|
|wt|workerTime|
|tt|totalTime|
|dt|downloadTime|
|ttfb|timeToFirstByte|
|hs|headerSize|
|dns|dnsLookupTime|
