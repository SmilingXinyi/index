# Hyperthymesia

Logging library for web

## Getting Started

### Install package

> npm i hyperthymesia

### Example

```javascript
import Hyperthymesia from 'hyperthymesia';

const h = Hyperthymesia.getInstance({
    targetUrl: '',
    pid: '',
    cookieKeys: [],
    queryKeys: []
});

// normal log
h.log('demo1');
h.log(123);

// warning log
h.warn('demo2', {foo: 1});
h.warn('demo3', Type.Error, State.Loaded);

// error log
h.error('demo4', Type.Error, State.Faild, 'hello world');
```

## Performance data

##### Key and field mapping

| key | field |
|:---:|:------|
|ft|fetchTime|
|wt|workerTime|
|tt|totalTime|
|dt|downloadTime|
|ttfb|timeToFirstByte|
|hs|headerSize|
|dns|dnsLookupTime|
