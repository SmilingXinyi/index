# Hyperthymesia

Logging library for web

## Install package

> npm i hyperthymesia

## Getting Started

### Hyperthymesia

`opts`

|name|type|description|
|---|---|---|
|targetUrl|string|request target URL|
|pid|number or string|product id|
|cookieKeys|string[]|default cookies used for send log|
|queryKeys|string[]|default queries used for send log|
|pathnameKeys|string[]|default pathname field used for send log|

### Log

### Warning

### Error

### Example

```javascript
import Hyperthymesia from 'hyperthymesia';

const h = Hyperthymesia.getInstance({
    targetUrl: '',
    pid: ''
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

## Todo

- [ ] Nodejs support
- [ ] Replace state with log level
- [ ] Disable fin2
- [ ] The version field
- [ ] Data formatting
