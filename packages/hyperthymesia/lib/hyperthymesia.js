/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var query_string_1 = __importDefault(__webpack_require__(1));
var interfaces_1 = __webpack_require__(5);
var Hyperthymesia = (function () {
    function Hyperthymesia(opts) {
        var targetUrl = opts.targetUrl, id = opts.id, cookieKeys = opts.cookieKeys, queryKeys = opts.queryKeys;
        var query = location.search, href = location.href;
        var userAgent = navigator.userAgent, platform = navigator.platform, language = navigator.language;
        var cookie = document.cookie;
        var initialPerformance = performance.getEntriesByType('navigation')[0];
        var jsonCookie = this.parseCookie(cookie);
        var jsonUA = this.parseUserAgent(userAgent);
        var jsonPerf = this.parsePerformance(initialPerformance);
        var jsonQuery = query_string_1.default.parse(query);
        this.targetUrl = targetUrl;
        var sysInfo = {
            id: id
        };
        cookieKeys.forEach(function (ckey) { return sysInfo["c_" + ckey.toLowerCase()] = jsonCookie[ckey]; });
        queryKeys.forEach(function (qkey) { return sysInfo["q_" + qkey.toLowerCase()] = jsonQuery[qkey]; });
        this.sysInfo = __assign({}, sysInfo);
        var initialInfo = __assign(__assign({ href: href,
            platform: platform,
            language: language }, jsonUA), { perf: jsonPerf });
        this.info('init', __assign(__assign({}, sysInfo), initialInfo));
    }
    Hyperthymesia.getInstance = function (opts) {
        if (!this.instance) {
            this.instance = new this(opts);
        }
        return this.instance;
    };
    Hyperthymesia.prototype.parseCookie = function (cookie) {
        cookie = cookie.toLowerCase();
        var jsonCookie = {};
        cookie.split(';').forEach(function (item) {
            try {
                var _a = item.match(/^(.+?)=([^;]*)/i), ori = _a[0], key = _a[1], value = _a[2];
                jsonCookie[key.trim()] = value.trim();
            }
            catch (e) {
                return null;
            }
        });
        return jsonCookie;
    };
    Hyperthymesia.prototype.parseUserAgent = function (userAgent) {
        userAgent = userAgent.toLowerCase();
        var os, browser;
        if (userAgent.indexOf('windows phone') >= 0) {
            os = 'Windows Phone';
        }
        else if (userAgent.indexOf('windows') >= 0 || userAgent.indexOf('win16') >= 0 || userAgent.indexOf('win32') >= 0 || userAgent.indexOf('win64') >= 0 || userAgent.indexOf('win95') >= 0 || userAgent.indexOf('win98') >= 0 || userAgent.indexOf('winnt') >= 0 || userAgent.indexOf('wow64') >= 0) {
            os = 'Windows';
        }
        else if (userAgent.indexOf('android') >= 0) {
            os = 'Android';
        }
        else if (userAgent.indexOf('linux') >= 0 || userAgent.indexOf('cros') >= 0 || userAgent.indexOf('x11') >= 0) {
            os = 'Linux';
        }
        else if (userAgent.indexOf('iphone') >= 0 || userAgent.indexOf('ipad') >= 0 || userAgent.indexOf('ipod') >= 0 || userAgent.indexOf('crios') >= 0 || userAgent.indexOf('fxios') >= 0) {
            os = 'iOS';
        }
        else if (userAgent.indexOf('macintosh') >= 0 || userAgent.indexOf('mac_powerpc)') >= 0) {
            os = 'Mac';
        }
        else {
            os = 'Other';
        }
        if (userAgent.indexOf('edge/') >= 0 || userAgent.indexOf('iemobile/') >= 0) {
            browser = 'EDGE';
        }
        else if (userAgent.indexOf('opera mini') >= 0) {
            browser = 'OPERA';
        }
        else if (userAgent.indexOf('firefox/') >= 0) {
            browser = 'Firefox';
        }
        else if (userAgent.indexOf('opera/') >= 0 || userAgent.indexOf(' opr/') >= 0) {
            browser = 'Opera';
        }
        else if (userAgent.indexOf('chrome/') >= 0) {
            browser = 'Chrome';
        }
        else if (userAgent.indexOf('safari/') >= 0) {
            if (userAgent.indexOf('android 1.') >= 0 || userAgent.indexOf('android 2.') >= 0 || userAgent.indexOf('android 3.') >= 0 || userAgent.indexOf('android 4.') >= 0) {
                browser = 'AOSP';
            }
            else {
                browser = 'Safari';
            }
        }
        else if (userAgent.indexOf('trident/') >= 0) {
            browser = 'Internet Explorer';
        }
        else {
            browser = 'Other';
        }
        var mobileDevice = (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
        return {
            os: os,
            browser: browser,
            mobileDevice: mobileDevice
        };
    };
    Hyperthymesia.prototype.parsePerformance = function (perf) {
        var responseStart = perf.responseStart;
        var responseEnd = perf.responseEnd;
        return {
            ft: responseEnd - perf.fetchStart,
            wt: perf.workerStart > 0 ? responseEnd - perf.workerStart : 0,
            tt: responseEnd - perf.requestStart,
            dt: responseEnd - responseStart,
            ttfb: responseStart - perf.requestStart,
            hs: Math.abs(perf.transferSize - perf.encodedBodySize || 0),
            dns: perf.domainLookupEnd - perf.domainLookupStart
        };
    };
    ;
    Hyperthymesia.prototype.log = function (id, t, s) {
        if (t === void 0) { t = interfaces_1.Type.Action; }
        if (s === void 0) { s = interfaces_1.State.Load; }
        this.send(interfaces_1.Level.Log, id, null, t, s);
    };
    Hyperthymesia.prototype.warn = function (id, t, s) {
        if (t === void 0) { t = interfaces_1.Type.Action; }
        if (s === void 0) { s = interfaces_1.State.Load; }
        this.send(interfaces_1.Level.Warn, id, null, t, s);
    };
    Hyperthymesia.prototype.error = function (id, t, s) {
        if (t === void 0) { t = interfaces_1.Type.Action; }
        if (s === void 0) { s = interfaces_1.State.Load; }
        this.send(interfaces_1.Level.Error, id, null, t, s);
    };
    Hyperthymesia.prototype.info = function (id, data, t, s) {
        if (t === void 0) { t = interfaces_1.Type.Action; }
        if (s === void 0) { s = interfaces_1.State.Load; }
        this.send(interfaces_1.Level.Info, id, data, t, s);
    };
    Hyperthymesia.prototype.send = function (lv, id, data, t, s) {
        var target = this.targetUrl;
        var payload = {
            lv: lv,
            id: id,
            t: t,
            s: s,
            n: Date.now()
        };
        if (data) {
            payload.data = encodeURIComponent(JSON.stringify(data));
        }
        var img = new Image();
        var timer = setTimeout(function () {
            img.src = target + '?' + Object.keys(payload).map(function (key) { return key + "=" + payload[key]; }).join('&');
        }, 0);
        img.onload = img.onerror = img.onabort = function () {
            if (timer) {
                clearTimeout(timer);
            }
        };
    };
    return Hyperthymesia;
}());
exports.default = Hyperthymesia;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const strictUriEncode = __webpack_require__(2);
const decodeComponent = __webpack_require__(3);
const splitOnFirst = __webpack_require__(4);

const isNullOrUndefined = value => value === null || value === undefined;

function encoderForArrayFormat(options) {
	switch (options.arrayFormat) {
		case 'index':
			return key => (result, value) => {
				const index = result.length;

				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), '[', index, ']'].join('')];
				}

				return [
					...result,
					[encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')
				];
			};

		case 'bracket':
			return key => (result, value) => {
				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), '[]'].join('')];
				}

				return [...result, [encode(key, options), '[]=', encode(value, options)].join('')];
			};

		case 'comma':
		case 'separator':
			return key => (result, value) => {
				if (value === null || value === undefined || value.length === 0) {
					return result;
				}

				if (result.length === 0) {
					return [[encode(key, options), '=', encode(value, options)].join('')];
				}

				return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
			};

		default:
			return key => (result, value) => {
				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, encode(key, options)];
				}

				return [...result, [encode(key, options), '=', encode(value, options)].join('')];
			};
	}
}

function parserForArrayFormat(options) {
	let result;

	switch (options.arrayFormat) {
		case 'index':
			return (key, value, accumulator) => {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return (key, value, accumulator) => {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		case 'comma':
		case 'separator':
			return (key, value, accumulator) => {
				const isArray = typeof value === 'string' && value.split('').indexOf(options.arrayFormatSeparator) > -1;
				const newValue = isArray ? value.split(options.arrayFormatSeparator).map(item => decode(item, options)) : value === null ? value : decode(value, options);
				accumulator[key] = newValue;
			};

		default:
			return (key, value, accumulator) => {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function validateArrayFormatSeparator(value) {
	if (typeof value !== 'string' || value.length !== 1) {
		throw new TypeError('arrayFormatSeparator must be single character string');
	}
}

function encode(value, options) {
	if (options.encode) {
		return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function decode(value, options) {
	if (options.decode) {
		return decodeComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	}

	if (typeof input === 'object') {
		return keysSorter(Object.keys(input))
			.sort((a, b) => Number(a) - Number(b))
			.map(key => input[key]);
	}

	return input;
}

function removeHash(input) {
	const hashStart = input.indexOf('#');
	if (hashStart !== -1) {
		input = input.slice(0, hashStart);
	}

	return input;
}

function getHash(url) {
	let hash = '';
	const hashStart = url.indexOf('#');
	if (hashStart !== -1) {
		hash = url.slice(hashStart);
	}

	return hash;
}

function extract(input) {
	input = removeHash(input);
	const queryStart = input.indexOf('?');
	if (queryStart === -1) {
		return '';
	}

	return input.slice(queryStart + 1);
}

function parseValue(value, options) {
	if (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === 'string' && value.trim() !== '')) {
		value = Number(value);
	} else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
		value = value.toLowerCase() === 'true';
	}

	return value;
}

function parse(input, options) {
	options = Object.assign({
		decode: true,
		sort: true,
		arrayFormat: 'none',
		arrayFormatSeparator: ',',
		parseNumbers: false,
		parseBooleans: false
	}, options);

	validateArrayFormatSeparator(options.arrayFormatSeparator);

	const formatter = parserForArrayFormat(options);

	// Create an object with no prototype
	const ret = Object.create(null);

	if (typeof input !== 'string') {
		return ret;
	}

	input = input.trim().replace(/^[?#&]/, '');

	if (!input) {
		return ret;
	}

	for (const param of input.split('&')) {
		let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, ' ') : param, '=');

		// Missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		value = value === undefined ? null : ['comma', 'separator'].includes(options.arrayFormat) ? value : decode(value, options);
		formatter(decode(key, options), value, ret);
	}

	for (const key of Object.keys(ret)) {
		const value = ret[key];
		if (typeof value === 'object' && value !== null) {
			for (const k of Object.keys(value)) {
				value[k] = parseValue(value[k], options);
			}
		} else {
			ret[key] = parseValue(value, options);
		}
	}

	if (options.sort === false) {
		return ret;
	}

	return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
		const value = ret[key];
		if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
			// Sort object keys, not values
			result[key] = keysSorter(value);
		} else {
			result[key] = value;
		}

		return result;
	}, Object.create(null));
}

exports.extract = extract;
exports.parse = parse;

exports.stringify = (object, options) => {
	if (!object) {
		return '';
	}

	options = Object.assign({
		encode: true,
		strict: true,
		arrayFormat: 'none',
		arrayFormatSeparator: ','
	}, options);

	validateArrayFormatSeparator(options.arrayFormatSeparator);

	const shouldFilter = key => (
		(options.skipNull && isNullOrUndefined(object[key])) ||
		(options.skipEmptyString && object[key] === '')
	);

	const formatter = encoderForArrayFormat(options);

	const objectCopy = {};

	for (const key of Object.keys(object)) {
		if (!shouldFilter(key)) {
			objectCopy[key] = object[key];
		}
	}

	const keys = Object.keys(objectCopy);

	if (options.sort !== false) {
		keys.sort(options.sort);
	}

	return keys.map(key => {
		const value = object[key];

		if (value === undefined) {
			return '';
		}

		if (value === null) {
			return encode(key, options);
		}

		if (Array.isArray(value)) {
			return value
				.reduce(formatter(key), [])
				.join('&');
		}

		return encode(key, options) + '=' + encode(value, options);
	}).filter(x => x.length > 0).join('&');
};

exports.parseUrl = (input, options) => {
	return {
		url: removeHash(input).split('?')[0] || '',
		query: parse(extract(input), options)
	};
};

exports.stringifyUrl = (input, options) => {
	const url = removeHash(input.url).split('?')[0] || '';
	const queryFromUrl = exports.extract(input.url);
	const parsedQueryFromUrl = exports.parse(queryFromUrl);
	const hash = getHash(input.url);
	const query = Object.assign(parsedQueryFromUrl, input.query);
	let queryString = exports.stringify(query, options);
	if (queryString) {
		queryString = `?${queryString}`;
	}

	return `${url}${queryString}${hash}`;
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = str => encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return decodeURIComponent(components.join(''));
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher);

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher);
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

module.exports = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (string, separator) => {
	if (!(typeof string === 'string' && typeof separator === 'string')) {
		throw new TypeError('Expected the arguments to be of type `string`');
	}

	if (separator === '') {
		return [string];
	}

	const separatorIndex = string.indexOf(separator);

	if (separatorIndex === -1) {
		return [string];
	}

	return [
		string.slice(0, separatorIndex),
		string.slice(separatorIndex + separator.length)
	];
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Level = exports.State = exports.Type = void 0;
var Type;
(function (Type) {
    Type[Type["Action"] = 0] = "Action";
    Type[Type["Process"] = 1] = "Process";
    Type[Type["Error"] = 2] = "Error";
})(Type = exports.Type || (exports.Type = {}));
var State;
(function (State) {
    State[State["Load"] = 0] = "Load";
    State[State["Loaded"] = 1] = "Loaded";
    State[State["Loading"] = 2] = "Loading";
    State[State["Faild"] = 3] = "Faild";
    State[State["Cancel"] = 4] = "Cancel";
})(State = exports.State || (exports.State = {}));
var Level;
(function (Level) {
    Level[Level["Info"] = 0] = "Info";
    Level[Level["Log"] = 1] = "Log";
    Level[Level["Warn"] = 2] = "Warn";
    Level[Level["Error"] = 3] = "Error";
})(Level = exports.Level || (exports.Level = {}));


/***/ })
/******/ ]);