(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["doctor-portal-doctor-portal-module"],{

/***/ "./node_modules/backo2/index.js":
/*!**************************************!*\
  !*** ./node_modules/backo2/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * Expose `Backoff`.
 */

module.exports = Backoff;

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */

function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 10000;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}

/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */

Backoff.prototype.duration = function(){
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand =  Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};

/**
 * Reset the number of attempts.
 *
 * @api public
 */

Backoff.prototype.reset = function(){
  this.attempts = 0;
};

/**
 * Set the minimum duration
 *
 * @api public
 */

Backoff.prototype.setMin = function(min){
  this.ms = min;
};

/**
 * Set the maximum duration
 *
 * @api public
 */

Backoff.prototype.setMax = function(max){
  this.max = max;
};

/**
 * Set the jitter
 *
 * @api public
 */

Backoff.prototype.setJitter = function(jitter){
  this.jitter = jitter;
};



/***/ }),

/***/ "./node_modules/base64-arraybuffer/lib/base64-arraybuffer.js":
/*!*******************************************************************!*\
  !*** ./node_modules/base64-arraybuffer/lib/base64-arraybuffer.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
(function(chars){
  "use strict";

  exports.encode = function(arraybuffer) {
    var bytes = new Uint8Array(arraybuffer),
    i, len = bytes.length, base64 = "";

    for (i = 0; i < len; i+=3) {
      base64 += chars[bytes[i] >> 2];
      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
      base64 += chars[bytes[i + 2] & 63];
    }

    if ((len % 3) === 2) {
      base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + "==";
    }

    return base64;
  };

  exports.decode =  function(base64) {
    var bufferLength = base64.length * 0.75,
    len = base64.length, i, p = 0,
    encoded1, encoded2, encoded3, encoded4;

    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }

    var arraybuffer = new ArrayBuffer(bufferLength),
    bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i+=4) {
      encoded1 = chars.indexOf(base64[i]);
      encoded2 = chars.indexOf(base64[i+1]);
      encoded3 = chars.indexOf(base64[i+2]);
      encoded4 = chars.indexOf(base64[i+3]);

      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return arraybuffer;
  };
})("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");


/***/ }),

/***/ "./node_modules/component-emitter/index.js":
/*!*************************************************!*\
  !*** ./node_modules/component-emitter/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }

  // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.
  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
  }

  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};

  var args = new Array(arguments.length - 1)
    , callbacks = this._callbacks['$' + event];

  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),

/***/ "./node_modules/debug/src/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/debug/src/browser.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (() => {
	let warned = false;

	return () => {
		if (!warned) {
			warned = true;
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}
	};
})();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __webpack_require__(/*! ./common */ "./node_modules/debug/src/common.js")(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};


/***/ }),

/***/ "./node_modules/debug/src/common.js":
/*!******************************************!*\
  !*** ./node_modules/debug/src/common.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __webpack_require__(/*! ms */ "./node_modules/ms/index.js");
	createDebug.destroy = destroy;

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;
		let enableOverride = null;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return '%';
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.useColors = createDebug.useColors();
		debug.color = createDebug.selectColor(namespace);
		debug.extend = extend;
		debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

		Object.defineProperty(debug, 'enabled', {
			enumerable: true,
			configurable: false,
			get: () => enableOverride === null ? createDebug.enabled(namespace) : enableOverride,
			set: v => {
				enableOverride = v;
			}
		});

		// Env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		return debug;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	/**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/
	function destroy() {
		console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),

/***/ "./node_modules/engine.io-client/lib/globalThis.browser.js":
/*!*****************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/globalThis.browser.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = (() => {
  if (typeof self !== "undefined") {
    return self;
  } else if (typeof window !== "undefined") {
    return window;
  } else {
    return Function("return this")();
  }
})();


/***/ }),

/***/ "./node_modules/engine.io-client/lib/index.js":
/*!****************************************************!*\
  !*** ./node_modules/engine.io-client/lib/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Socket = __webpack_require__(/*! ./socket */ "./node_modules/engine.io-client/lib/socket.js");

module.exports = (uri, opts) => new Socket(uri, opts);

/**
 * Expose deps for legacy compatibility
 * and standalone browser access.
 */

module.exports.Socket = Socket;
module.exports.protocol = Socket.protocol; // this is an int
module.exports.Transport = __webpack_require__(/*! ./transport */ "./node_modules/engine.io-client/lib/transport.js");
module.exports.transports = __webpack_require__(/*! ./transports/index */ "./node_modules/engine.io-client/lib/transports/index.js");
module.exports.parser = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/lib/index.js");


/***/ }),

/***/ "./node_modules/engine.io-client/lib/socket.js":
/*!*****************************************************!*\
  !*** ./node_modules/engine.io-client/lib/socket.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const transports = __webpack_require__(/*! ./transports/index */ "./node_modules/engine.io-client/lib/transports/index.js");
const Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");
const debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("engine.io-client:socket");
const parser = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/lib/index.js");
const parseuri = __webpack_require__(/*! parseuri */ "./node_modules/parseuri/index.js");
const parseqs = __webpack_require__(/*! parseqs */ "./node_modules/parseqs/index.js");

class Socket extends Emitter {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri or options
   * @param {Object} options
   * @api public
   */
  constructor(uri, opts = {}) {
    super();

    if (uri && "object" === typeof uri) {
      opts = uri;
      uri = null;
    }

    if (uri) {
      uri = parseuri(uri);
      opts.hostname = uri.host;
      opts.secure = uri.protocol === "https" || uri.protocol === "wss";
      opts.port = uri.port;
      if (uri.query) opts.query = uri.query;
    } else if (opts.host) {
      opts.hostname = parseuri(opts.host).host;
    }

    this.secure =
      null != opts.secure
        ? opts.secure
        : typeof location !== "undefined" && "https:" === location.protocol;

    if (opts.hostname && !opts.port) {
      // if no port is specified manually, use the protocol default
      opts.port = this.secure ? "443" : "80";
    }

    this.hostname =
      opts.hostname ||
      (typeof location !== "undefined" ? location.hostname : "localhost");
    this.port =
      opts.port ||
      (typeof location !== "undefined" && location.port
        ? location.port
        : this.secure
        ? 443
        : 80);

    this.transports = opts.transports || ["polling", "websocket"];
    this.readyState = "";
    this.writeBuffer = [];
    this.prevBufferLen = 0;

    this.opts = Object.assign(
      {
        path: "/engine.io",
        agent: false,
        withCredentials: false,
        upgrade: true,
        jsonp: true,
        timestampParam: "t",
        rememberUpgrade: false,
        rejectUnauthorized: true,
        perMessageDeflate: {
          threshold: 1024
        },
        transportOptions: {}
      },
      opts
    );

    this.opts.path = this.opts.path.replace(/\/$/, "") + "/";

    if (typeof this.opts.query === "string") {
      this.opts.query = parseqs.decode(this.opts.query);
    }

    // set on handshake
    this.id = null;
    this.upgrades = null;
    this.pingInterval = null;
    this.pingTimeout = null;

    // set on heartbeat
    this.pingTimeoutTimer = null;

    if (typeof addEventListener === "function") {
      addEventListener(
        "beforeunload",
        () => {
          if (this.transport) {
            // silently close the transport
            this.transport.removeAllListeners();
            this.transport.close();
          }
        },
        false
      );
    }

    this.open();
  }

  /**
   * Creates transport of the given type.
   *
   * @param {String} transport name
   * @return {Transport}
   * @api private
   */
  createTransport(name) {
    debug('creating transport "%s"', name);
    const query = clone(this.opts.query);

    // append engine.io protocol identifier
    query.EIO = parser.protocol;

    // transport name
    query.transport = name;

    // session id if we already have one
    if (this.id) query.sid = this.id;

    const opts = Object.assign(
      {},
      this.opts.transportOptions[name],
      this.opts,
      {
        query,
        socket: this,
        hostname: this.hostname,
        secure: this.secure,
        port: this.port
      }
    );

    debug("options: %j", opts);

    return new transports[name](opts);
  }

  /**
   * Initializes transport to use and starts probe.
   *
   * @api private
   */
  open() {
    let transport;
    if (
      this.opts.rememberUpgrade &&
      Socket.priorWebsocketSuccess &&
      this.transports.indexOf("websocket") !== -1
    ) {
      transport = "websocket";
    } else if (0 === this.transports.length) {
      // Emit error on next tick so it can be listened to
      const self = this;
      setTimeout(function() {
        self.emit("error", "No transports available");
      }, 0);
      return;
    } else {
      transport = this.transports[0];
    }
    this.readyState = "opening";

    // Retry with the next transport if the transport is disabled (jsonp: false)
    try {
      transport = this.createTransport(transport);
    } catch (e) {
      debug("error while creating transport: %s", e);
      this.transports.shift();
      this.open();
      return;
    }

    transport.open();
    this.setTransport(transport);
  }

  /**
   * Sets the current transport. Disables the existing one (if any).
   *
   * @api private
   */
  setTransport(transport) {
    debug("setting transport %s", transport.name);
    const self = this;

    if (this.transport) {
      debug("clearing existing transport %s", this.transport.name);
      this.transport.removeAllListeners();
    }

    // set up transport
    this.transport = transport;

    // set up transport listeners
    transport
      .on("drain", function() {
        self.onDrain();
      })
      .on("packet", function(packet) {
        self.onPacket(packet);
      })
      .on("error", function(e) {
        self.onError(e);
      })
      .on("close", function() {
        self.onClose("transport close");
      });
  }

  /**
   * Probes a transport.
   *
   * @param {String} transport name
   * @api private
   */
  probe(name) {
    debug('probing transport "%s"', name);
    let transport = this.createTransport(name, { probe: 1 });
    let failed = false;
    const self = this;

    Socket.priorWebsocketSuccess = false;

    function onTransportOpen() {
      if (self.onlyBinaryUpgrades) {
        const upgradeLosesBinary =
          !this.supportsBinary && self.transport.supportsBinary;
        failed = failed || upgradeLosesBinary;
      }
      if (failed) return;

      debug('probe transport "%s" opened', name);
      transport.send([{ type: "ping", data: "probe" }]);
      transport.once("packet", function(msg) {
        if (failed) return;
        if ("pong" === msg.type && "probe" === msg.data) {
          debug('probe transport "%s" pong', name);
          self.upgrading = true;
          self.emit("upgrading", transport);
          if (!transport) return;
          Socket.priorWebsocketSuccess = "websocket" === transport.name;

          debug('pausing current transport "%s"', self.transport.name);
          self.transport.pause(function() {
            if (failed) return;
            if ("closed" === self.readyState) return;
            debug("changing transport and sending upgrade packet");

            cleanup();

            self.setTransport(transport);
            transport.send([{ type: "upgrade" }]);
            self.emit("upgrade", transport);
            transport = null;
            self.upgrading = false;
            self.flush();
          });
        } else {
          debug('probe transport "%s" failed', name);
          const err = new Error("probe error");
          err.transport = transport.name;
          self.emit("upgradeError", err);
        }
      });
    }

    function freezeTransport() {
      if (failed) return;

      // Any callback called by transport should be ignored since now
      failed = true;

      cleanup();

      transport.close();
      transport = null;
    }

    // Handle any error that happens while probing
    function onerror(err) {
      const error = new Error("probe error: " + err);
      error.transport = transport.name;

      freezeTransport();

      debug('probe transport "%s" failed because of error: %s', name, err);

      self.emit("upgradeError", error);
    }

    function onTransportClose() {
      onerror("transport closed");
    }

    // When the socket is closed while we're probing
    function onclose() {
      onerror("socket closed");
    }

    // When the socket is upgraded while we're probing
    function onupgrade(to) {
      if (transport && to.name !== transport.name) {
        debug('"%s" works - aborting "%s"', to.name, transport.name);
        freezeTransport();
      }
    }

    // Remove all listeners on the transport and on self
    function cleanup() {
      transport.removeListener("open", onTransportOpen);
      transport.removeListener("error", onerror);
      transport.removeListener("close", onTransportClose);
      self.removeListener("close", onclose);
      self.removeListener("upgrading", onupgrade);
    }

    transport.once("open", onTransportOpen);
    transport.once("error", onerror);
    transport.once("close", onTransportClose);

    this.once("close", onclose);
    this.once("upgrading", onupgrade);

    transport.open();
  }

  /**
   * Called when connection is deemed open.
   *
   * @api public
   */
  onOpen() {
    debug("socket open");
    this.readyState = "open";
    Socket.priorWebsocketSuccess = "websocket" === this.transport.name;
    this.emit("open");
    this.flush();

    // we check for `readyState` in case an `open`
    // listener already closed the socket
    if (
      "open" === this.readyState &&
      this.opts.upgrade &&
      this.transport.pause
    ) {
      debug("starting upgrade probes");
      let i = 0;
      const l = this.upgrades.length;
      for (; i < l; i++) {
        this.probe(this.upgrades[i]);
      }
    }
  }

  /**
   * Handles a packet.
   *
   * @api private
   */
  onPacket(packet) {
    if (
      "opening" === this.readyState ||
      "open" === this.readyState ||
      "closing" === this.readyState
    ) {
      debug('socket receive: type "%s", data "%s"', packet.type, packet.data);

      this.emit("packet", packet);

      // Socket is live - any packet counts
      this.emit("heartbeat");

      switch (packet.type) {
        case "open":
          this.onHandshake(JSON.parse(packet.data));
          break;

        case "ping":
          this.resetPingTimeout();
          this.sendPacket("pong");
          this.emit("pong");
          break;

        case "error":
          const err = new Error("server error");
          err.code = packet.data;
          this.onError(err);
          break;

        case "message":
          this.emit("data", packet.data);
          this.emit("message", packet.data);
          break;
      }
    } else {
      debug('packet received with socket readyState "%s"', this.readyState);
    }
  }

  /**
   * Called upon handshake completion.
   *
   * @param {Object} handshake obj
   * @api private
   */
  onHandshake(data) {
    this.emit("handshake", data);
    this.id = data.sid;
    this.transport.query.sid = data.sid;
    this.upgrades = this.filterUpgrades(data.upgrades);
    this.pingInterval = data.pingInterval;
    this.pingTimeout = data.pingTimeout;
    this.onOpen();
    // In case open handler closes socket
    if ("closed" === this.readyState) return;
    this.resetPingTimeout();
  }

  /**
   * Sets and resets ping timeout timer based on server pings.
   *
   * @api private
   */
  resetPingTimeout() {
    clearTimeout(this.pingTimeoutTimer);
    this.pingTimeoutTimer = setTimeout(() => {
      this.onClose("ping timeout");
    }, this.pingInterval + this.pingTimeout);
  }

  /**
   * Called on `drain` event
   *
   * @api private
   */
  onDrain() {
    this.writeBuffer.splice(0, this.prevBufferLen);

    // setting prevBufferLen = 0 is very important
    // for example, when upgrading, upgrade packet is sent over,
    // and a nonzero prevBufferLen could cause problems on `drain`
    this.prevBufferLen = 0;

    if (0 === this.writeBuffer.length) {
      this.emit("drain");
    } else {
      this.flush();
    }
  }

  /**
   * Flush write buffers.
   *
   * @api private
   */
  flush() {
    if (
      "closed" !== this.readyState &&
      this.transport.writable &&
      !this.upgrading &&
      this.writeBuffer.length
    ) {
      debug("flushing %d packets in socket", this.writeBuffer.length);
      this.transport.send(this.writeBuffer);
      // keep track of current length of writeBuffer
      // splice writeBuffer and callbackBuffer on `drain`
      this.prevBufferLen = this.writeBuffer.length;
      this.emit("flush");
    }
  }

  /**
   * Sends a message.
   *
   * @param {String} message.
   * @param {Function} callback function.
   * @param {Object} options.
   * @return {Socket} for chaining.
   * @api public
   */
  write(msg, options, fn) {
    this.sendPacket("message", msg, options, fn);
    return this;
  }

  send(msg, options, fn) {
    this.sendPacket("message", msg, options, fn);
    return this;
  }

  /**
   * Sends a packet.
   *
   * @param {String} packet type.
   * @param {String} data.
   * @param {Object} options.
   * @param {Function} callback function.
   * @api private
   */
  sendPacket(type, data, options, fn) {
    if ("function" === typeof data) {
      fn = data;
      data = undefined;
    }

    if ("function" === typeof options) {
      fn = options;
      options = null;
    }

    if ("closing" === this.readyState || "closed" === this.readyState) {
      return;
    }

    options = options || {};
    options.compress = false !== options.compress;

    const packet = {
      type: type,
      data: data,
      options: options
    };
    this.emit("packetCreate", packet);
    this.writeBuffer.push(packet);
    if (fn) this.once("flush", fn);
    this.flush();
  }

  /**
   * Closes the connection.
   *
   * @api private
   */
  close() {
    const self = this;

    if ("opening" === this.readyState || "open" === this.readyState) {
      this.readyState = "closing";

      if (this.writeBuffer.length) {
        this.once("drain", function() {
          if (this.upgrading) {
            waitForUpgrade();
          } else {
            close();
          }
        });
      } else if (this.upgrading) {
        waitForUpgrade();
      } else {
        close();
      }
    }

    function close() {
      self.onClose("forced close");
      debug("socket closing - telling transport to close");
      self.transport.close();
    }

    function cleanupAndClose() {
      self.removeListener("upgrade", cleanupAndClose);
      self.removeListener("upgradeError", cleanupAndClose);
      close();
    }

    function waitForUpgrade() {
      // wait for upgrade to finish since we can't send packets while pausing a transport
      self.once("upgrade", cleanupAndClose);
      self.once("upgradeError", cleanupAndClose);
    }

    return this;
  }

  /**
   * Called upon transport error
   *
   * @api private
   */
  onError(err) {
    debug("socket error %j", err);
    Socket.priorWebsocketSuccess = false;
    this.emit("error", err);
    this.onClose("transport error", err);
  }

  /**
   * Called upon transport close.
   *
   * @api private
   */
  onClose(reason, desc) {
    if (
      "opening" === this.readyState ||
      "open" === this.readyState ||
      "closing" === this.readyState
    ) {
      debug('socket close with reason: "%s"', reason);
      const self = this;

      // clear timers
      clearTimeout(this.pingIntervalTimer);
      clearTimeout(this.pingTimeoutTimer);

      // stop event from firing again for transport
      this.transport.removeAllListeners("close");

      // ensure transport won't stay open
      this.transport.close();

      // ignore further transport communication
      this.transport.removeAllListeners();

      // set ready state
      this.readyState = "closed";

      // clear session id
      this.id = null;

      // emit close event
      this.emit("close", reason, desc);

      // clean buffers after, so users can still
      // grab the buffers on `close` event
      self.writeBuffer = [];
      self.prevBufferLen = 0;
    }
  }

  /**
   * Filters upgrades, returning only those matching client transports.
   *
   * @param {Array} server upgrades
   * @api private
   *
   */
  filterUpgrades(upgrades) {
    const filteredUpgrades = [];
    let i = 0;
    const j = upgrades.length;
    for (; i < j; i++) {
      if (~this.transports.indexOf(upgrades[i]))
        filteredUpgrades.push(upgrades[i]);
    }
    return filteredUpgrades;
  }
}

Socket.priorWebsocketSuccess = false;

/**
 * Protocol version.
 *
 * @api public
 */

Socket.protocol = parser.protocol; // this is an int

function clone(obj) {
  const o = {};
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = obj[i];
    }
  }
  return o;
}

module.exports = Socket;


/***/ }),

/***/ "./node_modules/engine.io-client/lib/transport.js":
/*!********************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transport.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const parser = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/lib/index.js");
const Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");
const debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("engine.io-client:transport");

class Transport extends Emitter {
  /**
   * Transport abstract constructor.
   *
   * @param {Object} options.
   * @api private
   */
  constructor(opts) {
    super();

    this.opts = opts;
    this.query = opts.query;
    this.readyState = "";
    this.socket = opts.socket;
  }

  /**
   * Emits an error.
   *
   * @param {String} str
   * @return {Transport} for chaining
   * @api public
   */
  onError(msg, desc) {
    const err = new Error(msg);
    err.type = "TransportError";
    err.description = desc;
    this.emit("error", err);
    return this;
  }

  /**
   * Opens the transport.
   *
   * @api public
   */
  open() {
    if ("closed" === this.readyState || "" === this.readyState) {
      this.readyState = "opening";
      this.doOpen();
    }

    return this;
  }

  /**
   * Closes the transport.
   *
   * @api private
   */
  close() {
    if ("opening" === this.readyState || "open" === this.readyState) {
      this.doClose();
      this.onClose();
    }

    return this;
  }

  /**
   * Sends multiple packets.
   *
   * @param {Array} packets
   * @api private
   */
  send(packets) {
    if ("open" === this.readyState) {
      this.write(packets);
    } else {
      // this might happen if the transport was silently closed in the beforeunload event handler
      debug("transport is not open, discarding packets");
    }
  }

  /**
   * Called upon open
   *
   * @api private
   */
  onOpen() {
    this.readyState = "open";
    this.writable = true;
    this.emit("open");
  }

  /**
   * Called with data.
   *
   * @param {String} data
   * @api private
   */
  onData(data) {
    const packet = parser.decodePacket(data, this.socket.binaryType);
    this.onPacket(packet);
  }

  /**
   * Called with a decoded packet.
   */
  onPacket(packet) {
    this.emit("packet", packet);
  }

  /**
   * Called upon close.
   *
   * @api private
   */
  onClose() {
    this.readyState = "closed";
    this.emit("close");
  }
}

module.exports = Transport;


/***/ }),

/***/ "./node_modules/engine.io-client/lib/transports/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transports/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const XMLHttpRequest = __webpack_require__(/*! xmlhttprequest-ssl */ "./node_modules/engine.io-client/lib/xmlhttprequest.js");
const XHR = __webpack_require__(/*! ./polling-xhr */ "./node_modules/engine.io-client/lib/transports/polling-xhr.js");
const JSONP = __webpack_require__(/*! ./polling-jsonp */ "./node_modules/engine.io-client/lib/transports/polling-jsonp.js");
const websocket = __webpack_require__(/*! ./websocket */ "./node_modules/engine.io-client/lib/transports/websocket.js");

exports.polling = polling;
exports.websocket = websocket;

/**
 * Polling transport polymorphic constructor.
 * Decides on xhr vs jsonp based on feature detection.
 *
 * @api private
 */

function polling(opts) {
  let xhr;
  let xd = false;
  let xs = false;
  const jsonp = false !== opts.jsonp;

  if (typeof location !== "undefined") {
    const isSSL = "https:" === location.protocol;
    let port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    xd = opts.hostname !== location.hostname || port !== opts.port;
    xs = opts.secure !== isSSL;
  }

  opts.xdomain = xd;
  opts.xscheme = xs;
  xhr = new XMLHttpRequest(opts);

  if ("open" in xhr && !opts.forceJSONP) {
    return new XHR(opts);
  } else {
    if (!jsonp) throw new Error("JSONP disabled");
    return new JSONP(opts);
  }
}


/***/ }),

/***/ "./node_modules/engine.io-client/lib/transports/polling-jsonp.js":
/*!***********************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transports/polling-jsonp.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Polling = __webpack_require__(/*! ./polling */ "./node_modules/engine.io-client/lib/transports/polling.js");
const globalThis = __webpack_require__(/*! ../globalThis */ "./node_modules/engine.io-client/lib/globalThis.browser.js");

const rNewline = /\n/g;
const rEscapedNewline = /\\n/g;

/**
 * Global JSONP callbacks.
 */

let callbacks;

class JSONPPolling extends Polling {
  /**
   * JSONP Polling constructor.
   *
   * @param {Object} opts.
   * @api public
   */
  constructor(opts) {
    super(opts);

    this.query = this.query || {};

    // define global callbacks array if not present
    // we do this here (lazily) to avoid unneeded global pollution
    if (!callbacks) {
      // we need to consider multiple engines in the same page
      callbacks = globalThis.___eio = globalThis.___eio || [];
    }

    // callback identifier
    this.index = callbacks.length;

    // add callback to jsonp global
    const self = this;
    callbacks.push(function(msg) {
      self.onData(msg);
    });

    // append to query string
    this.query.j = this.index;
  }

  /**
   * JSONP only supports binary as base64 encoded strings
   */
  get supportsBinary() {
    return false;
  }

  /**
   * Closes the socket.
   *
   * @api private
   */
  doClose() {
    if (this.script) {
      // prevent spurious errors from being emitted when the window is unloaded
      this.script.onerror = () => {};
      this.script.parentNode.removeChild(this.script);
      this.script = null;
    }

    if (this.form) {
      this.form.parentNode.removeChild(this.form);
      this.form = null;
      this.iframe = null;
    }

    super.doClose();
  }

  /**
   * Starts a poll cycle.
   *
   * @api private
   */
  doPoll() {
    const self = this;
    const script = document.createElement("script");

    if (this.script) {
      this.script.parentNode.removeChild(this.script);
      this.script = null;
    }

    script.async = true;
    script.src = this.uri();
    script.onerror = function(e) {
      self.onError("jsonp poll error", e);
    };

    const insertAt = document.getElementsByTagName("script")[0];
    if (insertAt) {
      insertAt.parentNode.insertBefore(script, insertAt);
    } else {
      (document.head || document.body).appendChild(script);
    }
    this.script = script;

    const isUAgecko =
      "undefined" !== typeof navigator && /gecko/i.test(navigator.userAgent);

    if (isUAgecko) {
      setTimeout(function() {
        const iframe = document.createElement("iframe");
        document.body.appendChild(iframe);
        document.body.removeChild(iframe);
      }, 100);
    }
  }

  /**
   * Writes with a hidden iframe.
   *
   * @param {String} data to send
   * @param {Function} called upon flush.
   * @api private
   */
  doWrite(data, fn) {
    const self = this;
    let iframe;

    if (!this.form) {
      const form = document.createElement("form");
      const area = document.createElement("textarea");
      const id = (this.iframeId = "eio_iframe_" + this.index);

      form.className = "socketio";
      form.style.position = "absolute";
      form.style.top = "-1000px";
      form.style.left = "-1000px";
      form.target = id;
      form.method = "POST";
      form.setAttribute("accept-charset", "utf-8");
      area.name = "d";
      form.appendChild(area);
      document.body.appendChild(form);

      this.form = form;
      this.area = area;
    }

    this.form.action = this.uri();

    function complete() {
      initIframe();
      fn();
    }

    function initIframe() {
      if (self.iframe) {
        try {
          self.form.removeChild(self.iframe);
        } catch (e) {
          self.onError("jsonp polling iframe removal error", e);
        }
      }

      try {
        // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
        const html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
        iframe = document.createElement(html);
      } catch (e) {
        iframe = document.createElement("iframe");
        iframe.name = self.iframeId;
        iframe.src = "javascript:0";
      }

      iframe.id = self.iframeId;

      self.form.appendChild(iframe);
      self.iframe = iframe;
    }

    initIframe();

    // escape \n to prevent it from being converted into \r\n by some UAs
    // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
    data = data.replace(rEscapedNewline, "\\\n");
    this.area.value = data.replace(rNewline, "\\n");

    try {
      this.form.submit();
    } catch (e) {}

    if (this.iframe.attachEvent) {
      this.iframe.onreadystatechange = function() {
        if (self.iframe.readyState === "complete") {
          complete();
        }
      };
    } else {
      this.iframe.onload = complete;
    }
  }
}

module.exports = JSONPPolling;


/***/ }),

/***/ "./node_modules/engine.io-client/lib/transports/polling-xhr.js":
/*!*********************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transports/polling-xhr.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* global attachEvent */

const XMLHttpRequest = __webpack_require__(/*! xmlhttprequest-ssl */ "./node_modules/engine.io-client/lib/xmlhttprequest.js");
const Polling = __webpack_require__(/*! ./polling */ "./node_modules/engine.io-client/lib/transports/polling.js");
const Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");
const { pick } = __webpack_require__(/*! ../util */ "./node_modules/engine.io-client/lib/util.js");
const globalThis = __webpack_require__(/*! ../globalThis */ "./node_modules/engine.io-client/lib/globalThis.browser.js");

const debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("engine.io-client:polling-xhr");

/**
 * Empty function
 */

function empty() {}

const hasXHR2 = (function() {
  const xhr = new XMLHttpRequest({ xdomain: false });
  return null != xhr.responseType;
})();

class XHR extends Polling {
  /**
   * XHR Polling constructor.
   *
   * @param {Object} opts
   * @api public
   */
  constructor(opts) {
    super(opts);

    if (typeof location !== "undefined") {
      const isSSL = "https:" === location.protocol;
      let port = location.port;

      // some user agents have empty `location.port`
      if (!port) {
        port = isSSL ? 443 : 80;
      }

      this.xd =
        (typeof location !== "undefined" &&
          opts.hostname !== location.hostname) ||
        port !== opts.port;
      this.xs = opts.secure !== isSSL;
    }
    /**
     * XHR supports binary
     */
    const forceBase64 = opts && opts.forceBase64;
    this.supportsBinary = hasXHR2 && !forceBase64;
  }

  /**
   * Creates a request.
   *
   * @param {String} method
   * @api private
   */
  request(opts = {}) {
    Object.assign(opts, { xd: this.xd, xs: this.xs }, this.opts);
    return new Request(this.uri(), opts);
  }

  /**
   * Sends data.
   *
   * @param {String} data to send.
   * @param {Function} called upon flush.
   * @api private
   */
  doWrite(data, fn) {
    const req = this.request({
      method: "POST",
      data: data
    });
    const self = this;
    req.on("success", fn);
    req.on("error", function(err) {
      self.onError("xhr post error", err);
    });
  }

  /**
   * Starts a poll cycle.
   *
   * @api private
   */
  doPoll() {
    debug("xhr poll");
    const req = this.request();
    const self = this;
    req.on("data", function(data) {
      self.onData(data);
    });
    req.on("error", function(err) {
      self.onError("xhr poll error", err);
    });
    this.pollXhr = req;
  }
}

class Request extends Emitter {
  /**
   * Request constructor
   *
   * @param {Object} options
   * @api public
   */
  constructor(uri, opts) {
    super();
    this.opts = opts;

    this.method = opts.method || "GET";
    this.uri = uri;
    this.async = false !== opts.async;
    this.data = undefined !== opts.data ? opts.data : null;

    this.create();
  }

  /**
   * Creates the XHR object and sends the request.
   *
   * @api private
   */
  create() {
    const opts = pick(
      this.opts,
      "agent",
      "enablesXDR",
      "pfx",
      "key",
      "passphrase",
      "cert",
      "ca",
      "ciphers",
      "rejectUnauthorized"
    );
    opts.xdomain = !!this.opts.xd;
    opts.xscheme = !!this.opts.xs;

    const xhr = (this.xhr = new XMLHttpRequest(opts));
    const self = this;

    try {
      debug("xhr open %s: %s", this.method, this.uri);
      xhr.open(this.method, this.uri, this.async);
      try {
        if (this.opts.extraHeaders) {
          xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
          for (let i in this.opts.extraHeaders) {
            if (this.opts.extraHeaders.hasOwnProperty(i)) {
              xhr.setRequestHeader(i, this.opts.extraHeaders[i]);
            }
          }
        }
      } catch (e) {}

      if ("POST" === this.method) {
        try {
          xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch (e) {}
      }

      try {
        xhr.setRequestHeader("Accept", "*/*");
      } catch (e) {}

      // ie6 check
      if ("withCredentials" in xhr) {
        xhr.withCredentials = this.opts.withCredentials;
      }

      if (this.opts.requestTimeout) {
        xhr.timeout = this.opts.requestTimeout;
      }

      if (this.hasXDR()) {
        xhr.onload = function() {
          self.onLoad();
        };
        xhr.onerror = function() {
          self.onError(xhr.responseText);
        };
      } else {
        xhr.onreadystatechange = function() {
          if (4 !== xhr.readyState) return;
          if (200 === xhr.status || 1223 === xhr.status) {
            self.onLoad();
          } else {
            // make sure the `error` event handler that's user-set
            // does not throw in the same tick and gets caught here
            setTimeout(function() {
              self.onError(typeof xhr.status === "number" ? xhr.status : 0);
            }, 0);
          }
        };
      }

      debug("xhr data %s", this.data);
      xhr.send(this.data);
    } catch (e) {
      // Need to defer since .create() is called directly from the constructor
      // and thus the 'error' event can only be only bound *after* this exception
      // occurs.  Therefore, also, we cannot throw here at all.
      setTimeout(function() {
        self.onError(e);
      }, 0);
      return;
    }

    if (typeof document !== "undefined") {
      this.index = Request.requestsCount++;
      Request.requests[this.index] = this;
    }
  }

  /**
   * Called upon successful response.
   *
   * @api private
   */
  onSuccess() {
    this.emit("success");
    this.cleanup();
  }

  /**
   * Called if we have data.
   *
   * @api private
   */
  onData(data) {
    this.emit("data", data);
    this.onSuccess();
  }

  /**
   * Called upon error.
   *
   * @api private
   */
  onError(err) {
    this.emit("error", err);
    this.cleanup(true);
  }

  /**
   * Cleans up house.
   *
   * @api private
   */
  cleanup(fromError) {
    if ("undefined" === typeof this.xhr || null === this.xhr) {
      return;
    }
    // xmlhttprequest
    if (this.hasXDR()) {
      this.xhr.onload = this.xhr.onerror = empty;
    } else {
      this.xhr.onreadystatechange = empty;
    }

    if (fromError) {
      try {
        this.xhr.abort();
      } catch (e) {}
    }

    if (typeof document !== "undefined") {
      delete Request.requests[this.index];
    }

    this.xhr = null;
  }

  /**
   * Called upon load.
   *
   * @api private
   */
  onLoad() {
    const data = this.xhr.responseText;
    if (data !== null) {
      this.onData(data);
    }
  }

  /**
   * Check if it has XDomainRequest.
   *
   * @api private
   */
  hasXDR() {
    return typeof XDomainRequest !== "undefined" && !this.xs && this.enablesXDR;
  }

  /**
   * Aborts the request.
   *
   * @api public
   */
  abort() {
    this.cleanup();
  }
}

/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */

Request.requestsCount = 0;
Request.requests = {};

if (typeof document !== "undefined") {
  if (typeof attachEvent === "function") {
    attachEvent("onunload", unloadHandler);
  } else if (typeof addEventListener === "function") {
    const terminationEvent = "onpagehide" in globalThis ? "pagehide" : "unload";
    addEventListener(terminationEvent, unloadHandler, false);
  }
}

function unloadHandler() {
  for (let i in Request.requests) {
    if (Request.requests.hasOwnProperty(i)) {
      Request.requests[i].abort();
    }
  }
}

module.exports = XHR;
module.exports.Request = Request;


/***/ }),

/***/ "./node_modules/engine.io-client/lib/transports/polling.js":
/*!*****************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transports/polling.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Transport = __webpack_require__(/*! ../transport */ "./node_modules/engine.io-client/lib/transport.js");
const parseqs = __webpack_require__(/*! parseqs */ "./node_modules/parseqs/index.js");
const parser = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/lib/index.js");
const yeast = __webpack_require__(/*! yeast */ "./node_modules/yeast/index.js");

const debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("engine.io-client:polling");

class Polling extends Transport {
  /**
   * Transport name.
   */
  get name() {
    return "polling";
  }

  /**
   * Opens the socket (triggers polling). We write a PING message to determine
   * when the transport is open.
   *
   * @api private
   */
  doOpen() {
    this.poll();
  }

  /**
   * Pauses polling.
   *
   * @param {Function} callback upon buffers are flushed and transport is paused
   * @api private
   */
  pause(onPause) {
    const self = this;

    this.readyState = "pausing";

    function pause() {
      debug("paused");
      self.readyState = "paused";
      onPause();
    }

    if (this.polling || !this.writable) {
      let total = 0;

      if (this.polling) {
        debug("we are currently polling - waiting to pause");
        total++;
        this.once("pollComplete", function() {
          debug("pre-pause polling complete");
          --total || pause();
        });
      }

      if (!this.writable) {
        debug("we are currently writing - waiting to pause");
        total++;
        this.once("drain", function() {
          debug("pre-pause writing complete");
          --total || pause();
        });
      }
    } else {
      pause();
    }
  }

  /**
   * Starts polling cycle.
   *
   * @api public
   */
  poll() {
    debug("polling");
    this.polling = true;
    this.doPoll();
    this.emit("poll");
  }

  /**
   * Overloads onData to detect payloads.
   *
   * @api private
   */
  onData(data) {
    const self = this;
    debug("polling got data %s", data);
    const callback = function(packet, index, total) {
      // if its the first message we consider the transport open
      if ("opening" === self.readyState && packet.type === "open") {
        self.onOpen();
      }

      // if its a close packet, we close the ongoing requests
      if ("close" === packet.type) {
        self.onClose();
        return false;
      }

      // otherwise bypass onData and handle the message
      self.onPacket(packet);
    };

    // decode payload
    parser.decodePayload(data, this.socket.binaryType).forEach(callback);

    // if an event did not trigger closing
    if ("closed" !== this.readyState) {
      // if we got data we're not polling
      this.polling = false;
      this.emit("pollComplete");

      if ("open" === this.readyState) {
        this.poll();
      } else {
        debug('ignoring poll - transport state "%s"', this.readyState);
      }
    }
  }

  /**
   * For polling, send a close packet.
   *
   * @api private
   */
  doClose() {
    const self = this;

    function close() {
      debug("writing close packet");
      self.write([{ type: "close" }]);
    }

    if ("open" === this.readyState) {
      debug("transport open - closing");
      close();
    } else {
      // in case we're trying to close while
      // handshaking is in progress (GH-164)
      debug("transport not open - deferring close");
      this.once("open", close);
    }
  }

  /**
   * Writes a packets payload.
   *
   * @param {Array} data packets
   * @param {Function} drain callback
   * @api private
   */
  write(packets) {
    this.writable = false;

    parser.encodePayload(packets, data => {
      this.doWrite(data, () => {
        this.writable = true;
        this.emit("drain");
      });
    });
  }

  /**
   * Generates uri for connection.
   *
   * @api private
   */
  uri() {
    let query = this.query || {};
    const schema = this.opts.secure ? "https" : "http";
    let port = "";

    // cache busting is forced
    if (false !== this.opts.timestampRequests) {
      query[this.opts.timestampParam] = yeast();
    }

    if (!this.supportsBinary && !query.sid) {
      query.b64 = 1;
    }

    query = parseqs.encode(query);

    // avoid port if default for schema
    if (
      this.opts.port &&
      (("https" === schema && Number(this.opts.port) !== 443) ||
        ("http" === schema && Number(this.opts.port) !== 80))
    ) {
      port = ":" + this.opts.port;
    }

    // prepend ? to query
    if (query.length) {
      query = "?" + query;
    }

    const ipv6 = this.opts.hostname.indexOf(":") !== -1;
    return (
      schema +
      "://" +
      (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) +
      port +
      this.opts.path +
      query
    );
  }
}

module.exports = Polling;


/***/ }),

/***/ "./node_modules/engine.io-client/lib/transports/websocket-constructor.browser.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transports/websocket-constructor.browser.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const globalThis = __webpack_require__(/*! ../globalThis */ "./node_modules/engine.io-client/lib/globalThis.browser.js");

module.exports = {
  WebSocket: globalThis.WebSocket || globalThis.MozWebSocket,
  usingBrowserWebSocket: true,
  defaultBinaryType: "arraybuffer"
};


/***/ }),

/***/ "./node_modules/engine.io-client/lib/transports/websocket.js":
/*!*******************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transports/websocket.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Transport = __webpack_require__(/*! ../transport */ "./node_modules/engine.io-client/lib/transport.js");
const parser = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/lib/index.js");
const parseqs = __webpack_require__(/*! parseqs */ "./node_modules/parseqs/index.js");
const yeast = __webpack_require__(/*! yeast */ "./node_modules/yeast/index.js");
const { pick } = __webpack_require__(/*! ../util */ "./node_modules/engine.io-client/lib/util.js");
const {
  WebSocket,
  usingBrowserWebSocket,
  defaultBinaryType
} = __webpack_require__(/*! ./websocket-constructor */ "./node_modules/engine.io-client/lib/transports/websocket-constructor.browser.js");

const debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("engine.io-client:websocket");

// detect ReactNative environment
const isReactNative =
  typeof navigator !== "undefined" &&
  typeof navigator.product === "string" &&
  navigator.product.toLowerCase() === "reactnative";

class WS extends Transport {
  /**
   * WebSocket transport constructor.
   *
   * @api {Object} connection options
   * @api public
   */
  constructor(opts) {
    super(opts);

    this.supportsBinary = !opts.forceBase64;
  }

  /**
   * Transport name.
   *
   * @api public
   */
  get name() {
    return "websocket";
  }

  /**
   * Opens socket.
   *
   * @api private
   */
  doOpen() {
    if (!this.check()) {
      // let probe timeout
      return;
    }

    const uri = this.uri();
    const protocols = this.opts.protocols;

    // React Native only supports the 'headers' option, and will print a warning if anything else is passed
    const opts = isReactNative
      ? {}
      : pick(
          this.opts,
          "agent",
          "perMessageDeflate",
          "pfx",
          "key",
          "passphrase",
          "cert",
          "ca",
          "ciphers",
          "rejectUnauthorized",
          "localAddress",
          "protocolVersion",
          "origin",
          "maxPayload",
          "family",
          "checkServerIdentity"
        );

    if (this.opts.extraHeaders) {
      opts.headers = this.opts.extraHeaders;
    }

    try {
      this.ws =
        usingBrowserWebSocket && !isReactNative
          ? protocols
            ? new WebSocket(uri, protocols)
            : new WebSocket(uri)
          : new WebSocket(uri, protocols, opts);
    } catch (err) {
      return this.emit("error", err);
    }

    this.ws.binaryType = this.socket.binaryType || defaultBinaryType;

    this.addEventListeners();
  }

  /**
   * Adds event listeners to the socket
   *
   * @api private
   */
  addEventListeners() {
    const self = this;

    this.ws.onopen = function() {
      self.onOpen();
    };
    this.ws.onclose = function() {
      self.onClose();
    };
    this.ws.onmessage = function(ev) {
      self.onData(ev.data);
    };
    this.ws.onerror = function(e) {
      self.onError("websocket error", e);
    };
  }

  /**
   * Writes data to socket.
   *
   * @param {Array} array of packets.
   * @api private
   */
  write(packets) {
    const self = this;
    this.writable = false;

    // encodePacket efficient as it uses WS framing
    // no need for encodePayload
    let total = packets.length;
    let i = 0;
    const l = total;
    for (; i < l; i++) {
      (function(packet) {
        parser.encodePacket(packet, self.supportsBinary, function(data) {
          // always create a new object (GH-437)
          const opts = {};
          if (!usingBrowserWebSocket) {
            if (packet.options) {
              opts.compress = packet.options.compress;
            }

            if (self.opts.perMessageDeflate) {
              const len =
                "string" === typeof data
                  ? Buffer.byteLength(data)
                  : data.length;
              if (len < self.opts.perMessageDeflate.threshold) {
                opts.compress = false;
              }
            }
          }

          // Sometimes the websocket has already been closed but the browser didn't
          // have a chance of informing us about it yet, in that case send will
          // throw an error
          try {
            if (usingBrowserWebSocket) {
              // TypeError is thrown when passing the second argument on Safari
              self.ws.send(data);
            } else {
              self.ws.send(data, opts);
            }
          } catch (e) {
            debug("websocket closed before onclose event");
          }

          --total || done();
        });
      })(packets[i]);
    }

    function done() {
      self.emit("flush");

      // fake drain
      // defer to next tick to allow Socket to clear writeBuffer
      setTimeout(function() {
        self.writable = true;
        self.emit("drain");
      }, 0);
    }
  }

  /**
   * Called upon close
   *
   * @api private
   */
  onClose() {
    Transport.prototype.onClose.call(this);
  }

  /**
   * Closes socket.
   *
   * @api private
   */
  doClose() {
    if (typeof this.ws !== "undefined") {
      this.ws.close();
      this.ws = null;
    }
  }

  /**
   * Generates uri for connection.
   *
   * @api private
   */
  uri() {
    let query = this.query || {};
    const schema = this.opts.secure ? "wss" : "ws";
    let port = "";

    // avoid port if default for schema
    if (
      this.opts.port &&
      (("wss" === schema && Number(this.opts.port) !== 443) ||
        ("ws" === schema && Number(this.opts.port) !== 80))
    ) {
      port = ":" + this.opts.port;
    }

    // append timestamp to URI
    if (this.opts.timestampRequests) {
      query[this.opts.timestampParam] = yeast();
    }

    // communicate binary support capabilities
    if (!this.supportsBinary) {
      query.b64 = 1;
    }

    query = parseqs.encode(query);

    // prepend ? to query
    if (query.length) {
      query = "?" + query;
    }

    const ipv6 = this.opts.hostname.indexOf(":") !== -1;
    return (
      schema +
      "://" +
      (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) +
      port +
      this.opts.path +
      query
    );
  }

  /**
   * Feature detection for WebSocket.
   *
   * @return {Boolean} whether this transport is available.
   * @api public
   */
  check() {
    return (
      !!WebSocket &&
      !("__initialize" in WebSocket && this.name === WS.prototype.name)
    );
  }
}

module.exports = WS;


/***/ }),

/***/ "./node_modules/engine.io-client/lib/util.js":
/*!***************************************************!*\
  !*** ./node_modules/engine.io-client/lib/util.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports.pick = (obj, ...attr) => {
  return attr.reduce((acc, k) => {
    if (obj.hasOwnProperty(k)) {
      acc[k] = obj[k];
    }
    return acc;
  }, {});
};


/***/ }),

/***/ "./node_modules/engine.io-client/lib/xmlhttprequest.js":
/*!*************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/xmlhttprequest.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// browser shim for xmlhttprequest module

const hasCORS = __webpack_require__(/*! has-cors */ "./node_modules/has-cors/index.js");
const globalThis = __webpack_require__(/*! ./globalThis */ "./node_modules/engine.io-client/lib/globalThis.browser.js");

module.exports = function(opts) {
  const xdomain = opts.xdomain;

  // scheme must be same when usign XDomainRequest
  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
  const xscheme = opts.xscheme;

  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
  // https://github.com/Automattic/engine.io-client/pull/217
  const enablesXDR = opts.enablesXDR;

  // XMLHttpRequest can be disabled on IE
  try {
    if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
      return new XMLHttpRequest();
    }
  } catch (e) {}

  // Use XDomainRequest for IE8 if enablesXDR is true
  // because loading bar keeps flashing when using jsonp-polling
  // https://github.com/yujiosaka/socke.io-ie8-loading-example
  try {
    if ("undefined" !== typeof XDomainRequest && !xscheme && enablesXDR) {
      return new XDomainRequest();
    }
  } catch (e) {}

  if (!xdomain) {
    try {
      return new globalThis[["Active"].concat("Object").join("X")](
        "Microsoft.XMLHTTP"
      );
    } catch (e) {}
  }
};


/***/ }),

/***/ "./node_modules/engine.io-parser/lib/commons.js":
/*!******************************************************!*\
  !*** ./node_modules/engine.io-parser/lib/commons.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

const PACKET_TYPES = Object.create(null); // no Map = no polyfill
PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";

const PACKET_TYPES_REVERSE = Object.create(null);
Object.keys(PACKET_TYPES).forEach(key => {
  PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});

const ERROR_PACKET = { type: "error", data: "parser error" };

module.exports = {
  PACKET_TYPES,
  PACKET_TYPES_REVERSE,
  ERROR_PACKET
};


/***/ }),

/***/ "./node_modules/engine.io-parser/lib/decodePacket.browser.js":
/*!*******************************************************************!*\
  !*** ./node_modules/engine.io-parser/lib/decodePacket.browser.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { PACKET_TYPES_REVERSE, ERROR_PACKET } = __webpack_require__(/*! ./commons */ "./node_modules/engine.io-parser/lib/commons.js");

const withNativeArrayBuffer = typeof ArrayBuffer === "function";

let base64decoder;
if (withNativeArrayBuffer) {
  base64decoder = __webpack_require__(/*! base64-arraybuffer */ "./node_modules/base64-arraybuffer/lib/base64-arraybuffer.js");
}

const decodePacket = (encodedPacket, binaryType) => {
  if (typeof encodedPacket !== "string") {
    return {
      type: "message",
      data: mapBinary(encodedPacket, binaryType)
    };
  }
  const type = encodedPacket.charAt(0);
  if (type === "b") {
    return {
      type: "message",
      data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
    };
  }
  const packetType = PACKET_TYPES_REVERSE[type];
  if (!packetType) {
    return ERROR_PACKET;
  }
  return encodedPacket.length > 1
    ? {
        type: PACKET_TYPES_REVERSE[type],
        data: encodedPacket.substring(1)
      }
    : {
        type: PACKET_TYPES_REVERSE[type]
      };
};

const decodeBase64Packet = (data, binaryType) => {
  if (base64decoder) {
    const decoded = base64decoder.decode(data);
    return mapBinary(decoded, binaryType);
  } else {
    return { base64: true, data }; // fallback for old browsers
  }
};

const mapBinary = (data, binaryType) => {
  switch (binaryType) {
    case "blob":
      return data instanceof ArrayBuffer ? new Blob([data]) : data;
    case "arraybuffer":
    default:
      return data; // assuming the data is already an ArrayBuffer
  }
};

module.exports = decodePacket;


/***/ }),

/***/ "./node_modules/engine.io-parser/lib/encodePacket.browser.js":
/*!*******************************************************************!*\
  !*** ./node_modules/engine.io-parser/lib/encodePacket.browser.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { PACKET_TYPES } = __webpack_require__(/*! ./commons */ "./node_modules/engine.io-parser/lib/commons.js");

const withNativeBlob =
  typeof Blob === "function" ||
  (typeof Blob !== "undefined" &&
    Object.prototype.toString.call(Blob) === "[object BlobConstructor]");
const withNativeArrayBuffer = typeof ArrayBuffer === "function";

// ArrayBuffer.isView method is not defined in IE10
const isView = obj => {
  return typeof ArrayBuffer.isView === "function"
    ? ArrayBuffer.isView(obj)
    : obj && obj.buffer instanceof ArrayBuffer;
};

const encodePacket = ({ type, data }, supportsBinary, callback) => {
  if (withNativeBlob && data instanceof Blob) {
    if (supportsBinary) {
      return callback(data);
    } else {
      return encodeBlobAsBase64(data, callback);
    }
  } else if (
    withNativeArrayBuffer &&
    (data instanceof ArrayBuffer || isView(data))
  ) {
    if (supportsBinary) {
      return callback(data instanceof ArrayBuffer ? data : data.buffer);
    } else {
      return encodeBlobAsBase64(new Blob([data]), callback);
    }
  }
  // plain string
  return callback(PACKET_TYPES[type] + (data || ""));
};

const encodeBlobAsBase64 = (data, callback) => {
  const fileReader = new FileReader();
  fileReader.onload = function() {
    const content = fileReader.result.split(",")[1];
    callback("b" + content);
  };
  return fileReader.readAsDataURL(data);
};

module.exports = encodePacket;


/***/ }),

/***/ "./node_modules/engine.io-parser/lib/index.js":
/*!****************************************************!*\
  !*** ./node_modules/engine.io-parser/lib/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const encodePacket = __webpack_require__(/*! ./encodePacket */ "./node_modules/engine.io-parser/lib/encodePacket.browser.js");
const decodePacket = __webpack_require__(/*! ./decodePacket */ "./node_modules/engine.io-parser/lib/decodePacket.browser.js");

const SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text

const encodePayload = (packets, callback) => {
  // some packets may be added to the array while encoding, so the initial length must be saved
  const length = packets.length;
  const encodedPackets = new Array(length);
  let count = 0;

  packets.forEach((packet, i) => {
    // force base64 encoding for binary packets
    encodePacket(packet, false, encodedPacket => {
      encodedPackets[i] = encodedPacket;
      if (++count === length) {
        callback(encodedPackets.join(SEPARATOR));
      }
    });
  });
};

const decodePayload = (encodedPayload, binaryType) => {
  const encodedPackets = encodedPayload.split(SEPARATOR);
  const packets = [];
  for (let i = 0; i < encodedPackets.length; i++) {
    const decodedPacket = decodePacket(encodedPackets[i], binaryType);
    packets.push(decodedPacket);
    if (decodedPacket.type === "error") {
      break;
    }
  }
  return packets;
};

module.exports = {
  protocol: 4,
  encodePacket,
  encodePayload,
  decodePacket,
  decodePayload
};


/***/ }),

/***/ "./node_modules/has-cors/index.js":
/*!****************************************!*\
  !*** ./node_modules/has-cors/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * Module exports.
 *
 * Logic borrowed from Modernizr:
 *
 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
 */

try {
  module.exports = typeof XMLHttpRequest !== 'undefined' &&
    'withCredentials' in new XMLHttpRequest();
} catch (err) {
  // if XMLHttp support is disabled in IE then it will throw
  // when trying to create
  module.exports = false;
}


/***/ }),

/***/ "./node_modules/ms/index.js":
/*!**********************************!*\
  !*** ./node_modules/ms/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ "./node_modules/parseqs/index.js":
/*!***************************************!*\
  !*** ./node_modules/parseqs/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */

exports.encode = function (obj) {
  var str = '';

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }

  return str;
};

/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */

exports.decode = function(qs){
  var qry = {};
  var pairs = qs.split('&');
  for (var i = 0, l = pairs.length; i < l; i++) {
    var pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
};


/***/ }),

/***/ "./node_modules/parseuri/index.js":
/*!****************************************!*\
  !*** ./node_modules/parseuri/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

var parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];

module.exports = function parseuri(str) {
    var src = str,
        b = str.indexOf('['),
        e = str.indexOf(']');

    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }

    var m = re.exec(str || ''),
        uri = {},
        i = 14;

    while (i--) {
        uri[parts[i]] = m[i] || '';
    }

    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }

    uri.pathNames = pathNames(uri, uri['path']);
    uri.queryKey = queryKey(uri, uri['query']);

    return uri;
};

function pathNames(obj, path) {
    var regx = /\/{2,9}/g,
        names = path.replace(regx, "/").split("/");

    if (path.substr(0, 1) == '/' || path.length === 0) {
        names.splice(0, 1);
    }
    if (path.substr(path.length - 1, 1) == '/') {
        names.splice(names.length - 1, 1);
    }

    return names;
}

function queryKey(uri, query) {
    var data = {};

    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {
        if ($1) {
            data[$1] = $2;
        }
    });

    return data;
}


/***/ }),

/***/ "./node_modules/socket.io-client/build/index.js":
/*!******************************************************!*\
  !*** ./node_modules/socket.io-client/build/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Socket = exports.io = exports.Manager = exports.protocol = void 0;
const url_1 = __webpack_require__(/*! ./url */ "./node_modules/socket.io-client/build/url.js");
const manager_1 = __webpack_require__(/*! ./manager */ "./node_modules/socket.io-client/build/manager.js");
const socket_1 = __webpack_require__(/*! ./socket */ "./node_modules/socket.io-client/build/socket.js");
Object.defineProperty(exports, "Socket", { enumerable: true, get: function () { return socket_1.Socket; } });
const debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("socket.io-client");
/**
 * Module exports.
 */
module.exports = exports = lookup;
/**
 * Managers cache.
 */
const cache = (exports.managers = {});
function lookup(uri, opts) {
    if (typeof uri === "object") {
        opts = uri;
        uri = undefined;
    }
    opts = opts || {};
    const parsed = url_1.url(uri, opts.path);
    const source = parsed.source;
    const id = parsed.id;
    const path = parsed.path;
    const sameNamespace = cache[id] && path in cache[id]["nsps"];
    const newConnection = opts.forceNew ||
        opts["force new connection"] ||
        false === opts.multiplex ||
        sameNamespace;
    let io;
    if (newConnection) {
        debug("ignoring socket cache for %s", source);
        io = new manager_1.Manager(source, opts);
    }
    else {
        if (!cache[id]) {
            debug("new io instance for %s", source);
            cache[id] = new manager_1.Manager(source, opts);
        }
        io = cache[id];
    }
    if (parsed.query && !opts.query) {
        opts.query = parsed.queryKey;
    }
    return io.socket(parsed.path, opts);
}
exports.io = lookup;
/**
 * Protocol version.
 *
 * @public
 */
var socket_io_parser_1 = __webpack_require__(/*! socket.io-parser */ "./node_modules/socket.io-parser/dist/index.js");
Object.defineProperty(exports, "protocol", { enumerable: true, get: function () { return socket_io_parser_1.protocol; } });
/**
 * `connect`.
 *
 * @param {String} uri
 * @public
 */
exports.connect = lookup;
/**
 * Expose constructors for standalone build.
 *
 * @public
 */
var manager_2 = __webpack_require__(/*! ./manager */ "./node_modules/socket.io-client/build/manager.js");
Object.defineProperty(exports, "Manager", { enumerable: true, get: function () { return manager_2.Manager; } });


/***/ }),

/***/ "./node_modules/socket.io-client/build/manager.js":
/*!********************************************************!*\
  !*** ./node_modules/socket.io-client/build/manager.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
const eio = __webpack_require__(/*! engine.io-client */ "./node_modules/engine.io-client/lib/index.js");
const socket_1 = __webpack_require__(/*! ./socket */ "./node_modules/socket.io-client/build/socket.js");
const Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");
const parser = __webpack_require__(/*! socket.io-parser */ "./node_modules/socket.io-parser/dist/index.js");
const on_1 = __webpack_require__(/*! ./on */ "./node_modules/socket.io-client/build/on.js");
const Backoff = __webpack_require__(/*! backo2 */ "./node_modules/backo2/index.js");
const debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("socket.io-client:manager");
class Manager extends Emitter {
    constructor(uri, opts) {
        super();
        this.nsps = {};
        this.subs = [];
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = undefined;
        }
        opts = opts || {};
        opts.path = opts.path || "/socket.io";
        this.opts = opts;
        this.reconnection(opts.reconnection !== false);
        this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
        this.reconnectionDelay(opts.reconnectionDelay || 1000);
        this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
        this.randomizationFactor(opts.randomizationFactor || 0.5);
        this.backoff = new Backoff({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor(),
        });
        this.timeout(null == opts.timeout ? 20000 : opts.timeout);
        this._readyState = "closed";
        this.uri = uri;
        const _parser = opts.parser || parser;
        this.encoder = new _parser.Encoder();
        this.decoder = new _parser.Decoder();
        this._autoConnect = opts.autoConnect !== false;
        if (this._autoConnect)
            this.open();
    }
    reconnection(v) {
        if (!arguments.length)
            return this._reconnection;
        this._reconnection = !!v;
        return this;
    }
    reconnectionAttempts(v) {
        if (v === undefined)
            return this._reconnectionAttempts;
        this._reconnectionAttempts = v;
        return this;
    }
    reconnectionDelay(v) {
        var _a;
        if (v === undefined)
            return this._reconnectionDelay;
        this._reconnectionDelay = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
        return this;
    }
    randomizationFactor(v) {
        var _a;
        if (v === undefined)
            return this._randomizationFactor;
        this._randomizationFactor = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
        return this;
    }
    reconnectionDelayMax(v) {
        var _a;
        if (v === undefined)
            return this._reconnectionDelayMax;
        this._reconnectionDelayMax = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
        return this;
    }
    timeout(v) {
        if (!arguments.length)
            return this._timeout;
        this._timeout = v;
        return this;
    }
    /**
     * Starts trying to reconnect if reconnection is enabled and we have not
     * started reconnecting yet
     *
     * @private
     */
    maybeReconnectOnOpen() {
        // Only try to reconnect if it's the first time we're connecting
        if (!this._reconnecting &&
            this._reconnection &&
            this.backoff.attempts === 0) {
            // keeps reconnection from firing twice for the same reconnection loop
            this.reconnect();
        }
    }
    /**
     * Sets the current transport `socket`.
     *
     * @param {Function} fn - optional, callback
     * @return self
     * @public
     */
    open(fn) {
        debug("readyState %s", this._readyState);
        if (~this._readyState.indexOf("open"))
            return this;
        debug("opening %s", this.uri);
        this.engine = eio(this.uri, this.opts);
        const socket = this.engine;
        const self = this;
        this._readyState = "opening";
        this.skipReconnect = false;
        // emit `open`
        const openSubDestroy = on_1.on(socket, "open", function () {
            self.onopen();
            fn && fn();
        });
        // emit `error`
        const errorSub = on_1.on(socket, "error", (err) => {
            debug("error");
            self.cleanup();
            self._readyState = "closed";
            super.emit("error", err);
            if (fn) {
                fn(err);
            }
            else {
                // Only do this if there is no fn to handle the error
                self.maybeReconnectOnOpen();
            }
        });
        if (false !== this._timeout) {
            const timeout = this._timeout;
            debug("connect attempt will timeout after %d", timeout);
            if (timeout === 0) {
                openSubDestroy(); // prevents a race condition with the 'open' event
            }
            // set timer
            const timer = setTimeout(() => {
                debug("connect attempt timed out after %d", timeout);
                openSubDestroy();
                socket.close();
                socket.emit("error", new Error("timeout"));
            }, timeout);
            this.subs.push(function subDestroy() {
                clearTimeout(timer);
            });
        }
        this.subs.push(openSubDestroy);
        this.subs.push(errorSub);
        return this;
    }
    /**
     * Alias for open()
     *
     * @return self
     * @public
     */
    connect(fn) {
        return this.open(fn);
    }
    /**
     * Called upon transport open.
     *
     * @private
     */
    onopen() {
        debug("open");
        // clear old subs
        this.cleanup();
        // mark as open
        this._readyState = "open";
        super.emit("open");
        // add new subs
        const socket = this.engine;
        this.subs.push(on_1.on(socket, "ping", this.onping.bind(this)), on_1.on(socket, "data", this.ondata.bind(this)), on_1.on(socket, "error", this.onerror.bind(this)), on_1.on(socket, "close", this.onclose.bind(this)), on_1.on(this.decoder, "decoded", this.ondecoded.bind(this)));
    }
    /**
     * Called upon a ping.
     *
     * @private
     */
    onping() {
        super.emit("ping");
    }
    /**
     * Called with data.
     *
     * @private
     */
    ondata(data) {
        this.decoder.add(data);
    }
    /**
     * Called when parser fully decodes a packet.
     *
     * @private
     */
    ondecoded(packet) {
        super.emit("packet", packet);
    }
    /**
     * Called upon socket error.
     *
     * @private
     */
    onerror(err) {
        debug("error", err);
        super.emit("error", err);
    }
    /**
     * Creates a new socket for the given `nsp`.
     *
     * @return {Socket}
     * @public
     */
    socket(nsp, opts) {
        let socket = this.nsps[nsp];
        if (!socket) {
            socket = new socket_1.Socket(this, nsp, opts);
            this.nsps[nsp] = socket;
        }
        return socket;
    }
    /**
     * Called upon a socket close.
     *
     * @param socket
     * @private
     */
    _destroy(socket) {
        const nsps = Object.keys(this.nsps);
        for (const nsp of nsps) {
            const socket = this.nsps[nsp];
            if (socket.active) {
                debug("socket %s is still active, skipping close", nsp);
                return;
            }
        }
        this._close();
    }
    /**
     * Writes a packet.
     *
     * @param packet
     * @private
     */
    _packet(packet) {
        debug("writing packet %j", packet);
        const encodedPackets = this.encoder.encode(packet);
        for (let i = 0; i < encodedPackets.length; i++) {
            this.engine.write(encodedPackets[i], packet.options);
        }
    }
    /**
     * Clean up transport subscriptions and packet buffer.
     *
     * @private
     */
    cleanup() {
        debug("cleanup");
        this.subs.forEach((subDestroy) => subDestroy());
        this.subs.length = 0;
        this.decoder.destroy();
    }
    /**
     * Close the current socket.
     *
     * @private
     */
    _close() {
        debug("disconnect");
        this.skipReconnect = true;
        this._reconnecting = false;
        if ("opening" === this._readyState) {
            // `onclose` will not fire because
            // an open event never happened
            this.cleanup();
        }
        this.backoff.reset();
        this._readyState = "closed";
        if (this.engine)
            this.engine.close();
    }
    /**
     * Alias for close()
     *
     * @private
     */
    disconnect() {
        return this._close();
    }
    /**
     * Called upon engine close.
     *
     * @private
     */
    onclose(reason) {
        debug("onclose");
        this.cleanup();
        this.backoff.reset();
        this._readyState = "closed";
        super.emit("close", reason);
        if (this._reconnection && !this.skipReconnect) {
            this.reconnect();
        }
    }
    /**
     * Attempt a reconnection.
     *
     * @private
     */
    reconnect() {
        if (this._reconnecting || this.skipReconnect)
            return this;
        const self = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) {
            debug("reconnect failed");
            this.backoff.reset();
            super.emit("reconnect_failed");
            this._reconnecting = false;
        }
        else {
            const delay = this.backoff.duration();
            debug("will wait %dms before reconnect attempt", delay);
            this._reconnecting = true;
            const timer = setTimeout(() => {
                if (self.skipReconnect)
                    return;
                debug("attempting reconnect");
                super.emit("reconnect_attempt", self.backoff.attempts);
                // check again for the case socket closed in above events
                if (self.skipReconnect)
                    return;
                self.open((err) => {
                    if (err) {
                        debug("reconnect attempt error");
                        self._reconnecting = false;
                        self.reconnect();
                        super.emit("reconnect_error", err);
                    }
                    else {
                        debug("reconnect success");
                        self.onreconnect();
                    }
                });
            }, delay);
            this.subs.push(function subDestroy() {
                clearTimeout(timer);
            });
        }
    }
    /**
     * Called upon successful reconnect.
     *
     * @private
     */
    onreconnect() {
        const attempt = this.backoff.attempts;
        this._reconnecting = false;
        this.backoff.reset();
        super.emit("reconnect", attempt);
    }
}
exports.Manager = Manager;


/***/ }),

/***/ "./node_modules/socket.io-client/build/on.js":
/*!***************************************************!*\
  !*** ./node_modules/socket.io-client/build/on.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.on = void 0;
function on(obj, ev, fn) {
    obj.on(ev, fn);
    return function subDestroy() {
        obj.off(ev, fn);
    };
}
exports.on = on;


/***/ }),

/***/ "./node_modules/socket.io-client/build/socket.js":
/*!*******************************************************!*\
  !*** ./node_modules/socket.io-client/build/socket.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Socket = void 0;
const socket_io_parser_1 = __webpack_require__(/*! socket.io-parser */ "./node_modules/socket.io-parser/dist/index.js");
const Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");
const on_1 = __webpack_require__(/*! ./on */ "./node_modules/socket.io-client/build/on.js");
const debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("socket.io-client:socket");
/**
 * Internal events.
 * These events can't be emitted by the user.
 */
const RESERVED_EVENTS = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
    newListener: 1,
    removeListener: 1,
});
class Socket extends Emitter {
    /**
     * `Socket` constructor.
     *
     * @public
     */
    constructor(io, nsp, opts) {
        super();
        this.receiveBuffer = [];
        this.sendBuffer = [];
        this.ids = 0;
        this.acks = {};
        this.flags = {};
        this.io = io;
        this.nsp = nsp;
        this.ids = 0;
        this.acks = {};
        this.receiveBuffer = [];
        this.sendBuffer = [];
        this.connected = false;
        this.disconnected = true;
        this.flags = {};
        if (opts && opts.auth) {
            this.auth = opts.auth;
        }
        if (this.io._autoConnect)
            this.open();
    }
    /**
     * Subscribe to open, close and packet events
     *
     * @private
     */
    subEvents() {
        if (this.subs)
            return;
        const io = this.io;
        this.subs = [
            on_1.on(io, "open", this.onopen.bind(this)),
            on_1.on(io, "packet", this.onpacket.bind(this)),
            on_1.on(io, "error", this.onerror.bind(this)),
            on_1.on(io, "close", this.onclose.bind(this)),
        ];
    }
    /**
     * Whether the Socket will try to reconnect when its Manager connects or reconnects
     */
    get active() {
        return !!this.subs;
    }
    /**
     * "Opens" the socket.
     *
     * @public
     */
    connect() {
        if (this.connected)
            return this;
        this.subEvents();
        if (!this.io["_reconnecting"])
            this.io.open(); // ensure open
        if ("open" === this.io._readyState)
            this.onopen();
        return this;
    }
    /**
     * Alias for connect()
     */
    open() {
        return this.connect();
    }
    /**
     * Sends a `message` event.
     *
     * @return self
     * @public
     */
    send(...args) {
        args.unshift("message");
        this.emit.apply(this, args);
        return this;
    }
    /**
     * Override `emit`.
     * If the event is in `events`, it's emitted normally.
     *
     * @param ev - event name
     * @return self
     * @public
     */
    emit(ev, ...args) {
        if (RESERVED_EVENTS.hasOwnProperty(ev)) {
            throw new Error('"' + ev + '" is a reserved event name');
        }
        args.unshift(ev);
        const packet = {
            type: socket_io_parser_1.PacketType.EVENT,
            data: args,
        };
        packet.options = {};
        packet.options.compress = this.flags.compress !== false;
        // event ack callback
        if ("function" === typeof args[args.length - 1]) {
            debug("emitting packet with ack id %d", this.ids);
            this.acks[this.ids] = args.pop();
            packet.id = this.ids++;
        }
        const isTransportWritable = this.io.engine &&
            this.io.engine.transport &&
            this.io.engine.transport.writable;
        const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
        if (discardPacket) {
            debug("discard packet as the transport is not currently writable");
        }
        else if (this.connected) {
            this.packet(packet);
        }
        else {
            this.sendBuffer.push(packet);
        }
        this.flags = {};
        return this;
    }
    /**
     * Sends a packet.
     *
     * @param packet
     * @private
     */
    packet(packet) {
        packet.nsp = this.nsp;
        this.io._packet(packet);
    }
    /**
     * Called upon engine `open`.
     *
     * @private
     */
    onopen() {
        debug("transport is open - connecting");
        if (typeof this.auth == "function") {
            this.auth((data) => {
                this.packet({ type: socket_io_parser_1.PacketType.CONNECT, data });
            });
        }
        else {
            this.packet({ type: socket_io_parser_1.PacketType.CONNECT, data: this.auth });
        }
    }
    /**
     * Called upon engine or manager `error`.
     *
     * @param err
     * @private
     */
    onerror(err) {
        if (!this.connected) {
            super.emit("connect_error", err);
        }
    }
    /**
     * Called upon engine `close`.
     *
     * @param reason
     * @private
     */
    onclose(reason) {
        debug("close (%s)", reason);
        this.connected = false;
        this.disconnected = true;
        delete this.id;
        super.emit("disconnect", reason);
    }
    /**
     * Called with socket packet.
     *
     * @param packet
     * @private
     */
    onpacket(packet) {
        const sameNamespace = packet.nsp === this.nsp;
        if (!sameNamespace)
            return;
        switch (packet.type) {
            case socket_io_parser_1.PacketType.CONNECT:
                if (packet.data && packet.data.sid) {
                    const id = packet.data.sid;
                    this.onconnect(id);
                }
                else {
                    super.emit("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
                }
                break;
            case socket_io_parser_1.PacketType.EVENT:
                this.onevent(packet);
                break;
            case socket_io_parser_1.PacketType.BINARY_EVENT:
                this.onevent(packet);
                break;
            case socket_io_parser_1.PacketType.ACK:
                this.onack(packet);
                break;
            case socket_io_parser_1.PacketType.BINARY_ACK:
                this.onack(packet);
                break;
            case socket_io_parser_1.PacketType.DISCONNECT:
                this.ondisconnect();
                break;
            case socket_io_parser_1.PacketType.CONNECT_ERROR:
                const err = new Error(packet.data.message);
                // @ts-ignore
                err.data = packet.data.data;
                super.emit("connect_error", err);
                break;
        }
    }
    /**
     * Called upon a server event.
     *
     * @param packet
     * @private
     */
    onevent(packet) {
        const args = packet.data || [];
        debug("emitting event %j", args);
        if (null != packet.id) {
            debug("attaching ack callback to event");
            args.push(this.ack(packet.id));
        }
        if (this.connected) {
            this.emitEvent(args);
        }
        else {
            this.receiveBuffer.push(Object.freeze(args));
        }
    }
    emitEvent(args) {
        if (this._anyListeners && this._anyListeners.length) {
            const listeners = this._anyListeners.slice();
            for (const listener of listeners) {
                listener.apply(this, args);
            }
        }
        super.emit.apply(this, args);
    }
    /**
     * Produces an ack callback to emit with an event.
     *
     * @private
     */
    ack(id) {
        const self = this;
        let sent = false;
        return function (...args) {
            // prevent double callbacks
            if (sent)
                return;
            sent = true;
            debug("sending ack %j", args);
            self.packet({
                type: socket_io_parser_1.PacketType.ACK,
                id: id,
                data: args,
            });
        };
    }
    /**
     * Called upon a server acknowlegement.
     *
     * @param packet
     * @private
     */
    onack(packet) {
        const ack = this.acks[packet.id];
        if ("function" === typeof ack) {
            debug("calling ack %s with %j", packet.id, packet.data);
            ack.apply(this, packet.data);
            delete this.acks[packet.id];
        }
        else {
            debug("bad ack %s", packet.id);
        }
    }
    /**
     * Called upon server connect.
     *
     * @private
     */
    onconnect(id) {
        debug("socket connected with id %s", id);
        this.id = id;
        this.connected = true;
        this.disconnected = false;
        super.emit("connect");
        this.emitBuffered();
    }
    /**
     * Emit buffered events (received and emitted).
     *
     * @private
     */
    emitBuffered() {
        this.receiveBuffer.forEach((args) => this.emitEvent(args));
        this.receiveBuffer = [];
        this.sendBuffer.forEach((packet) => this.packet(packet));
        this.sendBuffer = [];
    }
    /**
     * Called upon server disconnect.
     *
     * @private
     */
    ondisconnect() {
        debug("server disconnect (%s)", this.nsp);
        this.destroy();
        this.onclose("io server disconnect");
    }
    /**
     * Called upon forced client/server side disconnections,
     * this method ensures the manager stops tracking us and
     * that reconnections don't get triggered for this.
     *
     * @private
     */
    destroy() {
        if (this.subs) {
            // clean subscriptions to avoid reconnections
            this.subs.forEach((subDestroy) => subDestroy());
            this.subs = undefined;
        }
        this.io["_destroy"](this);
    }
    /**
     * Disconnects the socket manually.
     *
     * @return self
     * @public
     */
    disconnect() {
        if (this.connected) {
            debug("performing disconnect (%s)", this.nsp);
            this.packet({ type: socket_io_parser_1.PacketType.DISCONNECT });
        }
        // remove socket from pool
        this.destroy();
        if (this.connected) {
            // fire events
            this.onclose("io client disconnect");
        }
        return this;
    }
    /**
     * Alias for disconnect()
     *
     * @return self
     * @public
     */
    close() {
        return this.disconnect();
    }
    /**
     * Sets the compress flag.
     *
     * @param compress - if `true`, compresses the sending data
     * @return self
     * @public
     */
    compress(compress) {
        this.flags.compress = compress;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
     * ready to send messages.
     *
     * @returns self
     * @public
     */
    get volatile() {
        this.flags.volatile = true;
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * @param listener
     * @public
     */
    onAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @param listener
     * @public
     */
    prependAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @param listener
     * @public
     */
    offAny(listener) {
        if (!this._anyListeners) {
            return this;
        }
        if (listener) {
            const listeners = this._anyListeners;
            for (let i = 0; i < listeners.length; i++) {
                if (listener === listeners[i]) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
        }
        else {
            this._anyListeners = [];
        }
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     *
     * @public
     */
    listenersAny() {
        return this._anyListeners || [];
    }
}
exports.Socket = Socket;


/***/ }),

/***/ "./node_modules/socket.io-client/build/url.js":
/*!****************************************************!*\
  !*** ./node_modules/socket.io-client/build/url.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.url = void 0;
const parseuri = __webpack_require__(/*! parseuri */ "./node_modules/parseuri/index.js");
const debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("socket.io-client:url");
/**
 * URL parser.
 *
 * @param uri - url
 * @param path - the request path of the connection
 * @param loc - An object meant to mimic window.location.
 *        Defaults to window.location.
 * @public
 */
function url(uri, path = "", loc) {
    let obj = uri;
    // default to window.location
    loc = loc || (typeof location !== "undefined" && location);
    if (null == uri)
        uri = loc.protocol + "//" + loc.host;
    // relative path support
    if (typeof uri === "string") {
        if ("/" === uri.charAt(0)) {
            if ("/" === uri.charAt(1)) {
                uri = loc.protocol + uri;
            }
            else {
                uri = loc.host + uri;
            }
        }
        if (!/^(https?|wss?):\/\//.test(uri)) {
            debug("protocol-less url %s", uri);
            if ("undefined" !== typeof loc) {
                uri = loc.protocol + "//" + uri;
            }
            else {
                uri = "https://" + uri;
            }
        }
        // parse
        debug("parse %s", uri);
        obj = parseuri(uri);
    }
    // make sure we treat `localhost:80` and `localhost` equally
    if (!obj.port) {
        if (/^(http|ws)$/.test(obj.protocol)) {
            obj.port = "80";
        }
        else if (/^(http|ws)s$/.test(obj.protocol)) {
            obj.port = "443";
        }
    }
    obj.path = obj.path || "/";
    const ipv6 = obj.host.indexOf(":") !== -1;
    const host = ipv6 ? "[" + obj.host + "]" : obj.host;
    // define unique id
    obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
    // define href
    obj.href =
        obj.protocol +
            "://" +
            host +
            (loc && loc.port === obj.port ? "" : ":" + obj.port);
    return obj;
}
exports.url = url;


/***/ }),

/***/ "./node_modules/socket.io-parser/dist/binary.js":
/*!******************************************************!*\
  !*** ./node_modules/socket.io-parser/dist/binary.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.reconstructPacket = exports.deconstructPacket = void 0;
const is_binary_1 = __webpack_require__(/*! ./is-binary */ "./node_modules/socket.io-parser/dist/is-binary.js");
/**
 * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @public
 */
function deconstructPacket(packet) {
    const buffers = [];
    const packetData = packet.data;
    const pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length; // number of binary 'attachments'
    return { packet: pack, buffers: buffers };
}
exports.deconstructPacket = deconstructPacket;
function _deconstructPacket(data, buffers) {
    if (!data)
        return data;
    if (is_binary_1.isBinary(data)) {
        const placeholder = { _placeholder: true, num: buffers.length };
        buffers.push(data);
        return placeholder;
    }
    else if (Array.isArray(data)) {
        const newData = new Array(data.length);
        for (let i = 0; i < data.length; i++) {
            newData[i] = _deconstructPacket(data[i], buffers);
        }
        return newData;
    }
    else if (typeof data === "object" && !(data instanceof Date)) {
        const newData = {};
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                newData[key] = _deconstructPacket(data[key], buffers);
            }
        }
        return newData;
    }
    return data;
}
/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @public
 */
function reconstructPacket(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    packet.attachments = undefined; // no longer useful
    return packet;
}
exports.reconstructPacket = reconstructPacket;
function _reconstructPacket(data, buffers) {
    if (!data)
        return data;
    if (data && data._placeholder) {
        return buffers[data.num]; // appropriate buffer (should be natural order anyway)
    }
    else if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            data[i] = _reconstructPacket(data[i], buffers);
        }
    }
    else if (typeof data === "object") {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                data[key] = _reconstructPacket(data[key], buffers);
            }
        }
    }
    return data;
}


/***/ }),

/***/ "./node_modules/socket.io-parser/dist/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/socket.io-parser/dist/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Decoder = exports.Encoder = exports.PacketType = exports.protocol = void 0;
const Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");
const binary_1 = __webpack_require__(/*! ./binary */ "./node_modules/socket.io-parser/dist/binary.js");
const is_binary_1 = __webpack_require__(/*! ./is-binary */ "./node_modules/socket.io-parser/dist/is-binary.js");
const debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("socket.io-parser");
/**
 * Protocol version.
 *
 * @public
 */
exports.protocol = 5;
var PacketType;
(function (PacketType) {
    PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
    PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
    PacketType[PacketType["EVENT"] = 2] = "EVENT";
    PacketType[PacketType["ACK"] = 3] = "ACK";
    PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
    PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
    PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType = exports.PacketType || (exports.PacketType = {}));
/**
 * A socket.io Encoder instance
 */
class Encoder {
    /**
     * Encode a packet as a single string if non-binary, or as a
     * buffer sequence, depending on packet type.
     *
     * @param {Object} obj - packet object
     */
    encode(obj) {
        debug("encoding packet %j", obj);
        if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
            if (is_binary_1.hasBinary(obj)) {
                obj.type =
                    obj.type === PacketType.EVENT
                        ? PacketType.BINARY_EVENT
                        : PacketType.BINARY_ACK;
                return this.encodeAsBinary(obj);
            }
        }
        return [this.encodeAsString(obj)];
    }
    /**
     * Encode packet as string.
     */
    encodeAsString(obj) {
        // first is type
        let str = "" + obj.type;
        // attachments if we have them
        if (obj.type === PacketType.BINARY_EVENT ||
            obj.type === PacketType.BINARY_ACK) {
            str += obj.attachments + "-";
        }
        // if we have a namespace other than `/`
        // we append it followed by a comma `,`
        if (obj.nsp && "/" !== obj.nsp) {
            str += obj.nsp + ",";
        }
        // immediately followed by the id
        if (null != obj.id) {
            str += obj.id;
        }
        // json data
        if (null != obj.data) {
            str += JSON.stringify(obj.data);
        }
        debug("encoded %j as %s", obj, str);
        return str;
    }
    /**
     * Encode packet as 'buffer sequence' by removing blobs, and
     * deconstructing packet into object with placeholders and
     * a list of buffers.
     */
    encodeAsBinary(obj) {
        const deconstruction = binary_1.deconstructPacket(obj);
        const pack = this.encodeAsString(deconstruction.packet);
        const buffers = deconstruction.buffers;
        buffers.unshift(pack); // add packet info to beginning of data list
        return buffers; // write all the buffers
    }
}
exports.Encoder = Encoder;
/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 */
class Decoder extends Emitter {
    constructor() {
        super();
    }
    /**
     * Decodes an encoded packet string into packet JSON.
     *
     * @param {String} obj - encoded packet
     */
    add(obj) {
        let packet;
        if (typeof obj === "string") {
            packet = this.decodeString(obj);
            if (packet.type === PacketType.BINARY_EVENT ||
                packet.type === PacketType.BINARY_ACK) {
                // binary packet's json
                this.reconstructor = new BinaryReconstructor(packet);
                // no attachments, labeled binary but no binary data to follow
                if (packet.attachments === 0) {
                    super.emit("decoded", packet);
                }
            }
            else {
                // non-binary full packet
                super.emit("decoded", packet);
            }
        }
        else if (is_binary_1.isBinary(obj) || obj.base64) {
            // raw binary data
            if (!this.reconstructor) {
                throw new Error("got binary data when not reconstructing a packet");
            }
            else {
                packet = this.reconstructor.takeBinaryData(obj);
                if (packet) {
                    // received final buffer
                    this.reconstructor = null;
                    super.emit("decoded", packet);
                }
            }
        }
        else {
            throw new Error("Unknown type: " + obj);
        }
    }
    /**
     * Decode a packet String (JSON data)
     *
     * @param {String} str
     * @return {Object} packet
     */
    decodeString(str) {
        let i = 0;
        // look up type
        const p = {
            type: Number(str.charAt(0)),
        };
        if (PacketType[p.type] === undefined) {
            throw new Error("unknown packet type " + p.type);
        }
        // look up attachments if type binary
        if (p.type === PacketType.BINARY_EVENT ||
            p.type === PacketType.BINARY_ACK) {
            const start = i + 1;
            while (str.charAt(++i) !== "-" && i != str.length) { }
            const buf = str.substring(start, i);
            if (buf != Number(buf) || str.charAt(i) !== "-") {
                throw new Error("Illegal attachments");
            }
            p.attachments = Number(buf);
        }
        // look up namespace (if any)
        if ("/" === str.charAt(i + 1)) {
            const start = i + 1;
            while (++i) {
                const c = str.charAt(i);
                if ("," === c)
                    break;
                if (i === str.length)
                    break;
            }
            p.nsp = str.substring(start, i);
        }
        else {
            p.nsp = "/";
        }
        // look up id
        const next = str.charAt(i + 1);
        if ("" !== next && Number(next) == next) {
            const start = i + 1;
            while (++i) {
                const c = str.charAt(i);
                if (null == c || Number(c) != c) {
                    --i;
                    break;
                }
                if (i === str.length)
                    break;
            }
            p.id = Number(str.substring(start, i + 1));
        }
        // look up json data
        if (str.charAt(++i)) {
            const payload = tryParse(str.substr(i));
            if (Decoder.isPayloadValid(p.type, payload)) {
                p.data = payload;
            }
            else {
                throw new Error("invalid payload");
            }
        }
        debug("decoded %s as %j", str, p);
        return p;
    }
    static isPayloadValid(type, payload) {
        switch (type) {
            case PacketType.CONNECT:
                return typeof payload === "object";
            case PacketType.DISCONNECT:
                return payload === undefined;
            case PacketType.CONNECT_ERROR:
                return typeof payload === "string" || typeof payload === "object";
            case PacketType.EVENT:
            case PacketType.BINARY_EVENT:
                return Array.isArray(payload) && payload.length > 0;
            case PacketType.ACK:
            case PacketType.BINARY_ACK:
                return Array.isArray(payload);
        }
    }
    /**
     * Deallocates a parser's resources
     */
    destroy() {
        if (this.reconstructor) {
            this.reconstructor.finishedReconstruction();
        }
    }
}
exports.Decoder = Decoder;
function tryParse(str) {
    try {
        return JSON.parse(str);
    }
    catch (e) {
        return false;
    }
}
/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 */
class BinaryReconstructor {
    constructor(packet) {
        this.packet = packet;
        this.buffers = [];
        this.reconPack = packet;
    }
    /**
     * Method to be called when binary data received from connection
     * after a BINARY_EVENT packet.
     *
     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
     * @return {null | Object} returns null if more binary data is expected or
     *   a reconstructed packet object if all buffers have been received.
     */
    takeBinaryData(binData) {
        this.buffers.push(binData);
        if (this.buffers.length === this.reconPack.attachments) {
            // done with buffer list
            const packet = binary_1.reconstructPacket(this.reconPack, this.buffers);
            this.finishedReconstruction();
            return packet;
        }
        return null;
    }
    /**
     * Cleans up binary packet reconstruction variables.
     */
    finishedReconstruction() {
        this.reconPack = null;
        this.buffers = [];
    }
}


/***/ }),

/***/ "./node_modules/socket.io-parser/dist/is-binary.js":
/*!*********************************************************!*\
  !*** ./node_modules/socket.io-parser/dist/is-binary.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.hasBinary = exports.isBinary = void 0;
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const isView = (obj) => {
    return typeof ArrayBuffer.isView === "function"
        ? ArrayBuffer.isView(obj)
        : obj.buffer instanceof ArrayBuffer;
};
const toString = Object.prototype.toString;
const withNativeBlob = typeof Blob === "function" ||
    (typeof Blob !== "undefined" &&
        toString.call(Blob) === "[object BlobConstructor]");
const withNativeFile = typeof File === "function" ||
    (typeof File !== "undefined" &&
        toString.call(File) === "[object FileConstructor]");
/**
 * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
 *
 * @private
 */
function isBinary(obj) {
    return ((withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj))) ||
        (withNativeBlob && obj instanceof Blob) ||
        (withNativeFile && obj instanceof File));
}
exports.isBinary = isBinary;
function hasBinary(obj, toJSON) {
    if (!obj || typeof obj !== "object") {
        return false;
    }
    if (Array.isArray(obj)) {
        for (let i = 0, l = obj.length; i < l; i++) {
            if (hasBinary(obj[i])) {
                return true;
            }
        }
        return false;
    }
    if (isBinary(obj)) {
        return true;
    }
    if (obj.toJSON &&
        typeof obj.toJSON === "function" &&
        arguments.length === 1) {
        return hasBinary(obj.toJSON(), true);
    }
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
            return true;
        }
    }
    return false;
}
exports.hasBinary = hasBinary;


/***/ }),

/***/ "./node_modules/yeast/index.js":
/*!*************************************!*\
  !*** ./node_modules/yeast/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
  , length = 64
  , map = {}
  , seed = 0
  , i = 0
  , prev;

/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode(num) {
  var encoded = '';

  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);

  return encoded;
}

/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */
function decode(str) {
  var decoded = 0;

  for (i = 0; i < str.length; i++) {
    decoded = decoded * length + map[str.charAt(i)];
  }

  return decoded;
}

/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
  var now = encode(+new Date());

  if (now !== prev) return seed = 0, prev = now;
  return now +'.'+ encode(seed++);
}

//
// Map each character to its index.
//
for (; i < length; i++) map[alphabet[i]] = i;

//
// Expose the `yeast`, `encode` and `decode` functions.
//
yeast.encode = encode;
yeast.decode = decode;
module.exports = yeast;


/***/ }),

/***/ "./src/app/doctor-portal/auth/login/login.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/doctor-portal/auth/login/login.component.ts ***!
  \*************************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _services_http_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/http-constants */ "./src/app/services/http-constants.ts");
/* harmony import */ var _shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/UI_service/media-control.service */ "./src/app/shared/UI_service/media-control.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _services_base_http_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/base-http.service */ "./src/app/services/base-http.service.ts");
/* harmony import */ var _services_doctor_service_doctor_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/doctor-service/doctor.service */ "./src/app/services/doctor-service/doctor.service.ts");
/* harmony import */ var _services_patient_service_patient_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/patient-service/patient.service */ "./src/app/services/patient-service/patient.service.ts");
/* harmony import */ var src_app_shared_UI_service_dynamic_title_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/shared/UI_service/dynamic-title.service */ "./src/app/shared/UI_service/dynamic-title.service.ts");
/* harmony import */ var _shared_components_container_container_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../shared/components/container/container.component */ "./src/app/shared/components/container/container.component.ts");
/* harmony import */ var _shared_components_header_header_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../shared/components/header/header.component */ "./src/app/shared/components/header/header.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ng-zorro-antd/grid */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-grid.js");
/* harmony import */ var ng_zorro_antd_card__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ng-zorro-antd/card */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-card.js");
/* harmony import */ var ng_zorro_antd_form__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ng-zorro-antd/form */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-form.js");
/* harmony import */ var ng_zorro_antd_core_transition_patch__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ng-zorro-antd/core/transition-patch */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-core-transition-patch.js");
/* harmony import */ var ng_zorro_antd_input__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ng-zorro-antd/input */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-input.js");
/* harmony import */ var ng_zorro_antd_checkbox__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ng-zorro-antd/checkbox */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-checkbox.js");
/* harmony import */ var ng_zorro_antd_button__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ng-zorro-antd/button */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-button.js");
/* harmony import */ var ng_zorro_antd_core_wave__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ng-zorro-antd/core/wave */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-core-wave.js");
/* harmony import */ var ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ng-zorro-antd/icon */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-icon.js");
/* harmony import */ var ng_zorro_antd_select__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ng-zorro-antd/select */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-select.js");
/* harmony import */ var ng_otp_input__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ng-otp-input */ "./node_modules/ng-otp-input/__ivy_ngcc__/fesm2015/ng-otp-input.js");


























const _c0 = function () { return { span: 24 }; };
const _c1 = function () { return { span: 12 }; };
function LoginComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](2, _c0))("nzMd", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](3, _c1));
} }
function LoginComponent_h2_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h2", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Login");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function LoginComponent_nz_form_label_15_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nz-form-label", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function LoginComponent_nz_form_label_15_Template_nz_form_label_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r9.changeNumber(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Edit Number ?");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzSm", 12)("nzXs", 12);
} }
function LoginComponent_ng_template_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nz-select", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "nz-option", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function LoginComponent_ng_template_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nz-form-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "nz-form-label", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "OTP");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "nz-form-control", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "nz-input-group", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "input", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzValidateStatus", ctx_r5.validateForm.controls["otp"]);
} }
const _c2 = function () { return { length: 4 }; };
function LoginComponent_ng_template_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "nz-form-label", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Enter OTP");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "ng-otp-input", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzSpan", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("config", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](2, _c2));
} }
function LoginComponent_h3_33_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h3", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Wait for ", ctx_r7.timeLeft, " seconds");
} }
function LoginComponent_a_34_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function LoginComponent_a_34_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r11.resendOTP(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Resend OTP");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
const _c3 = function (a0) { return { "auth_container": a0 }; };
const _c4 = function (a0) { return { "themes_border": a0 }; };
class LoginComponent {
    constructor(_mediaControl, router, fb, baseHttpService, doctorService, patientService, activatedRoute, _dynamicTitle) {
        this._mediaControl = _mediaControl;
        this.router = router;
        this.fb = fb;
        this.baseHttpService = baseHttpService;
        this.doctorService = doctorService;
        this.patientService = patientService;
        this.activatedRoute = activatedRoute;
        this._dynamicTitle = _dynamicTitle;
        this.thisDevice = true;
        this.isLoading = false;
        this.sendingOtp = false;
        this.otpSent = false;
        this.timeLeft = 30;
        this.genOtpRes = "";
        this.userNameAsyncValidator = (control) => new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"]((observer) => {
            this.baseHttpService.makeRequest({ method: "get", url: _services_http_constants__WEBPACK_IMPORTED_MODULE_3__["HttpConstants"].otp.sendOtp + control.value }).subscribe((response) => {
                if (response.hasErrors()) {
                    observer.next({
                        duplicated: { en: `Somehing went wrong please try again` }
                    });
                }
                else {
                    var res = response.data;
                    if (res.status) {
                        this.otpSent = true;
                        this.timerId = setInterval(() => {
                            this.countdown(this);
                        }, 1000);
                        this.genOtpRes = res.otp;
                        this.validateForm.controls['phoneNumber'].disable();
                        observer.next(null);
                    }
                    else {
                        observer.next({
                            duplicated: { en: `Failed to send OTP. please try again` }
                        });
                    }
                }
                observer.complete();
            });
        });
        this.otpAsyncValidator = (control) => new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"]((observer) => {
            const otpToCompare = atob(this.genOtpRes);
            if (otpToCompare != control.value) {
                observer.next({
                    duplicated: { en: `Please enter valid OTP` }
                });
            }
            else {
                if (this.validateForm.get('agree').value) {
                    observer.next(null);
                    this.login();
                }
                else {
                    observer.next({
                        duplicated: { en: `Please Accept T&C and click Login` }
                    });
                }
            }
            observer.complete();
        });
    }
    submitForm() {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
    }
    ngOnInit() {
        this.validateForm = this.fb.group({
            phoneNumber: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(10), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(10), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern('^[0-9]*$')], [this.userNameAsyncValidator]],
            phoneNumberPrefix: ['+91'],
            agree: [true, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].requiredTrue]],
            otp: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(4), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(4), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern('^[0-9]*$')], [this.otpAsyncValidator]]
        });
        this.activatedRoute.params.subscribe((params) => {
            const token = params.token;
            if (token) {
                this.baseHttpService.makeAuthRequest("GET", _services_http_constants__WEBPACK_IMPORTED_MODULE_3__["HttpConstants"].patient.getLoginDetails, null, token).subscribe((response) => {
                    localStorage.setItem("token-" + this.doctorService.username, token);
                    localStorage.setItem("patients" + this.doctorService.username, JSON.stringify(response.data.patients));
                    this.router.navigate(["../dashboard"], {
                        relativeTo: this.activatedRoute,
                    });
                    //  this.router.navigate(["/PatientDashboard"])
                });
            }
        });
        this._dynamicTitle.setPageTitle('login');
    }
    ngAfterContentChecked() {
        this.thisDevice = this._mediaControl.mediaPort();
    }
    countdown(self) {
        console.log(self.timeLeft);
        if (self.timeLeft == 0) {
            clearTimeout(self.timerId);
        }
        else {
            self.timeLeft--;
        }
    }
    changeNumber() {
        this.genOtpRes = '';
        this.otpSent = false;
        this.validateForm.get('phoneNumber').setValue('');
        this.validateForm.get('otp').setValue('');
        this.validateForm.controls['phoneNumber'].enable();
    }
    resendOTP() {
        this.isLoading = true;
        this.baseHttpService.makeRequest({ method: "get", url: `${_services_http_constants__WEBPACK_IMPORTED_MODULE_3__["HttpConstants"].otp.resendOtp}${this.validateForm.get('agree').value}/${this.genOtpRes}` }).subscribe((response) => {
            this.isLoading = true;
            if (response.hasErrors()) {
                alert(response.getErrorsText());
            }
            else {
                var res = response.data;
                if (res.status) {
                    this.genOtpRes = res.otp;
                    this.timerId = setInterval(() => {
                        this.countdown(this);
                    }, 1000);
                }
                else {
                    alert("Failed to send otp please try again");
                }
            }
        });
    }
    login() {
        this.isLoading = true;
        console.log(this.validateForm.value.otp);
        const otpToCompare = atob(this.genOtpRes);
        if (otpToCompare != this.validateForm.get('otp').value) {
            return false;
        }
        if (!this.validateForm.get('agree').value) {
            return false;
        }
        const data = {
            doctorUsername: this.doctorService.username,
            mobileNumber: this.validateForm.get('phoneNumber').value,
            otpToVerify: this.genOtpRes,
        };
        this.baseHttpService.makeRequest({ method: "post", url: _services_http_constants__WEBPACK_IMPORTED_MODULE_3__["HttpConstants"].otp.login, data }).subscribe((response) => {
            this.isLoading = false;
            if (response.hasErrors()) {
                alert(response.getErrorsText());
            }
            else {
                if (response.data) {
                    // if (null) {
                    localStorage.setItem("token-" + this.doctorService.username, response.data.token);
                    localStorage.setItem("patients" + this.doctorService.username, JSON.stringify(response.data.patients));
                    this.patientService.setSelectedPatient(response.data.patients[0]);
                    this.router.navigate(["../dashboard"], {
                        relativeTo: this.activatedRoute,
                    });
                }
                else {
                    this.router.navigate([`../Register/${this.validateForm.get('phoneNumber').value}`], {
                        relativeTo: this.activatedRoute,
                    });
                }
            }
        });
    }
}
LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_4__["MediaControlService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_base_http_service__WEBPACK_IMPORTED_MODULE_6__["BaseHttpService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_doctor_service_doctor_service__WEBPACK_IMPORTED_MODULE_7__["DoctorService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_patient_service_patient_service__WEBPACK_IMPORTED_MODULE_8__["PatientService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_UI_service_dynamic_title_service__WEBPACK_IMPORTED_MODULE_9__["DynamicTitleService"])); };
LoginComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LoginComponent, selectors: [["app-login"]], decls: 36, vars: 31, consts: [["tabTitle", "login"], ["titleAlign", "left", 3, "headerTitle", "isFixed"], [3, "ngClass"], ["nz-row", ""], ["nz-col", "", 3, "nzXs", "nzMd", 4, "ngIf"], ["nz-col", "", 3, "nzXs", "nzMd"], [1, "login_container", "center_xy"], [1, ""], [1, "login_card", 3, "ngClass"], ["class", "login_heading mb-3", 4, "ngIf"], ["nz-form", "", 3, "formGroup", "ngSubmit"], ["nz-col", "", 3, "nzSpan"], ["nzFor", "phoneNumber", "nzRequired", "", 3, "nzSm", "nzXs"], ["class", "pull-right", "nzFor", "phoneNumber", 3, "nzSm", "nzXs", "click", 4, "ngIf"], ["nzErrorTip", "Please input your phone number!", "nzValidateStatus", "validating", "nzHasFeedback", "", 3, "nzValidateStatus"], [3, "nzAddOnBefore"], ["addOnBeforeTemplate", ""], ["formControlName", "phoneNumber", "id", "phoneNumber", "nz-input", "", "inputmode", "numeric", "maxlength", "10"], [3, "ngIf"], ["nz-row", "", 1, "mar_15"], ["nzErrorTip", "Accept T&C", 3, "nzSpan"], ["nz-checkbox", "", "formControlName", "agree"], ["nz-button", "", 1, "login-form-button", "min-width", 3, "nzType", "disabled", "nzLoading", "click"], ["nz-icon", "", "nzType", "double-right", "nzTheme", "outline"], ["class", "Wait_time mt-3", 4, "ngIf"], ["href", "#", "class", "Resend_OTP mar_10", 3, "click", 4, "ngIf"], ["nz-col", "", 3, "nzXs"], ["src", "assets/img/Registration_bg.png", "alt", "", 1, "img-res"], [1, "login_heading", "mb-3"], ["nzFor", "phoneNumber", 1, "pull-right", 3, "nzSm", "nzXs", "click"], [1, "login-form-forgot"], ["formControlName", "phoneNumberPrefix", 1, "phone-select"], ["nzLabel", "+91", "nzValue", "+91"], ["nzRequired", "", 1, "text-left", 3, "nzXs"], ["nzErrorTip", "Please input your OTP!", "nzValidateStatus", "validating", "nzHasFeedback", "", 3, "nzValidateStatus"], ["nzPrefixIcon", "lock"], ["type", "password", "nz-input", "", "inputmode", "numeric", "formControlName", "otp", "maxlength", "4", "minlength", "4", "placeholder", "OTP"], [1, "center_xy", "mt-2"], [1, "OTP_text", 3, "nzSpan"], [3, "config"], [1, "Wait_time", "mt-3"], ["href", "#", 1, "Resend_OTP", "mar_10", 3, "click"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "app-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-header", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, LoginComponent_div_4_Template, 2, 4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "nz-card", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, LoginComponent_h2_9_Template, 2, 0, "h2", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "form", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngSubmit", function LoginComponent_Template_form_ngSubmit_10_listener() { return ctx.submitForm(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "nz-form-item");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "nz-form-label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Phone Number");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, LoginComponent_nz_form_label_15_Template, 3, 2, "nz-form-label", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "nz-form-control", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "nz-input-group", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, LoginComponent_ng_template_18_Template, 2, 0, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "input", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, LoginComponent_ng_template_21_Template, 6, 2, "ng-template", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](22, LoginComponent_ng_template_22_Template, 5, 3, "ng-template", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "nz-form-item", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "nz-form-control", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "label", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, " I have read the ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "a");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "agreement");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "button", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function LoginComponent_Template_button_click_30_listener() { return ctx.login(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, " Log in ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](32, "i", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](33, LoginComponent_h3_33_Template, 2, 1, "h3", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](34, LoginComponent_a_34_Template, 2, 0, "a", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("headerTitle", "Login")("isFixed", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](24, _c3, ctx.thisDevice));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.thisDevice);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](26, _c0))("nzMd", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](27, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](28, _c4, !ctx.thisDevice));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.thisDevice);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.validateForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzSpan", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzSm", 12)("nzXs", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.otpSent);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzValidateStatus", ctx.validateForm.controls["phoneNumber"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzAddOnBefore", _r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.otpSent);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzSpan", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzType", "primary")("disabled", !ctx.validateForm.valid)("nzLoading", ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.otpSent && ctx.timeLeft != 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.otpSent && ctx.timeLeft === 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](30, _c0));
    } }, directives: [_shared_components_container_container_component__WEBPACK_IMPORTED_MODULE_10__["ContainerComponent"], _shared_components_header_header_component__WEBPACK_IMPORTED_MODULE_11__["HeaderComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_12__["NgClass"], ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_13__["NzRowDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_12__["NgIf"], ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_13__["NzColDirective"], ng_zorro_antd_card__WEBPACK_IMPORTED_MODULE_14__["NzCardComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], ng_zorro_antd_form__WEBPACK_IMPORTED_MODULE_15__["NzFormDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], ng_zorro_antd_form__WEBPACK_IMPORTED_MODULE_15__["NzFormItemComponent"], ng_zorro_antd_form__WEBPACK_IMPORTED_MODULE_15__["NzFormLabelComponent"], ng_zorro_antd_form__WEBPACK_IMPORTED_MODULE_15__["NzFormControlComponent"], ng_zorro_antd_core_transition_patch__WEBPACK_IMPORTED_MODULE_16__["ɵNzTransitionPatchDirective"], ng_zorro_antd_input__WEBPACK_IMPORTED_MODULE_17__["NzInputGroupComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"], ng_zorro_antd_input__WEBPACK_IMPORTED_MODULE_17__["NzInputDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlName"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["MaxLengthValidator"], ng_zorro_antd_checkbox__WEBPACK_IMPORTED_MODULE_18__["NzCheckboxComponent"], ng_zorro_antd_button__WEBPACK_IMPORTED_MODULE_19__["NzButtonComponent"], ng_zorro_antd_core_wave__WEBPACK_IMPORTED_MODULE_20__["NzWaveDirective"], ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_21__["NzIconDirective"], ng_zorro_antd_select__WEBPACK_IMPORTED_MODULE_22__["NzSelectComponent"], ng_zorro_antd_select__WEBPACK_IMPORTED_MODULE_22__["NzOptionComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["MinLengthValidator"], ng_otp_input__WEBPACK_IMPORTED_MODULE_23__["ɵa"]], styles: [".auth_container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  width: 100%;\n}\n.component_heading[_ngcontent-%COMP%] {\n  text-align: start !important;\n}\n.login_container[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n}\n.login_heading[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.login_heading_top[_ngcontent-%COMP%] {\n  text-align: start;\n  background-color: #f2f2f2;\n  font-size: 20px;\n  font-weight: bold;\n  color: #707070;\n}\n.Resend_OTP[_ngcontent-%COMP%], .Wait_time[_ngcontent-%COMP%] {\n  text-align: center;\n  display: block;\n}\n.Resend_OTP[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 500;\n  text-decoration: underline;\n}\n.Wait_time[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.OTP_text[_ngcontent-%COMP%] {\n  text-align: left !important;\n  display: block;\n}\n.login_card[_ngcontent-%COMP%] {\n  width: 500px;\n}\n@media screen and (max-width: 768px) {\n  .login_card[_ngcontent-%COMP%] {\n    width: 100vw;\n  }\n  .login_card[_ngcontent-%COMP%] {\n    min-height: 500px;\n  }\n}\n.login-form-button[_ngcontent-%COMP%] {\n  width: 90% !important;\n  margin-left: 5% !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZG9jdG9yLXBvcnRhbC9hdXRoL2xvZ2luL0Y6L09GRklDRSBXT1JLL0RJR0lTQ1JJQkUvT2ZmaWNlX1Byb2plY3RzL2FwcGxpY2F0aW9uL3BhdGllbnRfcG9ydGFsL3NyYy9hcHAvZG9jdG9yLXBvcnRhbC9hdXRoL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5sZXNzIiwic3JjL2FwcC9kb2N0b3ItcG9ydGFsL2F1dGgvbG9naW4vbG9naW4uY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBQTtFQUNBLFdBQUE7QUNDRjtBRENBO0VBQ0UsNEJBQUE7QUNDRjtBRENBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7QUNDRjtBRENBO0VBQ0Usa0JBQUE7QUNDRjtBRENBO0VBQ0UsaUJBQUE7RUFDQSx5QkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7QUNDRjtBRENBOztFQUVFLGtCQUFBO0VBQ0EsY0FBQTtBQ0NGO0FEQ0E7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSwwQkFBQTtBQ0NGO0FEQ0E7RUFDRSxlQUFBO0FDQ0Y7QURFQTtFQUNFLDJCQUFBO0VBQ0EsY0FBQTtBQ0FGO0FERUE7RUFDRSxZQUFBO0FDQUY7QURFQTtFQUNFO0lBQ0UsWUFBQTtFQ0FGO0VERUE7SUFDRSxpQkFBQTtFQ0FGO0FBQ0Y7QURHQTtFQUNFLHFCQUFBO0VBQ0EsMEJBQUE7QUNERiIsImZpbGUiOiJzcmMvYXBwL2RvY3Rvci1wb3J0YWwvYXV0aC9sb2dpbi9sb2dpbi5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hdXRoX2NvbnRhaW5lciB7XG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xuICB3aWR0aDogMTAwJTtcbn1cbi5jb21wb25lbnRfaGVhZGluZyB7XG4gIHRleHQtYWxpZ246IHN0YXJ0ICFpbXBvcnRhbnQ7XG59XG4ubG9naW5fY29udGFpbmVyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbn1cbi5sb2dpbl9oZWFkaW5nIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLmxvZ2luX2hlYWRpbmdfdG9wIHtcbiAgdGV4dC1hbGlnbjogc3RhcnQ7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmMmYyZjI7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGNvbG9yOiAjNzA3MDcwO1xufVxuLlJlc2VuZF9PVFAsXG4uV2FpdF90aW1lIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBkaXNwbGF5OiBibG9jaztcbn1cbi5SZXNlbmRfT1RQIHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LXdlaWdodDogNTAwO1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbn1cbi5XYWl0X3RpbWUge1xuICBmb250LXNpemU6IDEycHg7XG59XG5cbi5PVFBfdGV4dCB7XG4gIHRleHQtYWxpZ246IGxlZnQgIWltcG9ydGFudDtcbiAgZGlzcGxheTogYmxvY2s7XG59XG4ubG9naW5fY2FyZCB7XG4gIHdpZHRoOiA1MDBweDtcbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5sb2dpbl9jYXJkIHtcbiAgICB3aWR0aDogMTAwdnc7XG4gIH1cbiAgLmxvZ2luX2NhcmQge1xuICAgIG1pbi1oZWlnaHQ6IDUwMHB4O1xuICB9XG59XG5cbi5sb2dpbi1mb3JtLWJ1dHRvbiB7XG4gIHdpZHRoOiA5MCUgIWltcG9ydGFudDtcbiAgbWFyZ2luLWxlZnQ6IDUlICFpbXBvcnRhbnQ7XG59XG4iLCIuYXV0aF9jb250YWluZXIge1xuICBtaW4taGVpZ2h0OiAxMDB2aDtcbiAgd2lkdGg6IDEwMCU7XG59XG4uY29tcG9uZW50X2hlYWRpbmcge1xuICB0ZXh0LWFsaWduOiBzdGFydCAhaW1wb3J0YW50O1xufVxuLmxvZ2luX2NvbnRhaW5lciB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG59XG4ubG9naW5faGVhZGluZyB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5sb2dpbl9oZWFkaW5nX3RvcCB7XG4gIHRleHQtYWxpZ246IHN0YXJ0O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJmMmYyO1xuICBmb250LXNpemU6IDIwcHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBjb2xvcjogIzcwNzA3MDtcbn1cbi5SZXNlbmRfT1RQLFxuLldhaXRfdGltZSB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZGlzcGxheTogYmxvY2s7XG59XG4uUmVzZW5kX09UUCB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG59XG4uV2FpdF90aW1lIHtcbiAgZm9udC1zaXplOiAxMnB4O1xufVxuLk9UUF90ZXh0IHtcbiAgdGV4dC1hbGlnbjogbGVmdCAhaW1wb3J0YW50O1xuICBkaXNwbGF5OiBibG9jaztcbn1cbi5sb2dpbl9jYXJkIHtcbiAgd2lkdGg6IDUwMHB4O1xufVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgLmxvZ2luX2NhcmQge1xuICAgIHdpZHRoOiAxMDB2dztcbiAgfVxuICAubG9naW5fY2FyZCB7XG4gICAgbWluLWhlaWdodDogNTAwcHg7XG4gIH1cbn1cbi5sb2dpbi1mb3JtLWJ1dHRvbiB7XG4gIHdpZHRoOiA5MCUgIWltcG9ydGFudDtcbiAgbWFyZ2luLWxlZnQ6IDUlICFpbXBvcnRhbnQ7XG59XG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoginComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-login',
                templateUrl: './login.component.html',
                styleUrls: ['./login.component.less']
            }]
    }], function () { return [{ type: _shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_4__["MediaControlService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] }, { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] }, { type: _services_base_http_service__WEBPACK_IMPORTED_MODULE_6__["BaseHttpService"] }, { type: _services_doctor_service_doctor_service__WEBPACK_IMPORTED_MODULE_7__["DoctorService"] }, { type: _services_patient_service_patient_service__WEBPACK_IMPORTED_MODULE_8__["PatientService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] }, { type: src_app_shared_UI_service_dynamic_title_service__WEBPACK_IMPORTED_MODULE_9__["DynamicTitleService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/doctor-portal/auth/register/health-info/health-info.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/doctor-portal/auth/register/health-info/health-info.component.ts ***!
  \**********************************************************************************/
/*! exports provided: HealthInfoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HealthInfoComponent", function() { return HealthInfoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var ng_zorro_antd_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-zorro-antd/form */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-form.js");
/* harmony import */ var ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-zorro-antd/grid */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-grid.js");
/* harmony import */ var ng_zorro_antd_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng-zorro-antd/select */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-select.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var ng_zorro_antd_radio__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng-zorro-antd/radio */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-radio.js");
/* harmony import */ var ng_zorro_antd_checkbox__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng-zorro-antd/checkbox */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-checkbox.js");
/* harmony import */ var ng_zorro_antd_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ng-zorro-antd/button */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-button.js");
/* harmony import */ var ng_zorro_antd_core_wave__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ng-zorro-antd/core/wave */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-core-wave.js");
/* harmony import */ var ng_zorro_antd_core_transition_patch__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ng-zorro-antd/core/transition-patch */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-core-transition-patch.js");
/* harmony import */ var ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ng-zorro-antd/icon */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-icon.js");
/* harmony import */ var ng_zorro_antd_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ng-zorro-antd/input */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-input.js");
















function HealthInfoComponent_nz_option_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "nz-option", 22);
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzLabel", item_r6)("nzValue", item_r6);
} }
function HealthInfoComponent_nz_option_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "nz-option", 22);
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzLabel", item_r7)("nzValue", item_r7);
} }
function HealthInfoComponent_nz_option_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "nz-option", 22);
} if (rf & 2) {
    const item_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzLabel", item_r8)("nzValue", item_r8);
} }
function HealthInfoComponent_ng_template_28_nz_option_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "nz-option", 22);
} if (rf & 2) {
    const option_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzLabel", option_r10)("nzValue", option_r10);
} }
function HealthInfoComponent_ng_template_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "nz-form-item", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "nz-form-label", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Add / Seletct Allergic");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "nz-form-control", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "nz-select", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, HealthInfoComponent_ng_template_28_nz_option_5_Template, 1, 2, "nz-option", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzSm", 6)("nzXs", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r3.bloodGroups);
} }
function HealthInfoComponent_nz_option_34_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "nz-option", 22);
} if (rf & 2) {
    const option_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzLabel", option_r11)("nzValue", option_r11);
} }
function HealthInfoComponent_ng_template_44_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "nz-form-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "nz-form-label", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Write something about Illness");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "nz-form-control", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "textarea", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzSpan", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzSpan", 12);
} }
const _c0 = function () { return { span: 24 }; };
class HealthInfoComponent {
    // captchaTooltipIcon: NzFormTooltipIcon = {
    //   type: 'info-circle',
    //   theme: 'twotone'
    // };
    constructor(fb) {
        this.fb = fb;
        this.submitFinalForm = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.selectedValue = null;
        this.bloodGroups = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
        this.weightArray = [];
        this.heightArray = [];
        this.isLoading = false;
    }
    ngOnInit() {
        this.healthForm = this.fb.group({
            patient_weight_kgs: [''],
            patient_height: [''],
            patient_blood_group: [],
            isAllergic: [false],
            isIllness: [false],
            illnessBrief: [],
            allergicData: [],
            healthHistory: [],
            agree: [true, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].requiredTrue]]
        });
        for (let i = 3; i < 130; i++) {
            this.weightArray.push(i.toString());
        }
        for (let i = 50; i < 200; i++) {
            this.heightArray.push(i.toString());
        }
    }
    submitForm() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            console.log(this.healthForm.value);
            this.isLoading = true;
            const res = yield this.submitFinalForm.emit(this.healthForm.value);
            console.log(res);
        });
    }
}
HealthInfoComponent.ɵfac = function HealthInfoComponent_Factory(t) { return new (t || HealthInfoComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"])); };
HealthInfoComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: HealthInfoComponent, selectors: [["app-health-info"]], outputs: { submitFinalForm: "submitFinalForm" }, decls: 57, vars: 30, consts: [["nz-form", "", 3, "formGroup"], [1, "bottom-5"], ["nzFor", "weight", 1, "form-label", 3, "nzSm", "nzXs"], ["nzShowSearch", "", "nzAllowClear", "", "nzPlaceHolder", "Select a weight", "formControlName", "patient_weight_kgs", "autocomplete", "false", "id", "weight"], [3, "nzLabel", "nzValue", 4, "ngFor", "ngForOf"], [1, "form-label", 3, "nzSm", "nzXs"], ["nzShowSearch", "", "nzAllowClear", "", "nzPlaceHolder", "Select a height", "formControlName", "patient_height", "autocomplete", "false"], ["nzShowSearch", "", "nzAllowClear", "", "nzPlaceHolder", "Select a Blood Group", "formControlName", "patient_blood_group", "autocomplete", "false"], ["nzExtra", "Please Select Yes/No"], ["formControlName", "isAllergic", "nzButtonStyle", "solid"], ["nz-radio-button", "", 3, "nzValue"], [3, "ngIf"], ["nzExtra", "You can select or add History"], ["nzMode", "tags", "nzPlaceHolder", "Please select or add History", "formControlName", "healthHistory"], ["formControlName", "isIllness", "nzButtonStyle", "solid"], ["nz-row", "", 1, "mar_15"], ["nzErrorTip", "Accept T&C", 3, "nzSpan"], ["nz-checkbox", "", "formControlName", "agree"], ["nz-row", ""], ["nz-col", "", 1, "p-2", "center_f_y", 3, "nzXs", "nzMd"], ["nz-button", "", "nzType", "primary", "nzBlock", "", 1, "mt-3", 3, "disabled", "nzLoading", "click"], ["nz-icon", "", "nzType", "double-right", "nzTheme", "outline"], [3, "nzLabel", "nzValue"], ["nzExtra", "Select or add  allergic reaction."], ["nzMode", "tags", "nzPlaceHolder", "Please select", "formControlName", "allergicData"], [1, "form-label", 3, "nzSpan"], ["nzErrorTip", "Please write something here!", 3, "nzSpan"], ["formControlName", "illnessBrief", "nz-input", "", "rows", "3"]], template: function HealthInfoComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "nz-form-item", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "nz-form-label", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Weight (Kgs)");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "nz-form-control");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "nz-select", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, HealthInfoComponent_nz_option_6_Template, 1, 2, "nz-option", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "nz-form-item", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "nz-form-label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Height (CMs)");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "nz-form-control");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "nz-select", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, HealthInfoComponent_nz_option_12_Template, 1, 2, "nz-option", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "nz-form-item", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "nz-form-label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Blood Group");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "nz-form-control");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "nz-select", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](18, HealthInfoComponent_nz_option_18_Template, 1, 2, "nz-option", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "nz-form-item", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "nz-form-label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21, "Allergic Reaction");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "nz-form-control", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "nz-radio-group", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "label", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](25, "Yes");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "label", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](27, "No");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](28, HealthInfoComponent_ng_template_28_Template, 6, 3, "ng-template", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "nz-form-item", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "nz-form-label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](31, "Mention History of your present");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "nz-form-control", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "nz-select", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](34, HealthInfoComponent_nz_option_34_Template, 1, 2, "nz-option", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](35, "nz-form-item", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](36, "nz-form-label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](37, "Any Current Illnesses");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](38, "nz-form-control", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](39, "nz-radio-group", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](40, "label", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](41, "Yes");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](42, "label", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](43, "No");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](44, HealthInfoComponent_ng_template_44_Template, 5, 2, "ng-template", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](45, "nz-form-item", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](46, "nz-form-control", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](47, "label", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](48, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](49, " I have read the ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](50, "a");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](51, "agreement");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](52, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](53, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](54, "button", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HealthInfoComponent_Template_button_click_54_listener() { return ctx.submitForm(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](55, " Next ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](56, "i", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.healthForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzSm", 6)("nzXs", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.weightArray);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzSm", 6)("nzXs", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.heightArray);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzSm", 6)("nzXs", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.bloodGroups);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzSm", 6)("nzXs", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzValue", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzValue", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.healthForm.get("isAllergic").value);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzSm", 6)("nzXs", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.bloodGroups);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzSm", 6)("nzXs", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzValue", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzValue", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.healthForm.get("isIllness").value);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzSpan", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](28, _c0))("nzMd", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](29, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", !ctx.healthForm.valid)("nzLoading", ctx.isLoading);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatusGroup"], ng_zorro_antd_form__WEBPACK_IMPORTED_MODULE_3__["NzFormDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroupDirective"], ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_4__["NzRowDirective"], ng_zorro_antd_form__WEBPACK_IMPORTED_MODULE_3__["NzFormItemComponent"], ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_4__["NzColDirective"], ng_zorro_antd_form__WEBPACK_IMPORTED_MODULE_3__["NzFormLabelComponent"], ng_zorro_antd_form__WEBPACK_IMPORTED_MODULE_3__["NzFormControlComponent"], ng_zorro_antd_select__WEBPACK_IMPORTED_MODULE_5__["NzSelectComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControlName"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"], ng_zorro_antd_radio__WEBPACK_IMPORTED_MODULE_7__["NzRadioGroupComponent"], ng_zorro_antd_radio__WEBPACK_IMPORTED_MODULE_7__["NzRadioComponent"], ng_zorro_antd_radio__WEBPACK_IMPORTED_MODULE_7__["NzRadioButtonDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], ng_zorro_antd_checkbox__WEBPACK_IMPORTED_MODULE_8__["NzCheckboxComponent"], ng_zorro_antd_button__WEBPACK_IMPORTED_MODULE_9__["NzButtonComponent"], ng_zorro_antd_core_wave__WEBPACK_IMPORTED_MODULE_10__["NzWaveDirective"], ng_zorro_antd_core_transition_patch__WEBPACK_IMPORTED_MODULE_11__["ɵNzTransitionPatchDirective"], ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_12__["NzIconDirective"], ng_zorro_antd_select__WEBPACK_IMPORTED_MODULE_5__["NzOptionComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], ng_zorro_antd_input__WEBPACK_IMPORTED_MODULE_13__["NzInputDirective"]], styles: ["nz-select[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.input_label[_ngcontent-%COMP%] {\n  color: #98a4ba;\n  font-size: 14px;\n  font-weight: bold;\n}\n.tag_box[_ngcontent-%COMP%] {\n  min-height: 200px;\n  background-color: #f7f9fc;\n  border-radius: 5px;\n  border: 1px solid #d1d1d1;\n  min-height: 91px;\n}\nnz-select[_ngcontent-%COMP%] {\n  width: 100%;\n}\n@media screen and (max-width: 768px) {\n  .p-2[_ngcontent-%COMP%] {\n    padding: 3px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZG9jdG9yLXBvcnRhbC9hdXRoL3JlZ2lzdGVyL2hlYWx0aC1pbmZvL0Y6L09GRklDRSBXT1JLL0RJR0lTQ1JJQkUvT2ZmaWNlX1Byb2plY3RzL2FwcGxpY2F0aW9uL3BhdGllbnRfcG9ydGFsL3NyYy9hcHAvZG9jdG9yLXBvcnRhbC9hdXRoL3JlZ2lzdGVyL2hlYWx0aC1pbmZvL2hlYWx0aC1pbmZvLmNvbXBvbmVudC5sZXNzIiwic3JjL2FwcC9kb2N0b3ItcG9ydGFsL2F1dGgvcmVnaXN0ZXIvaGVhbHRoLWluZm8vaGVhbHRoLWluZm8uY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0FDQ0Y7QURDQTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUNDRjtBRENBO0VBQ0UsaUJBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7RUFDQSxnQkFBQTtBQ0NGO0FEQ0E7RUFDRSxXQUFBO0FDQ0Y7QURDQTtFQUNFO0lBQ0UsWUFBQTtFQ0NGO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9kb2N0b3ItcG9ydGFsL2F1dGgvcmVnaXN0ZXIvaGVhbHRoLWluZm8vaGVhbHRoLWluZm8uY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyJuei1zZWxlY3Qge1xuICB3aWR0aDogMTAwJTtcbn1cbi5pbnB1dF9sYWJlbCB7XG4gIGNvbG9yOiAjOThhNGJhO1xuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuLnRhZ19ib3gge1xuICBtaW4taGVpZ2h0OiAyMDBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y3ZjlmYztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZDFkMWQxO1xuICBtaW4taGVpZ2h0OiA5MXB4O1xufVxubnotc2VsZWN0IHtcbiAgd2lkdGg6IDEwMCU7XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweCkge1xuICAucC0yIHtcbiAgICBwYWRkaW5nOiAzcHg7XG4gIH1cbn1cbiIsIm56LXNlbGVjdCB7XG4gIHdpZHRoOiAxMDAlO1xufVxuLmlucHV0X2xhYmVsIHtcbiAgY29sb3I6ICM5OGE0YmE7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG4udGFnX2JveCB7XG4gIG1pbi1oZWlnaHQ6IDIwMHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjdmOWZjO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkMWQxZDE7XG4gIG1pbi1oZWlnaHQ6IDkxcHg7XG59XG5uei1zZWxlY3Qge1xuICB3aWR0aDogMTAwJTtcbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5wLTIge1xuICAgIHBhZGRpbmc6IDNweDtcbiAgfVxufVxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](HealthInfoComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-health-info',
                templateUrl: './health-info.component.html',
                styleUrls: ['./health-info.component.less'],
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] }]; }, { submitFinalForm: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"]
        }] }); })();


/***/ }),

/***/ "./src/app/doctor-portal/auth/register/personal-info/personal-info.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/doctor-portal/auth/register/personal-info/personal-info.component.ts ***!
  \**************************************************************************************/
/*! exports provided: PersonalInfoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PersonalInfoComponent", function() { return PersonalInfoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var src_app_shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/UI_service/media-control.service */ "./src/app/shared/UI_service/media-control.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _services_message_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../services/message.service */ "./src/app/services/message.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng-zorro-antd/grid */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-grid.js");
/* harmony import */ var ng_zorro_antd_core_transition_patch__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng-zorro-antd/core/transition-patch */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-core-transition-patch.js");
/* harmony import */ var ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ng-zorro-antd/icon */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-icon.js");
/* harmony import */ var ng_zorro_antd_form__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ng-zorro-antd/form */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-form.js");
/* harmony import */ var ng_zorro_antd_input__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ng-zorro-antd/input */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-input.js");
/* harmony import */ var ng_zorro_antd_radio__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ng-zorro-antd/radio */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-radio.js");
/* harmony import */ var ng_zorro_antd_select__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ng-zorro-antd/select */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-select.js");
/* harmony import */ var ng_zorro_antd_checkbox__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ng-zorro-antd/checkbox */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-checkbox.js");
/* harmony import */ var ng_zorro_antd_button__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ng-zorro-antd/button */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-button.js");
/* harmony import */ var ng_zorro_antd_core_wave__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ng-zorro-antd/core/wave */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-core-wave.js");




















function PersonalInfoComponent_h4_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h4", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Complete your profile, please. This info is useful for your doctors");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function PersonalInfoComponent_ng_template_18_nz_option_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "nz-option", 55);
} if (rf & 2) {
    const item_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzLabel", item_r10)("nzValue", item_r10);
} }
function PersonalInfoComponent_ng_template_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nz-select", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, PersonalInfoComponent_ng_template_18_nz_option_1_Template, 1, 2, "nz-option", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r3.allTitle);
} }
function PersonalInfoComponent_nz_option_51_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "nz-option", 55);
} if (rf & 2) {
    const year_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzLabel", year_r11)("nzValue", year_r11);
} }
function PersonalInfoComponent_nz_option_54_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "nz-option", 55);
} if (rf & 2) {
    const Month_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzLabel", Month_r12.label)("nzValue", Month_r12.value);
} }
function PersonalInfoComponent_nz_option_60_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "nz-option", 55);
} if (rf & 2) {
    const item_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzLabel", item_r13)("nzValue", item_r13);
} }
function PersonalInfoComponent_ng_template_66_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nz-select", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "nz-option", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
const _c0 = function () { return { span: 12 }; };
const _c1 = function () { return { span: 24 }; };
const _c2 = function () { return { span: 6 }; };
const _c3 = function () { return { span: 9 }; };
class PersonalInfoComponent {
    constructor(_mediaControl, fb, activatedRoute, msg) {
        this._mediaControl = _mediaControl;
        this.fb = fb;
        this.activatedRoute = activatedRoute;
        this.msg = msg;
        this.thisDevice = true;
        this.allTitle = ["Mr", "Mrs", "Ms", "Dr", "Baby"];
        this.marriedStatus = ["Single", "Married", "Widow", "Divorcee"];
        this.isLoading = false;
        this.nextForm = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.allMonth = [
            { label: 'Jan', value: 1 },
            { label: 'Feb', value: 2 },
            { label: 'Mar', value: 3 },
            { label: 'Apr', value: 4 },
            { label: 'May', value: 4 },
            { label: 'June', value: 6 },
            { label: 'July', value: 7 },
            { label: 'Aug', value: 8 },
            { label: 'Sept', value: 9 },
            { label: 'Oct', value: 10 },
            { label: 'Nov', value: 11 },
            { label: 'Dec', value: 12 },
        ];
        this.all_year = [];
        this.count = 1950;
        // img url
        this.imageUrl = 'assets/img/placeholder.png';
        this.fileUpload = null;
        this.activatedRoute.params.subscribe((params) => {
            console.log(params);
            const mobile = params.mobile;
        });
    }
    // file upload
    fileInput(file) {
        this.fileUpload = file.item(0);
        var reander = new FileReader();
        reander.onload = (event) => {
            this.imageUrl = event.target.result;
        };
        reander.readAsDataURL(this.fileUpload);
    }
    ngOnInit() {
        this.years();
        this.validateForm = this.fb.group({
            patient_title: ['Mr', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            patient_marital_status: [''],
            patient_phone: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            patient_dob_year: ['',],
            patient_dob_month: ['',],
            patient_email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email]],
            patient_name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            patient_middle_name: [''],
            patient_last_name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            patient_gender: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            patient_address_line_1: [''],
            patient_address_line_2: [''],
            landmark: [''],
            patient_city: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            patient_pincode: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(6), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(6), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern('^[0-9]*$')]],
            phoneNumberPrefix: ['+91'],
            notification: [true],
            patient_age: [0],
            patient_age_month: [0],
            patient_age_days: [0],
        });
        this.activatedRoute.params.subscribe((params) => {
            const mobile = params.mobile;
            console.log(mobile);
            this.validateForm.get('patient_phone').setValue(mobile);
            this.validateForm.controls['patient_phone'].disable();
        });
    }
    submitForm() {
        const currentYear = moment__WEBPACK_IMPORTED_MODULE_1__().format('yyyy');
        const year = this.validateForm.get('patient_dob_year').value;
        const month = this.validateForm.get('patient_dob_month').value;
        if (year) {
            const years = (parseInt(currentYear) - parseInt(year));
            this.validateForm.get('patient_age').setValue(years);
        }
        if (month) {
            const months = (12 - parseInt(month));
            this.validateForm.get('patient_age_month').setValue(months);
        }
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
            this.validateForm.controls[key].updateValueAndValidity();
        }
        if (this.validateForm.valid) {
            console.log(this.validateForm.value);
            this.nextForm.emit(this.validateForm.value);
        }
    }
    years() {
        const year = moment__WEBPACK_IMPORTED_MODULE_1__().format('yyyy');
        const current = parseInt(year) - this.count;
        for (let i = 0; i <= current; i++) {
            this.all_year.push(`${this.count++}`);
        }
    }
    ngAfterContentChecked() {
        this.thisDevice = this._mediaControl.mediaPort();
    }
}
PersonalInfoComponent.ɵfac = function PersonalInfoComponent_Factory(t) { return new (t || PersonalInfoComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_3__["MediaControlService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_message_service__WEBPACK_IMPORTED_MODULE_5__["MessageService"])); };
PersonalInfoComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PersonalInfoComponent, selectors: [["app-personal-info"]], outputs: { nextForm: "nextForm" }, decls: 116, vars: 63, consts: [["style", "font-size: 15px;color: #919CB4;", 4, "ngIf"], ["nz-row", "", 1, "pt-3"], ["nz-col", "", 3, "nzXs", "nzMd"], [1, "uploadImg"], ["alt", "", 1, "img-res", 3, "src"], [1, "inputBox", "center_xy"], ["for", "upload", 1, "upload_btn"], ["nz-icon", "", "nzType", "upload", "nzTheme", "outline"], ["type", "file", "id", "upload", "accept", "image/*", 3, "change"], ["image", ""], ["nz-form", "", 1, "full-width", "mar_10", 3, "formGroup", "ngSubmit"], [1, "bottom-5"], ["nzRequired", "", 1, "form-label", 3, "nzSm", "nzXs"], ["nzErrorTip", "Please input your First name!"], [3, "nzAddOnBefore"], ["addOnBeforeTemplateTitle", ""], ["type", "text", "nz-input", "", "formControlName", "patient_name", "name", "patient_name", "placeholder", "First Name"], [1, "form-label", 3, "nzSm", "nzXs"], ["type", "text", "nz-input", "", "formControlName", "patient_middle_name", "name", "patient_last_name", "placeholder", "Middle Name"], ["nzErrorTip", "Please input your Last name!"], ["type", "text", "nz-input", "", "formControlName", "patient_last_name", "name", "patient_last_name", "placeholder", "Last Name"], ["formControlName", "patient_gender", "nzButtonStyle", "solid"], ["nz-radio-button", "", "nzValue", "Male"], ["nz-radio-button", "", "nzValue", "Female"], ["nz-radio-button", "", "nzValue", "Other"], ["nz-row", "", 1, "bottom-5"], ["nz-col", "", 1, "p-2", "center_f_y", 3, "nzXs", "nzMd"], [1, "form-label", 3, "nzXs"], ["nz-col", "", 1, "p-2", "no-left-p", 3, "nzXs", "nzMd"], ["nzShowSearch", "", "nzAllowClear", "", "nzPlaceHolder", "Year", "formControlName", "patient_dob_year", "name", "year"], [3, "nzLabel", "nzValue", 4, "ngFor", "ngForOf"], ["nz-col", "", 1, "p-2", 3, "nzXs", "nzMd"], ["nzShowSearch", "", "nzAllowClear", "", "nzPlaceHolder", "month", "formControlName", "patient_dob_month", "name", "momth"], ["nzShowSearch", "", "nzAllowClear", "", "nzPlaceHolder", "Select a option", "formControlName", "patient_marital_status", "autocomplete", "false"], ["addOnBeforeTemplate", ""], ["formControlName", "patient_phone", "name", "phone", "id", "phoneNumber", "nz-input", "", "inputmode", "numeric", "maxlength", "10"], ["nz-col", "", 1, "p-2", "text-center", 3, "nzXs", "nzMd"], ["nz-checkbox", "", "formControlName", "notification"], [1, "checkbox_text"], ["nzErrorTip", "Please input your email!", "nzExtra", "We Hate Spam! Email for Notifications"], ["type", "email", "nz-input", "", "formControlName", "patient_email", "name", "email", "placeholder", "Email-Id"], ["type", "text", "nz-input", "", "formControlName", "patient_address_line_1", "name", "location", "placeholder", "Location"], ["type", "text", "nz-input", "", "formControlName", "patient_address_line_2", "name", "house_number", "placeholder", "House / Flat / Block No"], ["type", "text", "nz-input", "", "formControlName", "landmark", "name", "landmark", "placeholder", "Nearest Landmark"], ["nzErrorTip", "Please input your City Name!"], ["nzShowSearch", "", "nzAllowClear", "", "nzPlaceHolder", "Select a City", "formControlName", "patient_city", "autocomplete", "false"], ["nzLabel", "single", "nzValue", "single"], ["nzLabel", "married", "nzValue", "married"], ["nzErrorTip", "Please input your pincode!"], ["type", "number", "nz-input", "", "formControlName", "patient_pincode", "maxlength", "6", "minlength", "6", "inputmode", "numeric", "name", "pincode", "placeholder", "Pin Code", "autocomplete", "false"], ["nz-row", ""], ["nz-button", "", "nzType", "primary", "nzBlock", "", 1, "mt-3", 3, "disabled", "nzLoading"], ["nz-icon", "", "nzType", "double-right", "nzTheme", "outline"], [2, "font-size", "15px", "color", "#919CB4"], ["formControlName", "patient_title", 1, "phone-select"], [3, "nzLabel", "nzValue"], ["formControlName", "phoneNumberPrefix", 1, "phone-select"], ["nzLabel", "+91", "nzValue", "+91"]], template: function PersonalInfoComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, PersonalInfoComponent_h4_0_Template, 2, 0, "h4", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "i", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " \u00A0 Upload Photo ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "input", 8, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function PersonalInfoComponent_Template_input_change_10_listener($event) { return ctx.fileInput($event.target.files); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "form", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngSubmit", function PersonalInfoComponent_Template_form_ngSubmit_12_listener() { return ctx.submitForm(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "nz-form-item", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "nz-form-label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "First Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "nz-form-control", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "nz-input-group", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, PersonalInfoComponent_ng_template_18_Template, 2, 1, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "input", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "nz-form-item", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "nz-form-label", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Middle Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "nz-form-control");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "nz-input-group");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "input", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "nz-form-item", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "nz-form-label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "Last Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "nz-form-control", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "nz-input-group");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](32, "input", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "nz-form-item", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "nz-form-label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "Gender");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "nz-form-control", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "nz-input-group");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "nz-radio-group", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "label", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "Male");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "label", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "Female");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "label", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, "Other");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "nz-form-label", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, "Date Of Birth");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "nz-select", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](51, PersonalInfoComponent_nz_option_51_Template, 1, 2, "nz-option", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "div", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "nz-select", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](54, PersonalInfoComponent_nz_option_54_Template, 1, 2, "nz-option", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "nz-form-item", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "nz-form-label", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57, "Marital Status");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "nz-form-control");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "nz-select", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](60, PersonalInfoComponent_nz_option_60_Template, 1, 2, "nz-option", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "nz-form-item", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "nz-form-label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63, "Mobile Number");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "nz-form-control", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "nz-input-group", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](66, PersonalInfoComponent_ng_template_66_Template, 2, 0, "ng-template", null, 34, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](68, "input", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "label", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "span", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](73, "Receive WhatsApp notifications from clinic & doctor ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "nz-form-item", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "nz-form-label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](76, "Email-Id");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "nz-form-control", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "nz-input-group");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](79, "input", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "nz-form-item", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](81, "nz-form-label", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](82, "Location");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "nz-form-control", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](84, "nz-input-group");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](85, "input", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](86, "nz-form-item", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "nz-form-label", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](88, "House / Flat / Block No.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](89, "nz-form-control");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "nz-input-group");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](91, "input", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](92, "nz-form-item", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](93, "nz-form-label", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](94, "Landmark");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](95, "nz-form-control");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "nz-input-group");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](97, "input", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](98, "nz-form-item", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](99, "nz-form-label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](100, "City");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](101, "nz-form-control", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](102, "nz-select", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](103, "nz-option", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](104, "nz-option", 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](105, "nz-form-item", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](106, "nz-form-label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](107, "Pincode");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](108, "nz-form-control", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](109, "nz-input-group");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](110, "input", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](111, "div", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](112, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](113, "button", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](114, " Next ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](115, "i", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](19);
        const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](67);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.thisDevice);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](49, _c0))("nzMd", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](50, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.imageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](51, _c0))("nzMd", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](52, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.validateForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzSm", 6)("nzXs", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzAddOnBefore", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzSm", 6)("nzXs", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzSm", 6)("nzXs", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzSm", 6)("nzXs", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](53, _c1))("nzMd", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](54, _c2));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](55, _c0))("nzMd", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](56, _c3));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.all_year);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](57, _c0))("nzMd", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](58, _c3));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.allMonth);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzSm", 6)("nzXs", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.marriedStatus);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzSm", 6)("nzXs", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzAddOnBefore", _r7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](59, _c1))("nzMd", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](60, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzSm", 6)("nzXs", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzSm", 6)("nzXs", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzSm", 6)("nzXs", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzSm", 6)("nzXs", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzSm", 6)("nzXs", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzSm", 6)("nzXs", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](61, _c1))("nzMd", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](62, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx.validateForm.valid)("nzLoading", ctx.isLoading);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_7__["NzRowDirective"], ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_7__["NzColDirective"], ng_zorro_antd_core_transition_patch__WEBPACK_IMPORTED_MODULE_8__["ɵNzTransitionPatchDirective"], ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_9__["NzIconDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatusGroup"], ng_zorro_antd_form__WEBPACK_IMPORTED_MODULE_10__["NzFormDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroupDirective"], ng_zorro_antd_form__WEBPACK_IMPORTED_MODULE_10__["NzFormItemComponent"], ng_zorro_antd_form__WEBPACK_IMPORTED_MODULE_10__["NzFormLabelComponent"], ng_zorro_antd_form__WEBPACK_IMPORTED_MODULE_10__["NzFormControlComponent"], ng_zorro_antd_input__WEBPACK_IMPORTED_MODULE_11__["NzInputGroupComponent"], ng_zorro_antd_input__WEBPACK_IMPORTED_MODULE_11__["NzInputDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControlName"], ng_zorro_antd_radio__WEBPACK_IMPORTED_MODULE_12__["NzRadioGroupComponent"], ng_zorro_antd_radio__WEBPACK_IMPORTED_MODULE_12__["NzRadioComponent"], ng_zorro_antd_radio__WEBPACK_IMPORTED_MODULE_12__["NzRadioButtonDirective"], ng_zorro_antd_select__WEBPACK_IMPORTED_MODULE_13__["NzSelectComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["MaxLengthValidator"], ng_zorro_antd_checkbox__WEBPACK_IMPORTED_MODULE_14__["NzCheckboxComponent"], ng_zorro_antd_select__WEBPACK_IMPORTED_MODULE_13__["NzOptionComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NumberValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["MinLengthValidator"], ng_zorro_antd_button__WEBPACK_IMPORTED_MODULE_15__["NzButtonComponent"], ng_zorro_antd_core_wave__WEBPACK_IMPORTED_MODULE_16__["NzWaveDirective"]], styles: [".uploadImg[_ngcontent-%COMP%] {\n  height: 135px;\n  width: 135px;\n  background-color: #f7f9fc;\n  border-radius: 50%;\n  margin: auto;\n  border: 1px solid #dcdcdc;\n}\n.uploadImg[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  border-radius: 50%;\n  width: 135px;\n  height: 135px;\n}\n#upload[_ngcontent-%COMP%] {\n  display: none;\n}\n.upload_btn[_ngcontent-%COMP%] {\n  color: #98a4ba;\n  border-radius: 5px;\n  padding: 9px 12px 9px 12px;\n  background-color: #f7f9fc;\n  font-size: 15px;\n  font-weight: 500;\n  cursor: pointer;\n  border: 1px solid #dcdcdc;\n}\n.upload_btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: black;\n}\n.inputBox[_ngcontent-%COMP%] {\n  padding-top: 17px;\n}\n.inputBox[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  margin: auto;\n}\n.block_label[_ngcontent-%COMP%] {\n  float: left !important;\n}\n.inline_input[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid #dcdcdc;\n  background-color: #f7f9fc;\n  outline: none;\n  height: 40px;\n  border-radius: 5px;\n  font-size: 15px;\n  color: #98a4ba;\n}\n.inline_input[_ngcontent-%COMP%]::placeholder {\n  font-size: 15px;\n  color: #98a4ba;\n  font-weight: 500;\n}\n.input_label[_ngcontent-%COMP%] {\n  color: #98a4ba;\n  font-size: 14px;\n  font-weight: bold;\n}\nnz-select[_ngcontent-%COMP%] {\n  width: 100%;\n}\n[nz-radio-button][_ngcontent-%COMP%] {\n  font-size: 15px;\n  border-radius: 0px !important;\n  font-weight: 500;\n}\nnz-date-picker[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.checkbox_text[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #8992a3;\n  font-weight: bolder;\n}\n@media screen and (max-width: 768px) {\n  .p-2[_ngcontent-%COMP%] {\n    padding: 3px;\n  }\n}\n.phone-select[_ngcontent-%COMP%] {\n  width: 75px !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZG9jdG9yLXBvcnRhbC9hdXRoL3JlZ2lzdGVyL3BlcnNvbmFsLWluZm8vRjovT0ZGSUNFIFdPUksvRElHSVNDUklCRS9PZmZpY2VfUHJvamVjdHMvYXBwbGljYXRpb24vcGF0aWVudF9wb3J0YWwvc3JjL2FwcC9kb2N0b3ItcG9ydGFsL2F1dGgvcmVnaXN0ZXIvcGVyc29uYWwtaW5mby9wZXJzb25hbC1pbmZvLmNvbXBvbmVudC5sZXNzIiwic3JjL2FwcC9kb2N0b3ItcG9ydGFsL2F1dGgvcmVnaXN0ZXIvcGVyc29uYWwtaW5mby9wZXJzb25hbC1pbmZvLmNvbXBvbmVudC5sZXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLFlBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLHlCQUFBO0FDQ0Y7QURDQTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7QUNDRjtBRENBO0VBQ0UsYUFBQTtBQ0NGO0FEQ0E7RUFDRSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSwwQkFBQTtFQUNBLHlCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO0FDQ0Y7QURDQTtFQUNFLFlBQUE7QUNDRjtBRENBO0VBQ0UsaUJBQUE7QUNDRjtBRENBO0VBQ0UsWUFBQTtBQ0NGO0FERUE7RUFDRSxzQkFBQTtBQ0FGO0FERUE7RUFDRSxXQUFBO0VBQ0EseUJBQUE7RUFDQSx5QkFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtBQ0FGO0FERUE7RUFDRSxlQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0FDQUY7QURFQTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUNBRjtBREVBO0VBQ0UsV0FBQTtBQ0FGO0FERUE7RUFDRSxlQUFBO0VBQ0EsNkJBQUE7RUFDQSxnQkFBQTtBQ0FGO0FERUE7RUFDRSxXQUFBO0FDQUY7QURFQTtFQUNFLGVBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7QUNBRjtBREdBO0VBQ0U7SUFDRSxZQUFBO0VDREY7QUFDRjtBRElBO0VBQ0Usc0JBQUE7QUNGRiIsImZpbGUiOiJzcmMvYXBwL2RvY3Rvci1wb3J0YWwvYXV0aC9yZWdpc3Rlci9wZXJzb25hbC1pbmZvL3BlcnNvbmFsLWluZm8uY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudXBsb2FkSW1nIHtcbiAgaGVpZ2h0OiAxMzVweDtcbiAgd2lkdGg6IDEzNXB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjdmOWZjO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIG1hcmdpbjogYXV0bztcbiAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNkYztcbn1cbi51cGxvYWRJbWcgaW1nIHtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICB3aWR0aDogMTM1cHg7XG4gIGhlaWdodDogMTM1cHg7XG59XG4jdXBsb2FkIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbi51cGxvYWRfYnRuIHtcbiAgY29sb3I6ICM5OGE0YmE7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgcGFkZGluZzogOXB4IDEycHggOXB4IDEycHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmN2Y5ZmM7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2RjO1xufVxuLnVwbG9hZF9idG4gaSB7XG4gIGNvbG9yOiBibGFjaztcbn1cbi5pbnB1dEJveCB7XG4gIHBhZGRpbmctdG9wOiAxN3B4O1xufVxuLmlucHV0Qm94IGxhYmVsIHtcbiAgbWFyZ2luOiBhdXRvO1xufVxuLy8gX19fX19fX19fX19fX2Zvcm1cbi5ibG9ja19sYWJlbCB7XG4gIGZsb2F0OiBsZWZ0ICFpbXBvcnRhbnQ7XG59XG4uaW5saW5lX2lucHV0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZGM7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmN2Y5ZmM7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGhlaWdodDogNDBweDtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBmb250LXNpemU6IDE1cHg7XG4gIGNvbG9yOiAjOThhNGJhO1xufVxuLmlubGluZV9pbnB1dDo6cGxhY2Vob2xkZXIge1xuICBmb250LXNpemU6IDE1cHg7XG4gIGNvbG9yOiAjOThhNGJhO1xuICBmb250LXdlaWdodDogNTAwO1xufVxuLmlucHV0X2xhYmVsIHtcbiAgY29sb3I6ICM5OGE0YmE7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5uei1zZWxlY3Qge1xuICB3aWR0aDogMTAwJTtcbn1cbltuei1yYWRpby1idXR0b25dIHtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBib3JkZXItcmFkaXVzOiAwcHggIWltcG9ydGFudDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cbm56LWRhdGUtcGlja2VyIHtcbiAgd2lkdGg6IDEwMCU7XG59XG4uY2hlY2tib3hfdGV4dCB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgY29sb3I6ICM4OTkyYTM7XG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5wLTIge1xuICAgIHBhZGRpbmc6IDNweDtcbiAgfVxufVxuXG4ucGhvbmUtc2VsZWN0e1xuICB3aWR0aDogNzVweCAhaW1wb3J0YW50O1xufSIsIi51cGxvYWRJbWcge1xuICBoZWlnaHQ6IDEzNXB4O1xuICB3aWR0aDogMTM1cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmN2Y5ZmM7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgbWFyZ2luOiBhdXRvO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2RjO1xufVxuLnVwbG9hZEltZyBpbWcge1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIHdpZHRoOiAxMzVweDtcbiAgaGVpZ2h0OiAxMzVweDtcbn1cbiN1cGxvYWQge1xuICBkaXNwbGF5OiBub25lO1xufVxuLnVwbG9hZF9idG4ge1xuICBjb2xvcjogIzk4YTRiYTtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBwYWRkaW5nOiA5cHggMTJweCA5cHggMTJweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y3ZjlmYztcbiAgZm9udC1zaXplOiAxNXB4O1xuICBmb250LXdlaWdodDogNTAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkY2RjZGM7XG59XG4udXBsb2FkX2J0biBpIHtcbiAgY29sb3I6IGJsYWNrO1xufVxuLmlucHV0Qm94IHtcbiAgcGFkZGluZy10b3A6IDE3cHg7XG59XG4uaW5wdXRCb3ggbGFiZWwge1xuICBtYXJnaW46IGF1dG87XG59XG4uYmxvY2tfbGFiZWwge1xuICBmbG9hdDogbGVmdCAhaW1wb3J0YW50O1xufVxuLmlubGluZV9pbnB1dCB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2RjO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjdmOWZjO1xuICBvdXRsaW5lOiBub25lO1xuICBoZWlnaHQ6IDQwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBjb2xvcjogIzk4YTRiYTtcbn1cbi5pbmxpbmVfaW5wdXQ6OnBsYWNlaG9sZGVyIHtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBjb2xvcjogIzk4YTRiYTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cbi5pbnB1dF9sYWJlbCB7XG4gIGNvbG9yOiAjOThhNGJhO1xuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxubnotc2VsZWN0IHtcbiAgd2lkdGg6IDEwMCU7XG59XG5bbnotcmFkaW8tYnV0dG9uXSB7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgYm9yZGVyLXJhZGl1czogMHB4ICFpbXBvcnRhbnQ7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5uei1kYXRlLXBpY2tlciB7XG4gIHdpZHRoOiAxMDAlO1xufVxuLmNoZWNrYm94X3RleHQge1xuICBmb250LXNpemU6IDEycHg7XG4gIGNvbG9yOiAjODk5MmEzO1xuICBmb250LXdlaWdodDogYm9sZGVyO1xufVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgLnAtMiB7XG4gICAgcGFkZGluZzogM3B4O1xuICB9XG59XG4ucGhvbmUtc2VsZWN0IHtcbiAgd2lkdGg6IDc1cHggIWltcG9ydGFudDtcbn1cbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PersonalInfoComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-personal-info',
                templateUrl: './personal-info.component.html',
                styleUrls: ['./personal-info.component.less'],
            }]
    }], function () { return [{ type: src_app_shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_3__["MediaControlService"] }, { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] }, { type: _services_message_service__WEBPACK_IMPORTED_MODULE_5__["MessageService"] }]; }, { nextForm: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "./src/app/doctor-portal/auth/register/register.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/doctor-portal/auth/register/register.component.ts ***!
  \*******************************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _interface_patient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../interface/patient */ "./src/app/interface/patient.ts");
/* harmony import */ var _services_http_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/http-constants */ "./src/app/services/http-constants.ts");
/* harmony import */ var _shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/UI_service/media-control.service */ "./src/app/shared/UI_service/media-control.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _services_base_http_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/base-http.service */ "./src/app/services/base-http.service.ts");
/* harmony import */ var _services_doctor_service_doctor_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/doctor-service/doctor.service */ "./src/app/services/doctor-service/doctor.service.ts");
/* harmony import */ var _services_message_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/message.service */ "./src/app/services/message.service.ts");
/* harmony import */ var _shared_components_container_container_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../shared/components/container/container.component */ "./src/app/shared/components/container/container.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ng-zorro-antd/grid */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-grid.js");
/* harmony import */ var _shared_components_header_header_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../shared/components/header/header.component */ "./src/app/shared/components/header/header.component.ts");
/* harmony import */ var _personal_info_personal_info_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./personal-info/personal-info.component */ "./src/app/doctor-portal/auth/register/personal-info/personal-info.component.ts");
/* harmony import */ var _health_info_health_info_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./health-info/health-info.component */ "./src/app/doctor-portal/auth/register/health-info/health-info.component.ts");















function RegisterComponent_app_header_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-header", 12);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("headerTitle", "Registeration")("isFixed", false);
} }
const _c0 = function () { return { span: 24 }; };
const _c1 = function () { return { span: 12 }; };
function RegisterComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](2, _c0))("nzMd", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](3, _c1));
} }
function RegisterComponent_h4_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h4", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Register To Healthcare center");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function RegisterComponent_ng_template_18_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "app-personal-info", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("nextForm", function RegisterComponent_ng_template_18_Template_app_personal_info_nextForm_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5.nextForm($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function RegisterComponent_ng_template_19_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "app-health-info", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("submitFinalForm", function RegisterComponent_ng_template_19_Template_app_health_info_submitFinalForm_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r7.createPatient($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
const _c2 = function (a0) { return { "themes_border_bottom": a0 }; };
class RegisterComponent {
    constructor(_mediaControl, activatedRoute, router, baseHttpService, doctorService, msg) {
        this._mediaControl = _mediaControl;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.baseHttpService = baseHttpService;
        this.doctorService = doctorService;
        this.msg = msg;
        this.thisDevice = true;
        this.patientInfo = _interface_patient__WEBPACK_IMPORTED_MODULE_1__["Patient"].default;
        this.personal_info = true;
    }
    tabSwitch(param) {
        if (this.personalFormData) {
            this.personal_info = param;
        }
    }
    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            console.log(params);
            const mobile = params.mobile;
            if (mobile) {
                this.mobileNo = mobile;
            }
            else {
                this.router.navigate([`../Login`], {
                    relativeTo: this.activatedRoute,
                });
            }
        });
    }
    ngAfterContentChecked() {
        this.thisDevice = this._mediaControl.mediaPort();
    }
    nextForm(e) {
        console.log(e);
        this.personalFormData = e;
        this.tabSwitch(false);
    }
    createPatient(e) {
        this.patientInfo.patient_title = this.personalFormData.patient_title;
        this.patientInfo.patient_name = this.personalFormData.patient_name;
        this.patientInfo.patient_last_name = `${this.personalFormData.patient_middle_name} ${this.personalFormData.patient_last_name}`;
        this.patientInfo.patient_gender = this.personalFormData.patient_gender;
        this.patientInfo.patient_marital_status = this.personalFormData.patient_marital_status;
        this.patientInfo.patient_address_line_1 = this.personalFormData.patient_address_line_1;
        this.patientInfo.patient_address_line_2 = this.personalFormData.patient_address_line_2;
        this.patientInfo.patient_city = this.personalFormData.patient_city;
        this.patientInfo.patient_pincode = this.personalFormData.patient_pincode;
        this.patientInfo.patient_phone = this.mobileNo;
        this.patientInfo.patient_age = this.personalFormData.patient_age;
        this.patientInfo.patient_age_month = this.personalFormData.patient_age_month;
        if (e.allergicData) {
            this.patientInfo.knownAllergies = e.allergicData;
        }
        this.patientInfo.patient_weight_kgs = (e.patient_weight_kgs) ? parseInt(e.patient_weight_kgs) : 0;
        this.patientInfo.patient_height = (e.patient_height) ? parseInt(e.patient_height) : 0;
        this.patientInfo.patient_blood_type = e.patient_blood_group;
        this.baseHttpService.makeRequest({ method: "POST", url: _services_http_constants__WEBPACK_IMPORTED_MODULE_2__["HttpConstants"].patient.registerPateint + this.doctorService.username, data: this.patientInfo }).subscribe((response) => {
            if (response.hasErrors()) {
                this.msg.createNotification('error', 'something went wrong please try again');
            }
            else {
                console.log(response);
                localStorage.setItem("token-" + this.doctorService.username, response.data.token);
                localStorage.setItem("patients" + this.doctorService.username, JSON.stringify([response.data.patient]));
                this.router.navigate(["../dashboard"], {
                    replaceUrl: true,
                    relativeTo: this.activatedRoute,
                });
                // this.router.navigate(["../patient"], {
                //   relativeTo: this.activatedRoute,
                // });
            }
        });
    }
}
RegisterComponent.ɵfac = function RegisterComponent_Factory(t) { return new (t || RegisterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_3__["MediaControlService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_base_http_service__WEBPACK_IMPORTED_MODULE_5__["BaseHttpService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_doctor_service_doctor_service__WEBPACK_IMPORTED_MODULE_6__["DoctorService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_message_service__WEBPACK_IMPORTED_MODULE_7__["MessageService"])); };
RegisterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: RegisterComponent, selectors: [["app-register"]], decls: 20, vars: 23, consts: [["tabTitle", "registeration"], [1, "auth_container"], ["titleAlign", "left", 3, "headerTitle", "isFixed", 4, "ngIf"], ["nz-row", ""], ["nz-col", "", 3, "nzXs", "nzMd", 4, "ngIf"], ["nz-col", "", 3, "nzXs", "nzMd"], [1, "register_container"], ["class", "register_heading", 4, "ngIf"], [1, "tab_title", 3, "ngClass"], [3, "click"], [1, "main_tab"], [3, "ngIf"], ["titleAlign", "left", 3, "headerTitle", "isFixed"], ["src", "assets/img/Registration_bg.png", "alt", "", 1, "img-res"], [1, "register_heading"], [3, "nextForm"], [3, "submitFinalForm"]], template: function RegisterComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "app-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, RegisterComponent_app_header_2_Template, 1, 2, "app-header", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, RegisterComponent_div_4_Template, 2, 4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, RegisterComponent_h4_7_Template, 2, 0, "h4", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "h3", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function RegisterComponent_Template_h3_click_11_listener() { return ctx.tabSwitch(true); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Personal info");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "h3", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function RegisterComponent_Template_h3_click_15_listener() { return ctx.tabSwitch(false); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Health info");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, RegisterComponent_ng_template_18_Template, 1, 0, "ng-template", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, RegisterComponent_ng_template_19_Template, 1, 0, "ng-template", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.thisDevice);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.thisDevice);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](13, _c0))("nzMd", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](14, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.thisDevice);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](15, _c1))("nzMd", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](16, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](17, _c2, ctx.personal_info));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](19, _c1))("nzMd", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](20, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](21, _c2, !ctx.personal_info));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.personal_info);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.personal_info);
    } }, directives: [_shared_components_container_container_component__WEBPACK_IMPORTED_MODULE_8__["ContainerComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"], ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_10__["NzRowDirective"], ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_10__["NzColDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgClass"], _shared_components_header_header_component__WEBPACK_IMPORTED_MODULE_11__["HeaderComponent"], _personal_info_personal_info_component__WEBPACK_IMPORTED_MODULE_12__["PersonalInfoComponent"], _health_info_health_info_component__WEBPACK_IMPORTED_MODULE_13__["HealthInfoComponent"]], styles: [".register_container[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100vh;\n  padding-top: 58px;\n  overflow-y: scroll;\n}\n.headingbox[_ngcontent-%COMP%] {\n  background-color: #f2f2f2;\n  position: fixed;\n  width: 100%;\n  z-index: 999;\n  height: 47px;\n}\n.topheading[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #707070;\n}\n.register_heading[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 15px;\n}\n.tab_title[_ngcontent-%COMP%] {\n  text-align: center;\n  cursor: pointer;\n  padding-top: 5px;\n  padding-bottom: 7px;\n}\n.tab_title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  text-align: center;\n  cursor: pointer;\n}\n.main_tab[_ngcontent-%COMP%] {\n  padding: 13px;\n}\nimg[_ngcontent-%COMP%] {\n  height: 100% !important;\n}\n.form-label[_ngcontent-%COMP%] {\n  padding-bottom: 0px;\n  font-family: 'ralewaybold';\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZG9jdG9yLXBvcnRhbC9hdXRoL3JlZ2lzdGVyL0Y6L09GRklDRSBXT1JLL0RJR0lTQ1JJQkUvT2ZmaWNlX1Byb2plY3RzL2FwcGxpY2F0aW9uL3BhdGllbnRfcG9ydGFsL3NyYy9hcHAvZG9jdG9yLXBvcnRhbC9hdXRoL3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbXBvbmVudC5sZXNzIiwic3JjL2FwcC9kb2N0b3ItcG9ydGFsL2F1dGgvcmVnaXN0ZXIvcmVnaXN0ZXIuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0EsYUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7QUNDRjtBRENBO0VBQ0UseUJBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0FDQ0Y7QURDQTtFQUNFLGVBQUE7RUFDQSxjQUFBO0FDQ0Y7QURDQTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtBQ0NGO0FEQ0E7RUFDRSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0FDQ0Y7QURDQTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtBQ0NGO0FEQ0E7RUFDRSxhQUFBO0FDQ0Y7QURDQTtFQUNFLHVCQUFBO0FDQ0Y7QURFQTtFQUNFLG1CQUFBO0VBQ0EsMEJBQUE7QUNBRiIsImZpbGUiOiJzcmMvYXBwL2RvY3Rvci1wb3J0YWwvYXV0aC9yZWdpc3Rlci9yZWdpc3Rlci5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIi5yZWdpc3Rlcl9jb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgcGFkZGluZy10b3A6IDU4cHg7XG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcbn1cbi5oZWFkaW5nYm94IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YyZjJmMjtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB3aWR0aDogMTAwJTtcbiAgei1pbmRleDogOTk5O1xuICBoZWlnaHQ6IDQ3cHg7XG59XG4udG9waGVhZGluZyB7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgY29sb3I6ICM3MDcwNzA7XG59XG4ucmVnaXN0ZXJfaGVhZGluZyB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxNXB4O1xufVxuLnRhYl90aXRsZSB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwYWRkaW5nLXRvcDogNXB4O1xuICBwYWRkaW5nLWJvdHRvbTogN3B4O1xufVxuLnRhYl90aXRsZSBoMyB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLm1haW5fdGFiIHtcbiAgcGFkZGluZzogMTNweDtcbn1cbmltZyB7XG4gIGhlaWdodDogMTAwJSAhaW1wb3J0YW50O1xufVxuXG4uZm9ybS1sYWJlbHtcbiAgcGFkZGluZy1ib3R0b206IDBweDtcbiAgZm9udC1mYW1pbHk6ICdyYWxld2F5Ym9sZCc7XG59IiwiLnJlZ2lzdGVyX2NvbnRhaW5lciB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMHZoO1xuICBwYWRkaW5nLXRvcDogNThweDtcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xufVxuLmhlYWRpbmdib3gge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJmMmYyO1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHdpZHRoOiAxMDAlO1xuICB6LWluZGV4OiA5OTk7XG4gIGhlaWdodDogNDdweDtcbn1cbi50b3BoZWFkaW5nIHtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBjb2xvcjogIzcwNzA3MDtcbn1cbi5yZWdpc3Rlcl9oZWFkaW5nIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXNpemU6IDE1cHg7XG59XG4udGFiX3RpdGxlIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHBhZGRpbmctdG9wOiA1cHg7XG4gIHBhZGRpbmctYm90dG9tOiA3cHg7XG59XG4udGFiX3RpdGxlIGgzIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4ubWFpbl90YWIge1xuICBwYWRkaW5nOiAxM3B4O1xufVxuaW1nIHtcbiAgaGVpZ2h0OiAxMDAlICFpbXBvcnRhbnQ7XG59XG4uZm9ybS1sYWJlbCB7XG4gIHBhZGRpbmctYm90dG9tOiAwcHg7XG4gIGZvbnQtZmFtaWx5OiAncmFsZXdheWJvbGQnO1xufVxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RegisterComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-register',
                templateUrl: './register.component.html',
                styleUrls: ['./register.component.less']
            }]
    }], function () { return [{ type: _shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_3__["MediaControlService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }, { type: _services_base_http_service__WEBPACK_IMPORTED_MODULE_5__["BaseHttpService"] }, { type: _services_doctor_service_doctor_service__WEBPACK_IMPORTED_MODULE_6__["DoctorService"] }, { type: _services_message_service__WEBPACK_IMPORTED_MODULE_7__["MessageService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/doctor-portal/doctor-portal-routing.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/doctor-portal/doctor-portal-routing.module.ts ***!
  \***************************************************************/
/*! exports provided: DoctorPortalRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DoctorPortalRoutingModule", function() { return DoctorPortalRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _auth_login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth/login/login.component */ "./src/app/doctor-portal/auth/login/login.component.ts");
/* harmony import */ var _auth_register_register_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth/register/register.component */ "./src/app/doctor-portal/auth/register/register.component.ts");
/* harmony import */ var _doctor_portal_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./doctor-portal.component */ "./src/app/doctor-portal/doctor-portal.component.ts");
/* harmony import */ var _doctor_root_doctor_root_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./doctor-root/doctor-root.component */ "./src/app/doctor-portal/doctor-root/doctor-root.component.ts");
/* harmony import */ var _guards_login_auth_guard_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../guards/login-auth-guard.service */ "./src/app/guards/login-auth-guard.service.ts");
/* harmony import */ var _guards_auth_guard_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../guards/auth-guard.service */ "./src/app/guards/auth-guard.service.ts");
/* harmony import */ var _other_page_privacy_policy_privacy_policy_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./other_page/privacy-policy/privacy-policy.component */ "./src/app/doctor-portal/other_page/privacy-policy/privacy-policy.component.ts");
/* harmony import */ var _other_page_terms_of_use_terms_of_use_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./other_page/terms-of-use/terms-of-use.component */ "./src/app/doctor-portal/other_page/terms-of-use/terms-of-use.component.ts");












const routes = [
    {
        path: ":username",
        component: _doctor_root_doctor_root_component__WEBPACK_IMPORTED_MODULE_5__["DoctorRootComponent"],
        children: [
            {
                path: "",
                component: _doctor_portal_component__WEBPACK_IMPORTED_MODULE_4__["DoctorPortalComponent"],
                children: [
                    { path: "Login", component: _auth_login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"], canActivate: [_guards_login_auth_guard_service__WEBPACK_IMPORTED_MODULE_6__["LoginAuthGuard"]], },
                    {
                        path: "Login/:token",
                        component: _auth_login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"],
                        canActivate: [_guards_login_auth_guard_service__WEBPACK_IMPORTED_MODULE_6__["LoginAuthGuard"]],
                    },
                ]
            },
            { path: "Register/:mobile", component: _auth_register_register_component__WEBPACK_IMPORTED_MODULE_3__["RegisterComponent"], },
            {
                path: 'dashboard', data: { preload: false }, loadChildren: () => Promise.all(/*! import() | patient-dashboard-patient-dashboard-module */[__webpack_require__.e("common"), __webpack_require__.e("patient-dashboard-patient-dashboard-module")]).then(__webpack_require__.bind(null, /*! ../patient-dashboard/patient-dashboard.module */ "./src/app/patient-dashboard/patient-dashboard.module.ts")).then(m => m.PatientDashboardModule), canActivate: [_guards_auth_guard_service__WEBPACK_IMPORTED_MODULE_7__["AuthGuard"]],
            },
            { path: 'privacypolicy', component: _other_page_privacy_policy_privacy_policy_component__WEBPACK_IMPORTED_MODULE_8__["PrivacyPolicyComponent"] },
            { path: 'termsofuse', component: _other_page_terms_of_use_terms_of_use_component__WEBPACK_IMPORTED_MODULE_9__["TermsOfUseComponent"] }
        ]
    }
    //   { path: ':username', component: DoctorPortalComponent,
    //   children: [
    //     { path: 'Login', component: LoginComponent },
    //   { path: 'Register', component: RegisterComponent }
    //   ],
    // }
];
class DoctorPortalRoutingModule {
}
DoctorPortalRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: DoctorPortalRoutingModule });
DoctorPortalRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function DoctorPortalRoutingModule_Factory(t) { return new (t || DoctorPortalRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](DoctorPortalRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DoctorPortalRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/doctor-portal/doctor-portal.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/doctor-portal/doctor-portal.component.ts ***!
  \**********************************************************/
/*! exports provided: DoctorPortalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DoctorPortalComponent", function() { return DoctorPortalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _services_doctor_service_doctor_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/doctor-service/doctor.service */ "./src/app/services/doctor-service/doctor.service.ts");
/* harmony import */ var _shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/UI_service/media-control.service */ "./src/app/shared/UI_service/media-control.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _shared_UI_service_dynamic_title_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/UI_service/dynamic-title.service */ "./src/app/shared/UI_service/dynamic-title.service.ts");
/* harmony import */ var _shared_UI_service_div_scroll_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/UI_service/div-scroll.service */ "./src/app/shared/UI_service/div-scroll.service.ts");
/* harmony import */ var _shared_UI_service_get_dr_name_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/UI_service/get-dr-name.service */ "./src/app/shared/UI_service/get-dr-name.service.ts");
/* harmony import */ var _shared_components_container_container_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/components/container/container.component */ "./src/app/shared/components/container/container.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var ng_zorro_antd_back_top__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ng-zorro-antd/back-top */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-back-top.js");
/* harmony import */ var _page_dr_home_dr_home_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./page/dr-home/dr-home.component */ "./src/app/doctor-portal/page/dr-home/dr-home.component.ts");
/* harmony import */ var ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ng-zorro-antd/grid */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-grid.js");
/* harmony import */ var _page_appointment_appointment_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./page/appointment/appointment.component */ "./src/app/doctor-portal/page/appointment/appointment.component.ts");
/* harmony import */ var _page_overview_overview_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./page/overview/overview.component */ "./src/app/doctor-portal/page/overview/overview.component.ts");
/* harmony import */ var _page_clinic_location_clinic_location_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./page/clinic-location/clinic-location.component */ "./src/app/doctor-portal/page/clinic-location/clinic-location.component.ts");
/* harmony import */ var _page_treatements_treatements_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./page/treatements/treatements.component */ "./src/app/doctor-portal/page/treatements/treatements.component.ts");
/* harmony import */ var _page_gallery_gallery_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./page/gallery/gallery.component */ "./src/app/doctor-portal/page/gallery/gallery.component.ts");
/* harmony import */ var _page_testimonial_testimonial_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./page/testimonial/testimonial.component */ "./src/app/doctor-portal/page/testimonial/testimonial.component.ts");
/* harmony import */ var _shared_components_footer_footer_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../shared/components/footer/footer.component */ "./src/app/shared/components/footer/footer.component.ts");
/* harmony import */ var ng_zorro_antd_core_transition_patch__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ng-zorro-antd/core/transition-patch */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-core-transition-patch.js");
/* harmony import */ var ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ng-zorro-antd/icon */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-icon.js");
/* harmony import */ var _other_page_chat_box_chat_box_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./other_page/chat-box/chat-box.component */ "./src/app/doctor-portal/other_page/chat-box/chat-box.component.ts");
























const _c0 = function (a0) { return { "transform": a0 }; };
function DoctorPortalComponent_ng_container_1_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DoctorPortalComponent_ng_container_1_ng_container_2_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6); const item_r4 = ctx.$implicit; const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5.socroll(item_r4.section); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("data-tooltip", item_r4.tooltip);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("src", "assets/icon/sideNav/", item_r4.iconName, "", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](3, _c0, item_r4.section == "section1" ? "rotate(0deg)" : "rotate(90deg)"));
} }
function DoctorPortalComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, DoctorPortalComponent_ng_container_1_ng_container_2_Template, 3, 5, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.DivName);
} }
const _c1 = function () { return { span: 22, offset: 1 }; };
const _c2 = function () { return { span: 20, offset: 2 }; };
function DoctorPortalComponent_div_2_ng_container_3_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-treatements", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](5, _c1))("nzMd", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](6, _c1))("nzLg", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](7, _c1))("nzXl", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](8, _c2));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("treatments", ctx_r11.doctorCms.treatmentCategories);
} }
function DoctorPortalComponent_div_2_ng_container_3_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-gallery", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](5, _c1))("nzMd", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](6, _c1))("nzLg", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](7, _c1))("nzXl", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](8, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("galleryImg", ctx_r12.doctorCms);
} }
function DoctorPortalComponent_div_2_ng_container_3_div_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-testimonial", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](5, _c1))("nzMd", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](6, _c1))("nzLg", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](7, _c1))("nzXl", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](8, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("reviews", ctx_r13.doctorCms.testimonials);
} }
const _c3 = function () { return { span: 24, offset: 0 }; };
function DoctorPortalComponent_div_2_ng_container_3_div_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-footer", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](2, _c3));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("doctor", ctx_r14.doctor);
} }
const _c4 = function () { return { span: 18, offset: 3 }; };
function DoctorPortalComponent_div_2_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "app-dr-home");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "app-appointment", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "app-overview", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, DoctorPortalComponent_div_2_ng_container_3_div_10_Template, 3, 9, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, DoctorPortalComponent_div_2_ng_container_3_div_11_Template, 3, 9, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, DoctorPortalComponent_div_2_ng_container_3_div_12_Template, 3, 9, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "app-clinic-location", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, DoctorPortalComponent_div_2_ng_container_3_div_17_Template, 2, 3, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](22, _c1))("nzMd", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](23, _c4))("nzLg", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](24, _c4))("nzXl", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](25, _c4));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("clinics", ctx_r8.clinics)("open", ctx_r8.allStartTime);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](26, _c1))("nzMd", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](27, _c1))("nzLg", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](28, _c1))("nzXl", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](29, _c2));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("drCMS", ctx_r8.doctorCms)("doctor", ctx_r8.doctor)("location", ctx_r8.location);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r8.doctorCms && ctx_r8.doctorCms.treatmentCategories.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r8.doctorCms);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r8.doctorCms && ctx_r8.doctorCms.testimonials.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](30, _c1))("nzMd", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](31, _c1))("nzLg", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](32, _c1))("nzXl", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](33, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("clinics", ctx_r8.clinics);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r8.doctor);
} }
function DoctorPortalComponent_div_2_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "i", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function DoctorPortalComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 8, 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, DoctorPortalComponent_div_2_ng_container_3_Template, 18, 34, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "nz-back-top", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, DoctorPortalComponent_div_2_ng_template_5_Template, 2, 0, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](6);
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.haveChatBox);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzTarget", _r7)("nzTemplate", _r9)("nzVisibilityHeight", 100);
} }
function DoctorPortalComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-chat-box");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](1, _c3));
} }
class DoctorPortalComponent {
    constructor(doctorService, _viewMedia, router, cdf, _dynamicTitle, _divScroll, _dr) {
        this.doctorService = doctorService;
        this._viewMedia = _viewMedia;
        this.router = router;
        this.cdf = cdf;
        this._dynamicTitle = _dynamicTitle;
        this._divScroll = _divScroll;
        this._dr = _dr;
        this.haveChatBox = true;
        this.todayDateStr = "";
        this.isMobile = window.screen.width < 601;
        this.isAuthenticated = false;
        this.days = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ];
        this.allStartTime = [];
        // ________ page scroll Spy ____________
        this.DivName = this._divScroll.sectionName;
        this.location = '';
    }
    ngOnInit() {
        const token = localStorage.getItem("token-" + this.doctorService.username);
        if (token) {
            this.isAuthenticated = true;
        }
        this.landingPageDataObservable = this.doctorService.data$.subscribe((d) => {
            this.handleLandingPageData(d);
        });
    }
    ngAfterContentChecked() {
        this.side_page_nav = this._viewMedia.mediaPort();
        this.ifLogin();
    }
    ifLogin() {
        let urlStr = `/home/${this._dr.getDr()}`;
        if (this.router.url == urlStr) {
            this.forlogin = true;
        }
        else {
            this.forlogin = false;
        }
    }
    chatBox(param) {
        this.haveChatBox = param;
    }
    socroll(divId) {
        this._divScroll.triggerScrollTo(divId);
    }
    handleLandingPageData(d) {
        this.doctor = d.doctor;
        this.doctorCms = d.doctorCMS;
        console.log(d.doctorCMS);
        this.telemedicineSetup = d.telemedicineSetup;
        localStorage.setItem(`doctor-${this.doctorService.username}`, JSON.stringify(this.doctor));
        const todayDate = moment__WEBPACK_IMPORTED_MODULE_1__();
        this.todayDateStr = todayDate.format("LL");
        const todayDay = todayDate.format("dddd").toLowerCase();
        this.clinics = d.clinics;
        this.actualClinic = d.actualClinic;
        this.clinics.sort((a, b) => {
            return b.timestamp - a.timestamp;
        });
        for (let index1 = 0; index1 < this.clinics.length; index1++) {
            const clinic = this.clinics[index1];
            clinic.businessHours = [];
            this.days.forEach((x) => {
                clinic.businessHours.push({ day: x, timings: [], timingsStr: [] });
            });
            for (let index2 = 0; index2 < clinic.timings.length; index2++) {
                const clinicTiming = clinic.timings[index2];
                for (let index3 = 0; index3 < clinic.businessHours.length; index3++) {
                    const bh = clinic.businessHours[index3];
                    let isWorking = false;
                    if (clinicTiming.monStatus && bh.day == "Monday") {
                        isWorking = true;
                    }
                    if (clinicTiming.tueStatus && bh.day == "Tuesday") {
                        isWorking = true;
                    }
                    if (clinicTiming.wedStatus && bh.day == "Wednesday") {
                        isWorking = true;
                    }
                    if (clinicTiming.thuStatus && bh.day == "Thursday") {
                        isWorking = true;
                    }
                    if (clinicTiming.friStatus && bh.day == "Friday") {
                        isWorking = true;
                    }
                    if (clinicTiming.satStatus && bh.day == "Saturday") {
                        isWorking = true;
                    }
                    if (clinicTiming.sunStatus && bh.day == "Sunday") {
                        isWorking = true;
                    }
                    if (isWorking) {
                        bh.timings.push({
                            startTime: clinicTiming.starttime,
                            endTime: clinicTiming.endtime,
                        });
                        bh.timingsStr.push(moment__WEBPACK_IMPORTED_MODULE_1__(clinicTiming.starttime, "HH:mm").format("hh:mm A") +
                            "-" +
                            moment__WEBPACK_IMPORTED_MODULE_1__(clinicTiming.endtime, "HH:mm").format("hh:mm A"));
                    }
                }
            }
            const businessHour = clinic.businessHours.find((x) => x.day.toLowerCase() == todayDay);
            if (businessHour.timings.length) {
                // const moments = [];
                const currentTime = moment__WEBPACK_IMPORTED_MODULE_1__();
                for (let index = 0; index < businessHour.timings.length; index++) {
                    const timing = businessHour.timings[index];
                    const startTimeMoment = moment__WEBPACK_IMPORTED_MODULE_1__(timing.startTime, "HH:mm");
                    const endTimeMoment = moment__WEBPACK_IMPORTED_MODULE_1__(timing.endTime, "HH:mm");
                    this.allStartTime.push({ time: startTimeMoment.format("hh A"), times: startTimeMoment.format("HH") });
                    if (currentTime.isBetween(startTimeMoment, endTimeMoment)) {
                        clinic.todayWorkingTime =
                            "Closes at " + endTimeMoment.format("hh:mm A");
                        break;
                    }
                    else if (currentTime.isBefore(startTimeMoment)) {
                        clinic.todayWorkingTime =
                            "Opens at " + startTimeMoment.format("hh:mm A");
                        break;
                    }
                }
                clinic.isTodayWorking = false;
                businessHour.timings.forEach((time) => {
                    const startTime = moment__WEBPACK_IMPORTED_MODULE_1__(currentTime.format("DD/MM/YYYY") + " " + time.startTime, "DD/MM/YYYY HH:mm");
                    const endTime = moment__WEBPACK_IMPORTED_MODULE_1__(currentTime.format("DD/MM/YYYY") + " " + time.endTime, "DD/MM/YYYY HH:mm");
                    if (currentTime.isBetween(startTime, endTime)) {
                        clinic.isTodayWorking = true;
                    }
                });
            }
        }
        this.allStartTime.sort((a, b) => {
            return a.times - b.times;
        });
        const clinicCity = this.clinics.find((item) => {
            return item.city != '';
        });
        if (clinicCity) {
            this.location = `${clinicCity.city}, ${clinicCity.state}`;
        }
        this.cdf.detectChanges();
    }
}
DoctorPortalComponent.ɵfac = function DoctorPortalComponent_Factory(t) { return new (t || DoctorPortalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_doctor_service_doctor_service__WEBPACK_IMPORTED_MODULE_2__["DoctorService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_3__["MediaControlService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_UI_service_dynamic_title_service__WEBPACK_IMPORTED_MODULE_5__["DynamicTitleService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_UI_service_div_scroll_service__WEBPACK_IMPORTED_MODULE_6__["DivScrollService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_UI_service_get_dr_name_service__WEBPACK_IMPORTED_MODULE_7__["GetDrNameService"])); };
DoctorPortalComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DoctorPortalComponent, selectors: [["app-doctor-portal"]], decls: 5, vars: 3, consts: [["tabTitle", "Dr Home"], [4, "ngIf"], ["class", "long-div", 4, "ngIf"], ["nz-row", "", 4, "ngIf"], [1, "side_page_nav_desktop", "app_shadow_r"], [4, "ngFor", "ngForOf"], [3, "click"], ["alt", "", 3, "ngStyle", "src"], [1, "long-div"], ["divTarget", ""], [1, "long-div-inner"], [3, "nzTarget", "nzTemplate", "nzVisibilityHeight"], ["backToTopBtn", ""], ["id", "section1"], ["nz-row", "", "id", "section2"], ["nz-col", "", 3, "nzXs", "nzMd", "nzLg", "nzXl"], [3, "clinics", "open"], ["nz-row", "", "id", "section3"], [3, "drCMS", "doctor", "location"], ["nz-row", "", "id", "section4", 4, "ngIf"], ["nz-row", "", "id", "section5", 4, "ngIf"], ["nz-row", "", "id", "section6", 4, "ngIf"], ["nz-row", "", "id", "section7"], [3, "clinics"], ["nz-row", "", "id", "section8"], ["nz-col", "", 3, "nzXs", 4, "ngIf"], ["nz-row", "", "id", "section4"], [3, "treatments"], ["nz-row", "", "id", "section5"], [3, "galleryImg"], ["nz-row", "", "id", "section6"], [3, "reviews"], ["nz-col", "", 3, "nzXs"], [3, "doctor"], [1, "ant-back-top-inner", "app_shadow_b"], ["nz-icon", "", "nzType", "arrow-up", "nzTheme", "outline"], ["nz-row", ""]], template: function DoctorPortalComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "app-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, DoctorPortalComponent_ng_container_1_Template, 3, 1, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, DoctorPortalComponent_div_2_Template, 7, 4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, DoctorPortalComponent_div_3_Template, 3, 2, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.side_page_nav);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.forlogin);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.haveChatBox);
    } }, directives: [_shared_components_container_container_component__WEBPACK_IMPORTED_MODULE_8__["ContainerComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterOutlet"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgStyle"], ng_zorro_antd_back_top__WEBPACK_IMPORTED_MODULE_10__["NzBackTopComponent"], _page_dr_home_dr_home_component__WEBPACK_IMPORTED_MODULE_11__["DrHomeComponent"], ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_12__["NzRowDirective"], ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_12__["NzColDirective"], _page_appointment_appointment_component__WEBPACK_IMPORTED_MODULE_13__["AppointmentComponent"], _page_overview_overview_component__WEBPACK_IMPORTED_MODULE_14__["OverviewComponent"], _page_clinic_location_clinic_location_component__WEBPACK_IMPORTED_MODULE_15__["ClinicLocationComponent"], _page_treatements_treatements_component__WEBPACK_IMPORTED_MODULE_16__["TreatementsComponent"], _page_gallery_gallery_component__WEBPACK_IMPORTED_MODULE_17__["GalleryComponent"], _page_testimonial_testimonial_component__WEBPACK_IMPORTED_MODULE_18__["TestimonialComponent"], _shared_components_footer_footer_component__WEBPACK_IMPORTED_MODULE_19__["FooterComponent"], ng_zorro_antd_core_transition_patch__WEBPACK_IMPORTED_MODULE_20__["ɵNzTransitionPatchDirective"], ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_21__["NzIconDirective"], _other_page_chat_box_chat_box_component__WEBPACK_IMPORTED_MODULE_22__["ChatBoxComponent"]], styles: ["html[_ngcontent-%COMP%] {\n  scroll-behavior: smooth;\n}\n.side_page_nav_desktop[_ngcontent-%COMP%] {\n  background-color: white;\n  position: fixed;\n  top: 50%;\n  right: 0;\n  z-index: 12000;\n  transform: translate(0, -50%);\n  padding: 17px 5px 17px 7px;\n  border-radius: 12px 0px 0px 12px;\n}\n.side_page_nav_desktop[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  color: #838383;\n  display: block;\n  font-size: 18px;\n  padding-top: 4px;\n  padding-bottom: 4px;\n  border: none;\n  border-bottom: 1px solid #dbdbdb;\n  background: transparent;\n  cursor: pointer;\n  position: relative;\n}\n.side_page_nav_desktop[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%]:hover::before {\n  content: attr(data-tooltip);\n  position: absolute;\n  top: 0;\n  right: 52px;\n  background-color: black;\n  font-size: 13px;\n  width: 115px;\n  padding: 7px;\n  color: white;\n  border-radius: 10px;\n  font-weight: 700;\n  box-shadow: 0px 4px 8px -3px #a3a1a3;\n}\n.side_page_nav_desktop[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  height: 20px;\n  width: 20px;\n}\n.message[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 42px;\n  right: 42px;\n  width: 69px;\n  height: 69px;\n  border-radius: 50%;\n  z-index: 12000;\n  cursor: pointer;\n  box-shadow: 4px 4px 30px 0px rgba(0, 0, 0, 0.37);\n  font-size: 30px;\n}\n[_nghost-%COMP%]     .long-div {\n  height: 100vh;\n  overflow-y: scroll;\n}\n[_nghost-%COMP%]     .long-div-inner {\n  height: 1500px;\n}\n[_nghost-%COMP%]     .long-div .ant-back-top {\n  right: 30px;\n  bottom: 30px;\n}\n[_nghost-%COMP%]     .long-div .ant-back-top-rtl {\n  right: unset;\n  left: 150px;\n}\n[_nghost-%COMP%]     strong {\n  color: rgba(64, 64, 64, 0.6);\n}\n[_nghost-%COMP%]     .ant-back-top-inner {\n  height: 40px;\n  width: 40px;\n  line-height: 40px;\n  border-radius: 4px;\n  background-color: #1088e9;\n  color: #fff;\n  text-align: center;\n  font-size: 20px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZG9jdG9yLXBvcnRhbC9GOi9PRkZJQ0UgV09SSy9ESUdJU0NSSUJFL09mZmljZV9Qcm9qZWN0cy9hcHBsaWNhdGlvbi9wYXRpZW50X3BvcnRhbC9zcmMvYXBwL2RvY3Rvci1wb3J0YWwvZG9jdG9yLXBvcnRhbC5jb21wb25lbnQubGVzcyIsInNyYy9hcHAvZG9jdG9yLXBvcnRhbC9kb2N0b3ItcG9ydGFsLmNvbXBvbmVudC5sZXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsdUJBQUE7QUNDRjtBRENBO0VBQ0UsdUJBQUE7RUFDQSxlQUFBO0VBQ0EsUUFBQTtFQUNBLFFBQUE7RUFDQSxjQUFBO0VBQ0EsNkJBQUE7RUFDQSwwQkFBQTtFQUNBLGdDQUFBO0FDQ0Y7QURDQTtFQUNFLGNBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0EsZ0NBQUE7RUFDQSx1QkFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtBQ0NGO0FERUE7RUFDRSwyQkFBQTtFQUNBLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLFdBQUE7RUFDQSx1QkFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBR0Esb0NBQUE7QUNBRjtBREVBO0VBQ0UsWUFBQTtFQUNBLFdBQUE7QUNBRjtBRElBO0VBQ0UsZUFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EsZ0RBQUE7RUFDQSxlQUFBO0FDRkY7QURNQTtFQUNFLGFBQUE7RUFDQSxrQkFBQTtBQ0pGO0FET0E7RUFDRSxjQUFBO0FDTEY7QURRQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0FDTkY7QURTQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0FDUEY7QURTQTtFQUNFLDRCQUFBO0FDUEY7QURTQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtBQ1BGIiwiZmlsZSI6InNyYy9hcHAvZG9jdG9yLXBvcnRhbC9kb2N0b3ItcG9ydGFsLmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiaHRtbCB7XG4gIHNjcm9sbC1iZWhhdmlvcjogc21vb3RoO1xufVxuLnNpZGVfcGFnZV9uYXZfZGVza3RvcCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogNTAlO1xuICByaWdodDogMDtcbiAgei1pbmRleDogMTIwMDA7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC01MCUpO1xuICBwYWRkaW5nOiAxN3B4IDVweCAxN3B4IDdweDtcbiAgYm9yZGVyLXJhZGl1czogMTJweCAwcHggMHB4IDEycHg7XG59XG4uc2lkZV9wYWdlX25hdl9kZXNrdG9wIGJ1dHRvbiB7XG4gIGNvbG9yOiAjODM4MzgzO1xuICBkaXNwbGF5OiBibG9jaztcbiAgZm9udC1zaXplOiAxOHB4O1xuICBwYWRkaW5nLXRvcDogNHB4O1xuICBwYWRkaW5nLWJvdHRvbTogNHB4O1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCNkYmRiZGI7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLnNpZGVfcGFnZV9uYXZfZGVza3RvcCA+IGJ1dHRvbjpob3Zlcjo6YmVmb3JlIHtcbiAgY29udGVudDogYXR0cihkYXRhLXRvb2x0aXApO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgcmlnaHQ6IDUycHg7XG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xuICBmb250LXNpemU6IDEzcHg7XG4gIHdpZHRoOiAxMTVweDtcbiAgcGFkZGluZzogN3B4O1xuICBjb2xvcjogd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIC13ZWJraXQtYm94LXNoYWRvdzogMHB4IDRweCA4cHggLTNweCByZ2JhKDE2MywgMTYxLCAxNjMsIDEpO1xuICAtbW96LWJveC1zaGFkb3c6IDBweCA0cHggOHB4IC0zcHggcmdiYSgxNjMsIDE2MSwgMTYzLCAxKTtcbiAgYm94LXNoYWRvdzogMHB4IDRweCA4cHggLTNweCByZ2JhKDE2MywgMTYxLCAxNjMsIDEpO1xufVxuLnNpZGVfcGFnZV9uYXZfZGVza3RvcCBidXR0b24gaW1nIHtcbiAgaGVpZ2h0OiAyMHB4O1xuICB3aWR0aDogMjBweDtcbn1cblxuLy8gbWVzc2FnZVxuLm1lc3NhZ2Uge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGJvdHRvbTogNDJweDtcbiAgcmlnaHQ6IDQycHg7XG4gIHdpZHRoOiA2OXB4O1xuICBoZWlnaHQ6IDY5cHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgei1pbmRleDogMTIwMDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgYm94LXNoYWRvdzogNHB4IDRweCAzMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMzcpO1xuICBmb250LXNpemU6IDMwcHg7XG59XG5cbi8vIG5nIGJhY2stdG9wXG46aG9zdCA6Om5nLWRlZXAgLmxvbmctZGl2IHtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xufVxuXG46aG9zdCA6Om5nLWRlZXAgLmxvbmctZGl2LWlubmVyIHtcbiAgaGVpZ2h0OiAxNTAwcHg7XG59XG5cbjpob3N0IDo6bmctZGVlcCAubG9uZy1kaXYgLmFudC1iYWNrLXRvcCB7XG4gIHJpZ2h0OiAzMHB4O1xuICBib3R0b206IDMwcHg7XG59XG5cbjpob3N0IDo6bmctZGVlcCAubG9uZy1kaXYgLmFudC1iYWNrLXRvcC1ydGwge1xuICByaWdodDogdW5zZXQ7XG4gIGxlZnQ6IDE1MHB4O1xufVxuOmhvc3QgOjpuZy1kZWVwIHN0cm9uZyB7XG4gIGNvbG9yOiByZ2JhKDY0LCA2NCwgNjQsIDAuNik7XG59XG46aG9zdCA6Om5nLWRlZXAgLmFudC1iYWNrLXRvcC1pbm5lciB7XG4gIGhlaWdodDogNDBweDtcbiAgd2lkdGg6IDQwcHg7XG4gIGxpbmUtaGVpZ2h0OiA0MHB4O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxMDg4ZTk7XG4gIGNvbG9yOiAjZmZmO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMjBweDtcbn1cbi8vIG5nIGJhY2stdG9wXG4iLCJodG1sIHtcbiAgc2Nyb2xsLWJlaGF2aW9yOiBzbW9vdGg7XG59XG4uc2lkZV9wYWdlX25hdl9kZXNrdG9wIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiA1MCU7XG4gIHJpZ2h0OiAwO1xuICB6LWluZGV4OiAxMjAwMDtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTUwJSk7XG4gIHBhZGRpbmc6IDE3cHggNXB4IDE3cHggN3B4O1xuICBib3JkZXItcmFkaXVzOiAxMnB4IDBweCAwcHggMTJweDtcbn1cbi5zaWRlX3BhZ2VfbmF2X2Rlc2t0b3AgYnV0dG9uIHtcbiAgY29sb3I6ICM4MzgzODM7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmb250LXNpemU6IDE4cHg7XG4gIHBhZGRpbmctdG9wOiA0cHg7XG4gIHBhZGRpbmctYm90dG9tOiA0cHg7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkYmRiZGI7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi5zaWRlX3BhZ2VfbmF2X2Rlc2t0b3AgPiBidXR0b246aG92ZXI6OmJlZm9yZSB7XG4gIGNvbnRlbnQ6IGF0dHIoZGF0YS10b29sdGlwKTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiA1MnB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcbiAgZm9udC1zaXplOiAxM3B4O1xuICB3aWR0aDogMTE1cHg7XG4gIHBhZGRpbmc6IDdweDtcbiAgY29sb3I6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBmb250LXdlaWdodDogNzAwO1xuICAtd2Via2l0LWJveC1zaGFkb3c6IDBweCA0cHggOHB4IC0zcHggI2EzYTFhMztcbiAgLW1vei1ib3gtc2hhZG93OiAwcHggNHB4IDhweCAtM3B4ICNhM2ExYTM7XG4gIGJveC1zaGFkb3c6IDBweCA0cHggOHB4IC0zcHggI2EzYTFhMztcbn1cbi5zaWRlX3BhZ2VfbmF2X2Rlc2t0b3AgYnV0dG9uIGltZyB7XG4gIGhlaWdodDogMjBweDtcbiAgd2lkdGg6IDIwcHg7XG59XG4ubWVzc2FnZSB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgYm90dG9tOiA0MnB4O1xuICByaWdodDogNDJweDtcbiAgd2lkdGg6IDY5cHg7XG4gIGhlaWdodDogNjlweDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICB6LWluZGV4OiAxMjAwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBib3gtc2hhZG93OiA0cHggNHB4IDMwcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4zNyk7XG4gIGZvbnQtc2l6ZTogMzBweDtcbn1cbjpob3N0IDo6bmctZGVlcCAubG9uZy1kaXYge1xuICBoZWlnaHQ6IDEwMHZoO1xuICBvdmVyZmxvdy15OiBzY3JvbGw7XG59XG46aG9zdCA6Om5nLWRlZXAgLmxvbmctZGl2LWlubmVyIHtcbiAgaGVpZ2h0OiAxNTAwcHg7XG59XG46aG9zdCA6Om5nLWRlZXAgLmxvbmctZGl2IC5hbnQtYmFjay10b3Age1xuICByaWdodDogMzBweDtcbiAgYm90dG9tOiAzMHB4O1xufVxuOmhvc3QgOjpuZy1kZWVwIC5sb25nLWRpdiAuYW50LWJhY2stdG9wLXJ0bCB7XG4gIHJpZ2h0OiB1bnNldDtcbiAgbGVmdDogMTUwcHg7XG59XG46aG9zdCA6Om5nLWRlZXAgc3Ryb25nIHtcbiAgY29sb3I6IHJnYmEoNjQsIDY0LCA2NCwgMC42KTtcbn1cbjpob3N0IDo6bmctZGVlcCAuYW50LWJhY2stdG9wLWlubmVyIHtcbiAgaGVpZ2h0OiA0MHB4O1xuICB3aWR0aDogNDBweDtcbiAgbGluZS1oZWlnaHQ6IDQwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzEwODhlOTtcbiAgY29sb3I6ICNmZmY7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAyMHB4O1xufVxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DoctorPortalComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-doctor-portal',
                templateUrl: './doctor-portal.component.html',
                styleUrls: ['./doctor-portal.component.less']
            }]
    }], function () { return [{ type: _services_doctor_service_doctor_service__WEBPACK_IMPORTED_MODULE_2__["DoctorService"] }, { type: _shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_3__["MediaControlService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }, { type: _shared_UI_service_dynamic_title_service__WEBPACK_IMPORTED_MODULE_5__["DynamicTitleService"] }, { type: _shared_UI_service_div_scroll_service__WEBPACK_IMPORTED_MODULE_6__["DivScrollService"] }, { type: _shared_UI_service_get_dr_name_service__WEBPACK_IMPORTED_MODULE_7__["GetDrNameService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/doctor-portal/doctor-portal.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/doctor-portal/doctor-portal.module.ts ***!
  \*******************************************************/
/*! exports provided: DoctorPortalModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DoctorPortalModule", function() { return DoctorPortalModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _doctor_portal_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./doctor-portal-routing.module */ "./src/app/doctor-portal/doctor-portal-routing.module.ts");
/* harmony import */ var _doctor_portal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./doctor-portal.component */ "./src/app/doctor-portal/doctor-portal.component.ts");
/* harmony import */ var _shared_components_share_components_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/components/share-components.module */ "./src/app/shared/components/share-components.module.ts");
/* harmony import */ var _shared_themes_zorro_ant_components_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/themes/zorro-ant-components.module */ "./src/app/shared/themes/zorro-ant-components.module.ts");
/* harmony import */ var _page_dr_home_dr_home_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./page/dr-home/dr-home.component */ "./src/app/doctor-portal/page/dr-home/dr-home.component.ts");
/* harmony import */ var _page_overview_overview_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./page/overview/overview.component */ "./src/app/doctor-portal/page/overview/overview.component.ts");
/* harmony import */ var _page_treatements_treatements_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./page/treatements/treatements.component */ "./src/app/doctor-portal/page/treatements/treatements.component.ts");
/* harmony import */ var _page_gallery_gallery_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./page/gallery/gallery.component */ "./src/app/doctor-portal/page/gallery/gallery.component.ts");
/* harmony import */ var _page_testimonial_testimonial_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./page/testimonial/testimonial.component */ "./src/app/doctor-portal/page/testimonial/testimonial.component.ts");
/* harmony import */ var _page_clinic_location_clinic_location_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./page/clinic-location/clinic-location.component */ "./src/app/doctor-portal/page/clinic-location/clinic-location.component.ts");
/* harmony import */ var _page_appointment_appointment_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./page/appointment/appointment.component */ "./src/app/doctor-portal/page/appointment/appointment.component.ts");
/* harmony import */ var _shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../shared/UI_service/media-control.service */ "./src/app/shared/UI_service/media-control.service.ts");
/* harmony import */ var _auth_login_login_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./auth/login/login.component */ "./src/app/doctor-portal/auth/login/login.component.ts");
/* harmony import */ var _auth_register_register_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./auth/register/register.component */ "./src/app/doctor-portal/auth/register/register.component.ts");
/* harmony import */ var _auth_register_personal_info_personal_info_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./auth/register/personal-info/personal-info.component */ "./src/app/doctor-portal/auth/register/personal-info/personal-info.component.ts");
/* harmony import */ var _auth_register_health_info_health_info_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./auth/register/health-info/health-info.component */ "./src/app/doctor-portal/auth/register/health-info/health-info.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _other_page_chat_box_chat_box_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./other_page/chat-box/chat-box.component */ "./src/app/doctor-portal/other_page/chat-box/chat-box.component.ts");
/* harmony import */ var _doctor_root_doctor_root_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./doctor-root/doctor-root.component */ "./src/app/doctor-portal/doctor-root/doctor-root.component.ts");
/* harmony import */ var _services_lazy_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../services/lazy.service */ "./src/app/services/lazy.service.ts");
/* harmony import */ var ng_zorro_antd_tooltip__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ng-zorro-antd/tooltip */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-tooltip.js");
/* harmony import */ var _services_message_service__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../services/message.service */ "./src/app/services/message.service.ts");
/* harmony import */ var _other_page_privacy_policy_privacy_policy_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./other_page/privacy-policy/privacy-policy.component */ "./src/app/doctor-portal/other_page/privacy-policy/privacy-policy.component.ts");
/* harmony import */ var _other_page_terms_of_use_terms_of_use_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./other_page/terms-of-use/terms-of-use.component */ "./src/app/doctor-portal/other_page/terms-of-use/terms-of-use.component.ts");
/* harmony import */ var _shared_UI_service_dynamic_title_service__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../shared/UI_service/dynamic-title.service */ "./src/app/shared/UI_service/dynamic-title.service.ts");
/* harmony import */ var _shared_UI_service_div_scroll_service__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../shared/UI_service/div-scroll.service */ "./src/app/shared/UI_service/div-scroll.service.ts");
/* harmony import */ var _shared_UI_service_get_dr_name_service__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../shared/UI_service/get-dr-name.service */ "./src/app/shared/UI_service/get-dr-name.service.ts");






























class DoctorPortalModule {
    constructor() {
        console.log('Doctor Portal Module loaded');
    }
}
DoctorPortalModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: DoctorPortalModule });
DoctorPortalModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function DoctorPortalModule_Factory(t) { return new (t || DoctorPortalModule)(); }, providers: [_shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_13__["MediaControlService"], _services_lazy_service__WEBPACK_IMPORTED_MODULE_21__["LazyService"], _services_message_service__WEBPACK_IMPORTED_MODULE_23__["MessageService"], _shared_UI_service_dynamic_title_service__WEBPACK_IMPORTED_MODULE_26__["DynamicTitleService"], _shared_UI_service_div_scroll_service__WEBPACK_IMPORTED_MODULE_27__["DivScrollService"], _shared_UI_service_get_dr_name_service__WEBPACK_IMPORTED_MODULE_28__["GetDrNameService"]], imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _shared_themes_zorro_ant_components_module__WEBPACK_IMPORTED_MODULE_5__["ZorroAntComponentsModule"],
            _shared_components_share_components_module__WEBPACK_IMPORTED_MODULE_4__["ShareComponentsModule"],
            _doctor_portal_routing_module__WEBPACK_IMPORTED_MODULE_2__["DoctorPortalRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_18__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_18__["ReactiveFormsModule"],
            ng_zorro_antd_tooltip__WEBPACK_IMPORTED_MODULE_22__["NzToolTipModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](DoctorPortalModule, { declarations: [_doctor_portal_component__WEBPACK_IMPORTED_MODULE_3__["DoctorPortalComponent"], _page_dr_home_dr_home_component__WEBPACK_IMPORTED_MODULE_6__["DrHomeComponent"], _page_overview_overview_component__WEBPACK_IMPORTED_MODULE_7__["OverviewComponent"], _page_treatements_treatements_component__WEBPACK_IMPORTED_MODULE_8__["TreatementsComponent"], _page_gallery_gallery_component__WEBPACK_IMPORTED_MODULE_9__["GalleryComponent"], _page_testimonial_testimonial_component__WEBPACK_IMPORTED_MODULE_10__["TestimonialComponent"], _page_clinic_location_clinic_location_component__WEBPACK_IMPORTED_MODULE_11__["ClinicLocationComponent"], _page_appointment_appointment_component__WEBPACK_IMPORTED_MODULE_12__["AppointmentComponent"], _auth_login_login_component__WEBPACK_IMPORTED_MODULE_14__["LoginComponent"], _auth_register_register_component__WEBPACK_IMPORTED_MODULE_15__["RegisterComponent"], _auth_register_personal_info_personal_info_component__WEBPACK_IMPORTED_MODULE_16__["PersonalInfoComponent"], _auth_register_health_info_health_info_component__WEBPACK_IMPORTED_MODULE_17__["HealthInfoComponent"], _other_page_chat_box_chat_box_component__WEBPACK_IMPORTED_MODULE_19__["ChatBoxComponent"], _other_page_privacy_policy_privacy_policy_component__WEBPACK_IMPORTED_MODULE_24__["PrivacyPolicyComponent"], _other_page_terms_of_use_terms_of_use_component__WEBPACK_IMPORTED_MODULE_25__["TermsOfUseComponent"], _doctor_root_doctor_root_component__WEBPACK_IMPORTED_MODULE_20__["DoctorRootComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _shared_themes_zorro_ant_components_module__WEBPACK_IMPORTED_MODULE_5__["ZorroAntComponentsModule"],
        _shared_components_share_components_module__WEBPACK_IMPORTED_MODULE_4__["ShareComponentsModule"],
        _doctor_portal_routing_module__WEBPACK_IMPORTED_MODULE_2__["DoctorPortalRoutingModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_18__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_18__["ReactiveFormsModule"],
        ng_zorro_antd_tooltip__WEBPACK_IMPORTED_MODULE_22__["NzToolTipModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DoctorPortalModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_doctor_portal_component__WEBPACK_IMPORTED_MODULE_3__["DoctorPortalComponent"], _page_dr_home_dr_home_component__WEBPACK_IMPORTED_MODULE_6__["DrHomeComponent"], _page_overview_overview_component__WEBPACK_IMPORTED_MODULE_7__["OverviewComponent"], _page_treatements_treatements_component__WEBPACK_IMPORTED_MODULE_8__["TreatementsComponent"], _page_gallery_gallery_component__WEBPACK_IMPORTED_MODULE_9__["GalleryComponent"], _page_testimonial_testimonial_component__WEBPACK_IMPORTED_MODULE_10__["TestimonialComponent"], _page_clinic_location_clinic_location_component__WEBPACK_IMPORTED_MODULE_11__["ClinicLocationComponent"], _page_appointment_appointment_component__WEBPACK_IMPORTED_MODULE_12__["AppointmentComponent"], _auth_login_login_component__WEBPACK_IMPORTED_MODULE_14__["LoginComponent"], _auth_register_register_component__WEBPACK_IMPORTED_MODULE_15__["RegisterComponent"], _auth_register_personal_info_personal_info_component__WEBPACK_IMPORTED_MODULE_16__["PersonalInfoComponent"], _auth_register_health_info_health_info_component__WEBPACK_IMPORTED_MODULE_17__["HealthInfoComponent"], _other_page_chat_box_chat_box_component__WEBPACK_IMPORTED_MODULE_19__["ChatBoxComponent"], _other_page_privacy_policy_privacy_policy_component__WEBPACK_IMPORTED_MODULE_24__["PrivacyPolicyComponent"], _other_page_terms_of_use_terms_of_use_component__WEBPACK_IMPORTED_MODULE_25__["TermsOfUseComponent"], _doctor_root_doctor_root_component__WEBPACK_IMPORTED_MODULE_20__["DoctorRootComponent"]],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _shared_themes_zorro_ant_components_module__WEBPACK_IMPORTED_MODULE_5__["ZorroAntComponentsModule"],
                    _shared_components_share_components_module__WEBPACK_IMPORTED_MODULE_4__["ShareComponentsModule"],
                    _doctor_portal_routing_module__WEBPACK_IMPORTED_MODULE_2__["DoctorPortalRoutingModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_18__["FormsModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_18__["ReactiveFormsModule"],
                    ng_zorro_antd_tooltip__WEBPACK_IMPORTED_MODULE_22__["NzToolTipModule"]
                ],
                providers: [_shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_13__["MediaControlService"], _services_lazy_service__WEBPACK_IMPORTED_MODULE_21__["LazyService"], _services_message_service__WEBPACK_IMPORTED_MODULE_23__["MessageService"], _shared_UI_service_dynamic_title_service__WEBPACK_IMPORTED_MODULE_26__["DynamicTitleService"], _shared_UI_service_div_scroll_service__WEBPACK_IMPORTED_MODULE_27__["DivScrollService"], _shared_UI_service_get_dr_name_service__WEBPACK_IMPORTED_MODULE_28__["GetDrNameService"]]
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/doctor-portal/doctor-root/doctor-root.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/doctor-portal/doctor-root/doctor-root.component.ts ***!
  \********************************************************************/
/*! exports provided: DoctorRootComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DoctorRootComponent", function() { return DoctorRootComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _services_http_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/http-constants */ "./src/app/services/http-constants.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var ng_zorro_antd_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng-zorro-antd/modal */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-modal.js");
/* harmony import */ var _services_base_http_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/base-http.service */ "./src/app/services/base-http.service.ts");
/* harmony import */ var _services_doctor_service_doctor_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/doctor-service/doctor.service */ "./src/app/services/doctor-service/doctor.service.ts");
/* harmony import */ var _services_patient_service_socket_service_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/patient-service/socket-service.service */ "./src/app/services/patient-service/socket-service.service.ts");
/* harmony import */ var _services_patient_service_patient_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../services/patient-service/patient.service */ "./src/app/services/patient-service/patient.service.ts");
/* harmony import */ var _services_lazy_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../services/lazy.service */ "./src/app/services/lazy.service.ts");
/* harmony import */ var ng_zorro_antd_message__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ng-zorro-antd/message */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-message.js");
/* harmony import */ var _shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../shared/UI_service/media-control.service */ "./src/app/shared/UI_service/media-control.service.ts");
/* harmony import */ var src_app_shared_UI_service_div_scroll_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/shared/UI_service/div-scroll.service */ "./src/app/shared/UI_service/div-scroll.service.ts");
/* harmony import */ var src_app_shared_UI_service_get_dr_name_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/shared/UI_service/get-dr-name.service */ "./src/app/shared/UI_service/get-dr-name.service.ts");
/* harmony import */ var ng_zorro_antd_drawer__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ng-zorro-antd/drawer */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-drawer.js");
/* harmony import */ var ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ng-zorro-antd/grid */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-grid.js");
/* harmony import */ var ng_zorro_antd_button__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ng-zorro-antd/button */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-button.js");
/* harmony import */ var ng_zorro_antd_core_wave__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ng-zorro-antd/core/wave */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-core-wave.js");
/* harmony import */ var ng_zorro_antd_core_transition_patch__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ng-zorro-antd/core/transition-patch */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-core-transition-patch.js");
/* harmony import */ var ng_zorro_antd_menu__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ng-zorro-antd/menu */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-menu.js");
/* harmony import */ var ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ng-zorro-antd/icon */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-icon.js");
/* harmony import */ var ng_zorro_antd_layout__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ng-zorro-antd/layout */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-layout.js");

























function DoctorRootComponent_ng_template_37_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "li", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DoctorRootComponent_ng_template_37_Template_li_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3); const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r2.logoutConfirm(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "i", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "log out");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function DoctorRootComponent_div_44_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "img", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DoctorRootComponent_div_44_ng_container_4_Template_img_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r9.open(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} }
function DoctorRootComponent_div_44_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "img", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DoctorRootComponent_div_44_ng_container_5_Template_img_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r12); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r11.open(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} }
const _c0 = function () { return ["Login"]; };
function DoctorRootComponent_div_44_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "login");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](1, _c0));
} }
function DoctorRootComponent_div_44_ng_template_16_Template(rf, ctx) { if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DoctorRootComponent_div_44_ng_template_16_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r14); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r13.logoutConfirm(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "logout");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
const _c1 = function (a0) { return { "transform": a0 }; };
function DoctorRootComponent_div_44_ng_container_17_span_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DoctorRootComponent_div_44_ng_container_17_span_1_ng_container_1_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r19); const item_r17 = ctx.$implicit; const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](4); return ctx_r18.socroll(item_r17.section); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "img", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const item_r17 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate1"]("src", "assets/icon/sideNav/", item_r17.iconName, "", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](2, _c1, item_r17.section == "section1" ? "rotate(0deg)" : "rotate(90deg)"));
} }
function DoctorRootComponent_div_44_ng_container_17_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, DoctorRootComponent_div_44_ng_container_17_span_1_ng_container_1_Template, 3, 4, "ng-container", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r15.DivName);
} }
function DoctorRootComponent_div_44_ng_container_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, DoctorRootComponent_div_44_ng_container_17_span_1_Template, 2, 1, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r8.route_.url == ctx_r8.urlMatch);
} }
const _c2 = function (a0) { return { "d-none": a0, "navFixed": true }; };
const _c3 = function () { return { span: 24 }; };
const _c4 = function () { return { span: 10 }; };
const _c5 = function () { return { span: 14 }; };
const _c6 = function () { return ["dashboard/Your-Appointments"]; };
function DoctorRootComponent_div_44_Template(rf, ctx) { if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, DoctorRootComponent_div_44_ng_container_4_Template, 2, 0, "ng-container", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, DoctorRootComponent_div_44_ng_container_5_Template, 2, 0, "ng-container", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DoctorRootComponent_div_44_Template_button_click_11_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r21); const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r20.goToLink("dashboard"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "my dashboard");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "book Appointments");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](15, DoctorRootComponent_div_44_ng_template_15_Template, 3, 2, "ng-template", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](16, DoctorRootComponent_div_44_ng_template_16_Template, 3, 0, "ng-template", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](17, DoctorRootComponent_div_44_ng_container_17_Template, 2, 1, "ng-container", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](12, _c2, ctx_r1.route_.url == "/"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](14, _c3))("nzMd", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](15, _c4));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.hamburger);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r1.hamburger);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](16, _c5))("nzMd", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](17, _c5));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](18, _c6));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r1.LogoutBtn);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.LogoutBtn);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.side_page_nav);
} }
class DoctorRootComponent {
    constructor(route, route_, modal, httpService, doctorService, socketService, patientService, lazy, msg, zone, cdr, doc, _viewMedia, _divScroll, _dr) {
        this.route = route;
        this.route_ = route_;
        this.modal = modal;
        this.httpService = httpService;
        this.doctorService = doctorService;
        this.socketService = socketService;
        this.patientService = patientService;
        this.lazy = lazy;
        this.msg = msg;
        this.zone = zone;
        this.cdr = cdr;
        this.doc = doc;
        this._viewMedia = _viewMedia;
        this._divScroll = _divScroll;
        this._dr = _dr;
        this.title = 'Welcome Dr. Home';
        this.isCollapsed = true;
        this.haveChatBox = true;
        this.loading = false;
        this.drName = this._dr.getDr();
        // TODO side bar 
        this.visible = false;
        this.placement = 'left';
        // ________ page scroll Spy ____________
        this.DivName = this._divScroll.sectionName;
        this.sub = this.route.params.subscribe((params) => {
            this.username = params["username"]; // (+) converts string 'id' to a number
            this.doctorService.username = this.username;
            this._dr.Drname(this.username);
            console.log(this.username);
            localStorage.setItem('DoctorName', this.username);
            this.getDoctorLandingPageData(this.username);
        });
    }
    ngOnInit() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
        });
    }
    getDoctorLandingPageData(username) {
        this.httpService
            .makeAuthRequest("GET", _services_http_constants__WEBPACK_IMPORTED_MODULE_2__["HttpConstants"].doctor.getDoctorLandingPageData + username)
            .subscribe((response) => {
            if (response.hasErrors()) {
                this.route_.navigate(['/error']);
            }
            else {
                if (response.data.doctorCMS) {
                    if (response.data.doctorCMS.primaryColor) {
                        this.changeColor(response.data.doctorCMS.primaryColor);
                    }
                }
                const clinicTimes = [];
                for (let index = 0; index < response.data.clinicTimings.length; index++) {
                    const clinicTiming = response.data.clinicTimings[index];
                    const days = [];
                    let daysNumber = [];
                    if (clinicTiming.monStatus &&
                        clinicTiming.tueStatus &&
                        clinicTiming.wedStatus &&
                        clinicTiming.thuStatus &&
                        clinicTiming.friStatus &&
                        clinicTiming.satStatus &&
                        clinicTiming.sunStatus) {
                        days.push("Mon - Sun");
                        daysNumber = [0, 1, 2, 3, 4, 5, 6];
                    }
                    else {
                        if (clinicTiming.monStatus) {
                            days.push("Mon");
                            daysNumber.push(1);
                        }
                        if (clinicTiming.tueStatus) {
                            days.push("Tue");
                            daysNumber.push(2);
                        }
                        if (clinicTiming.wedStatus) {
                            days.push("Wed");
                            daysNumber.push(3);
                        }
                        if (clinicTiming.thuStatus) {
                            days.push("Thu");
                            daysNumber.push(4);
                        }
                        if (clinicTiming.friStatus) {
                            days.push("Fri");
                            daysNumber.push(5);
                        }
                        if (clinicTiming.satStatus) {
                            days.push("Sat");
                            daysNumber.push(6);
                        }
                        if (clinicTiming.sunStatus) {
                            days.push("Sun");
                            daysNumber.push(0);
                        }
                    }
                    const clinicTime = Object.assign({ clinicId: clinicTiming.clinicId, clinicTimingId: clinicTiming.doc_id, timings: `${clinicTiming.starttime} - ${clinicTiming.endtime}`, days: days.join(", "), disableDays: daysNumber, isVirtualClinic: clinicTiming.isVirtualClinic }, clinicTiming);
                    clinicTimes.push(clinicTime);
                }
                for (let index = 0; index < response.data.clinics.length; index++) {
                    const clinic = response.data.clinics[index];
                    const filteredClinicTimings = clinicTimes.filter((x) => x.clinicId == clinic.doc_id);
                    const filteredTimings = response.data.clinicTimings.filter((x) => x.clinicId == clinic.doc_id);
                    clinic.clinicTimings = filteredClinicTimings;
                    clinic.timings = filteredTimings;
                }
                {
                    const virtualClinic = response.data.clinics.find((x) => x.isVirtualClinic);
                    response.data.virtualClinic = virtualClinic;
                }
                {
                    let actualClinic = response.data.clinics.find((x) => !x.isVirtualClinic);
                    if (!actualClinic) {
                        actualClinic = response.data.virtualClinic;
                    }
                    response.data.actualClinic = actualClinic;
                }
                this.doctorService.pushData(response.data);
                const appointment = response.data.appointment;
                const doctor = response.data.doctor;
                if (appointment) {
                    // this.socketService.connect(
                    //   appointment.patient_id,
                    //   doctor.doc_mobile,
                    //   doctor.uid
                    // );
                }
                //this.subscribeToSocketRelationSubscriptions();
            }
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    changeColor(color) {
        return this.runLess(color);
    }
    runLess(color) {
        const { zone, msg, cdr } = this;
        const msgId = msg.loading(`Setup Theme`, { nzDuration: 0 }).messageId;
        setTimeout(() => {
            zone.runOutsideAngular(() => {
                return this.loadLess()
                    .then(() => {
                    window.less
                        .modifyVars({
                        '@primary-color': color,
                    })
                        .then(() => {
                        msg.success('Success');
                        msg.remove(msgId);
                        zone.run(() => cdr.detectChanges());
                    });
                })
                    .catch((err) => {
                    msg.error(err.message);
                    msg.remove(msgId);
                });
            });
        }, 200);
    }
    loadLess() {
        if (window.less) {
            return Promise.resolve();
        }
        return this.lazy
            .loadStyle('./assets/default.less', 'stylesheet/less')
            .then(() => {
            const lessScript = this.doc.createElement('script');
            lessScript.innerHTML = `
          window.less = {
            async: true,
            env: 'production', // development
            javascriptEnabled: true
          };
        `;
            this.doc.body.appendChild(lessScript);
        })
            .then(() => this.lazy
            .loadScript('./assets/less.min.js'
        //'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js'
        )
            .catch(() => this.lazy.loadScript('./assets/less.min.js')))
            .then(() => { });
    }
    ngAfterContentChecked() {
        this.hamburger = this._viewMedia.mediaPort();
        this.side_page_nav = this._viewMedia.mediaPort();
        this.isport = this._viewMedia.mediaPort();
        if (localStorage.getItem(`token-${this._dr.getDr()}`)) {
            this.LogoutBtn = true;
        }
        // 
        let urlStr = `/home/${this._dr.getDr()}`;
        this.urlMatch = urlStr;
        if (this.route_.url == `${urlStr}/dashboard` ||
            this.route_.url == `${urlStr}`) {
            this.navBar_option = true;
        }
        else {
            this.navBar_option = false;
        }
    }
    chatBox(param) {
        this.haveChatBox = param;
    }
    backToDrPage() {
        this.route_.navigateByUrl(`/home/${this._dr.getDr()}`);
    }
    goToLink(url) {
        this.route_.navigate(['./dashboard'], {
            replaceUrl: true,
            relativeTo: this.route,
        });
        this.isCollapsed = false;
    }
    open() {
        this.visible = true;
    }
    close() {
        this.visible = false;
    }
    // Logout 
    logoutConfirm() {
        this.modal.confirm({
            nzTitle: 'Are you sure you want to Logout?',
            // nzContent: '<b style="color: red;">Some descriptions</b>',
            nzOkText: 'Yes',
            nzOkType: 'primary',
            nzOnOk: () => this.logout(),
            nzCancelText: 'No',
            nzOnCancel: () => console.log('Cancel')
        });
    }
    logout() {
        localStorage.removeItem(`token-${this._dr.getDr()}`);
        this.route_.navigate(["."]);
        this.LogoutBtn = false;
    }
    socroll(divId) {
        this._divScroll.triggerScrollTo(divId);
    }
}
DoctorRootComponent.ɵfac = function DoctorRootComponent_Factory(t) { return new (t || DoctorRootComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](ng_zorro_antd_modal__WEBPACK_IMPORTED_MODULE_5__["NzModalService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_base_http_service__WEBPACK_IMPORTED_MODULE_6__["BaseHttpService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_doctor_service_doctor_service__WEBPACK_IMPORTED_MODULE_7__["DoctorService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_patient_service_socket_service_service__WEBPACK_IMPORTED_MODULE_8__["SocketServiceService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_patient_service_patient_service__WEBPACK_IMPORTED_MODULE_9__["PatientService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_lazy_service__WEBPACK_IMPORTED_MODULE_10__["LazyService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](ng_zorro_antd_message__WEBPACK_IMPORTED_MODULE_11__["NzMessageService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_3__["DOCUMENT"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_12__["MediaControlService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_shared_UI_service_div_scroll_service__WEBPACK_IMPORTED_MODULE_13__["DivScrollService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_shared_UI_service_get_dr_name_service__WEBPACK_IMPORTED_MODULE_14__["GetDrNameService"])); };
DoctorRootComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: DoctorRootComponent, selectors: [["app-doctor-root"]], decls: 46, vars: 15, consts: [[3, "nzWidth", "nzClosable", "nzVisible", "nzPlacement", "nzOnClose"], [1, "p-2", "center_f_y", "mt-3", "mb-3"], ["src", "assets/img/logo.png", "alt", "", 1, "img-res", "DigLogo"], ["nz-row", ""], ["nz-col", "", 1, "p-1", 3, "nzXs", "nzMd"], [1, "drawer_dr_name", "themes_text_invert", "mb-2", 3, "click"], ["nz-button", "", "nzBlock", "", 1, "themes_bg", "themes_text"], ["nz-menu", "", "nzMode", "inline", 1, "list_bar"], ["nz-menu-item", "", 3, "click"], ["nz-icon", "", "nzType", "dashboard"], ["nz-menu-item", ""], ["nz-icon", "", "nzType", "picture"], ["nz-icon", "", "nzType", "video-camera"], ["nz-icon", "", "nzType", "project"], ["nz-icon", "", "nzType", "environment"], ["nz-icon", "", "nzType", "setting", "nzTheme", "outline"], [3, "ngIf"], [1, "footer_list", "center_xy"], [1, "layout"], [4, "ngIf"], ["nz-icon", "", "nzType", "logout", "nzTheme", "outline"], [1, "Dr_header", 3, "ngClass"], ["nz-col", "", 1, "navbtn", "center_y", 3, "nzXs", "nzMd"], ["nz-col", "", 3, "nzXs", "nzMd"], [1, "navBar", "p-2", "true_desktop"], ["nz-button", "", "nzType", "text", 3, "click"], ["nz-button", "", "nzType", "text", 3, "routerLink"], ["src", "assets/icon/menu.svg", "width", "20px", 1, "hamburger", 3, "click"], ["src", "assets/icon/menuWhite.svg", "width", "20px", "alt", "", 1, "hamburger", 3, "click"], [3, "routerLink"], ["nz-button", "", "nzType", "text"], [3, "click"], ["class", "side_page_nav_mobile", 4, "ngIf"], [1, "side_page_nav_mobile"], [4, "ngFor", "ngForOf"], ["alt", "", 3, "ngStyle", "src"]], template: function DoctorRootComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "nz-drawer", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("nzOnClose", function DoctorRootComponent_Template_nz_drawer_nzOnClose_0_listener() { return ctx.close(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "h2", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DoctorRootComponent_Template_h2_click_6_listener() { return ctx.backToDrPage(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Book Appointments");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "ul", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "li", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DoctorRootComponent_Template_li_click_12_listener() { return ctx.goToLink("dashboard"); })("click", function DoctorRootComponent_Template_li_click_12_listener() { return ctx.isCollapsed = !ctx.isCollapsed; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](13, "i", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "My Dashboard ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "li", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](17, "i", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, "Gallery ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "li", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](21, "i", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23, "Treatements");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "li", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](25, "i", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](27, "Testimonial");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "li", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](29, "i", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](31, "Clinic Location");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](32, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "li", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](34, "i", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](35, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](36, "setting");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](37, DoctorRootComponent_ng_template_37_Template, 4, 0, "ng-template", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](38, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](39, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](40, " Privacy Policy ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](41, "nz-layout", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](42, "nz-layout");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](43, "nz-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](44, DoctorRootComponent_div_44_Template, 18, 19, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](45, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzWidth", 300)("nzClosable", false)("nzVisible", ctx.visible)("nzPlacement", ctx.placement);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](11, _c3))("nzMd", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](12, _c3));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.drName, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](13, _c3))("nzMd", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](14, _c3));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](29);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.LogoutBtn);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.navBar_option);
    } }, directives: [ng_zorro_antd_drawer__WEBPACK_IMPORTED_MODULE_15__["NzDrawerComponent"], ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_16__["NzRowDirective"], ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_16__["NzColDirective"], ng_zorro_antd_button__WEBPACK_IMPORTED_MODULE_17__["NzButtonComponent"], ng_zorro_antd_core_wave__WEBPACK_IMPORTED_MODULE_18__["NzWaveDirective"], ng_zorro_antd_core_transition_patch__WEBPACK_IMPORTED_MODULE_19__["ɵNzTransitionPatchDirective"], ng_zorro_antd_menu__WEBPACK_IMPORTED_MODULE_20__["NzMenuDirective"], ng_zorro_antd_menu__WEBPACK_IMPORTED_MODULE_20__["NzMenuItemDirective"], ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_21__["NzIconDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], ng_zorro_antd_layout__WEBPACK_IMPORTED_MODULE_22__["NzLayoutComponent"], ng_zorro_antd_layout__WEBPACK_IMPORTED_MODULE_22__["NzContentComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterOutlet"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgClass"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterLink"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterLinkWithHref"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgStyle"]], styles: [".layout[_ngcontent-%COMP%] {\n  height: 100vh;\n}\nnz-sider[_ngcontent-%COMP%] {\n  box-shadow: 1px 0px 10px -1px #807b80;\n  background-color: white;\n  position: relative;\n}\nnz-content[_ngcontent-%COMP%] {\n  padding: 0;\n  height: 100vh;\n  overflow-y: scroll;\n  background-color: white;\n}\n.list_bar[_ngcontent-%COMP%] {\n  background-color: white;\n}\n.sider_container[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 215px;\n  position: relative;\n}\n.sider_img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 211px;\n  object-fit: cover;\n  padding: 5px;\n  border-radius: 13px;\n  box-shadow: 0px 0px 9px -1px #9e989e;\n}\n.dr_name_bar[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 6px;\n  left: 9px;\n  background-color: #ffffff;\n  width: 90%;\n  font-size: 16px;\n  font-weight: 500;\n  text-align: center;\n  padding-top: 4px;\n  padding-bottom: 4px;\n  margin: 5px;\n  border-radius: 8px;\n  color: #807e7e;\n  box-shadow: 0px 0px 9px -1px #9e989e;\n}\n.footer_list[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0;\n  width: 98%;\n  bottom: 0;\n  overflow: hidden;\n  background: #f2f3f3;\n}\n.inner-content[_ngcontent-%COMP%] {\n  padding: 24px;\n  background: #f8f8f8;\n  min-height: 360px;\n}\n.footer_list[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #636262;\n  font-size: 11px;\n  text-align: center;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  font-family: \"Poppins-Medium\";\n}\n.footer_list[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  padding-left: 13px;\n  cursor: pointer;\n}\nnz-footer[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.Dr_header[_ngcontent-%COMP%] {\n  -webkit-backdrop-filter: blur(4px);\n          backdrop-filter: blur(4px);\n  background-color: rgba(0, 0, 0, 0.384);\n  width: 100%;\n  height: 47px;\n}\n.navFixed[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2;\n}\n.hamburger[_ngcontent-%COMP%] {\n  margin-left: 24px;\n  cursor: pointer;\n  display: block;\n  padding-top: 16px;\n}\n.navbtn[_ngcontent-%COMP%] {\n  position: relative;\n}\n.navbtn[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: white;\n  font-size: 20px;\n  position: absolute;\n  left: 70px;\n  top: 6px;\n  font-weight: normal;\n}\n.logo[_ngcontent-%COMP%] {\n  margin-top: 70px;\n}\n.DigLogo[_ngcontent-%COMP%] {\n  outline: none !important;\n}\n.side_page_nav_desktop[_ngcontent-%COMP%] {\n  background-color: white;\n  position: fixed;\n  top: 50%;\n  right: 0;\n  z-index: 12000;\n  transform: translate(0, -50%);\n  padding: 17px 5px 17px 7px;\n  border-radius: 12px 0px 0px 12px;\n}\n.side_page_nav_desktop[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  color: #838383;\n  display: block;\n  font-size: 18px;\n  padding-top: 4px;\n  padding-bottom: 4px;\n  border: none;\n  border-bottom: 1px solid #dbdbdb;\n  background: transparent;\n  cursor: pointer;\n}\n.side_page_nav_desktop[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  height: 20px;\n  width: 20px;\n}\n.side_page_nav_mobile[_ngcontent-%COMP%] {\n  background-color: white;\n  display: block;\n  text-align: center;\n  padding-top: 14px;\n  padding-bottom: 10px;\n  border-radius: 0px 0px 12px 12px;\n  margin-top: 8px;\n  box-shadow: 0px 1px 8px -1px #807b80;\n}\n.side_page_nav_mobile[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  color: #838383;\n  font-size: 20px;\n  padding: 0px 14px 0px 15px;\n  border: none;\n  border-left: 1px solid #dbdbdb;\n  background: transparent;\n  cursor: pointer;\n}\n.side_page_nav_mobile[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  height: 20px;\n  width: 20px;\n  transform: rotate(90deg);\n}\n.message[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 42px;\n  right: 42px;\n  width: 69px;\n  height: 69px;\n  border-radius: 50%;\n  z-index: 12000;\n  cursor: pointer;\n  box-shadow: 4px 4px 30px 0px rgba(0, 0, 0, 0.37);\n  font-size: 30px;\n}\n.drawer_dr_name[_ngcontent-%COMP%] {\n  text-align: center;\n  font-family: \"Poppins-SemiBold\";\n  font-size: 18px;\n  outline: none;\n  cursor: pointer;\n}\n.navBar[_ngcontent-%COMP%] {\n  float: right;\n}\n.navBar[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-right: 37px;\n}\n.navBar[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background-color: transparent;\n  border: none;\n  text-transform: capitalize;\n  color: white;\n  font-size: 16px;\n  font-weight: 600;\n  margin-right: 13px;\n}\n@media screen and (max-width: 768px) {\n  .Dr_header[_ngcontent-%COMP%] {\n    background-color: #f2f2f2;\n    padding-top: 11px;\n  }\n  .navbtn[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    color: gray;\n    font-size: 23px;\n    position: absolute;\n    left: 70px;\n    top: -6px;\n    font-weight: 400;\n  }\n  .side_page_nav_mobile[_ngcontent-%COMP%] {\n    margin-top: 20px;\n  }\n}\n@media (max-width: 388px) {\n  .side_page_nav_mobile[_ngcontent-%COMP%] {\n    background-color: white;\n    display: block;\n    text-align: center;\n    padding-top: 14px;\n    padding-bottom: 10px;\n    border-radius: 0px 0px 12px 12px;\n    margin-top: 8px;\n  }\n  .side_page_nav_mobile[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 0px 10px 0px 10px;\n  }\n  .side_page_nav_mobile[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    height: 16px;\n    width: 16px;\n    transform: rotate(90deg);\n  }\n}\n@media (max-width: 575.98px) {\n  .side_page_nav_mobile[_ngcontent-%COMP%] {\n    padding-top: 14px;\n    padding-bottom: 10px;\n    border-radius: 0px 0px 12px 12px;\n    margin-top: 12px;\n  }\n  .side_page_nav_mobile[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 0px 12px 0px 12px;\n  }\n  .side_page_nav_mobile[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    height: 19px;\n    width: 19px;\n    transform: rotate(90deg);\n  }\n  .hamburger[_ngcontent-%COMP%] {\n    margin-left: 24px;\n    cursor: pointer;\n    display: block;\n    padding-top: 8px;\n  }\n  .sider_container[_ngcontent-%COMP%] {\n    width: 100%;\n    height: 187px;\n    position: relative;\n    margin-top: 59px;\n  }\n  .sider_img[_ngcontent-%COMP%] {\n    height: 189px;\n  }\n}\n[_nghost-%COMP%]     .ant-back-top {\n  bottom: 100px;\n}\n[_nghost-%COMP%]     .ant-back-top-inner {\n  height: 40px;\n  width: 40px;\n  line-height: 40px;\n  border-radius: 4px;\n  background-color: #1088e9;\n  color: #fff;\n  text-align: center;\n  font-size: 20px;\n}\n[_nghost-%COMP%]     strong {\n  color: #1088e9;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZG9jdG9yLXBvcnRhbC9kb2N0b3Itcm9vdC9GOi9PRkZJQ0UgV09SSy9ESUdJU0NSSUJFL09mZmljZV9Qcm9qZWN0cy9hcHBsaWNhdGlvbi9wYXRpZW50X3BvcnRhbC9zcmMvYXBwL2RvY3Rvci1wb3J0YWwvZG9jdG9yLXJvb3QvZG9jdG9yLXJvb3QuY29tcG9uZW50Lmxlc3MiLCJzcmMvYXBwL2RvY3Rvci1wb3J0YWwvZG9jdG9yLXJvb3QvZG9jdG9yLXJvb3QuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0FDQ0Y7QURFQTtFQUdFLHFDQUFBO0VBQ0EsdUJBQUE7RUFDQSxrQkFBQTtBQ0FGO0FERUE7RUFDRSxVQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsdUJBQUE7QUNBRjtBREVBO0VBQ0UsdUJBQUE7QUNBRjtBREVBO0VBQ0UsV0FBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtBQ0FGO0FERUE7RUFDRSxXQUFBO0VBQ0EsYUFBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBR0Esb0NBQUE7QUNBRjtBREVBO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtFQUNBLHlCQUFBO0VBQ0EsVUFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFHQSxvQ0FBQTtBQ0FGO0FERUE7RUFDRSxrQkFBQTtFQUNBLE9BQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUNBRjtBREVBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7QUNBRjtBREVBO0VBQ0UsY0FBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSw2QkFBQTtBQ0FGO0FERUE7RUFDRSxrQkFBQTtFQUNBLGVBQUE7QUNBRjtBREVBO0VBQ0Usa0JBQUE7QUNBRjtBRElBO0VBQ0Usa0NBQUE7VUFBQSwwQkFBQTtFQUNBLHNDQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUNGRjtBRElBO0VBQ0UsZUFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsVUFBQTtBQ0ZGO0FESUE7RUFDRSxpQkFBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0VBQ0EsaUJBQUE7QUNGRjtBRElBO0VBQ0Usa0JBQUE7QUNGRjtBRElBO0VBQ0UsWUFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxRQUFBO0VBQ0EsbUJBQUE7QUNGRjtBRElBO0VBQ0UsZ0JBQUE7QUNGRjtBRElBO0VBQ0Usd0JBQUE7QUNGRjtBREtBO0VBQ0UsdUJBQUE7RUFDQSxlQUFBO0VBQ0EsUUFBQTtFQUNBLFFBQUE7RUFDQSxjQUFBO0VBQ0EsNkJBQUE7RUFDQSwwQkFBQTtFQUNBLGdDQUFBO0FDSEY7QURLQTtFQUNFLGNBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0EsZ0NBQUE7RUFDQSx1QkFBQTtFQUNBLGVBQUE7QUNIRjtBREtBO0VBQ0UsWUFBQTtFQUNBLFdBQUE7QUNIRjtBRE1BO0VBQ0UsdUJBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLG9CQUFBO0VBQ0EsZ0NBQUE7RUFDQSxlQUFBO0VBR0Esb0NBQUE7QUNKRjtBRE1BO0VBQ0UsY0FBQTtFQUNBLGVBQUE7RUFDQSwwQkFBQTtFQUNBLFlBQUE7RUFDQSw4QkFBQTtFQUNBLHVCQUFBO0VBQ0EsZUFBQTtBQ0pGO0FETUE7RUFDRSxZQUFBO0VBQ0EsV0FBQTtFQUNBLHdCQUFBO0FDSkY7QURPQTtFQUNFLGVBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGdEQUFBO0VBQ0EsZUFBQTtBQ0xGO0FET0E7RUFDRSxrQkFBQTtFQUNBLCtCQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7RUFDQSxlQUFBO0FDTEY7QURRQTtFQUNFLFlBQUE7QUNORjtBRFFBO0VBQ0Usa0JBQUE7QUNORjtBRFFBO0VBQ0UsNkJBQUE7RUFDQSxZQUFBO0VBQ0EsMEJBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUNORjtBRFFBO0VBQ0U7SUFDRSx5QkFBQTtJQUNBLGlCQUFBO0VDTkY7RURRQTtJQUNFLFdBQUE7SUFDQSxlQUFBO0lBQ0Esa0JBQUE7SUFDQSxVQUFBO0lBQ0EsU0FBQTtJQUNBLGdCQUFBO0VDTkY7RURRQTtJQUNFLGdCQUFBO0VDTkY7QUFDRjtBRFNBO0VBQ0U7SUFDRSx1QkFBQTtJQUNBLGNBQUE7SUFDQSxrQkFBQTtJQUNBLGlCQUFBO0lBQ0Esb0JBQUE7SUFDQSxnQ0FBQTtJQUNBLGVBQUE7RUNQRjtFRFNBO0lBQ0UsMEJBQUE7RUNQRjtFRFNBO0lBQ0UsWUFBQTtJQUNBLFdBQUE7SUFDQSx3QkFBQTtFQ1BGO0FBQ0Y7QURTQTtFQUNFO0lBQ0UsaUJBQUE7SUFDQSxvQkFBQTtJQUNBLGdDQUFBO0lBQ0EsZ0JBQUE7RUNQRjtFRFNBO0lBQ0UsMEJBQUE7RUNQRjtFRFNBO0lBQ0UsWUFBQTtJQUNBLFdBQUE7SUFDQSx3QkFBQTtFQ1BGO0VEU0E7SUFDRSxpQkFBQTtJQUNBLGVBQUE7SUFDQSxjQUFBO0lBQ0EsZ0JBQUE7RUNQRjtFRFNBO0lBQ0UsV0FBQTtJQUNBLGFBQUE7SUFDQSxrQkFBQTtJQUNBLGdCQUFBO0VDUEY7RURTQTtJQUNFLGFBQUE7RUNQRjtBQUNGO0FEWUE7RUFDRSxhQUFBO0FDVkY7QURhQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtBQ1hGO0FEY0E7RUFDRSxjQUFBO0FDWkYiLCJmaWxlIjoic3JjL2FwcC9kb2N0b3ItcG9ydGFsL2RvY3Rvci1yb290L2RvY3Rvci1yb290LmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiLmxheW91dCB7XG4gIGhlaWdodDogMTAwdmg7XG59XG5cbm56LXNpZGVyIHtcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAxcHggMHB4IDEwcHggLTFweCByZ2JhKDEyOCwgMTIzLCAxMjgsIDEpO1xuICAtbW96LWJveC1zaGFkb3c6IDFweCAwcHggMTBweCAtMXB4IHJnYmEoMTI4LCAxMjMsIDEyOCwgMSk7XG4gIGJveC1zaGFkb3c6IDFweCAwcHggMTBweCAtMXB4IHJnYmEoMTI4LCAxMjMsIDEyOCwgMSk7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5uei1jb250ZW50IHtcbiAgcGFkZGluZzogMDtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cbi5saXN0X2JhciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xufVxuLnNpZGVyX2NvbnRhaW5lciB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDIxNXB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4uc2lkZXJfaW1nIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMjExcHg7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xuICBwYWRkaW5nOiA1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDEzcHg7XG4gIC13ZWJraXQtYm94LXNoYWRvdzogMHB4IDBweCA5cHggLTFweCByZ2JhKDE1OCwgMTUyLCAxNTgsIDEpO1xuICAtbW96LWJveC1zaGFkb3c6IDBweCAwcHggOXB4IC0xcHggcmdiYSgxNTgsIDE1MiwgMTU4LCAxKTtcbiAgYm94LXNoYWRvdzogMHB4IDBweCA5cHggLTFweCByZ2JhKDE1OCwgMTUyLCAxNTgsIDEpO1xufVxuLmRyX25hbWVfYmFyIC5uYW1lIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDZweDtcbiAgbGVmdDogOXB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICB3aWR0aDogOTAlO1xuICBmb250LXNpemU6IDE2cHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcGFkZGluZy10b3A6IDRweDtcbiAgcGFkZGluZy1ib3R0b206IDRweDtcbiAgbWFyZ2luOiA1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgY29sb3I6IHJnYigxMjgsIDEyNiwgMTI2KTtcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwcHggMHB4IDlweCAtMXB4IHJnYmEoMTU4LCAxNTIsIDE1OCwgMSk7XG4gIC1tb3otYm94LXNoYWRvdzogMHB4IDBweCA5cHggLTFweCByZ2JhKDE1OCwgMTUyLCAxNTgsIDEpO1xuICBib3gtc2hhZG93OiAwcHggMHB4IDlweCAtMXB4IHJnYmEoMTU4LCAxNTIsIDE1OCwgMSk7XG59XG4uZm9vdGVyX2xpc3Qge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiA5OCU7XG4gIGJvdHRvbTogMDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYmFja2dyb3VuZDogI2YyZjNmMztcbn1cbi5pbm5lci1jb250ZW50IHtcbiAgcGFkZGluZzogMjRweDtcbiAgYmFja2dyb3VuZDogI2Y4ZjhmODtcbiAgbWluLWhlaWdodDogMzYwcHg7XG59XG4uZm9vdGVyX2xpc3Qgc3BhbiB7XG4gIGNvbG9yOiAjNjM2MjYyO1xuICBmb250LXNpemU6IDExcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luLXRvcDogMTBweDtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgZm9udC1mYW1pbHk6IFwiUG9wcGlucy1NZWRpdW1cIjtcbn1cbi5mb290ZXJfbGlzdCBzcGFuIGkge1xuICBwYWRkaW5nLWxlZnQ6IDEzcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbm56LWZvb3RlciB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLy8gRHJfaGVhZGVyIGxlc3Ncbi5Ecl9oZWFkZXIge1xuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoNHB4KTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjM4NCk7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDQ3cHg7XG59XG4ubmF2Rml4ZWQge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgei1pbmRleDogMjtcbn1cbi5oYW1idXJnZXIge1xuICBtYXJnaW4tbGVmdDogMjRweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBkaXNwbGF5OiBibG9jaztcbiAgcGFkZGluZy10b3A6IDE2cHg7XG59XG4ubmF2YnRuIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLm5hdmJ0biBoMyB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDcwcHg7XG4gIHRvcDogNnB4O1xuICBmb250LXdlaWdodDogbm9ybWFsO1xufVxuLmxvZ28ge1xuICBtYXJnaW4tdG9wOiA3MHB4O1xufVxuLkRpZ0xvZ28ge1xuICBvdXRsaW5lOiBub25lICFpbXBvcnRhbnQ7XG59XG4vL1xuLnNpZGVfcGFnZV9uYXZfZGVza3RvcCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogNTAlO1xuICByaWdodDogMDtcbiAgei1pbmRleDogMTIwMDA7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC01MCUpO1xuICBwYWRkaW5nOiAxN3B4IDVweCAxN3B4IDdweDtcbiAgYm9yZGVyLXJhZGl1czogMTJweCAwcHggMHB4IDEycHg7XG59XG4uc2lkZV9wYWdlX25hdl9kZXNrdG9wIGJ1dHRvbiB7XG4gIGNvbG9yOiAjODM4MzgzO1xuICBkaXNwbGF5OiBibG9jaztcbiAgZm9udC1zaXplOiAxOHB4O1xuICBwYWRkaW5nLXRvcDogNHB4O1xuICBwYWRkaW5nLWJvdHRvbTogNHB4O1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCNkYmRiZGI7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uc2lkZV9wYWdlX25hdl9kZXNrdG9wIGJ1dHRvbiBpbWcge1xuICBoZWlnaHQ6IDIwcHg7XG4gIHdpZHRoOiAyMHB4O1xufVxuLy8gc2lkZV9wYWdlX25hdl9tb2JpbGVcbi5zaWRlX3BhZ2VfbmF2X21vYmlsZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBkaXNwbGF5OiBibG9jaztcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nLXRvcDogMTRweDtcbiAgcGFkZGluZy1ib3R0b206IDEwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDBweCAwcHggMTJweCAxMnB4O1xuICBtYXJnaW4tdG9wOiA4cHg7XG4gIC13ZWJraXQtYm94LXNoYWRvdzogMHB4IDFweCA4cHggLTFweCByZ2JhKDEyOCwgMTIzLCAxMjgsIDEpO1xuICAtbW96LWJveC1zaGFkb3c6IDBweCAxcHggOHB4IC0xcHggcmdiYSgxMjgsIDEyMywgMTI4LCAxKTtcbiAgYm94LXNoYWRvdzogMHB4IDFweCA4cHggLTFweCByZ2JhKDEyOCwgMTIzLCAxMjgsIDEpO1xufVxuLnNpZGVfcGFnZV9uYXZfbW9iaWxlIGJ1dHRvbiB7XG4gIGNvbG9yOiAjODM4MzgzO1xuICBmb250LXNpemU6IDIwcHg7XG4gIHBhZGRpbmc6IDBweCAxNHB4IDBweCAxNXB4O1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2RiZGJkYjtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5zaWRlX3BhZ2VfbmF2X21vYmlsZSBidXR0b24gaW1nIHtcbiAgaGVpZ2h0OiAyMHB4O1xuICB3aWR0aDogMjBweDtcbiAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xufVxuLy8gbWVzc2FnZVxuLm1lc3NhZ2Uge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGJvdHRvbTogNDJweDtcbiAgcmlnaHQ6IDQycHg7XG4gIHdpZHRoOiA2OXB4O1xuICBoZWlnaHQ6IDY5cHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgei1pbmRleDogMTIwMDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgYm94LXNoYWRvdzogNHB4IDRweCAzMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMzcpO1xuICBmb250LXNpemU6IDMwcHg7XG59XG4uZHJhd2VyX2RyX25hbWUge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtZmFtaWx5OiBcIlBvcHBpbnMtU2VtaUJvbGRcIjtcbiAgZm9udC1zaXplOiAxOHB4O1xuICBvdXRsaW5lOiBub25lO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4vL1xuLm5hdkJhciB7XG4gIGZsb2F0OiByaWdodDtcbn1cbi5uYXZCYXIgc3BhbiB7XG4gIG1hcmdpbi1yaWdodDogMzdweDtcbn1cbi5uYXZCYXIgc3BhbiBidXR0b24ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXNpemU6IDE2cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIG1hcmdpbi1yaWdodDogMTNweDtcbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5Ecl9oZWFkZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmMmYyZjI7XG4gICAgcGFkZGluZy10b3A6IDExcHg7XG4gIH1cbiAgLm5hdmJ0biBoMyB7XG4gICAgY29sb3I6IGdyYXk7XG4gICAgZm9udC1zaXplOiAyM3B4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiA3MHB4O1xuICAgIHRvcDogLTZweDtcbiAgICBmb250LXdlaWdodDogNDAwO1xuICB9XG4gIC5zaWRlX3BhZ2VfbmF2X21vYmlsZSB7XG4gICAgbWFyZ2luLXRvcDogMjBweDtcbiAgfVxufVxuLy9cbkBtZWRpYSAobWF4LXdpZHRoOiAzODhweCkge1xuICAuc2lkZV9wYWdlX25hdl9tb2JpbGUge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBwYWRkaW5nLXRvcDogMTRweDtcbiAgICBwYWRkaW5nLWJvdHRvbTogMTBweDtcbiAgICBib3JkZXItcmFkaXVzOiAwcHggMHB4IDEycHggMTJweDtcbiAgICBtYXJnaW4tdG9wOiA4cHg7XG4gIH1cbiAgLnNpZGVfcGFnZV9uYXZfbW9iaWxlIGJ1dHRvbiB7XG4gICAgcGFkZGluZzogMHB4IDEwcHggMHB4IDEwcHg7XG4gIH1cbiAgLnNpZGVfcGFnZV9uYXZfbW9iaWxlIGJ1dHRvbiBpbWcge1xuICAgIGhlaWdodDogMTZweDtcbiAgICB3aWR0aDogMTZweDtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XG4gIH1cbn1cbkBtZWRpYSAobWF4LXdpZHRoOiA1NzUuOThweCkge1xuICAuc2lkZV9wYWdlX25hdl9tb2JpbGUge1xuICAgIHBhZGRpbmctdG9wOiAxNHB4O1xuICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDBweCAwcHggMTJweCAxMnB4O1xuICAgIG1hcmdpbi10b3A6IDEycHg7XG4gIH1cbiAgLnNpZGVfcGFnZV9uYXZfbW9iaWxlIGJ1dHRvbiB7XG4gICAgcGFkZGluZzogMHB4IDEycHggMHB4IDEycHg7XG4gIH1cbiAgLnNpZGVfcGFnZV9uYXZfbW9iaWxlIGJ1dHRvbiBpbWcge1xuICAgIGhlaWdodDogMTlweDtcbiAgICB3aWR0aDogMTlweDtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XG4gIH1cbiAgLmhhbWJ1cmdlciB7XG4gICAgbWFyZ2luLWxlZnQ6IDI0cHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHBhZGRpbmctdG9wOiA4cHg7XG4gIH1cbiAgLnNpZGVyX2NvbnRhaW5lciB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxODdweDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgbWFyZ2luLXRvcDogNTlweDtcbiAgfVxuICAuc2lkZXJfaW1nIHtcbiAgICBoZWlnaHQ6IDE4OXB4O1xuICB9XG59XG5cbi8vIHVwIGRvd24gX19cblxuOmhvc3QgOjpuZy1kZWVwIC5hbnQtYmFjay10b3Age1xuICBib3R0b206IDEwMHB4O1xufVxuXG46aG9zdCA6Om5nLWRlZXAgLmFudC1iYWNrLXRvcC1pbm5lciB7XG4gIGhlaWdodDogNDBweDtcbiAgd2lkdGg6IDQwcHg7XG4gIGxpbmUtaGVpZ2h0OiA0MHB4O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxMDg4ZTk7XG4gIGNvbG9yOiAjZmZmO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMjBweDtcbn1cblxuOmhvc3QgOjpuZy1kZWVwIHN0cm9uZyB7XG4gIGNvbG9yOiAjMTA4OGU5O1xufVxuIiwiLmxheW91dCB7XG4gIGhlaWdodDogMTAwdmg7XG59XG5uei1zaWRlciB7XG4gIC13ZWJraXQtYm94LXNoYWRvdzogMXB4IDBweCAxMHB4IC0xcHggIzgwN2I4MDtcbiAgLW1vei1ib3gtc2hhZG93OiAxcHggMHB4IDEwcHggLTFweCAjODA3YjgwO1xuICBib3gtc2hhZG93OiAxcHggMHB4IDEwcHggLTFweCAjODA3YjgwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxubnotY29udGVudCB7XG4gIHBhZGRpbmc6IDA7XG4gIGhlaWdodDogMTAwdmg7XG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG4ubGlzdF9iYXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cbi5zaWRlcl9jb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAyMTVweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLnNpZGVyX2ltZyB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDIxMXB4O1xuICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgcGFkZGluZzogNXB4O1xuICBib3JkZXItcmFkaXVzOiAxM3B4O1xuICAtd2Via2l0LWJveC1zaGFkb3c6IDBweCAwcHggOXB4IC0xcHggIzllOTg5ZTtcbiAgLW1vei1ib3gtc2hhZG93OiAwcHggMHB4IDlweCAtMXB4ICM5ZTk4OWU7XG4gIGJveC1zaGFkb3c6IDBweCAwcHggOXB4IC0xcHggIzllOTg5ZTtcbn1cbi5kcl9uYW1lX2JhciAubmFtZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiA2cHg7XG4gIGxlZnQ6IDlweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgd2lkdGg6IDkwJTtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBmb250LXdlaWdodDogNTAwO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmctdG9wOiA0cHg7XG4gIHBhZGRpbmctYm90dG9tOiA0cHg7XG4gIG1hcmdpbjogNXB4O1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGNvbG9yOiAjODA3ZTdlO1xuICAtd2Via2l0LWJveC1zaGFkb3c6IDBweCAwcHggOXB4IC0xcHggIzllOTg5ZTtcbiAgLW1vei1ib3gtc2hhZG93OiAwcHggMHB4IDlweCAtMXB4ICM5ZTk4OWU7XG4gIGJveC1zaGFkb3c6IDBweCAwcHggOXB4IC0xcHggIzllOTg5ZTtcbn1cbi5mb290ZXJfbGlzdCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgd2lkdGg6IDk4JTtcbiAgYm90dG9tOiAwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBiYWNrZ3JvdW5kOiAjZjJmM2YzO1xufVxuLmlubmVyLWNvbnRlbnQge1xuICBwYWRkaW5nOiAyNHB4O1xuICBiYWNrZ3JvdW5kOiAjZjhmOGY4O1xuICBtaW4taGVpZ2h0OiAzNjBweDtcbn1cbi5mb290ZXJfbGlzdCBzcGFuIHtcbiAgY29sb3I6ICM2MzYyNjI7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICBmb250LWZhbWlseTogXCJQb3BwaW5zLU1lZGl1bVwiO1xufVxuLmZvb3Rlcl9saXN0IHNwYW4gaSB7XG4gIHBhZGRpbmctbGVmdDogMTNweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxubnotZm9vdGVyIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLkRyX2hlYWRlciB7XG4gIGJhY2tkcm9wLWZpbHRlcjogYmx1cig0cHgpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMzg0KTtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogNDdweDtcbn1cbi5uYXZGaXhlZCB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB6LWluZGV4OiAyO1xufVxuLmhhbWJ1cmdlciB7XG4gIG1hcmdpbi1sZWZ0OiAyNHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwYWRkaW5nLXRvcDogMTZweDtcbn1cbi5uYXZidG4ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4ubmF2YnRuIGgzIHtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXNpemU6IDIwcHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogNzBweDtcbiAgdG9wOiA2cHg7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG59XG4ubG9nbyB7XG4gIG1hcmdpbi10b3A6IDcwcHg7XG59XG4uRGlnTG9nbyB7XG4gIG91dGxpbmU6IG5vbmUgIWltcG9ydGFudDtcbn1cbi5zaWRlX3BhZ2VfbmF2X2Rlc2t0b3Age1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDUwJTtcbiAgcmlnaHQ6IDA7XG4gIHotaW5kZXg6IDEyMDAwO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtNTAlKTtcbiAgcGFkZGluZzogMTdweCA1cHggMTdweCA3cHg7XG4gIGJvcmRlci1yYWRpdXM6IDEycHggMHB4IDBweCAxMnB4O1xufVxuLnNpZGVfcGFnZV9uYXZfZGVza3RvcCBidXR0b24ge1xuICBjb2xvcjogIzgzODM4MztcbiAgZGlzcGxheTogYmxvY2s7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgcGFkZGluZy10b3A6IDRweDtcbiAgcGFkZGluZy1ib3R0b206IDRweDtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RiZGJkYjtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5zaWRlX3BhZ2VfbmF2X2Rlc2t0b3AgYnV0dG9uIGltZyB7XG4gIGhlaWdodDogMjBweDtcbiAgd2lkdGg6IDIwcHg7XG59XG4uc2lkZV9wYWdlX25hdl9tb2JpbGUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcGFkZGluZy10b3A6IDE0cHg7XG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xuICBib3JkZXItcmFkaXVzOiAwcHggMHB4IDEycHggMTJweDtcbiAgbWFyZ2luLXRvcDogOHB4O1xuICAtd2Via2l0LWJveC1zaGFkb3c6IDBweCAxcHggOHB4IC0xcHggIzgwN2I4MDtcbiAgLW1vei1ib3gtc2hhZG93OiAwcHggMXB4IDhweCAtMXB4ICM4MDdiODA7XG4gIGJveC1zaGFkb3c6IDBweCAxcHggOHB4IC0xcHggIzgwN2I4MDtcbn1cbi5zaWRlX3BhZ2VfbmF2X21vYmlsZSBidXR0b24ge1xuICBjb2xvcjogIzgzODM4MztcbiAgZm9udC1zaXplOiAyMHB4O1xuICBwYWRkaW5nOiAwcHggMTRweCAwcHggMTVweDtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNkYmRiZGI7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uc2lkZV9wYWdlX25hdl9tb2JpbGUgYnV0dG9uIGltZyB7XG4gIGhlaWdodDogMjBweDtcbiAgd2lkdGg6IDIwcHg7XG4gIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcbn1cbi5tZXNzYWdlIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICBib3R0b206IDQycHg7XG4gIHJpZ2h0OiA0MnB4O1xuICB3aWR0aDogNjlweDtcbiAgaGVpZ2h0OiA2OXB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIHotaW5kZXg6IDEyMDAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJveC1zaGFkb3c6IDRweCA0cHggMzBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjM3KTtcbiAgZm9udC1zaXplOiAzMHB4O1xufVxuLmRyYXdlcl9kcl9uYW1lIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LWZhbWlseTogXCJQb3BwaW5zLVNlbWlCb2xkXCI7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgb3V0bGluZTogbm9uZTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLm5hdkJhciB7XG4gIGZsb2F0OiByaWdodDtcbn1cbi5uYXZCYXIgc3BhbiB7XG4gIG1hcmdpbi1yaWdodDogMzdweDtcbn1cbi5uYXZCYXIgc3BhbiBidXR0b24ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXNpemU6IDE2cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIG1hcmdpbi1yaWdodDogMTNweDtcbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5Ecl9oZWFkZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmMmYyZjI7XG4gICAgcGFkZGluZy10b3A6IDExcHg7XG4gIH1cbiAgLm5hdmJ0biBoMyB7XG4gICAgY29sb3I6IGdyYXk7XG4gICAgZm9udC1zaXplOiAyM3B4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiA3MHB4O1xuICAgIHRvcDogLTZweDtcbiAgICBmb250LXdlaWdodDogNDAwO1xuICB9XG4gIC5zaWRlX3BhZ2VfbmF2X21vYmlsZSB7XG4gICAgbWFyZ2luLXRvcDogMjBweDtcbiAgfVxufVxuQG1lZGlhIChtYXgtd2lkdGg6IDM4OHB4KSB7XG4gIC5zaWRlX3BhZ2VfbmF2X21vYmlsZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHBhZGRpbmctdG9wOiAxNHB4O1xuICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDBweCAwcHggMTJweCAxMnB4O1xuICAgIG1hcmdpbi10b3A6IDhweDtcbiAgfVxuICAuc2lkZV9wYWdlX25hdl9tb2JpbGUgYnV0dG9uIHtcbiAgICBwYWRkaW5nOiAwcHggMTBweCAwcHggMTBweDtcbiAgfVxuICAuc2lkZV9wYWdlX25hdl9tb2JpbGUgYnV0dG9uIGltZyB7XG4gICAgaGVpZ2h0OiAxNnB4O1xuICAgIHdpZHRoOiAxNnB4O1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcbiAgfVxufVxuQG1lZGlhIChtYXgtd2lkdGg6IDU3NS45OHB4KSB7XG4gIC5zaWRlX3BhZ2VfbmF2X21vYmlsZSB7XG4gICAgcGFkZGluZy10b3A6IDE0cHg7XG4gICAgcGFkZGluZy1ib3R0b206IDEwcHg7XG4gICAgYm9yZGVyLXJhZGl1czogMHB4IDBweCAxMnB4IDEycHg7XG4gICAgbWFyZ2luLXRvcDogMTJweDtcbiAgfVxuICAuc2lkZV9wYWdlX25hdl9tb2JpbGUgYnV0dG9uIHtcbiAgICBwYWRkaW5nOiAwcHggMTJweCAwcHggMTJweDtcbiAgfVxuICAuc2lkZV9wYWdlX25hdl9tb2JpbGUgYnV0dG9uIGltZyB7XG4gICAgaGVpZ2h0OiAxOXB4O1xuICAgIHdpZHRoOiAxOXB4O1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcbiAgfVxuICAuaGFtYnVyZ2VyIHtcbiAgICBtYXJnaW4tbGVmdDogMjRweDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgcGFkZGluZy10b3A6IDhweDtcbiAgfVxuICAuc2lkZXJfY29udGFpbmVyIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDE4N3B4O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBtYXJnaW4tdG9wOiA1OXB4O1xuICB9XG4gIC5zaWRlcl9pbWcge1xuICAgIGhlaWdodDogMTg5cHg7XG4gIH1cbn1cbjpob3N0IDo6bmctZGVlcCAuYW50LWJhY2stdG9wIHtcbiAgYm90dG9tOiAxMDBweDtcbn1cbjpob3N0IDo6bmctZGVlcCAuYW50LWJhY2stdG9wLWlubmVyIHtcbiAgaGVpZ2h0OiA0MHB4O1xuICB3aWR0aDogNDBweDtcbiAgbGluZS1oZWlnaHQ6IDQwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzEwODhlOTtcbiAgY29sb3I6ICNmZmY7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAyMHB4O1xufVxuOmhvc3QgOjpuZy1kZWVwIHN0cm9uZyB7XG4gIGNvbG9yOiAjMTA4OGU5O1xufVxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](DoctorRootComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-doctor-root',
                templateUrl: './doctor-root.component.html',
                styleUrls: ['./doctor-root.component.less']
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }, { type: ng_zorro_antd_modal__WEBPACK_IMPORTED_MODULE_5__["NzModalService"] }, { type: _services_base_http_service__WEBPACK_IMPORTED_MODULE_6__["BaseHttpService"] }, { type: _services_doctor_service_doctor_service__WEBPACK_IMPORTED_MODULE_7__["DoctorService"] }, { type: _services_patient_service_socket_service_service__WEBPACK_IMPORTED_MODULE_8__["SocketServiceService"] }, { type: _services_patient_service_patient_service__WEBPACK_IMPORTED_MODULE_9__["PatientService"] }, { type: _services_lazy_service__WEBPACK_IMPORTED_MODULE_10__["LazyService"] }, { type: ng_zorro_antd_message__WEBPACK_IMPORTED_MODULE_11__["NzMessageService"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
                args: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["DOCUMENT"]]
            }] }, { type: _shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_12__["MediaControlService"] }, { type: src_app_shared_UI_service_div_scroll_service__WEBPACK_IMPORTED_MODULE_13__["DivScrollService"] }, { type: src_app_shared_UI_service_get_dr_name_service__WEBPACK_IMPORTED_MODULE_14__["GetDrNameService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/doctor-portal/other_page/chat-box/chat-box.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/doctor-portal/other_page/chat-box/chat-box.component.ts ***!
  \*************************************************************************/
/*! exports provided: ChatBoxComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatBoxComponent", function() { return ChatBoxComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ng-zorro-antd/grid */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-grid.js");
/* harmony import */ var ng_zorro_antd_collapse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng-zorro-antd/collapse */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-collapse.js");
/* harmony import */ var ng_zorro_antd_core_transition_patch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-zorro-antd/core/transition-patch */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-core-transition-patch.js");
/* harmony import */ var ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-zorro-antd/icon */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-icon.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");







const _c0 = function () { return { span: 2, offset: 0 }; };
const _c1 = function () { return { span: 22, offset: 0 }; };
function ChatBoxComponent_ng_template_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Pricing information");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](2, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](3, _c1));
} }
const _c2 = function () { return { span: 24, offset: 0 }; };
const _c3 = function () { return { span: 10, offset: 0 }; };
const _c4 = function () { return { span: 14, offset: 0 }; };
const _c5 = function () { return { span: 20, offset: 0 }; };
const _c6 = function () { return { span: 8, offset: 0 }; };
const _c7 = function () { return { span: 4, offset: 0 }; };
const _c8 = function () { return { span: 12, offset: 0 }; };
const _c9 = function () { return ["./Login"]; };
const _c10 = function () { return ["./Register"]; };
const _c11 = function () { return { span: 5, offset: 0 }; };
const _c12 = function () { return { span: 15, offset: 0 }; };
const _c13 = function () { return { span: 16, offset: 0 }; };
class ChatBoxComponent {
    constructor() { }
    ngOnInit() {
    }
}
ChatBoxComponent.ɵfac = function ChatBoxComponent_Factory(t) { return new (t || ChatBoxComponent)(); };
ChatBoxComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ChatBoxComponent, selectors: [["app-chat-box"]], decls: 139, vars: 64, consts: [[1, "chat_container"], [2, "position", "relative"], [1, "doctor_card", "app_shadow_b"], ["nz-row", "", 1, "center_f_y"], ["nz-col", "", 3, "nzXs"], [1, "mr-3", 2, "float", "right"], [2, "color", "green"], ["src", "assets/img/doctor_profile.png", "alt", "", 1, "doctor_photo", "img-res"], [1, "name"], [1, "degree"], [1, "specialist"], [1, "responds", "themes_text_invert"], [1, "information_card", "app_shadow_b"], ["InformationCard", ""], ["nz-row", ""], [3, "nzExpandIconPosition", "nzBordered", "nzGhost"], [1, "info", 3, "nzHeader", "nzActive", "nzShowArrow"], ["nz-row", "", 1, "p-2"], ["nz-col", "", 1, "sent_box", "mt-3", "center_f_y", 3, "nzXs"], ["nz-icon", "", "nzType", "file-add", "nzTheme", "outline", 1, "file_add"], [1, "doc_name"], [1, "file_type"], ["nz-col", "", 1, "receive_box", "themes_bg", "mt-3", "center_f_y", 3, "nzXs"], [1, "themes_text"], [1, "time"], [1, "seen"], [1, "one"], [1, "two"], ["nz-col", "", 1, "receive_box", "mt-3", 3, "nzXs"], ["src", "assets/icon/message/x_ray.png", "alt", "", 1, "img_container", "img-res"], ["nz-col", "", 1, "receive_box", "mt-3", "center_f_y", 2, "background-color", "#f1f3f4", 3, "nzXs"], ["controls", ""], ["src", "horse.ogg", "type", "audio/ogg"], ["src", "horse.mp3", "type", "audio/mpeg"], [1, "double_tick"], [1, ""], ["nz-col", "", 1, "mt-3", "center_xy", 3, "nzXs"], [1, "new_line"], [1, "sent_box_type_2", "mt-3", "mb-2", "center_f_y"], [1, "pl-2", "pr-2", "checkit"], [1, "auth_suggestion"], [1, "auth_Btn_1", "center_xy"], [3, "routerLink"], [1, "auth_Btn_2", "center_xy"], [1, "chat_control"], [1, "chat_input"], ["src", "assets/icon/message/attached.png", "alt", ""], ["src", "assets/icon/message/mic.png", "alt", ""], ["type", "text", "placeholder", "\u00A0 Input Text", 1, "chat_input_type"], ["src", "assets/icon/message/send.png", "alt", ""], ["nz-col", "", 1, "themes_bg", "center_xy", 3, "nzXs"], ["src", "assets/icon/message/stethoscope.png", "alt", ""], ["nz-col", "", 1, "themes_bg", "center_xy", "themes_opacity", 3, "nzXs"], [1, "btn_text"], ["nz-col", "", 1, "themes_bg", "center_xy", "btn_group", 3, "nzXs"], ["src", "assets/icon/message/clinic.png", "alt", ""], ["nz-col", "", 1, "center_xy", 3, "nzXs"], ["src", "assets/icon/message/circle.svg", "alt", ""], [1, "info"]], template: function ChatBoxComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "online ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "\u2B24");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "img", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "h2", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Dr. Anaira");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "h3", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "M.b.b.s.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "h3", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Dermatologist");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "h4", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Usually responds in 20 min");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](22, ChatBoxComponent_ng_template_22_Template, 7, 4, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "nz-collapse", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "nz-collapse-panel", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "Online Consultation ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "\u20B9 1000");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "Clinic Visit ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "\u20B9 1500");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "Follow up ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, "\u20B9 800");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](43, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](45, "i", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "h2", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, "Prescription");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "h3", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](50, "PDF");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](51, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](52, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "h2", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](56, "I am sending you my Xray image.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "span", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](58, "4:02PM ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "span", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "span", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, "\u2713");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "span", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63, "\u2713");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](64, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](68, "img", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](69, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "audio", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](73, "source", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](74, "source", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](75, " Your browser does not support the audio element. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "div", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "span", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](78, "4:22PM ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](79, "span", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "span", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](81, "\u2713");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](82, "span", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](83, "\u2713");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](84, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](85, "h5", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](86, "NEW MESSAGES");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "div", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "span", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](89, "Let me check.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "h3", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](91, "To further continue the chat please login or register");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](92, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](93, "div", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](94, "a", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](95, "Login");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](97, "div", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](98, "a", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](99, "Register");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](100, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](101, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](102, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](103, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](104, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](105, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](106, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](107, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](108, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](109, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](110, "div", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](111, "div", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](112, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](113, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](114, "img", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](115, "img", 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](116, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](117, "input", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](118, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](119, "img", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](120, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](121, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](122, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](123, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](124, "div", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](125, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](126, "img", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](127, "div", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](128, "h3", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](129, "Online Consult");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](130, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](131, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](132, "div", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](133, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](134, "img", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](135, "div", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](136, "h3", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](137, "Clinic Visit");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](138, "router-outlet");
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](35, _c2));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](36, _c3));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](37, _c4));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](38, _c2));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzExpandIconPosition", "right")("nzBordered", false)("nzGhost", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzHeader", _r0)("nzActive", false)("nzShowArrow", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](39, _c5));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](40, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](41, _c6));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](42, _c4));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](43, _c7));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](44, _c7));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](45, _c5));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](46, _c7));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](47, _c5));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](48, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](49, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](50, _c2));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](51, _c8));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](52, _c9));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](53, _c8));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](54, _c10));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](55, _c11));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](56, _c12));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](57, _c7));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](58, _c8));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](59, _c6));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](60, _c13));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](61, _c8));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](62, _c6));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](63, _c13));
    } }, directives: [ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_1__["NzRowDirective"], ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_1__["NzColDirective"], ng_zorro_antd_collapse__WEBPACK_IMPORTED_MODULE_2__["NzCollapseComponent"], ng_zorro_antd_collapse__WEBPACK_IMPORTED_MODULE_2__["NzCollapsePanelComponent"], ng_zorro_antd_core_transition_patch__WEBPACK_IMPORTED_MODULE_3__["ɵNzTransitionPatchDirective"], ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_4__["NzIconDirective"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterLinkWithHref"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterOutlet"]], styles: [".chat_container[_ngcontent-%COMP%] {\n  position: relative;\n}\n.doctor_card[_ngcontent-%COMP%] {\n  height: auto;\n  background-color: white;\n  margin-top: 103px;\n  padding-top: 7px;\n  padding-bottom: 7px;\n  border-radius: 0px 0px 12px 12px;\n  z-index: 2;\n  position: relative;\n}\n.doctor_photo[_ngcontent-%COMP%] {\n  height: 94px;\n  width: 94px;\n  border-radius: 50%;\n  display: block;\n  margin: auto;\n}\n.name[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: bold;\n}\n.degree[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: bold;\n}\n.specialist[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.responds[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.information_card[_ngcontent-%COMP%] {\n  height: auto;\n  background: #e3e8f2;\n  border-radius: 0px 0px 12px 12px;\n  padding-bottom: 12px;\n  padding-top: 12px;\n  position: relative;\n  top: -8px;\n  z-index: 1;\n}\n.info[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: bold;\n}\n.info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: bold;\n  color: #656565;\n  margin-left: 27px;\n}\n.info[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  float: right;\n  padding-right: 16px;\n}\n.info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  float: right;\n  padding-right: 16px;\n}\n.sent_box[_ngcontent-%COMP%] {\n  background-color: #e4e9f2;\n  min-height: 58px;\n  border-radius: 0px 10px 10px 10px;\n  position: relative;\n}\n.sent_box_type_2[_ngcontent-%COMP%] {\n  background-color: #e4e9f2;\n  min-height: 40px;\n  border-radius: 0px 10px 10px 10px;\n  position: relative;\n}\n.receive_box[_ngcontent-%COMP%] {\n  min-height: 58px;\n  border-radius: 10px 10px 0px 10px;\n  position: relative;\n}\n.receive_box[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 15px;\n  padding-left: 15px;\n}\n.file_add[_ngcontent-%COMP%] {\n  color: gray;\n  background: #d6dce8;\n  padding: 10px;\n  border-radius: 50%;\n}\n.doc_name[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 500;\n  padding-left: 5px;\n}\n.file_type[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #8f9bb3;\n  padding-left: 5px;\n}\n.time[_ngcontent-%COMP%] {\n  color: #92bac0;\n  font-size: 13px;\n  font-weight: bold;\n  float: right;\n  margin-right: -34px;\n}\n.seen[_ngcontent-%COMP%] {\n  position: relative;\n}\n.seen[_ngcontent-%COMP%]   .two[_ngcontent-%COMP%] {\n  position: relative;\n  left: -5px;\n}\n.img_container[_ngcontent-%COMP%] {\n  width: 173px;\n  height: 114px;\n  float: right;\n}\n.new_line[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 12px;\n  position: relative;\n}\n.new_line[_ngcontent-%COMP%]::after {\n  content: \"\";\n  border-bottom: 1px solid black;\n  width: 100%;\n  position: absolute;\n  top: 7px;\n  right: 96px;\n}\n.new_line[_ngcontent-%COMP%]::before {\n  content: \"\";\n  border-bottom: 1px solid black;\n  width: 100%;\n  position: absolute;\n  top: 7px;\n  left: 96px;\n}\n.double_tick[_ngcontent-%COMP%] {\n  float: right;\n  padding-right: 13px;\n}\n.auth_suggestion[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #9d9b9b;\n}\n.auth_Btn_1[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 40px;\n  background: #e4e9f2;\n  border-radius: 10px 0px 0px 0px;\n}\n.auth_Btn_2[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 40px;\n  background: #e4e9f2;\n  border-radius: 0px 10px 10px 0px;\n  border-left: 2px solid white;\n}\n.auth_Btn_1[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  font-size: 15px;\n  color: #000;\n}\n.auth_Btn_2[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  font-size: 15px;\n  color: #000;\n}\n.checkit[_ngcontent-%COMP%] {\n  font-size: 15px;\n  color: #262f49;\n}\n.chat_control[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 0;\n  right: 0;\n  width: 100%;\n}\n.chat_input[_ngcontent-%COMP%] {\n  min-height: 64px;\n  background-color: rgba(255, 255, 255, 0.88);\n}\n.btn_group[_ngcontent-%COMP%] {\n  min-height: 52px;\n  background-color: gray;\n}\n.chat_input_type[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 40px;\n  border: 1px solid #707070;\n  outline: none;\n  border-radius: 4px;\n  background-color: #f7f9fc;\n}\n.btn_text[_ngcontent-%COMP%] {\n  font-size: 15px;\n  color: white;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZG9jdG9yLXBvcnRhbC9vdGhlcl9wYWdlL2NoYXQtYm94L0Y6L09GRklDRSBXT1JLL0RJR0lTQ1JJQkUvT2ZmaWNlX1Byb2plY3RzL2FwcGxpY2F0aW9uL3BhdGllbnRfcG9ydGFsL3NyYy9hcHAvZG9jdG9yLXBvcnRhbC9vdGhlcl9wYWdlL2NoYXQtYm94L2NoYXQtYm94LmNvbXBvbmVudC5sZXNzIiwic3JjL2FwcC9kb2N0b3ItcG9ydGFsL290aGVyX3BhZ2UvY2hhdC1ib3gvY2hhdC1ib3guY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBQTtBQ0NGO0FERUE7RUFDRSxZQUFBO0VBQ0EsdUJBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQ0FBQTtFQUNBLFVBQUE7RUFDQSxrQkFBQTtBQ0FGO0FERUE7RUFDRSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLFlBQUE7QUNBRjtBREVBO0VBQ0UsZUFBQTtFQUNBLGlCQUFBO0FDQUY7QURFQTtFQUNFLGVBQUE7RUFDQSxpQkFBQTtBQ0FGO0FERUE7RUFDRSxlQUFBO0FDQUY7QURFQTtFQUNFLGVBQUE7QUNBRjtBREdBO0VBQ0UsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0NBQUE7RUFDQSxvQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtBQ0RGO0FER0E7RUFDRSxlQUFBO0VBQ0EsaUJBQUE7QUNERjtBREdBO0VBQ0UsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0FDREY7QURHQTtFQUNFLFlBQUE7RUFDQSxtQkFBQTtBQ0RGO0FER0E7RUFFRSxZQUFBO0VBQ0EsbUJBQUE7QUNGRjtBREtBO0VBQ0UseUJBQUE7RUFDQSxnQkFBQTtFQUNBLGlDQUFBO0VBQ0Esa0JBQUE7QUNIRjtBREtBO0VBQ0UseUJBQUE7RUFDQSxnQkFBQTtFQUNBLGlDQUFBO0VBQ0Esa0JBQUE7QUNIRjtBREtBO0VBQ0UsZ0JBQUE7RUFDQSxpQ0FBQTtFQUNBLGtCQUFBO0FDSEY7QURLQTtFQUNFLGVBQUE7RUFDQSxrQkFBQTtBQ0hGO0FES0E7RUFDRSxXQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7QUNIRjtBREtBO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7QUNIRjtBREtBO0VBQ0UsZUFBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtBQ0hGO0FES0E7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0FDSEY7QURLQTtFQUNFLGtCQUFBO0FDSEY7QURLQTtFQUNFLGtCQUFBO0VBQ0EsVUFBQTtBQ0hGO0FETUE7RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7QUNKRjtBRE9BO0VBQ0Usa0JBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QUNMRjtBRE9BO0VBQ0UsV0FBQTtFQUNBLDhCQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFdBQUE7QUNMRjtBRE9BO0VBQ0UsV0FBQTtFQUNBLDhCQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFVBQUE7QUNMRjtBRE9BO0VBQ0UsWUFBQTtFQUNBLG1CQUFBO0FDTEY7QURRQTtFQUNFLGVBQUE7RUFDQSxjQUFBO0FDTkY7QURRQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSwrQkFBQTtBQ05GO0FEUUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0NBQUE7RUFDQSw0QkFBQTtBQ05GO0FEUUE7RUFDRSxlQUFBO0VBQ0EsV0FBQTtBQ05GO0FEUUE7RUFDRSxlQUFBO0VBQ0EsV0FBQTtBQ05GO0FEUUE7RUFDRSxlQUFBO0VBQ0EsY0FBQTtBQ05GO0FEU0E7RUFDRSxlQUFBO0VBQ0EsU0FBQTtFQUNBLFFBQUE7RUFDQSxXQUFBO0FDUEY7QURTQTtFQUNFLGdCQUFBO0VBQ0EsMkNBQUE7QUNQRjtBRFNBO0VBQ0UsZ0JBQUE7RUFDQSxzQkFBQTtBQ1BGO0FEU0E7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLHlCQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7QUNQRjtBRFNBO0VBQ0UsZUFBQTtFQUNBLFlBQUE7QUNQRiIsImZpbGUiOiJzcmMvYXBwL2RvY3Rvci1wb3J0YWwvb3RoZXJfcGFnZS9jaGF0LWJveC9jaGF0LWJveC5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jaGF0X2NvbnRhaW5lciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi8vIGRvY3Rvcl9jYXJkXG4uZG9jdG9yX2NhcmQge1xuICBoZWlnaHQ6IGF1dG87XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBtYXJnaW4tdG9wOiAxMDNweDtcbiAgcGFkZGluZy10b3A6IDdweDtcbiAgcGFkZGluZy1ib3R0b206IDdweDtcbiAgYm9yZGVyLXJhZGl1czogMHB4IDBweCAxMnB4IDEycHg7XG4gIHotaW5kZXg6IDI7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi5kb2N0b3JfcGhvdG8ge1xuICBoZWlnaHQ6IDk0cHg7XG4gIHdpZHRoOiA5NHB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW46IGF1dG87XG59XG4ubmFtZSB7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG4uZGVncmVlIHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cbi5zcGVjaWFsaXN0IHtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuLnJlc3BvbmRzIHtcbiAgZm9udC1zaXplOiAxMnB4O1xufVxuLy8gaW5mb3JtYXRpb24gY2FyZFxuLmluZm9ybWF0aW9uX2NhcmQge1xuICBoZWlnaHQ6IGF1dG87XG4gIGJhY2tncm91bmQ6ICNlM2U4ZjI7XG4gIGJvcmRlci1yYWRpdXM6IDBweCAwcHggMTJweCAxMnB4O1xuICBwYWRkaW5nLWJvdHRvbTogMTJweDtcbiAgcGFkZGluZy10b3A6IDEycHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdG9wOiAtOHB4O1xuICB6LWluZGV4OiAxO1xufVxuLmluZm8gaDIge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuLmluZm8gaDMge1xuICBmb250LXNpemU6IDEycHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBjb2xvcjogIzY1NjU2NTtcbiAgbWFyZ2luLWxlZnQ6IDI3cHg7XG59XG4uaW5mbyBoMiBzcGFuIHtcbiAgZmxvYXQ6IHJpZ2h0O1xuICBwYWRkaW5nLXJpZ2h0OiAxNnB4O1xufVxuLmluZm8gaDMgc3BhbiB7XG4gIGZsb2F0OiByaWdodDtcbiAgZmxvYXQ6IHJpZ2h0O1xuICBwYWRkaW5nLXJpZ2h0OiAxNnB4O1xufVxuLy8gc2VudF9ib3ggcmVjZWl2ZV9ib3hcbi5zZW50X2JveCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlNGU5ZjI7XG4gIG1pbi1oZWlnaHQ6IDU4cHg7XG4gIGJvcmRlci1yYWRpdXM6IDBweCAxMHB4IDEwcHggMTBweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLnNlbnRfYm94X3R5cGVfMiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlNGU5ZjI7XG4gIG1pbi1oZWlnaHQ6IDQwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDBweCAxMHB4IDEwcHggMTBweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLnJlY2VpdmVfYm94IHtcbiAgbWluLWhlaWdodDogNThweDtcbiAgYm9yZGVyLXJhZGl1czogMTBweCAxMHB4IDBweCAxMHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4ucmVjZWl2ZV9ib3ggaDIge1xuICBmb250LXNpemU6IDE1cHg7XG4gIHBhZGRpbmctbGVmdDogMTVweDtcbn1cbi5maWxlX2FkZCB7XG4gIGNvbG9yOiBncmF5O1xuICBiYWNrZ3JvdW5kOiAjZDZkY2U4O1xuICBwYWRkaW5nOiAxMHB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG59XG4uZG9jX25hbWUge1xuICBmb250LXNpemU6IDE1cHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIHBhZGRpbmctbGVmdDogNXB4O1xufVxuLmZpbGVfdHlwZSB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgY29sb3I6ICM4ZjliYjM7XG4gIHBhZGRpbmctbGVmdDogNXB4O1xufVxuLnRpbWUge1xuICBjb2xvcjogIzkyYmFjMDtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgZmxvYXQ6IHJpZ2h0O1xuICBtYXJnaW4tcmlnaHQ6IC0zNHB4O1xufVxuLnNlZW4ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4uc2VlbiAudHdvIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBsZWZ0OiAtNXB4O1xufVxuXG4uaW1nX2NvbnRhaW5lciB7XG4gIHdpZHRoOiAxNzNweDtcbiAgaGVpZ2h0OiAxMTRweDtcbiAgZmxvYXQ6IHJpZ2h0O1xufVxuLy8gTkVXIE1FU1NBR0VTXG4ubmV3X2xpbmUge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLm5ld19saW5lOjphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBibGFjaztcbiAgd2lkdGg6IDEwMCU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA3cHg7XG4gIHJpZ2h0OiA5NnB4O1xufVxuLm5ld19saW5lOjpiZWZvcmUge1xuICBjb250ZW50OiBcIlwiO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgYmxhY2s7XG4gIHdpZHRoOiAxMDAlO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogN3B4O1xuICBsZWZ0OiA5NnB4O1xufVxuLmRvdWJsZV90aWNrIHtcbiAgZmxvYXQ6IHJpZ2h0O1xuICBwYWRkaW5nLXJpZ2h0OiAxM3B4O1xufVxuLy9cbi5hdXRoX3N1Z2dlc3Rpb24ge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGNvbG9yOiAjOWQ5YjliO1xufVxuLmF1dGhfQnRuXzEge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiA0MHB4O1xuICBiYWNrZ3JvdW5kOiAjZTRlOWYyO1xuICBib3JkZXItcmFkaXVzOiAxMHB4IDBweCAwcHggMHB4O1xufVxuLmF1dGhfQnRuXzIge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiA0MHB4O1xuICBiYWNrZ3JvdW5kOiAjZTRlOWYyO1xuICBib3JkZXItcmFkaXVzOiAwcHggMTBweCAxMHB4IDBweDtcbiAgYm9yZGVyLWxlZnQ6IDJweCBzb2xpZCB3aGl0ZTtcbn1cbi5hdXRoX0J0bl8xIGEge1xuICBmb250LXNpemU6IDE1cHg7XG4gIGNvbG9yOiAjMDAwO1xufVxuLmF1dGhfQnRuXzIgYSB7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgY29sb3I6ICMwMDA7XG59XG4uY2hlY2tpdCB7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgY29sb3I6ICMyNjJmNDk7XG59XG4vLyBjaGF0X2NvbnRyb2xcbi5jaGF0X2NvbnRyb2wge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGJvdHRvbTogMDtcbiAgcmlnaHQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xufVxuLmNoYXRfaW5wdXQge1xuICBtaW4taGVpZ2h0OiA2NHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuODgpO1xufVxuLmJ0bl9ncm91cCB7XG4gIG1pbi1oZWlnaHQ6IDUycHg7XG4gIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XG59XG4uY2hhdF9pbnB1dF90eXBlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogNDBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgIzcwNzA3MDtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjdmOWZjO1xufVxuLmJ0bl90ZXh0IHtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBjb2xvcjogd2hpdGU7XG59XG4iLCIuY2hhdF9jb250YWluZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4uZG9jdG9yX2NhcmQge1xuICBoZWlnaHQ6IGF1dG87XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBtYXJnaW4tdG9wOiAxMDNweDtcbiAgcGFkZGluZy10b3A6IDdweDtcbiAgcGFkZGluZy1ib3R0b206IDdweDtcbiAgYm9yZGVyLXJhZGl1czogMHB4IDBweCAxMnB4IDEycHg7XG4gIHotaW5kZXg6IDI7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi5kb2N0b3JfcGhvdG8ge1xuICBoZWlnaHQ6IDk0cHg7XG4gIHdpZHRoOiA5NHB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW46IGF1dG87XG59XG4ubmFtZSB7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG4uZGVncmVlIHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cbi5zcGVjaWFsaXN0IHtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuLnJlc3BvbmRzIHtcbiAgZm9udC1zaXplOiAxMnB4O1xufVxuLmluZm9ybWF0aW9uX2NhcmQge1xuICBoZWlnaHQ6IGF1dG87XG4gIGJhY2tncm91bmQ6ICNlM2U4ZjI7XG4gIGJvcmRlci1yYWRpdXM6IDBweCAwcHggMTJweCAxMnB4O1xuICBwYWRkaW5nLWJvdHRvbTogMTJweDtcbiAgcGFkZGluZy10b3A6IDEycHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdG9wOiAtOHB4O1xuICB6LWluZGV4OiAxO1xufVxuLmluZm8gaDIge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuLmluZm8gaDMge1xuICBmb250LXNpemU6IDEycHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBjb2xvcjogIzY1NjU2NTtcbiAgbWFyZ2luLWxlZnQ6IDI3cHg7XG59XG4uaW5mbyBoMiBzcGFuIHtcbiAgZmxvYXQ6IHJpZ2h0O1xuICBwYWRkaW5nLXJpZ2h0OiAxNnB4O1xufVxuLmluZm8gaDMgc3BhbiB7XG4gIGZsb2F0OiByaWdodDtcbiAgcGFkZGluZy1yaWdodDogMTZweDtcbn1cbi5zZW50X2JveCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlNGU5ZjI7XG4gIG1pbi1oZWlnaHQ6IDU4cHg7XG4gIGJvcmRlci1yYWRpdXM6IDBweCAxMHB4IDEwcHggMTBweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLnNlbnRfYm94X3R5cGVfMiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlNGU5ZjI7XG4gIG1pbi1oZWlnaHQ6IDQwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDBweCAxMHB4IDEwcHggMTBweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLnJlY2VpdmVfYm94IHtcbiAgbWluLWhlaWdodDogNThweDtcbiAgYm9yZGVyLXJhZGl1czogMTBweCAxMHB4IDBweCAxMHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4ucmVjZWl2ZV9ib3ggaDIge1xuICBmb250LXNpemU6IDE1cHg7XG4gIHBhZGRpbmctbGVmdDogMTVweDtcbn1cbi5maWxlX2FkZCB7XG4gIGNvbG9yOiBncmF5O1xuICBiYWNrZ3JvdW5kOiAjZDZkY2U4O1xuICBwYWRkaW5nOiAxMHB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG59XG4uZG9jX25hbWUge1xuICBmb250LXNpemU6IDE1cHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIHBhZGRpbmctbGVmdDogNXB4O1xufVxuLmZpbGVfdHlwZSB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgY29sb3I6ICM4ZjliYjM7XG4gIHBhZGRpbmctbGVmdDogNXB4O1xufVxuLnRpbWUge1xuICBjb2xvcjogIzkyYmFjMDtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgZmxvYXQ6IHJpZ2h0O1xuICBtYXJnaW4tcmlnaHQ6IC0zNHB4O1xufVxuLnNlZW4ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4uc2VlbiAudHdvIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBsZWZ0OiAtNXB4O1xufVxuLmltZ19jb250YWluZXIge1xuICB3aWR0aDogMTczcHg7XG4gIGhlaWdodDogMTE0cHg7XG4gIGZsb2F0OiByaWdodDtcbn1cbi5uZXdfbGluZSB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4ubmV3X2xpbmU6OmFmdGVyIHtcbiAgY29udGVudDogXCJcIjtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGJsYWNrO1xuICB3aWR0aDogMTAwJTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDdweDtcbiAgcmlnaHQ6IDk2cHg7XG59XG4ubmV3X2xpbmU6OmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBibGFjaztcbiAgd2lkdGg6IDEwMCU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA3cHg7XG4gIGxlZnQ6IDk2cHg7XG59XG4uZG91YmxlX3RpY2sge1xuICBmbG9hdDogcmlnaHQ7XG4gIHBhZGRpbmctcmlnaHQ6IDEzcHg7XG59XG4uYXV0aF9zdWdnZXN0aW9uIHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjb2xvcjogIzlkOWI5Yjtcbn1cbi5hdXRoX0J0bl8xIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogNDBweDtcbiAgYmFja2dyb3VuZDogI2U0ZTlmMjtcbiAgYm9yZGVyLXJhZGl1czogMTBweCAwcHggMHB4IDBweDtcbn1cbi5hdXRoX0J0bl8yIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogNDBweDtcbiAgYmFja2dyb3VuZDogI2U0ZTlmMjtcbiAgYm9yZGVyLXJhZGl1czogMHB4IDEwcHggMTBweCAwcHg7XG4gIGJvcmRlci1sZWZ0OiAycHggc29saWQgd2hpdGU7XG59XG4uYXV0aF9CdG5fMSBhIHtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBjb2xvcjogIzAwMDtcbn1cbi5hdXRoX0J0bl8yIGEge1xuICBmb250LXNpemU6IDE1cHg7XG4gIGNvbG9yOiAjMDAwO1xufVxuLmNoZWNraXQge1xuICBmb250LXNpemU6IDE1cHg7XG4gIGNvbG9yOiAjMjYyZjQ5O1xufVxuLmNoYXRfY29udHJvbCB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgYm90dG9tOiAwO1xuICByaWdodDogMDtcbiAgd2lkdGg6IDEwMCU7XG59XG4uY2hhdF9pbnB1dCB7XG4gIG1pbi1oZWlnaHQ6IDY0cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44OCk7XG59XG4uYnRuX2dyb3VwIHtcbiAgbWluLWhlaWdodDogNTJweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcbn1cbi5jaGF0X2lucHV0X3R5cGUge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiA0MHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjNzA3MDcwO1xuICBvdXRsaW5lOiBub25lO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmN2Y5ZmM7XG59XG4uYnRuX3RleHQge1xuICBmb250LXNpemU6IDE1cHg7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ChatBoxComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-chat-box',
                templateUrl: './chat-box.component.html',
                styleUrls: ['./chat-box.component.less']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/doctor-portal/other_page/privacy-policy/privacy-policy.component.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/doctor-portal/other_page/privacy-policy/privacy-policy.component.ts ***!
  \*************************************************************************************/
/*! exports provided: PrivacyPolicyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrivacyPolicyComponent", function() { return PrivacyPolicyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class PrivacyPolicyComponent {
    constructor() { }
    ngOnInit() {
    }
}
PrivacyPolicyComponent.ɵfac = function PrivacyPolicyComponent_Factory(t) { return new (t || PrivacyPolicyComponent)(); };
PrivacyPolicyComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PrivacyPolicyComponent, selectors: [["app-privacy-policy"]], decls: 1, vars: 0, consts: [["src", "https://www.youtube.com/embed/dQw4w9WgXcQ", "frameborder", "0", "allowfullscreen", ""]], template: function PrivacyPolicyComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "iframe", 0);
    } }, styles: ["iframe[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100vh;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZG9jdG9yLXBvcnRhbC9vdGhlcl9wYWdlL3ByaXZhY3ktcG9saWN5L0Y6L09GRklDRSBXT1JLL0RJR0lTQ1JJQkUvT2ZmaWNlX1Byb2plY3RzL2FwcGxpY2F0aW9uL3BhdGllbnRfcG9ydGFsL3NyYy9hcHAvZG9jdG9yLXBvcnRhbC9vdGhlcl9wYWdlL3ByaXZhY3ktcG9saWN5L3ByaXZhY3ktcG9saWN5LmNvbXBvbmVudC5sZXNzIiwic3JjL2FwcC9kb2N0b3ItcG9ydGFsL290aGVyX3BhZ2UvcHJpdmFjeS1wb2xpY3kvcHJpdmFjeS1wb2xpY3kuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0EsYUFBQTtBQ0NGIiwiZmlsZSI6InNyYy9hcHAvZG9jdG9yLXBvcnRhbC9vdGhlcl9wYWdlL3ByaXZhY3ktcG9saWN5L3ByaXZhY3ktcG9saWN5LmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiaWZyYW1lIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwdmg7XG59XG4iLCJpZnJhbWUge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDB2aDtcbn1cbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PrivacyPolicyComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-privacy-policy',
                templateUrl: './privacy-policy.component.html',
                styleUrls: ['./privacy-policy.component.less']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/doctor-portal/other_page/terms-of-use/terms-of-use.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/doctor-portal/other_page/terms-of-use/terms-of-use.component.ts ***!
  \*********************************************************************************/
/*! exports provided: TermsOfUseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TermsOfUseComponent", function() { return TermsOfUseComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class TermsOfUseComponent {
    constructor() { }
    ngOnInit() {
    }
}
TermsOfUseComponent.ɵfac = function TermsOfUseComponent_Factory(t) { return new (t || TermsOfUseComponent)(); };
TermsOfUseComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TermsOfUseComponent, selectors: [["app-terms-of-use"]], decls: 1, vars: 0, consts: [["src", "https://www.youtube.com/embed/dQw4w9WgXcQ", "frameborder", "0", "allowfullscreen", ""]], template: function TermsOfUseComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "iframe", 0);
    } }, styles: ["iframe[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100vh;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZG9jdG9yLXBvcnRhbC9vdGhlcl9wYWdlL3Rlcm1zLW9mLXVzZS9GOi9PRkZJQ0UgV09SSy9ESUdJU0NSSUJFL09mZmljZV9Qcm9qZWN0cy9hcHBsaWNhdGlvbi9wYXRpZW50X3BvcnRhbC9zcmMvYXBwL2RvY3Rvci1wb3J0YWwvb3RoZXJfcGFnZS90ZXJtcy1vZi11c2UvdGVybXMtb2YtdXNlLmNvbXBvbmVudC5sZXNzIiwic3JjL2FwcC9kb2N0b3ItcG9ydGFsL290aGVyX3BhZ2UvdGVybXMtb2YtdXNlL3Rlcm1zLW9mLXVzZS5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQUE7RUFDQSxhQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC9kb2N0b3ItcG9ydGFsL290aGVyX3BhZ2UvdGVybXMtb2YtdXNlL3Rlcm1zLW9mLXVzZS5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbImlmcmFtZSB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMHZoO1xufVxuIiwiaWZyYW1lIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwdmg7XG59XG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TermsOfUseComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-terms-of-use',
                templateUrl: './terms-of-use.component.html',
                styleUrls: ['./terms-of-use.component.less']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/doctor-portal/page/appointment/appointment.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/doctor-portal/page/appointment/appointment.component.ts ***!
  \*************************************************************************/
/*! exports provided: AppointmentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppointmentComponent", function() { return AppointmentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_shared_icon_custom_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/icon/custom-icon */ "./src/app/shared/icon/custom-icon.ts");
/* harmony import */ var src_app_shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/UI_service/media-control.service */ "./src/app/shared/UI_service/media-control.service.ts");
/* harmony import */ var src_app_shared_UI_service_custom_icons_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/UI_service/custom-icons.service */ "./src/app/shared/UI_service/custom-icons.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng-zorro-antd/grid */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-grid.js");
/* harmony import */ var _shared_components_calendar_calendar_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../shared/components/calendar/calendar.component */ "./src/app/shared/components/calendar/calendar.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var ng_zorro_antd_core_transition_patch__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng-zorro-antd/core/transition-patch */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-core-transition-patch.js");
/* harmony import */ var ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ng-zorro-antd/icon */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-icon.js");
/* harmony import */ var ng_zorro_antd_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ng-zorro-antd/button */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-button.js");
/* harmony import */ var ng_zorro_antd_core_wave__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ng-zorro-antd/core/wave */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-core-wave.js");
/* harmony import */ var ng_zorro_antd_tag__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ng-zorro-antd/tag */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-tag.js");














const _c0 = function () { return { span: 9 }; };
const _c1 = function () { return { span: 15 }; };
const _c2 = function () { return ["../dashboard"]; };
function AppointmentComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h1", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Consulted With Doctor Before");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "img", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "\u00A0 My Health Records");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](3, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](4, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](5, _c2));
} }
const _c3 = function () { return { span: 3 }; };
const _c4 = function () { return { span: 21 }; };
function AppointmentComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "img", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "h2", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "For Emergency Service ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Consultation decision");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "i", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](4, _c3))("nzLg", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](5, _c3));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](6, _c4))("nzLg", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](7, _c4));
} }
const _c5 = function () { return ["../dashboard/Your-Appointments"]; };
function AppointmentComponent_button_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " \u00A0Book Now ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](1, _c5));
} }
function AppointmentComponent_button_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " \u00A0 Book Now");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](2, _c5))("nzSize", "large");
} }
function AppointmentComponent_h2_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h2", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Clinic Open at ", ctx_r4.open[0].time, "");
} }
function AppointmentComponent_ng_container_20_h3_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h3", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "nz-tag", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const data_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", data_r9.days, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzColor", "#2db7f5");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](data_r9.isVirtualClinic ? "Online-Consult" : "Clinic Visit");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", data_r9.timings, " ");
} }
function AppointmentComponent_ng_container_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, AppointmentComponent_ng_container_20_h3_1_Template, 6, 4, "h3", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", item_r7 == null ? null : item_r7.clinicTimings);
} }
function AppointmentComponent_div_21_img_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 29);
} }
function AppointmentComponent_div_21_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Now");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} }
const _c6 = function () { return { span: 0 }; };
const _c7 = function () { return { span: 12 }; };
const _c8 = function (a0) { return { "center_xy": a0 }; };
function AppointmentComponent_div_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "button", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, AppointmentComponent_div_21_img_3_Template, 1, 0, "img", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "\u00A0Book ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, AppointmentComponent_div_21_ng_container_5_Template, 2, 0, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](5, _c6))("nzLg", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](6, _c7))("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](7, _c8, ctx_r6.isPort));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r6.isPort);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r6.isPort);
} }
const _c9 = function () { return { span: 14 }; };
const _c10 = function () { return { span: 17 }; };
const _c11 = function () { return { span: 10 }; };
const _c12 = function () { return { span: 7 }; };
const _c13 = function () { return { span: 24 }; };
class AppointmentComponent {
    constructor(_viewPortControl, _IconsService) {
        this._viewPortControl = _viewPortControl;
        this._IconsService = _IconsService;
        this.size = 'large';
        this.bookAppointment = this._IconsService.setIcon(src_app_shared_icon_custom_icon__WEBPACK_IMPORTED_MODULE_1__["allIcons"].bookAppointment);
    }
    ngOnInit() {
        console.log(this.clinics);
    }
    ngAfterContentChecked() {
        this.isPort = this._viewPortControl.mediaPort();
    }
}
AppointmentComponent.ɵfac = function AppointmentComponent_Factory(t) { return new (t || AppointmentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_2__["MediaControlService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_UI_service_custom_icons_service__WEBPACK_IMPORTED_MODULE_3__["CustomIconsService"])); };
AppointmentComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppointmentComponent, selectors: [["app-appointment"]], inputs: { clinics: "clinics", open: "open" }, decls: 22, vars: 23, consts: [[1, "appointment_bg", "center_xy"], [1, "appointment_container"], [4, "ngIf"], [1, "app_shadow_b"], ["nz-row", "", "nzAlign", "middle", 1, "appointment_book_card"], ["nz-col", "", 3, "nzXs", "nzLg"], [1, "appointment_book_card_heading", "noselect"], ["nz-col", "", 1, "", 3, "nzXs", "nzLg"], ["class", "appointment_calendar_booking_btn btn_primary noselect", 3, "routerLink", 4, "ngIf"], ["nz-button", "", "class", "btn_primary noselect", 3, "routerLink", "nzSize", 4, "ngIf"], ["nz-row", "", "nzAlign", "middle", 1, "appointment_calendar_card", "app_shadow_b", "mb-2"], ["class", "appointment_calendar_card_heading", 4, "ngIf"], ["nz-row", ""], [4, "ngFor", "ngForOf"], ["nz-col", "", "class", "", 3, "nzXs", "nzLg", "ngClass", 4, "ngIf"], [1, "doctor_consulted_card", "app_shadow_b"], ["nz-col", "", 1, "center_xy", 3, "nzXs"], [1, "doctor_consulted_heading", "noselect"], ["nz-col", "", 1, "text-center", "mar_10", 3, "nzXs"], [1, "Health_Records_btn", "btn_primary", "noselect", 3, "routerLink"], ["src", "assets/img/home/Health_R.png", "width", "35px", "alt", ""], ["nz-row", "", "nzAlign", "middle", 1, "appointment_card"], ["src", "assets/icon/bandage.png", "alt", "", "width", "85px"], ["nz-col", "", 1, "center_y", "pos_rel", 3, "nzXs", "nzLg"], [1, "emergency_heading", "noselect"], [1, "emergency_sub", "noselect"], [1, "arrow_ico"], ["nz-icon", "", "nzType", "right", "nzTheme", "outline"], [1, "appointment_calendar_booking_btn", "btn_primary", "noselect", 3, "routerLink"], ["src", "assets/icon/bookAppointment.svg", "width", "19px", "alt", ""], ["nz-button", "", 1, "btn_primary", "noselect", 3, "routerLink", "nzSize"], ["src", "assets/img/home/Image 5.svg", "alt", "", 1, "nz_ico"], [1, "appointment_calendar_card_heading"], ["class", "time_by_calendar", 4, "ngFor", "ngForOf"], [1, "time_by_calendar"], [1, "rounded", "pull-right", "fix_bottom", 3, "nzColor"], ["nz-col", "", 1, "", 3, "nzXs", "nzLg", "ngClass"], [1, "appointment_calendar_booking_btn", "btn_primary"], ["src", "assets/icon/bookAppointment.svg", "width", "19px", "alt", "", 4, "ngIf"]], template: function AppointmentComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, AppointmentComponent_ng_container_2_Template, 10, 6, "ng-container", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, AppointmentComponent_ng_container_3_Template, 14, 8, "ng-container", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "h2", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Would you like to book an appointment?");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, AppointmentComponent_button_11_Template, 3, 2, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, AppointmentComponent_button_12_Template, 3, 3, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, AppointmentComponent_h2_16_Template, 2, 1, "h2", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "app-calendar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](20, AppointmentComponent_ng_container_20_Template, 2, 1, "ng-container", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, AppointmentComponent_div_21_Template, 6, 9, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isPort);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.isPort);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](15, _c9))("nzLg", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](16, _c10));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](17, _c11))("nzLg", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](18, _c12));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.isPort);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isPort);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](19, _c13))("nzLg", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](20, _c13));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.open.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](21, _c13))("nzLg", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](22, _c7));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.clinics);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.isPort);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_5__["NzRowDirective"], ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_5__["NzColDirective"], _shared_components_calendar_calendar_component__WEBPACK_IMPORTED_MODULE_6__["CalendarComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _angular_router__WEBPACK_IMPORTED_MODULE_7__["RouterLink"], ng_zorro_antd_core_transition_patch__WEBPACK_IMPORTED_MODULE_8__["ɵNzTransitionPatchDirective"], ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_9__["NzIconDirective"], ng_zorro_antd_button__WEBPACK_IMPORTED_MODULE_10__["NzButtonComponent"], ng_zorro_antd_core_wave__WEBPACK_IMPORTED_MODULE_11__["NzWaveDirective"], ng_zorro_antd_tag__WEBPACK_IMPORTED_MODULE_12__["NzTagComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgClass"]], styles: [".appointment_bg[_ngcontent-%COMP%] {\n  min-height: auto;\n  background-color: white;\n}\n.appointment_container[_ngcontent-%COMP%] {\n  min-height: 400px;\n  display: block;\n  width: 100%;\n}\n.appointment_card[_ngcontent-%COMP%] {\n  background-color: white;\n  height: 142px;\n  width: 100%;\n  border-radius: 8px;\n  margin-top: 26px;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n.bandage[_ngcontent-%COMP%] {\n  display: block;\n  margin: auto;\n}\n.emergency_heading[_ngcontent-%COMP%] {\n  color: #707070;\n  font-size: 27px;\n  line-height: 34px;\n  font-family: \"ralewaybold\";\n}\n.emergency_sub[_ngcontent-%COMP%] {\n  color: #707070;\n  font-size: 21px;\n  font-weight: 400;\n  font-family: \"ralewayregular\";\n}\n.arrow_ico[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 41%;\n  right: 0px;\n}\n.arrow_ico[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: gray;\n  font-size: 30px;\n}\n.doctor_consulted_card[_ngcontent-%COMP%] {\n  background-color: white;\n  min-height: 42px;\n  border-radius: 12px;\n  margin-top: 26px;\n  padding: 17px;\n}\n.doctor_consulted_btn[_ngcontent-%COMP%] {\n  height: 50px;\n  width: 195px;\n  display: inline-block;\n  font-weight: bold;\n  text-align: center;\n  vertical-align: middle;\n  font-size: 14px;\n  line-height: 26px;\n  -webkit-user-select: none;\n  user-select: none;\n  border-radius: 6px;\n  cursor: pointer;\n  float: right;\n  border: none;\n}\n.doctor_consulted_heading[_ngcontent-%COMP%] {\n  color: gray;\n  font-size: 16px;\n  line-height: 19px;\n  font-weight: bold;\n  font-family: \"ralewaybold\";\n}\n.Health_Records_btn[_ngcontent-%COMP%] {\n  border: none;\n  height: 50px;\n  border-radius: 11px;\n  outline: none;\n  cursor: pointer;\n  font-size: 14px;\n  font-family: \"ralewaybold\";\n}\n.appointment_book_card[_ngcontent-%COMP%] {\n  background-color: white;\n  height: 101px;\n  width: 100%;\n  border-radius: 10px;\n  margin-top: 26px;\n  padding-left: 13px;\n  padding-right: 13px;\n}\n.appointment_book_card_heading[_ngcontent-%COMP%] {\n  color: gray;\n  font-size: 27px;\n  font-weight: bold;\n  font-family: \"ralewaybold\";\n}\n.appointment_book_btn[_ngcontent-%COMP%] {\n  height: 60px;\n  width: 229px;\n  display: inline-block;\n  font-weight: bold;\n  text-align: center;\n  vertical-align: middle;\n  font-size: 22px;\n  line-height: 26px;\n  -webkit-user-select: none;\n  user-select: none;\n  border-radius: 6px;\n  cursor: pointer;\n  float: right;\n  border: none;\n}\n.appointment_calendar_card[_ngcontent-%COMP%] {\n  background-color: white;\n  min-height: 359px;\n  width: 100%;\n  border-radius: 10px;\n  margin-top: 26px;\n  padding-left: 13px;\n  padding-right: 13px;\n  padding-top: 13px;\n  padding-bottom: 4px;\n}\n.appointment_calendar_card_heading[_ngcontent-%COMP%] {\n  color: #707070;\n  font-size: 27px;\n  font-weight: bold;\n  font-family: \"ralewaybold\";\n}\n.appointment_calendar_booking_btn[_ngcontent-%COMP%] {\n  height: 60px;\n  width: 229px;\n  display: inline-block;\n  font-weight: bold;\n  text-align: center;\n  vertical-align: middle;\n  font-size: 22px;\n  line-height: 26px;\n  -webkit-user-select: none;\n  user-select: none;\n  border-radius: 6px;\n  cursor: pointer;\n  float: right;\n  border: none;\n  font-family: \"ralewaybold\";\n}\n.time_by_calendar[_ngcontent-%COMP%] {\n  color: #9a9a9a;\n  font-size: 17px;\n  font-weight: 500;\n  line-height: 28px;\n  font-family: \"roboto-med\";\n}\n.Custom_btn[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 600;\n  border: none;\n  border-radius: 9px;\n  height: 60px;\n  width: 323px;\n  cursor: pointer;\n}\n@media screen and (max-width: 768px) {\n  .appointment_card[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .appointment_book_card[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .appointment_bg[_ngcontent-%COMP%] {\n    min-height: auto;\n  }\n  .appointment_container[_ngcontent-%COMP%] {\n    min-height: 400px;\n  }\n  .appointment_book_card_heading[_ngcontent-%COMP%] {\n    color: gray;\n    font-size: 16px;\n    line-height: 19px;\n  }\n  .appointment_book_btn[_ngcontent-%COMP%] {\n    height: 36px;\n    width: 124px;\n    display: inline-block;\n    font-weight: bold;\n    text-align: center;\n    vertical-align: middle;\n    font-size: 14px;\n    line-height: 26px;\n    -webkit-user-select: none;\n    user-select: none;\n    border-radius: 6px;\n    cursor: pointer;\n    float: right;\n    border: none;\n  }\n  .appointment_calendar_card_heading[_ngcontent-%COMP%] {\n    color: gray;\n    font-size: 16px;\n    font-weight: bold;\n    line-height: 19px;\n  }\n  .appointment_calendar_booking_btn[_ngcontent-%COMP%] {\n    height: 36px;\n    width: 88px;\n    display: inline-block;\n    font-weight: bold;\n    text-align: center;\n    vertical-align: middle;\n    font-size: 14px;\n    line-height: 26px;\n    -webkit-user-select: none;\n    user-select: none;\n    border-radius: 6px;\n    cursor: pointer;\n    float: right;\n    border: none;\n  }\n  .time_by_calendar[_ngcontent-%COMP%] {\n    color: #9a9a9a;\n    font-size: 15px;\n    font-weight: 500;\n    line-height: 20px;\n  }\n  .appointment_calendar_card[_ngcontent-%COMP%] {\n    background-color: white;\n    border-radius: 10px;\n    margin-top: 26px;\n    width: 100%;\n  }\n  .doctor_consulted_btn[_ngcontent-%COMP%] {\n    height: 50px;\n    width: 195px;\n    display: inline-block;\n    font-weight: bold;\n    text-align: center;\n    vertical-align: middle;\n    font-size: 14px;\n    line-height: 26px;\n    -webkit-user-select: none;\n    user-select: none;\n    border-radius: 6px;\n    cursor: pointer;\n    float: right;\n    border: none;\n  }\n  .doctor_consulted_heading[_ngcontent-%COMP%] {\n    font-size: 15px;\n  }\n}\n.time_by_calendar[_ngcontent-%COMP%] {\n  margin-bottom: 15px !important;\n  line-height: 18px;\n  font-weight: 500;\n}\n.time_by_calendar[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  margin-bottom: 0px !important;\n  font-family: \"roboto-med\";\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZG9jdG9yLXBvcnRhbC9wYWdlL2FwcG9pbnRtZW50L0Y6L09GRklDRSBXT1JLL0RJR0lTQ1JJQkUvT2ZmaWNlX1Byb2plY3RzL2FwcGxpY2F0aW9uL3BhdGllbnRfcG9ydGFsL3NyYy9hcHAvZG9jdG9yLXBvcnRhbC9wYWdlL2FwcG9pbnRtZW50L2FwcG9pbnRtZW50LmNvbXBvbmVudC5sZXNzIiwic3JjL2FwcC9kb2N0b3ItcG9ydGFsL3BhZ2UvYXBwb2ludG1lbnQvYXBwb2ludG1lbnQuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBQTtFQUNBLHVCQUFBO0FDQ0Y7QURDQTtFQUNFLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7QUNDRjtBREVBO0VBQ0UsdUJBQUE7RUFDQSxhQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0FDQUY7QURFQTtFQUNFLGNBQUE7RUFDQSxZQUFBO0FDQUY7QURFQTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSwwQkFBQTtBQ0FGO0FERUE7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsNkJBQUE7QUNBRjtBREVBO0VBQ0Usa0JBQUE7RUFDQSxRQUFBO0VBQ0EsVUFBQTtBQ0FGO0FERUE7RUFDRSxXQUFBO0VBQ0EsZUFBQTtBQ0FGO0FER0E7RUFDRSx1QkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7QUNERjtBREdBO0VBQ0UsWUFBQTtFQUNBLFlBQUE7RUFDQSxxQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLHlCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtBQ0RGO0FER0E7RUFDRSxXQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsaUJBQUE7RUFDQSwwQkFBQTtBQ0RGO0FER0E7RUFDRSxZQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0VBQ0EsMEJBQUE7QUNERjtBRElBO0VBQ0UsdUJBQUE7RUFDQSxhQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0FDRkY7QURJQTtFQUNFLFdBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSwwQkFBQTtBQ0ZGO0FESUE7RUFDRSxZQUFBO0VBQ0EsWUFBQTtFQUNBLHFCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLHNCQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EseUJBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0FDRkY7QURLQTtFQUNFLHVCQUFBO0VBQ0EsaUJBQUE7RUFDQSxXQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0FDSEY7QURLQTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSwwQkFBQTtBQ0hGO0FETUE7RUFDRSxZQUFBO0VBQ0EsWUFBQTtFQUNBLHFCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLHNCQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EseUJBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EsMEJBQUE7QUNKRjtBRE1BO0VBQ0UsY0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EseUJBQUE7QUNKRjtBRE1BO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0FDSkY7QURPQTtFQUVFO0lBQ0UsV0FBQTtFQ05GO0VEU0E7SUFDRSxXQUFBO0VDUEY7RURTQTtJQUNFLGdCQUFBO0VDUEY7RURTQTtJQUNFLGlCQUFBO0VDUEY7RURTQTtJQUNFLFdBQUE7SUFDQSxlQUFBO0lBQ0EsaUJBQUE7RUNQRjtFRFNBO0lBQ0UsWUFBQTtJQUNBLFlBQUE7SUFDQSxxQkFBQTtJQUNBLGlCQUFBO0lBQ0Esa0JBQUE7SUFDQSxzQkFBQTtJQUNBLGVBQUE7SUFDQSxpQkFBQTtJQUNBLHlCQUFBO0lBQ0EsaUJBQUE7SUFDQSxrQkFBQTtJQUNBLGVBQUE7SUFDQSxZQUFBO0lBQ0EsWUFBQTtFQ1BGO0VEU0E7SUFDRSxXQUFBO0lBQ0EsZUFBQTtJQUNBLGlCQUFBO0lBQ0EsaUJBQUE7RUNQRjtFRFVBO0lBQ0UsWUFBQTtJQUNBLFdBQUE7SUFDQSxxQkFBQTtJQUNBLGlCQUFBO0lBQ0Esa0JBQUE7SUFDQSxzQkFBQTtJQUNBLGVBQUE7SUFDQSxpQkFBQTtJQUNBLHlCQUFBO0lBQ0EsaUJBQUE7SUFDQSxrQkFBQTtJQUNBLGVBQUE7SUFDQSxZQUFBO0lBQ0EsWUFBQTtFQ1JGO0VEVUE7SUFDRSxjQUFBO0lBQ0EsZUFBQTtJQUNBLGdCQUFBO0lBQ0EsaUJBQUE7RUNSRjtFRFVBO0lBQ0UsdUJBQUE7SUFFQSxtQkFBQTtJQUNBLGdCQUFBO0lBQ0EsV0FBQTtFQ1RGO0VEV0E7SUFDRSxZQUFBO0lBQ0EsWUFBQTtJQUNBLHFCQUFBO0lBQ0EsaUJBQUE7SUFDQSxrQkFBQTtJQUNBLHNCQUFBO0lBQ0EsZUFBQTtJQUNBLGlCQUFBO0lBQ0EseUJBQUE7SUFDQSxpQkFBQTtJQUNBLGtCQUFBO0lBQ0EsZUFBQTtJQUNBLFlBQUE7SUFDQSxZQUFBO0VDVEY7RURXQTtJQUNFLGVBQUE7RUNURjtBQUNGO0FEWUE7RUFDRSw4QkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7QUNWRjtBRGFBO0VBQ0UsNkJBQUE7RUFDQSx5QkFBQTtBQ1hGIiwiZmlsZSI6InNyYy9hcHAvZG9jdG9yLXBvcnRhbC9wYWdlL2FwcG9pbnRtZW50L2FwcG9pbnRtZW50LmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiLmFwcG9pbnRtZW50X2JnIHtcbiAgbWluLWhlaWdodDogYXV0bztcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG4uYXBwb2ludG1lbnRfY29udGFpbmVyIHtcbiAgbWluLWhlaWdodDogNDAwcHg7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbn1cbi8vIGFwcG9pbnRtZW50X2NhcmRcbi5hcHBvaW50bWVudF9jYXJkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIGhlaWdodDogMTQycHg7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIG1hcmdpbi10b3A6IDI2cHg7XG4gIHBhZGRpbmctbGVmdDogMTBweDtcbiAgcGFkZGluZy1yaWdodDogMTBweDtcbn1cbi5iYW5kYWdlIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbjogYXV0bztcbn1cbi5lbWVyZ2VuY3lfaGVhZGluZyB7XG4gIGNvbG9yOiAjNzA3MDcwO1xuICBmb250LXNpemU6IDI3cHg7XG4gIGxpbmUtaGVpZ2h0OiAzNHB4O1xuICBmb250LWZhbWlseTogXCJyYWxld2F5Ym9sZFwiO1xufVxuLmVtZXJnZW5jeV9zdWIge1xuICBjb2xvcjogIzcwNzA3MDtcbiAgZm9udC1zaXplOiAyMXB4O1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LWZhbWlseTogXCJyYWxld2F5cmVndWxhclwiO1xufVxuLmFycm93X2ljbyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA0MSU7XG4gIHJpZ2h0OiAwcHg7XG59XG4uYXJyb3dfaWNvIGkge1xuICBjb2xvcjogZ3JheTtcbiAgZm9udC1zaXplOiAzMHB4O1xufVxuLy8gZG9jdG9yX2NvbnN1bHRlZF9jYXJkXG4uZG9jdG9yX2NvbnN1bHRlZF9jYXJkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIG1pbi1oZWlnaHQ6IDQycHg7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIG1hcmdpbi10b3A6IDI2cHg7XG4gIHBhZGRpbmc6IDE3cHg7XG59XG4uZG9jdG9yX2NvbnN1bHRlZF9idG4ge1xuICBoZWlnaHQ6IDUwcHg7XG4gIHdpZHRoOiAxOTVweDtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBmb250LXNpemU6IDE0cHg7XG4gIGxpbmUtaGVpZ2h0OiAyNnB4O1xuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZsb2F0OiByaWdodDtcbiAgYm9yZGVyOiBub25lO1xufVxuLmRvY3Rvcl9jb25zdWx0ZWRfaGVhZGluZyB7XG4gIGNvbG9yOiBncmF5O1xuICBmb250LXNpemU6IDE2cHg7XG4gIGxpbmUtaGVpZ2h0OiAxOXB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgZm9udC1mYW1pbHk6IFwicmFsZXdheWJvbGRcIjtcbn1cbi5IZWFsdGhfUmVjb3Jkc19idG4ge1xuICBib3JkZXI6IG5vbmU7XG4gIGhlaWdodDogNTBweDtcbiAgYm9yZGVyLXJhZGl1czogMTFweDtcbiAgb3V0bGluZTogbm9uZTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtZmFtaWx5OiBcInJhbGV3YXlib2xkXCI7XG59XG4vLyBhcHBvaW50bWVudF9ib29rX2NhcmRcbi5hcHBvaW50bWVudF9ib29rX2NhcmQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgaGVpZ2h0OiAxMDFweDtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIG1hcmdpbi10b3A6IDI2cHg7XG4gIHBhZGRpbmctbGVmdDogMTNweDtcbiAgcGFkZGluZy1yaWdodDogMTNweDtcbn1cbi5hcHBvaW50bWVudF9ib29rX2NhcmRfaGVhZGluZyB7XG4gIGNvbG9yOiBncmF5O1xuICBmb250LXNpemU6IDI3cHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBmb250LWZhbWlseTogXCJyYWxld2F5Ym9sZFwiO1xufVxuLmFwcG9pbnRtZW50X2Jvb2tfYnRuIHtcbiAgaGVpZ2h0OiA2MHB4O1xuICB3aWR0aDogMjI5cHg7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgZm9udC1zaXplOiAyMnB4O1xuICBsaW5lLWhlaWdodDogMjZweDtcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmbG9hdDogcmlnaHQ7XG4gIGJvcmRlcjogbm9uZTtcbn1cbi8vIGFwcG9pbnRtZW50X0NhbGVuZGFyX2NhcmRcbi5hcHBvaW50bWVudF9jYWxlbmRhcl9jYXJkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIG1pbi1oZWlnaHQ6IDM1OXB4O1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgbWFyZ2luLXRvcDogMjZweDtcbiAgcGFkZGluZy1sZWZ0OiAxM3B4O1xuICBwYWRkaW5nLXJpZ2h0OiAxM3B4O1xuICBwYWRkaW5nLXRvcDogMTNweDtcbiAgcGFkZGluZy1ib3R0b206IDRweDtcbn1cbi5hcHBvaW50bWVudF9jYWxlbmRhcl9jYXJkX2hlYWRpbmcge1xuICBjb2xvcjogIzcwNzA3MDtcbiAgZm9udC1zaXplOiAyN3B4O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgZm9udC1mYW1pbHk6IFwicmFsZXdheWJvbGRcIjtcbn1cblxuLmFwcG9pbnRtZW50X2NhbGVuZGFyX2Jvb2tpbmdfYnRuIHtcbiAgaGVpZ2h0OiA2MHB4O1xuICB3aWR0aDogMjI5cHg7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgZm9udC1zaXplOiAyMnB4O1xuICBsaW5lLWhlaWdodDogMjZweDtcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmbG9hdDogcmlnaHQ7XG4gIGJvcmRlcjogbm9uZTtcbiAgZm9udC1mYW1pbHk6IFwicmFsZXdheWJvbGRcIjtcbn1cbi50aW1lX2J5X2NhbGVuZGFyIHtcbiAgY29sb3I6ICM5YTlhOWE7XG4gIGZvbnQtc2l6ZTogMTdweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgbGluZS1oZWlnaHQ6IDI4cHg7XG4gIGZvbnQtZmFtaWx5OiBcInJvYm90by1tZWRcIjtcbn1cbi5DdXN0b21fYnRuIHtcbiAgZm9udC1zaXplOiAyMnB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDlweDtcbiAgaGVpZ2h0OiA2MHB4O1xuICB3aWR0aDogMzIzcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgLy8gbWFpbiBwYWdlXG4gIC5hcHBvaW50bWVudF9jYXJkIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuICAvLyBhcHBvaW50bWVudF9ib29rX2NhcmRcbiAgLmFwcG9pbnRtZW50X2Jvb2tfY2FyZCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbiAgLmFwcG9pbnRtZW50X2JnIHtcbiAgICBtaW4taGVpZ2h0OiBhdXRvO1xuICB9XG4gIC5hcHBvaW50bWVudF9jb250YWluZXIge1xuICAgIG1pbi1oZWlnaHQ6IDQwMHB4O1xuICB9XG4gIC5hcHBvaW50bWVudF9ib29rX2NhcmRfaGVhZGluZyB7XG4gICAgY29sb3I6IGdyYXk7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxOXB4O1xuICB9XG4gIC5hcHBvaW50bWVudF9ib29rX2J0biB7XG4gICAgaGVpZ2h0OiAzNnB4O1xuICAgIHdpZHRoOiAxMjRweDtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGxpbmUtaGVpZ2h0OiAyNnB4O1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBmbG9hdDogcmlnaHQ7XG4gICAgYm9yZGVyOiBub25lO1xuICB9XG4gIC5hcHBvaW50bWVudF9jYWxlbmRhcl9jYXJkX2hlYWRpbmcge1xuICAgIGNvbG9yOiBncmF5O1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBsaW5lLWhlaWdodDogMTlweDtcbiAgfVxuXG4gIC5hcHBvaW50bWVudF9jYWxlbmRhcl9ib29raW5nX2J0biB7XG4gICAgaGVpZ2h0OiAzNnB4O1xuICAgIHdpZHRoOiA4OHB4O1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgbGluZS1oZWlnaHQ6IDI2cHg7XG4gICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGZsb2F0OiByaWdodDtcbiAgICBib3JkZXI6IG5vbmU7XG4gIH1cbiAgLnRpbWVfYnlfY2FsZW5kYXIge1xuICAgIGNvbG9yOiAjOWE5YTlhO1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xuICB9XG4gIC5hcHBvaW50bWVudF9jYWxlbmRhcl9jYXJkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICAvLyBoZWlnaHQ6IDI1MHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgbWFyZ2luLXRvcDogMjZweDtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuICAuZG9jdG9yX2NvbnN1bHRlZF9idG4ge1xuICAgIGhlaWdodDogNTBweDtcbiAgICB3aWR0aDogMTk1cHg7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBsaW5lLWhlaWdodDogMjZweDtcbiAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgZmxvYXQ6IHJpZ2h0O1xuICAgIGJvcmRlcjogbm9uZTtcbiAgfVxuICAuZG9jdG9yX2NvbnN1bHRlZF9oZWFkaW5nIHtcbiAgICBmb250LXNpemU6IDE1cHg7XG4gIH1cbn1cblxuLnRpbWVfYnlfY2FsZW5kYXIge1xuICBtYXJnaW4tYm90dG9tOiAxNXB4ICFpbXBvcnRhbnQ7XG4gIGxpbmUtaGVpZ2h0OiAxOHB4O1xuICBmb250LXdlaWdodDogNTAwO1xufVxuXG4udGltZV9ieV9jYWxlbmRhciA+IHAge1xuICBtYXJnaW4tYm90dG9tOiAwcHggIWltcG9ydGFudDtcbiAgZm9udC1mYW1pbHk6IFwicm9ib3RvLW1lZFwiO1xufVxuIiwiLmFwcG9pbnRtZW50X2JnIHtcbiAgbWluLWhlaWdodDogYXV0bztcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG4uYXBwb2ludG1lbnRfY29udGFpbmVyIHtcbiAgbWluLWhlaWdodDogNDAwcHg7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbn1cbi5hcHBvaW50bWVudF9jYXJkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIGhlaWdodDogMTQycHg7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIG1hcmdpbi10b3A6IDI2cHg7XG4gIHBhZGRpbmctbGVmdDogMTBweDtcbiAgcGFkZGluZy1yaWdodDogMTBweDtcbn1cbi5iYW5kYWdlIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbjogYXV0bztcbn1cbi5lbWVyZ2VuY3lfaGVhZGluZyB7XG4gIGNvbG9yOiAjNzA3MDcwO1xuICBmb250LXNpemU6IDI3cHg7XG4gIGxpbmUtaGVpZ2h0OiAzNHB4O1xuICBmb250LWZhbWlseTogXCJyYWxld2F5Ym9sZFwiO1xufVxuLmVtZXJnZW5jeV9zdWIge1xuICBjb2xvcjogIzcwNzA3MDtcbiAgZm9udC1zaXplOiAyMXB4O1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LWZhbWlseTogXCJyYWxld2F5cmVndWxhclwiO1xufVxuLmFycm93X2ljbyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA0MSU7XG4gIHJpZ2h0OiAwcHg7XG59XG4uYXJyb3dfaWNvIGkge1xuICBjb2xvcjogZ3JheTtcbiAgZm9udC1zaXplOiAzMHB4O1xufVxuLmRvY3Rvcl9jb25zdWx0ZWRfY2FyZCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBtaW4taGVpZ2h0OiA0MnB4O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBtYXJnaW4tdG9wOiAyNnB4O1xuICBwYWRkaW5nOiAxN3B4O1xufVxuLmRvY3Rvcl9jb25zdWx0ZWRfYnRuIHtcbiAgaGVpZ2h0OiA1MHB4O1xuICB3aWR0aDogMTk1cHg7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBsaW5lLWhlaWdodDogMjZweDtcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmbG9hdDogcmlnaHQ7XG4gIGJvcmRlcjogbm9uZTtcbn1cbi5kb2N0b3JfY29uc3VsdGVkX2hlYWRpbmcge1xuICBjb2xvcjogZ3JheTtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBsaW5lLWhlaWdodDogMTlweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGZvbnQtZmFtaWx5OiBcInJhbGV3YXlib2xkXCI7XG59XG4uSGVhbHRoX1JlY29yZHNfYnRuIHtcbiAgYm9yZGVyOiBub25lO1xuICBoZWlnaHQ6IDUwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDExcHg7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LWZhbWlseTogXCJyYWxld2F5Ym9sZFwiO1xufVxuLmFwcG9pbnRtZW50X2Jvb2tfY2FyZCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBoZWlnaHQ6IDEwMXB4O1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgbWFyZ2luLXRvcDogMjZweDtcbiAgcGFkZGluZy1sZWZ0OiAxM3B4O1xuICBwYWRkaW5nLXJpZ2h0OiAxM3B4O1xufVxuLmFwcG9pbnRtZW50X2Jvb2tfY2FyZF9oZWFkaW5nIHtcbiAgY29sb3I6IGdyYXk7XG4gIGZvbnQtc2l6ZTogMjdweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGZvbnQtZmFtaWx5OiBcInJhbGV3YXlib2xkXCI7XG59XG4uYXBwb2ludG1lbnRfYm9va19idG4ge1xuICBoZWlnaHQ6IDYwcHg7XG4gIHdpZHRoOiAyMjlweDtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBmb250LXNpemU6IDIycHg7XG4gIGxpbmUtaGVpZ2h0OiAyNnB4O1xuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZsb2F0OiByaWdodDtcbiAgYm9yZGVyOiBub25lO1xufVxuLmFwcG9pbnRtZW50X2NhbGVuZGFyX2NhcmQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgbWluLWhlaWdodDogMzU5cHg7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBtYXJnaW4tdG9wOiAyNnB4O1xuICBwYWRkaW5nLWxlZnQ6IDEzcHg7XG4gIHBhZGRpbmctcmlnaHQ6IDEzcHg7XG4gIHBhZGRpbmctdG9wOiAxM3B4O1xuICBwYWRkaW5nLWJvdHRvbTogNHB4O1xufVxuLmFwcG9pbnRtZW50X2NhbGVuZGFyX2NhcmRfaGVhZGluZyB7XG4gIGNvbG9yOiAjNzA3MDcwO1xuICBmb250LXNpemU6IDI3cHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBmb250LWZhbWlseTogXCJyYWxld2F5Ym9sZFwiO1xufVxuLmFwcG9pbnRtZW50X2NhbGVuZGFyX2Jvb2tpbmdfYnRuIHtcbiAgaGVpZ2h0OiA2MHB4O1xuICB3aWR0aDogMjI5cHg7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgZm9udC1zaXplOiAyMnB4O1xuICBsaW5lLWhlaWdodDogMjZweDtcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmbG9hdDogcmlnaHQ7XG4gIGJvcmRlcjogbm9uZTtcbiAgZm9udC1mYW1pbHk6IFwicmFsZXdheWJvbGRcIjtcbn1cbi50aW1lX2J5X2NhbGVuZGFyIHtcbiAgY29sb3I6ICM5YTlhOWE7XG4gIGZvbnQtc2l6ZTogMTdweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgbGluZS1oZWlnaHQ6IDI4cHg7XG4gIGZvbnQtZmFtaWx5OiBcInJvYm90by1tZWRcIjtcbn1cbi5DdXN0b21fYnRuIHtcbiAgZm9udC1zaXplOiAyMnB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDlweDtcbiAgaGVpZ2h0OiA2MHB4O1xuICB3aWR0aDogMzIzcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5hcHBvaW50bWVudF9jYXJkIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuICAuYXBwb2ludG1lbnRfYm9va19jYXJkIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuICAuYXBwb2ludG1lbnRfYmcge1xuICAgIG1pbi1oZWlnaHQ6IGF1dG87XG4gIH1cbiAgLmFwcG9pbnRtZW50X2NvbnRhaW5lciB7XG4gICAgbWluLWhlaWdodDogNDAwcHg7XG4gIH1cbiAgLmFwcG9pbnRtZW50X2Jvb2tfY2FyZF9oZWFkaW5nIHtcbiAgICBjb2xvcjogZ3JheTtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgbGluZS1oZWlnaHQ6IDE5cHg7XG4gIH1cbiAgLmFwcG9pbnRtZW50X2Jvb2tfYnRuIHtcbiAgICBoZWlnaHQ6IDM2cHg7XG4gICAgd2lkdGg6IDEyNHB4O1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgbGluZS1oZWlnaHQ6IDI2cHg7XG4gICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGZsb2F0OiByaWdodDtcbiAgICBib3JkZXI6IG5vbmU7XG4gIH1cbiAgLmFwcG9pbnRtZW50X2NhbGVuZGFyX2NhcmRfaGVhZGluZyB7XG4gICAgY29sb3I6IGdyYXk7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGxpbmUtaGVpZ2h0OiAxOXB4O1xuICB9XG4gIC5hcHBvaW50bWVudF9jYWxlbmRhcl9ib29raW5nX2J0biB7XG4gICAgaGVpZ2h0OiAzNnB4O1xuICAgIHdpZHRoOiA4OHB4O1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgbGluZS1oZWlnaHQ6IDI2cHg7XG4gICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGZsb2F0OiByaWdodDtcbiAgICBib3JkZXI6IG5vbmU7XG4gIH1cbiAgLnRpbWVfYnlfY2FsZW5kYXIge1xuICAgIGNvbG9yOiAjOWE5YTlhO1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xuICB9XG4gIC5hcHBvaW50bWVudF9jYWxlbmRhcl9jYXJkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIG1hcmdpbi10b3A6IDI2cHg7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbiAgLmRvY3Rvcl9jb25zdWx0ZWRfYnRuIHtcbiAgICBoZWlnaHQ6IDUwcHg7XG4gICAgd2lkdGg6IDE5NXB4O1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgbGluZS1oZWlnaHQ6IDI2cHg7XG4gICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGZsb2F0OiByaWdodDtcbiAgICBib3JkZXI6IG5vbmU7XG4gIH1cbiAgLmRvY3Rvcl9jb25zdWx0ZWRfaGVhZGluZyB7XG4gICAgZm9udC1zaXplOiAxNXB4O1xuICB9XG59XG4udGltZV9ieV9jYWxlbmRhciB7XG4gIG1hcmdpbi1ib3R0b206IDE1cHggIWltcG9ydGFudDtcbiAgbGluZS1oZWlnaHQ6IDE4cHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG4udGltZV9ieV9jYWxlbmRhciA+IHAge1xuICBtYXJnaW4tYm90dG9tOiAwcHggIWltcG9ydGFudDtcbiAgZm9udC1mYW1pbHk6IFwicm9ib3RvLW1lZFwiO1xufVxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppointmentComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-appointment',
                templateUrl: './appointment.component.html',
                styleUrls: ['./appointment.component.less']
            }]
    }], function () { return [{ type: src_app_shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_2__["MediaControlService"] }, { type: src_app_shared_UI_service_custom_icons_service__WEBPACK_IMPORTED_MODULE_3__["CustomIconsService"] }]; }, { clinics: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], open: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/doctor-portal/page/clinic-location/clinic-location.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/doctor-portal/page/clinic-location/clinic-location.component.ts ***!
  \*********************************************************************************/
/*! exports provided: ClinicLocationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClinicLocationComponent", function() { return ClinicLocationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/UI_service/media-control.service */ "./src/app/shared/UI_service/media-control.service.ts");
/* harmony import */ var ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng-zorro-antd/grid */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-grid.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var ng_zorro_antd_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-zorro-antd/button */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-button.js");
/* harmony import */ var ng_zorro_antd_core_wave__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng-zorro-antd/core/wave */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-core-wave.js");
/* harmony import */ var ng_zorro_antd_core_transition_patch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng-zorro-antd/core/transition-patch */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-core-transition-patch.js");
/* harmony import */ var ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng-zorro-antd/icon */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-icon.js");
/* harmony import */ var ng_zorro_antd_tag__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng-zorro-antd/tag */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-tag.js");










function ClinicLocationComponent_ng_container_5_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "iframe", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ClinicLocationComponent_ng_container_5_h2_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h2", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate4"](" ", item_r1.address_line_1, " ", item_r1.address_line_2, " ", item_r1.city, ", ", item_r1.pincode, " ");
} }
function ClinicLocationComponent_ng_container_5_h2_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h2", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const time_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", time_r7.days, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](time_r7.timings);
} }
function ClinicLocationComponent_ng_container_5_ng_template_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "\u00A0\u00A0Click for direction ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate2"]("href", "https://www.google.com/maps?q=", item_r1.lat, ",", item_r1.long, "", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
} }
const _c0 = function () { return { span: 24 }; };
const _c1 = function () { return { span: 8 }; };
const _c2 = function (a0, a1) { return { "app_shadow_b": a0, "border-b": a1 }; };
const _c3 = function () { return { "row_rev": false }; };
const _c4 = function (a1) { return { span: 24, "border-b": a1 }; };
function ClinicLocationComponent_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, ClinicLocationComponent_ng_container_5_div_3_Template, 2, 0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "nz-tag", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "i", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "h2", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, ClinicLocationComponent_ng_container_5_h2_14_Template, 3, 4, "h2", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "h2", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "img", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, ClinicLocationComponent_ng_container_5_h2_18_Template, 5, 2, "h2", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, ClinicLocationComponent_ng_container_5_ng_template_19_Template, 4, 2, "ng-template", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](13, _c0))("nzLg", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](14, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](15, _c2, !ctx_r0.thisDevice, ctx_r0.thisDevice));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r0.thisDevice);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](18, _c3));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](19, _c0))("nzLg", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](20, _c4, ctx_r0.thisDevice));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", item_r1.isVirtualClinic && item_r1.isVirtualClinic === true ? "Online-Consult" : "Clinic-Visit", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", item_r1.doc_clinic_name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", item_r1.address_line_1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", item_r1.doc_clinic_phone, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", item_r1 == null ? null : item_r1.clinicTimings);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", item_r1.lat != "" && item_r1.long != "" && item_r1.lat != "0.0");
} }
class ClinicLocationComponent {
    constructor(_viewMedia) {
        this._viewMedia = _viewMedia;
    }
    ngOnInit() {
    }
    ngAfterContentChecked() {
        this.thisDevice = this._viewMedia.mediaPort();
    }
}
ClinicLocationComponent.ɵfac = function ClinicLocationComponent_Factory(t) { return new (t || ClinicLocationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_1__["MediaControlService"])); };
ClinicLocationComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ClinicLocationComponent, selectors: [["app-clinic-location"]], inputs: { clinics: "clinics" }, decls: 11, vars: 3, consts: [[1, "location_page", "page_p_y"], [1, "location_container"], [1, "app_dashboard_heading"], ["nz-row", "", 1, "page_y"], [4, "ngFor", "ngForOf"], ["nz-row", ""], ["nz-col", "", 3, "nzXs"], ["nz-button", "", "nzType", "primary", 1, "float_right"], ["nz-icon", "", "nzType", "right", "nzTheme", "outline"], ["nz-col", "", 1, "card_container", 3, "nzXs", "nzLg"], [1, "location_card", 3, "ngClass"], ["class", "card_map", 4, "ngIf"], [1, "card_content"], ["nz-row", "", 3, "ngClass"], ["nz-col", "", 3, "nzXs", "nzLg"], [2, "text-align", "end"], ["nzColor", "#2db7f5", 1, "rounded", "fix_bottom"], ["nz-icon", "", "nzType", "info-circle"], [1, "card_data"], ["class", "card_data mt-2", 4, "ngIf"], [1, "card_data", "mt-1"], ["src", "assets/icon/phone-call.svg", "width", "15", "alt", ""], ["class", "clinic_day_time mt-2", 4, "ngFor", "ngForOf"], [3, "ngIf"], [1, "card_map"], ["src", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4582816.0441649305!2d72.44234849426877!3d23.59652146295064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDMwJzM0LjgiTiA3NcKwNDMnMjMuOCJF!5e0!3m2!1sen!2sin!4v1609488939678!5m2!1sen!2sin", "width", "100%", "height", "265px", "frameborder", "0", "allowfullscreen", "", 2, "border", "0"], [1, "card_data", "mt-2"], ["src", "assets/icon/pin.svg", "width", "15", "alt", ""], [1, "clinic_day_time", "mt-2"], [1, "day"], [1, "time"], [1, "direction_link", "p-2"], ["target", "_blank", 3, "href"], ["src", "assets/icon/direction.svg", "width", "15px", "alt", ""]], template: function ClinicLocationComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h2", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Clinic Location");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, ClinicLocationComponent_ng_container_5_Template, 20, 22, "ng-container", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " load more ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "i", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.clinics);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](2, _c0));
    } }, directives: [ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_2__["NzRowDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_2__["NzColDirective"], ng_zorro_antd_button__WEBPACK_IMPORTED_MODULE_4__["NzButtonComponent"], ng_zorro_antd_core_wave__WEBPACK_IMPORTED_MODULE_5__["NzWaveDirective"], ng_zorro_antd_core_transition_patch__WEBPACK_IMPORTED_MODULE_6__["ɵNzTransitionPatchDirective"], ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_7__["NzIconDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgClass"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], ng_zorro_antd_tag__WEBPACK_IMPORTED_MODULE_8__["NzTagComponent"]], styles: [".location_page[_ngcontent-%COMP%] {\n  min-height: auto;\n  background-color: white;\n  padding-bottom: 20px;\n}\n.location_container[_ngcontent-%COMP%] {\n  padding-top: 20px;\n}\n.location_card[_ngcontent-%COMP%] {\n  border-radius: 0px 0px 10px 10px;\n}\n.location_card[_ngcontent-%COMP%]   .card_content[_ngcontent-%COMP%] {\n  min-height: 257px;\n  padding: 13px;\n}\n.location_card[_ngcontent-%COMP%]   .card_map[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%] {\n  border-radius: 10px 10px 0px 0px;\n}\n.card_data[_ngcontent-%COMP%] {\n  color: #707070;\n  font-size: 15px;\n  font-family: \"hel-bold\";\n}\n.card_footer[_ngcontent-%COMP%] {\n  min-height: 45px;\n}\n.card_footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  font-size: 16px;\n  text-decoration: underline;\n}\n.card_container[_ngcontent-%COMP%] {\n  padding: 0px 20px 0px 20px;\n}\n.border-b[_ngcontent-%COMP%] {\n  border: 1px solid #c4c2c2;\n}\n.clinic_day_time[_ngcontent-%COMP%]   .day[_ngcontent-%COMP%] {\n  color: #303061;\n  font-size: 15px;\n  font-family: \"hel-bold\";\n}\n.clinic_day_time[_ngcontent-%COMP%]   .time[_ngcontent-%COMP%] {\n  color: #707070;\n  font-size: 15px;\n  display: block;\n  font-family: \"hel-bold\";\n}\n.direction_link[_ngcontent-%COMP%] {\n  background-color: #eaecec;\n  border-radius: 0px 0px 10px 10px;\n}\n.direction_link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: block;\n  text-align: center;\n}\nnz-tag[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n@media screen and (max-width: 768px) {\n  .border-b[_ngcontent-%COMP%] {\n    margin-top: 12px;\n    box-shadow: 0px 2px 6px -1px rgba(0, 0, 0, 0.49) !important;\n    border: none;\n    border-radius: 3px !important;\n  }\n  .location_heading[_ngcontent-%COMP%] {\n    text-align: start;\n    font-size: 28px;\n    padding-left: 21px;\n  }\n  .location_card[_ngcontent-%COMP%] {\n    padding-bottom: 0px;\n    border-radius: 0px 0px 0px 0px;\n  }\n  .card_container[_ngcontent-%COMP%] {\n    border-radius: 0px 0px 12px 12px;\n    padding: 0px 0px 0px 0px;\n  }\n  .location_card[_ngcontent-%COMP%]   .card_content[_ngcontent-%COMP%] {\n    height: auto;\n    padding: 13px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZG9jdG9yLXBvcnRhbC9wYWdlL2NsaW5pYy1sb2NhdGlvbi9GOi9PRkZJQ0UgV09SSy9ESUdJU0NSSUJFL09mZmljZV9Qcm9qZWN0cy9hcHBsaWNhdGlvbi9wYXRpZW50X3BvcnRhbC9zcmMvYXBwL2RvY3Rvci1wb3J0YWwvcGFnZS9jbGluaWMtbG9jYXRpb24vY2xpbmljLWxvY2F0aW9uLmNvbXBvbmVudC5sZXNzIiwic3JjL2FwcC9kb2N0b3ItcG9ydGFsL3BhZ2UvY2xpbmljLWxvY2F0aW9uL2NsaW5pYy1sb2NhdGlvbi5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFBO0VBQ0EsdUJBQUE7RUFDQSxvQkFBQTtBQ0NGO0FEQ0E7RUFDRSxpQkFBQTtBQ0NGO0FERUE7RUFDRSxnQ0FBQTtBQ0FGO0FERUE7RUFDRSxpQkFBQTtFQUNBLGFBQUE7QUNBRjtBREVBO0VBQ0UsZ0NBQUE7QUNBRjtBREVBO0VBQ0UsY0FBQTtFQUNBLGVBQUE7RUFDQSx1QkFBQTtBQ0FGO0FERUE7RUFDRSxnQkFBQTtBQ0FGO0FERUE7RUFDRSxlQUFBO0VBQ0EsMEJBQUE7QUNBRjtBREVBO0VBQ0UsMEJBQUE7QUNBRjtBREVBO0VBQ0UseUJBQUE7QUNBRjtBREVBO0VBQ0UsY0FBQTtFQUNBLGVBQUE7RUFDQSx1QkFBQTtBQ0FGO0FERUE7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7RUFDQSx1QkFBQTtBQ0FGO0FERUE7RUFDRSx5QkFBQTtFQUNBLGdDQUFBO0FDQUY7QURFQTtFQUNFLGNBQUE7RUFDQSxrQkFBQTtBQ0FGO0FERUE7RUFDRSxlQUFBO0FDQUY7QURFQTtFQUNFO0lBQ0UsZ0JBQUE7SUFDQSwyREFBQTtJQUNBLFlBQUE7SUFDQSw2QkFBQTtFQ0FGO0VERUE7SUFDRSxpQkFBQTtJQUNBLGVBQUE7SUFDQSxrQkFBQTtFQ0FGO0VERUE7SUFDRSxtQkFBQTtJQUNBLDhCQUFBO0VDQUY7RURFQTtJQUNFLGdDQUFBO0lBQ0Esd0JBQUE7RUNBRjtFREVBO0lBQ0UsWUFBQTtJQUNBLGFBQUE7RUNBRjtBQUNGIiwiZmlsZSI6InNyYy9hcHAvZG9jdG9yLXBvcnRhbC9wYWdlL2NsaW5pYy1sb2NhdGlvbi9jbGluaWMtbG9jYXRpb24uY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubG9jYXRpb25fcGFnZSB7XG4gIG1pbi1oZWlnaHQ6IGF1dG87XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBwYWRkaW5nLWJvdHRvbTogMjBweDtcbn1cbi5sb2NhdGlvbl9jb250YWluZXIge1xuICBwYWRkaW5nLXRvcDogMjBweDtcbn1cbi8vbG9jYXRpb25fY2FyZFxuLmxvY2F0aW9uX2NhcmQge1xuICBib3JkZXItcmFkaXVzOiAwcHggMHB4IDEwcHggMTBweDtcbn1cbi5sb2NhdGlvbl9jYXJkIC5jYXJkX2NvbnRlbnQge1xuICBtaW4taGVpZ2h0OiAyNTdweDtcbiAgcGFkZGluZzogMTNweDtcbn1cbi5sb2NhdGlvbl9jYXJkIC5jYXJkX21hcCBpZnJhbWUge1xuICBib3JkZXItcmFkaXVzOiAxMHB4IDEwcHggMHB4IDBweDtcbn1cbi5jYXJkX2RhdGEge1xuICBjb2xvcjogIzcwNzA3MDtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBmb250LWZhbWlseTogXCJoZWwtYm9sZFwiO1xufVxuLmNhcmRfZm9vdGVyIHtcbiAgbWluLWhlaWdodDogNDVweDtcbn1cbi5jYXJkX2Zvb3RlciBhIHtcbiAgZm9udC1zaXplOiAxNnB4O1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbn1cbi5jYXJkX2NvbnRhaW5lciB7XG4gIHBhZGRpbmc6IDBweCAyMHB4IDBweCAyMHB4O1xufVxuLmJvcmRlci1iIHtcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiKDE5NiwgMTk0LCAxOTQpO1xufVxuLmNsaW5pY19kYXlfdGltZSAuZGF5IHtcbiAgY29sb3I6ICMzMDMwNjE7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgZm9udC1mYW1pbHk6IFwiaGVsLWJvbGRcIjtcbn1cbi5jbGluaWNfZGF5X3RpbWUgLnRpbWUge1xuICBjb2xvcjogIzcwNzA3MDtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBkaXNwbGF5OiBibG9jaztcbiAgZm9udC1mYW1pbHk6IFwiaGVsLWJvbGRcIjtcbn1cbi5kaXJlY3Rpb25fbGluayB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyMzQsIDIzNiwgMjM2KTtcbiAgYm9yZGVyLXJhZGl1czogMHB4IDBweCAxMHB4IDEwcHg7XG59XG4uZGlyZWN0aW9uX2xpbmsgYSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5uei10YWcge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweCkge1xuICAuYm9yZGVyLWIge1xuICAgIG1hcmdpbi10b3A6IDEycHg7XG4gICAgYm94LXNoYWRvdzogMHB4IDJweCA2cHggLTFweCByZ2JhKDAsIDAsIDAsIDAuNDkpICFpbXBvcnRhbnQ7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGJvcmRlci1yYWRpdXM6IDNweCAhaW1wb3J0YW50O1xuICB9XG4gIC5sb2NhdGlvbl9oZWFkaW5nIHtcbiAgICB0ZXh0LWFsaWduOiBzdGFydDtcbiAgICBmb250LXNpemU6IDI4cHg7XG4gICAgcGFkZGluZy1sZWZ0OiAyMXB4O1xuICB9XG4gIC5sb2NhdGlvbl9jYXJkIHtcbiAgICBwYWRkaW5nLWJvdHRvbTogMHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDBweCAwcHggMHB4IDBweDtcbiAgfVxuICAuY2FyZF9jb250YWluZXIge1xuICAgIGJvcmRlci1yYWRpdXM6IDBweCAwcHggMTJweCAxMnB4O1xuICAgIHBhZGRpbmc6IDBweCAwcHggMHB4IDBweDtcbiAgfVxuICAubG9jYXRpb25fY2FyZCAuY2FyZF9jb250ZW50IHtcbiAgICBoZWlnaHQ6IGF1dG87XG4gICAgcGFkZGluZzogMTNweDtcbiAgfVxufVxuIiwiLmxvY2F0aW9uX3BhZ2Uge1xuICBtaW4taGVpZ2h0OiBhdXRvO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgcGFkZGluZy1ib3R0b206IDIwcHg7XG59XG4ubG9jYXRpb25fY29udGFpbmVyIHtcbiAgcGFkZGluZy10b3A6IDIwcHg7XG59XG4ubG9jYXRpb25fY2FyZCB7XG4gIGJvcmRlci1yYWRpdXM6IDBweCAwcHggMTBweCAxMHB4O1xufVxuLmxvY2F0aW9uX2NhcmQgLmNhcmRfY29udGVudCB7XG4gIG1pbi1oZWlnaHQ6IDI1N3B4O1xuICBwYWRkaW5nOiAxM3B4O1xufVxuLmxvY2F0aW9uX2NhcmQgLmNhcmRfbWFwIGlmcmFtZSB7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHggMTBweCAwcHggMHB4O1xufVxuLmNhcmRfZGF0YSB7XG4gIGNvbG9yOiAjNzA3MDcwO1xuICBmb250LXNpemU6IDE1cHg7XG4gIGZvbnQtZmFtaWx5OiBcImhlbC1ib2xkXCI7XG59XG4uY2FyZF9mb290ZXIge1xuICBtaW4taGVpZ2h0OiA0NXB4O1xufVxuLmNhcmRfZm9vdGVyIGEge1xuICBmb250LXNpemU6IDE2cHg7XG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xufVxuLmNhcmRfY29udGFpbmVyIHtcbiAgcGFkZGluZzogMHB4IDIwcHggMHB4IDIwcHg7XG59XG4uYm9yZGVyLWIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjYzRjMmMyO1xufVxuLmNsaW5pY19kYXlfdGltZSAuZGF5IHtcbiAgY29sb3I6ICMzMDMwNjE7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgZm9udC1mYW1pbHk6IFwiaGVsLWJvbGRcIjtcbn1cbi5jbGluaWNfZGF5X3RpbWUgLnRpbWUge1xuICBjb2xvcjogIzcwNzA3MDtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBkaXNwbGF5OiBibG9jaztcbiAgZm9udC1mYW1pbHk6IFwiaGVsLWJvbGRcIjtcbn1cbi5kaXJlY3Rpb25fbGluayB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlYWVjZWM7XG4gIGJvcmRlci1yYWRpdXM6IDBweCAwcHggMTBweCAxMHB4O1xufVxuLmRpcmVjdGlvbl9saW5rIGEge1xuICBkaXNwbGF5OiBibG9jaztcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxubnotdGFnIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgLmJvcmRlci1iIHtcbiAgICBtYXJnaW4tdG9wOiAxMnB4O1xuICAgIGJveC1zaGFkb3c6IDBweCAycHggNnB4IC0xcHggcmdiYSgwLCAwLCAwLCAwLjQ5KSAhaW1wb3J0YW50O1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBib3JkZXItcmFkaXVzOiAzcHggIWltcG9ydGFudDtcbiAgfVxuICAubG9jYXRpb25faGVhZGluZyB7XG4gICAgdGV4dC1hbGlnbjogc3RhcnQ7XG4gICAgZm9udC1zaXplOiAyOHB4O1xuICAgIHBhZGRpbmctbGVmdDogMjFweDtcbiAgfVxuICAubG9jYXRpb25fY2FyZCB7XG4gICAgcGFkZGluZy1ib3R0b206IDBweDtcbiAgICBib3JkZXItcmFkaXVzOiAwcHggMHB4IDBweCAwcHg7XG4gIH1cbiAgLmNhcmRfY29udGFpbmVyIHtcbiAgICBib3JkZXItcmFkaXVzOiAwcHggMHB4IDEycHggMTJweDtcbiAgICBwYWRkaW5nOiAwcHggMHB4IDBweCAwcHg7XG4gIH1cbiAgLmxvY2F0aW9uX2NhcmQgLmNhcmRfY29udGVudCB7XG4gICAgaGVpZ2h0OiBhdXRvO1xuICAgIHBhZGRpbmc6IDEzcHg7XG4gIH1cbn1cbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ClinicLocationComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-clinic-location',
                templateUrl: './clinic-location.component.html',
                styleUrls: ['./clinic-location.component.less']
            }]
    }], function () { return [{ type: _shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_1__["MediaControlService"] }]; }, { clinics: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/doctor-portal/page/dr-home/dr-home.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/doctor-portal/page/dr-home/dr-home.component.ts ***!
  \*****************************************************************/
/*! exports provided: DrHomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrHomeComponent", function() { return DrHomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_shared_icon_custom_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/icon/custom-icon */ "./src/app/shared/icon/custom-icon.ts");
/* harmony import */ var src_app_shared_UI_service_custom_icons_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/UI_service/custom-icons.service */ "./src/app/shared/UI_service/custom-icons.service.ts");
/* harmony import */ var src_app_shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/UI_service/media-control.service */ "./src/app/shared/UI_service/media-control.service.ts");
/* harmony import */ var _services_doctor_service_doctor_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/doctor-service/doctor.service */ "./src/app/services/doctor-service/doctor.service.ts");
/* harmony import */ var ng_zorro_antd_carousel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng-zorro-antd/carousel */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-carousel.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var ng_zorro_antd_core_transition_patch__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng-zorro-antd/core/transition-patch */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-core-transition-patch.js");
/* harmony import */ var ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ng-zorro-antd/icon */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-icon.js");
/* harmony import */ var ng_zorro_antd_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ng-zorro-antd/button */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-button.js");
/* harmony import */ var ng_zorro_antd_core_wave__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ng-zorro-antd/core/wave */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-core-wave.js");













function DrHomeComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const slide_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMapInterpolate1"]("background-image: url(", slide_r3, ");");
} }
const _c0 = function () { return ["../dashboard/Your-Appointments"]; };
function DrHomeComponent_button_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "i", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "\u00A0\u00A0\u00A0Book Appointment");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](2, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("innerHTML", ctx_r1.bookAppointment, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeHtml"]);
} }
function DrHomeComponent_button_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "\u00A0 Book Appointment");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](2, _c0))("nzSize", "large");
} }
class DrHomeComponent {
    constructor(_IconsService, _viewMedia, cdf, doctorService) {
        this._IconsService = _IconsService;
        this._viewMedia = _viewMedia;
        this.cdf = cdf;
        this.doctorService = doctorService;
        this.slides = [
            'https://assets.lemonaidhealth.com/web/brochure/images/covid-19/taking-blood-desktop.svg',
            'https://miro.medium.com/max/2560/1*-qZGJe4dD5TouvYTOrRXog.png',
            'https://previews.123rf.com/images/nonwarit/nonwarit1712/nonwarit171200012/91479551-close-up-view-of-female-doctor-hands-filling-patient-registration-form-healthcare-and-medical-concep.jpg',
            'https://images.axios.com/Y_aLXhKjql7lEr3VZWKz-523u8c=/0x0:5568x3132/1920x1080/2020/03/13/1584109130876.jpg',
        ];
        this.bookAppointment = this._IconsService.setIcon(src_app_shared_icon_custom_icon__WEBPACK_IMPORTED_MODULE_1__["allIcons"].bookAppointment);
    }
    ngOnInit() {
        this.landingPageDataObservable = this.doctorService.data$.subscribe((data) => {
            this.handleLandingPageData(data);
        });
    }
    handleLandingPageData(d) {
        const doctorCms = d.doctorCMS;
        if (doctorCms && doctorCms.landingPageImages.length > 0) {
            this.slides = doctorCms.landingPageImages;
            this.cdf.detectChanges();
        }
    }
    ngAfterContentChecked() {
        this.smDevice();
    }
    smDevice() {
        this.eledevice = this._viewMedia.mediaPort();
    }
}
DrHomeComponent.ɵfac = function DrHomeComponent_Factory(t) { return new (t || DrHomeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_UI_service_custom_icons_service__WEBPACK_IMPORTED_MODULE_2__["CustomIconsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_3__["MediaControlService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_doctor_service_doctor_service__WEBPACK_IMPORTED_MODULE_4__["DoctorService"])); };
DrHomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DrHomeComponent, selectors: [["app-dr-home"]], decls: 14, vars: 3, consts: [[1, "home_page"], ["nzAutoPlay", ""], [4, "ngFor", "ngForOf"], [1, "home_appointment"], [1, "home_appointment_content", "center_f_y"], [1, "noselect", 2, "font-family", "ralewaybold"], ["class", "btn_primary Custom_btn noselect", 3, "routerLink", 4, "ngIf"], ["nz-button", "", "class", "btn_primary float_right mr-2", 3, "routerLink", "nzSize", 4, "ngIf"], ["nz-carousel-content", "", 1, "slides"], [1, "btn_primary", "Custom_btn", "noselect", 3, "routerLink"], ["nz-icon", "", 3, "innerHTML"], ["nz-button", "", 1, "btn_primary", "float_right", "mr-2", 3, "routerLink", "nzSize"], ["src", "assets/img/home/Image 5.svg", "alt", "", 1, "nz_ico"]], template: function DrHomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "nz-carousel", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, DrHomeComponent_ng_container_2_Template, 2, 3, "ng-container", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "h1", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " Would you like to ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " Book an appointment with us? ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, DrHomeComponent_button_10_Template, 3, 3, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, DrHomeComponent_button_11_Template, 3, 3, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.slides);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.eledevice);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.eledevice);
    } }, directives: [ng_zorro_antd_carousel__WEBPACK_IMPORTED_MODULE_5__["NzCarouselComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], ng_zorro_antd_carousel__WEBPACK_IMPORTED_MODULE_5__["NzCarouselContentDirective"], _angular_router__WEBPACK_IMPORTED_MODULE_7__["RouterLink"], ng_zorro_antd_core_transition_patch__WEBPACK_IMPORTED_MODULE_8__["ɵNzTransitionPatchDirective"], ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_9__["NzIconDirective"], ng_zorro_antd_button__WEBPACK_IMPORTED_MODULE_10__["NzButtonComponent"], ng_zorro_antd_core_wave__WEBPACK_IMPORTED_MODULE_11__["NzWaveDirective"]], styles: [".home_page[_ngcontent-%COMP%] {\n  position: relative;\n}\n[nz-carousel-content][_ngcontent-%COMP%] {\n  text-align: center;\n  min-height: 100vh !important;\n  color: #fff;\n  background-size: cover;\n  background-position: center center;\n  background-repeat: no-repeat;\n}\nh3[_ngcontent-%COMP%] {\n  color: #fff;\n  margin-bottom: 0;\n}\n.ant-carousel[_ngcontent-%COMP%]   .slick-dots[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 16px !important;\n  height: 16px !important;\n}\n.home_appointment[_ngcontent-%COMP%] {\n  width: 100%;\n  background-color: rgba(0, 0, 0, 0.3);\n  position: absolute;\n  bottom: 0;\n  left: 0;\n}\n.home_appointment_content[_ngcontent-%COMP%] {\n  height: 375px;\n  width: 100%;\n  padding-left: 53px;\n}\n.home_appointment_content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  color: white;\n  font-size: 48px;\n  line-height: 56px;\n  margin-bottom: 31px;\n}\n.home_appointment_content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%] {\n  width: 323px;\n  height: 60px;\n  font-size: 22px;\n  font-weight: bold;\n  border-radius: 6px;\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-user-select: none;\n  user-select: none;\n  cursor: pointer;\n  border: none;\n}\n.home_appointment_content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-weight: 700;\n}\n.Custom_btn[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 600;\n  border: none;\n  border-radius: 9px;\n  height: 60px;\n  width: 323px;\n  cursor: pointer;\n  font-family: \"ralewaybold\";\n}\n.nz_ico[_ngcontent-%COMP%] {\n  position: relative;\n  top: 1px;\n}\n@media screen and (max-width: 768px) {\n  .home_appointment_content[_ngcontent-%COMP%] {\n    width: 100%;\n    padding-left: 13px;\n    height: 206px;\n  }\n  .home_appointment_content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .home_appointment_content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 22px;\n    line-height: 26px;\n    margin-bottom: 17px;\n  }\n  .home_appointment_content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%] {\n    width: 186px;\n    height: 36px;\n    font-size: 14px;\n    font-weight: bold;\n    border-radius: 6px;\n    display: inline-block;\n    vertical-align: middle;\n    -webkit-user-select: none;\n    user-select: none;\n    cursor: pointer;\n    border: none;\n    float: right;\n  }\n  .home_page[_ngcontent-%COMP%] {\n    height: 70vh;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZG9jdG9yLXBvcnRhbC9wYWdlL2RyLWhvbWUvRjovT0ZGSUNFIFdPUksvRElHSVNDUklCRS9PZmZpY2VfUHJvamVjdHMvYXBwbGljYXRpb24vcGF0aWVudF9wb3J0YWwvc3JjL2FwcC9kb2N0b3ItcG9ydGFsL3BhZ2UvZHItaG9tZS9kci1ob21lLmNvbXBvbmVudC5sZXNzIiwic3JjL2FwcC9kb2N0b3ItcG9ydGFsL3BhZ2UvZHItaG9tZS9kci1ob21lLmNvbXBvbmVudC5sZXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQUE7QUNDRjtBRENBO0VBQ0Usa0JBQUE7RUFDQSw0QkFBQTtFQUNBLFdBQUE7RUFDQSxzQkFBQTtFQUNBLGtDQUFBO0VBQ0EsNEJBQUE7QUNDRjtBREVBO0VBQ0UsV0FBQTtFQUNBLGdCQUFBO0FDQUY7QURJQTtFQUNFLHNCQUFBO0VBQ0EsdUJBQUE7QUNGRjtBRElBO0VBQ0UsV0FBQTtFQUNBLG9DQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0VBQ0EsT0FBQTtBQ0ZGO0FESUE7RUFDRSxhQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0FDRkY7QURJQTtFQUNFLFlBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtBQ0ZGO0FESUE7RUFDRSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBR0EsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtBQ0ZGO0FESUE7RUFDRSxnQkFBQTtBQ0ZGO0FESUE7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSwwQkFBQTtBQ0ZGO0FESUE7RUFDRSxrQkFBQTtFQUNBLFFBQUE7QUNGRjtBRElBO0VBQ0U7SUFDRSxXQUFBO0lBQ0Esa0JBQUE7SUFDQSxhQUFBO0VDRkY7RURJQTtJQUNFLFdBQUE7RUNGRjtFRElBO0lBQ0UsZUFBQTtJQUNBLGlCQUFBO0lBQ0EsbUJBQUE7RUNGRjtFRElBO0lBQ0UsWUFBQTtJQUNBLFlBQUE7SUFDQSxlQUFBO0lBQ0EsaUJBQUE7SUFDQSxrQkFBQTtJQUNBLHFCQUFBO0lBQ0Esc0JBQUE7SUFDQSx5QkFBQTtJQUdBLGlCQUFBO0lBQ0EsZUFBQTtJQUNBLFlBQUE7SUFDQSxZQUFBO0VDRkY7RURJQTtJQUNFLFlBQUE7RUNGRjtBQUNGIiwiZmlsZSI6InNyYy9hcHAvZG9jdG9yLXBvcnRhbC9wYWdlL2RyLWhvbWUvZHItaG9tZS5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIi5ob21lX3BhZ2Uge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5bbnotY2Fyb3VzZWwtY29udGVudF0ge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1pbi1oZWlnaHQ6IDEwMHZoICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xufVxuXG5oMyB7XG4gIGNvbG9yOiAjZmZmO1xuICBtYXJnaW4tYm90dG9tOiAwO1xufVxuXG4vLyBzbGlkZSBidG4gbGVzc1xuLmFudC1jYXJvdXNlbCAuc2xpY2stZG90cyBsaSBidXR0b24ge1xuICB3aWR0aDogMTZweCAhaW1wb3J0YW50O1xuICBoZWlnaHQ6IDE2cHggIWltcG9ydGFudDtcbn1cbi5ob21lX2FwcG9pbnRtZW50IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zKTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG59XG4uaG9tZV9hcHBvaW50bWVudF9jb250ZW50IHtcbiAgaGVpZ2h0OiAzNzVweDtcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmctbGVmdDogNTNweDtcbn1cbi5ob21lX2FwcG9pbnRtZW50X2NvbnRlbnQgc3BhbiBoMSB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC1zaXplOiA0OHB4O1xuICBsaW5lLWhlaWdodDogNTZweDtcbiAgbWFyZ2luLWJvdHRvbTogMzFweDtcbn1cbi5ob21lX2FwcG9pbnRtZW50X2NvbnRlbnQgc3BhbiAuYnV0dG9uIHtcbiAgd2lkdGg6IDMyM3B4O1xuICBoZWlnaHQ6IDYwcHg7XG4gIGZvbnQtc2l6ZTogMjJweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIHVzZXItc2VsZWN0OiBub25lO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJvcmRlcjogbm9uZTtcbn1cbi5ob21lX2FwcG9pbnRtZW50X2NvbnRlbnQgc3BhbiBidXR0b24gaSB7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG4uQ3VzdG9tX2J0biB7XG4gIGZvbnQtc2l6ZTogMjJweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiA5cHg7XG4gIGhlaWdodDogNjBweDtcbiAgd2lkdGg6IDMyM3B4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtZmFtaWx5OiBcInJhbGV3YXlib2xkXCI7XG59XG4ubnpfaWNvIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0b3A6IDFweDtcbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5ob21lX2FwcG9pbnRtZW50X2NvbnRlbnQge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHBhZGRpbmctbGVmdDogMTNweDtcbiAgICBoZWlnaHQ6IDIwNnB4O1xuICB9XG4gIC5ob21lX2FwcG9pbnRtZW50X2NvbnRlbnQgc3BhbiB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbiAgLmhvbWVfYXBwb2ludG1lbnRfY29udGVudCBzcGFuIGgxIHtcbiAgICBmb250LXNpemU6IDIycHg7XG4gICAgbGluZS1oZWlnaHQ6IDI2cHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMTdweDtcbiAgfVxuICAuaG9tZV9hcHBvaW50bWVudF9jb250ZW50IHNwYW4gLmJ1dHRvbiB7XG4gICAgd2lkdGg6IDE4NnB4O1xuICAgIGhlaWdodDogMzZweDtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBmbG9hdDogcmlnaHQ7XG4gIH1cbiAgLmhvbWVfcGFnZSB7XG4gICAgaGVpZ2h0OiA3MHZoO1xuICB9XG59XG4iLCIuaG9tZV9wYWdlIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuW256LWNhcm91c2VsLWNvbnRlbnRdIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtaW4taGVpZ2h0OiAxMDB2aCAhaW1wb3J0YW50O1xuICBjb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbn1cbmgzIHtcbiAgY29sb3I6ICNmZmY7XG4gIG1hcmdpbi1ib3R0b206IDA7XG59XG4uYW50LWNhcm91c2VsIC5zbGljay1kb3RzIGxpIGJ1dHRvbiB7XG4gIHdpZHRoOiAxNnB4ICFpbXBvcnRhbnQ7XG4gIGhlaWdodDogMTZweCAhaW1wb3J0YW50O1xufVxuLmhvbWVfYXBwb2ludG1lbnQge1xuICB3aWR0aDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMpO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbn1cbi5ob21lX2FwcG9pbnRtZW50X2NvbnRlbnQge1xuICBoZWlnaHQ6IDM3NXB4O1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZy1sZWZ0OiA1M3B4O1xufVxuLmhvbWVfYXBwb2ludG1lbnRfY29udGVudCBzcGFuIGgxIHtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXNpemU6IDQ4cHg7XG4gIGxpbmUtaGVpZ2h0OiA1NnB4O1xuICBtYXJnaW4tYm90dG9tOiAzMXB4O1xufVxuLmhvbWVfYXBwb2ludG1lbnRfY29udGVudCBzcGFuIC5idXR0b24ge1xuICB3aWR0aDogMzIzcHg7XG4gIGhlaWdodDogNjBweDtcbiAgZm9udC1zaXplOiAyMnB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgYm9yZGVyOiBub25lO1xufVxuLmhvbWVfYXBwb2ludG1lbnRfY29udGVudCBzcGFuIGJ1dHRvbiBpIHtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cbi5DdXN0b21fYnRuIHtcbiAgZm9udC1zaXplOiAyMnB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDlweDtcbiAgaGVpZ2h0OiA2MHB4O1xuICB3aWR0aDogMzIzcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZm9udC1mYW1pbHk6IFwicmFsZXdheWJvbGRcIjtcbn1cbi5uel9pY28ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRvcDogMXB4O1xufVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgLmhvbWVfYXBwb2ludG1lbnRfY29udGVudCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgcGFkZGluZy1sZWZ0OiAxM3B4O1xuICAgIGhlaWdodDogMjA2cHg7XG4gIH1cbiAgLmhvbWVfYXBwb2ludG1lbnRfY29udGVudCBzcGFuIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuICAuaG9tZV9hcHBvaW50bWVudF9jb250ZW50IHNwYW4gaDEge1xuICAgIGZvbnQtc2l6ZTogMjJweDtcbiAgICBsaW5lLWhlaWdodDogMjZweDtcbiAgICBtYXJnaW4tYm90dG9tOiAxN3B4O1xuICB9XG4gIC5ob21lX2FwcG9pbnRtZW50X2NvbnRlbnQgc3BhbiAuYnV0dG9uIHtcbiAgICB3aWR0aDogMTg2cHg7XG4gICAgaGVpZ2h0OiAzNnB4O1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGZsb2F0OiByaWdodDtcbiAgfVxuICAuaG9tZV9wYWdlIHtcbiAgICBoZWlnaHQ6IDcwdmg7XG4gIH1cbn1cbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DrHomeComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-dr-home',
                templateUrl: './dr-home.component.html',
                styleUrls: ['./dr-home.component.less']
            }]
    }], function () { return [{ type: src_app_shared_UI_service_custom_icons_service__WEBPACK_IMPORTED_MODULE_2__["CustomIconsService"] }, { type: src_app_shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_3__["MediaControlService"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }, { type: _services_doctor_service_doctor_service__WEBPACK_IMPORTED_MODULE_4__["DoctorService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/doctor-portal/page/gallery/gallery.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/doctor-portal/page/gallery/gallery.component.ts ***!
  \*****************************************************************/
/*! exports provided: GalleryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GalleryComponent", function() { return GalleryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/UI_service/media-control.service */ "./src/app/shared/UI_service/media-control.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var angular_responsive_carousel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular-responsive-carousel */ "./node_modules/angular-responsive-carousel/__ivy_ngcc__/fesm2015/angular-responsive-carousel.js");
/* harmony import */ var ng_zorro_antd_core_transition_patch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-zorro-antd/core/transition-patch */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-core-transition-patch.js");
/* harmony import */ var ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng-zorro-antd/icon */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-icon.js");







function GalleryComponent_ng_template_0_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function GalleryComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Gallery");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, GalleryComponent_ng_template_0_div_5_Template, 2, 0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "carousel", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "h2", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Thermage: Before and After - Eyelids");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "p", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Droopy eyelids respond especially Well to thermage you won't ses result until 4 to 6 month after the procedure. but the diffrent can be dramatica");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "i", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "\u00A0Consult now");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r0.thisDevice);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("images", ctx_r0.images)("objectFit", "cover")("cellWidth", "100%")("borderRadius", 0)("autoplay", true)("dots", true)("loop", true)("height", ctx_r0.carouselHight)("arrows", false);
} }
class GalleryComponent {
    constructor(_viewMedia) {
        this._viewMedia = _viewMedia;
        this.array = [1, 2, 3, 4];
        this.effect = 'scrollx';
        this.images = [];
        this.isGalleryData = false;
    }
    ngOnInit() {
        if (this.galleryImg.gallery && this.galleryImg.gallery.length > 0) {
            this.galleryImg.gallery.forEach(element => {
                this.images.push({ path: element });
            });
            this.isGalleryData = true;
        }
    }
    ngAfterContentChecked() {
        this.thisDevice = this._viewMedia.mediaPort();
        this.carouselHight = this._viewMedia.mediaNumber(225, 380);
    }
}
GalleryComponent.ɵfac = function GalleryComponent_Factory(t) { return new (t || GalleryComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_1__["MediaControlService"])); };
GalleryComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GalleryComponent, selectors: [["app-gallery"]], inputs: { galleryImg: "galleryImg" }, decls: 1, vars: 1, consts: [[3, "ngIf"], [1, "gallery_outer", "page_p_y"], [1, "gallery_container"], [1, "app_dashboard_heading"], [1, "Gallery_box_control", "page_y"], ["class", "Gallery_box_left", 4, "ngIf"], [1, "Gallery_box_rigth"], [3, "images", "objectFit", "cellWidth", "borderRadius", "autoplay", "dots", "loop", "height", "arrows"], [1, "carousel_slide_btn_box", "center_xy"], [2, "font-family", "hel-bold"], [2, "font-family", "hel-reg"], [1, "btn_primary"], ["nz-icon", "", "nzType", "phone", "nzTheme", "outline"], [1, "Gallery_box_left"], ["src", "https://www.jawsurgerylosangeles.com/wp-content/uploads/2020/05/before-after-patient-01.jpg", "alt", "", 1, "img-fluid"]], template: function GalleryComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, GalleryComponent_ng_template_0_Template, 17, 10, "ng-template", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isGalleryData);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], angular_responsive_carousel__WEBPACK_IMPORTED_MODULE_3__["CarouselComponent"], ng_zorro_antd_core_transition_patch__WEBPACK_IMPORTED_MODULE_4__["ɵNzTransitionPatchDirective"], ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_5__["NzIconDirective"]], styles: [".gallery_outer[_ngcontent-%COMP%] {\n  background-color: white;\n  height: auto;\n  position: relative;\n  z-index: 1;\n}\n.gallery_container[_ngcontent-%COMP%] {\n  width: 100%;\n  background-color: white;\n}\n.Gallery_box_control[_ngcontent-%COMP%] {\n  color: transparent;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.Gallery_box_left[_ngcontent-%COMP%] {\n  width: 42.9vw;\n  height: 380px;\n}\n.Gallery_box_left[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 42.9vw;\n  height: 380px;\n}\n.Gallery_box_rigth[_ngcontent-%COMP%] {\n  width: 42.9vw;\n  height: 380px;\n  background-color: black;\n  position: relative;\n}\n.carousel_slide_btn_box[_ngcontent-%COMP%] {\n  background-color: #0000008c;\n  height: 100%;\n  width: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 11000;\n}\n.carousel_slide_btn_box[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  padding: 28px;\n}\n.carousel_slide_btn_box[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #cadde0;\n  font-size: 26px;\n  line-height: 37px;\n  padding-bottom: 22px;\n}\n.carousel_slide_btn_box[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #cadde0;\n  font-size: 20px;\n  line-height: 28px;\n}\n.carousel_slide_btn_box[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-weight: 700;\n  text-align: center;\n  vertical-align: middle;\n  -webkit-user-select: none;\n  user-select: none;\n  border: 1px solid transparent;\n  padding: 0.5rem 2.2rem;\n  font-size: 1.31rem;\n  line-height: 1.5;\n  border-radius: 0.3rem;\n  cursor: pointer;\n}\n@media screen and (max-width: 768px) {\n  .carousel_slide_btn_box[_ngcontent-%COMP%] {\n    background-color: #0000008c;\n    height: 50%;\n    width: 100%;\n    position: absolute;\n    top: 126px;\n    left: 0;\n    z-index: 11000;\n  }\n  .carousel_slide_btn_box[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n    padding: 28px;\n  }\n  .carousel_slide_btn_box[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    color: #efecec;\n    font-size: 26px;\n    margin-bottom: 19px;\n  }\n  .carousel_slide_btn_box[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    color: white;\n    font-size: 19px;\n    line-height: 26px;\n  }\n  .carousel_slide_btn_box[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-block;\n    font-weight: 700;\n    text-align: center;\n    vertical-align: middle;\n    -webkit-user-select: none;\n    user-select: none;\n    border: 1px solid transparent;\n    padding: 0.5rem 1.1rem;\n    font-size: 0.9rem;\n    line-height: 1.5;\n    border-radius: 0.3rem;\n    cursor: pointer;\n    position: absolute;\n    bottom: -13px;\n    right: 14px;\n  }\n  .carousel_slide_btn_box[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n    padding: 13px;\n  }\n  .carousel_slide_btn_box[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    color: #efecec;\n    font-size: 16px;\n    margin-bottom: 7px;\n    line-height: 17px;\n    padding-bottom: 9px;\n  }\n  .carousel_slide_btn_box[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    color: white;\n    font-size: 12px;\n    line-height: 18px;\n    font-family: \"hel-reg\";\n  }\n  .Gallery_box_rigth[_ngcontent-%COMP%] {\n    height: auto !important;\n    width: 100%;\n  }\n  carousel[_ngcontent-%COMP%] {\n    filter: blur(0px) !important;\n  }\n}\ncarousel[_ngcontent-%COMP%] {\n  filter: blur(7px);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZG9jdG9yLXBvcnRhbC9wYWdlL2dhbGxlcnkvRjovT0ZGSUNFIFdPUksvRElHSVNDUklCRS9PZmZpY2VfUHJvamVjdHMvYXBwbGljYXRpb24vcGF0aWVudF9wb3J0YWwvc3JjL2FwcC9kb2N0b3ItcG9ydGFsL3BhZ2UvZ2FsbGVyeS9nYWxsZXJ5LmNvbXBvbmVudC5sZXNzIiwic3JjL2FwcC9kb2N0b3ItcG9ydGFsL3BhZ2UvZ2FsbGVyeS9nYWxsZXJ5LmNvbXBvbmVudC5sZXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0UsdUJBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0FDQUY7QURFQTtFQUNFLFdBQUE7RUFDQSx1QkFBQTtBQ0FGO0FERUE7RUFDRSxrQkFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0FDQUY7QURFQTtFQUNFLGFBQUE7RUFDQSxhQUFBO0FDQUY7QURFQTtFQUNFLGFBQUE7RUFDQSxhQUFBO0FDQUY7QURFQTtFQUNFLGFBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxrQkFBQTtBQ0FGO0FERUE7RUFDRSwyQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLGNBQUE7QUNBRjtBREVBO0VBQ0UsYUFBQTtBQ0FGO0FERUE7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0Esb0JBQUE7QUNBRjtBREVBO0VBQ0UsY0FBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtBQ0FGO0FERUE7RUFDRSxxQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0EsaUJBQUE7RUFDQSw2QkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0VBQ0EsZUFBQTtBQ0FGO0FERUE7RUFDRTtJQUNFLDJCQUFBO0lBQ0EsV0FBQTtJQUNBLFdBQUE7SUFDQSxrQkFBQTtJQUNBLFVBQUE7SUFDQSxPQUFBO0lBQ0EsY0FBQTtFQ0FGO0VERUE7SUFDRSxhQUFBO0VDQUY7RURFQTtJQUNFLGNBQUE7SUFDQSxlQUFBO0lBQ0EsbUJBQUE7RUNBRjtFREVBO0lBQ0UsWUFBQTtJQUNBLGVBQUE7SUFDQSxpQkFBQTtFQ0FGO0VERUE7SUFDRSxxQkFBQTtJQUNBLGdCQUFBO0lBQ0Esa0JBQUE7SUFDQSxzQkFBQTtJQUNBLHlCQUFBO0lBQ0EsaUJBQUE7SUFDQSw2QkFBQTtJQUNBLHNCQUFBO0lBQ0EsaUJBQUE7SUFDQSxnQkFBQTtJQUNBLHFCQUFBO0lBQ0EsZUFBQTtJQUNBLGtCQUFBO0lBQ0EsYUFBQTtJQUNBLFdBQUE7RUNBRjtFREVBO0lBQ0UsYUFBQTtFQ0FGO0VERUE7SUFDRSxjQUFBO0lBQ0EsZUFBQTtJQUNBLGtCQUFBO0lBQ0EsaUJBQUE7SUFDQSxtQkFBQTtFQ0FGO0VERUE7SUFDRSxZQUFBO0lBQ0EsZUFBQTtJQUNBLGlCQUFBO0lBQ0Esc0JBQUE7RUNBRjtFREVBO0lBQ0UsdUJBQUE7SUFDQSxXQUFBO0VDQUY7RURFQTtJQUNFLDRCQUFBO0VDQUY7QUFDRjtBREVBO0VBQ0UsaUJBQUE7QUNBRiIsImZpbGUiOiJzcmMvYXBwL2RvY3Rvci1wb3J0YWwvcGFnZS9nYWxsZXJ5L2dhbGxlcnkuY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBnYWxsZXJ5X2NvbnRhaW5lclxuLmdhbGxlcnlfb3V0ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgaGVpZ2h0OiBhdXRvO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDE7XG59XG4uZ2FsbGVyeV9jb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG4uR2FsbGVyeV9ib3hfY29udHJvbCB7XG4gIGNvbG9yOiB0cmFuc3BhcmVudDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uR2FsbGVyeV9ib3hfbGVmdCB7XG4gIHdpZHRoOiA0Mi45dnc7XG4gIGhlaWdodDogMzgwcHg7XG59XG4uR2FsbGVyeV9ib3hfbGVmdCBpbWcge1xuICB3aWR0aDogNDIuOXZ3O1xuICBoZWlnaHQ6IDM4MHB4O1xufVxuLkdhbGxlcnlfYm94X3JpZ3RoIHtcbiAgd2lkdGg6IDQyLjl2dztcbiAgaGVpZ2h0OiAzODBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi5jYXJvdXNlbF9zbGlkZV9idG5fYm94IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDhjO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgei1pbmRleDogMTEwMDA7XG59XG4uY2Fyb3VzZWxfc2xpZGVfYnRuX2JveCBkaXYge1xuICBwYWRkaW5nOiAyOHB4O1xufVxuLmNhcm91c2VsX3NsaWRlX2J0bl9ib3ggZGl2IGgyIHtcbiAgY29sb3I6ICNjYWRkZTA7XG4gIGZvbnQtc2l6ZTogMjZweDtcbiAgbGluZS1oZWlnaHQ6IDM3cHg7XG4gIHBhZGRpbmctYm90dG9tOiAyMnB4O1xufVxuLmNhcm91c2VsX3NsaWRlX2J0bl9ib3ggZGl2IHAge1xuICBjb2xvcjogI2NhZGRlMDtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBsaW5lLWhlaWdodDogMjhweDtcbn1cbi5jYXJvdXNlbF9zbGlkZV9idG5fYm94IGRpdiBidXR0b24ge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICBwYWRkaW5nOiAwLjVyZW0gMi4ycmVtO1xuICBmb250LXNpemU6IDEuMzFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG4gIGJvcmRlci1yYWRpdXM6IDAuM3JlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgLmNhcm91c2VsX3NsaWRlX2J0bl9ib3gge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA4YztcbiAgICBoZWlnaHQ6IDUwJTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAxMjZweDtcbiAgICBsZWZ0OiAwO1xuICAgIHotaW5kZXg6IDExMDAwO1xuICB9XG4gIC5jYXJvdXNlbF9zbGlkZV9idG5fYm94IGRpdiB7XG4gICAgcGFkZGluZzogMjhweDtcbiAgfVxuICAuY2Fyb3VzZWxfc2xpZGVfYnRuX2JveCBkaXYgaDIge1xuICAgIGNvbG9yOiAjZWZlY2VjO1xuICAgIGZvbnQtc2l6ZTogMjZweDtcbiAgICBtYXJnaW4tYm90dG9tOiAxOXB4O1xuICB9XG4gIC5jYXJvdXNlbF9zbGlkZV9idG5fYm94IGRpdiBwIHtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgZm9udC1zaXplOiAxOXB4O1xuICAgIGxpbmUtaGVpZ2h0OiAyNnB4O1xuICB9XG4gIC5jYXJvdXNlbF9zbGlkZV9idG5fYm94IGRpdiBidXR0b24ge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBmb250LXdlaWdodDogNzAwO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgcGFkZGluZzogMC41cmVtIDEuMXJlbTtcbiAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgICBsaW5lLWhlaWdodDogMS41O1xuICAgIGJvcmRlci1yYWRpdXM6IDAuM3JlbTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGJvdHRvbTogLTEzcHg7XG4gICAgcmlnaHQ6IDE0cHg7XG4gIH1cbiAgLmNhcm91c2VsX3NsaWRlX2J0bl9ib3ggZGl2IHtcbiAgICBwYWRkaW5nOiAxM3B4O1xuICB9XG4gIC5jYXJvdXNlbF9zbGlkZV9idG5fYm94IGRpdiBoMiB7XG4gICAgY29sb3I6ICNlZmVjZWM7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICAgIG1hcmdpbi1ib3R0b206IDdweDtcbiAgICBsaW5lLWhlaWdodDogMTdweDtcbiAgICBwYWRkaW5nLWJvdHRvbTogOXB4O1xuICB9XG4gIC5jYXJvdXNlbF9zbGlkZV9idG5fYm94IGRpdiBwIHtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxOHB4O1xuICAgIGZvbnQtZmFtaWx5OiBcImhlbC1yZWdcIjtcbiAgfVxuICAuR2FsbGVyeV9ib3hfcmlndGgge1xuICAgIGhlaWdodDogYXV0byAhaW1wb3J0YW50O1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG4gIGNhcm91c2VsIHtcbiAgICBmaWx0ZXI6IGJsdXIoMHB4KSAhaW1wb3J0YW50O1xuICB9XG59XG5jYXJvdXNlbCB7XG4gIGZpbHRlcjogYmx1cig3cHgpO1xufVxuIiwiLmdhbGxlcnlfb3V0ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgaGVpZ2h0OiBhdXRvO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDE7XG59XG4uZ2FsbGVyeV9jb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG4uR2FsbGVyeV9ib3hfY29udHJvbCB7XG4gIGNvbG9yOiB0cmFuc3BhcmVudDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uR2FsbGVyeV9ib3hfbGVmdCB7XG4gIHdpZHRoOiA0Mi45dnc7XG4gIGhlaWdodDogMzgwcHg7XG59XG4uR2FsbGVyeV9ib3hfbGVmdCBpbWcge1xuICB3aWR0aDogNDIuOXZ3O1xuICBoZWlnaHQ6IDM4MHB4O1xufVxuLkdhbGxlcnlfYm94X3JpZ3RoIHtcbiAgd2lkdGg6IDQyLjl2dztcbiAgaGVpZ2h0OiAzODBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi5jYXJvdXNlbF9zbGlkZV9idG5fYm94IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDhjO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgei1pbmRleDogMTEwMDA7XG59XG4uY2Fyb3VzZWxfc2xpZGVfYnRuX2JveCBkaXYge1xuICBwYWRkaW5nOiAyOHB4O1xufVxuLmNhcm91c2VsX3NsaWRlX2J0bl9ib3ggZGl2IGgyIHtcbiAgY29sb3I6ICNjYWRkZTA7XG4gIGZvbnQtc2l6ZTogMjZweDtcbiAgbGluZS1oZWlnaHQ6IDM3cHg7XG4gIHBhZGRpbmctYm90dG9tOiAyMnB4O1xufVxuLmNhcm91c2VsX3NsaWRlX2J0bl9ib3ggZGl2IHAge1xuICBjb2xvcjogI2NhZGRlMDtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBsaW5lLWhlaWdodDogMjhweDtcbn1cbi5jYXJvdXNlbF9zbGlkZV9idG5fYm94IGRpdiBidXR0b24ge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICBwYWRkaW5nOiAwLjVyZW0gMi4ycmVtO1xuICBmb250LXNpemU6IDEuMzFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG4gIGJvcmRlci1yYWRpdXM6IDAuM3JlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgLmNhcm91c2VsX3NsaWRlX2J0bl9ib3gge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA4YztcbiAgICBoZWlnaHQ6IDUwJTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAxMjZweDtcbiAgICBsZWZ0OiAwO1xuICAgIHotaW5kZXg6IDExMDAwO1xuICB9XG4gIC5jYXJvdXNlbF9zbGlkZV9idG5fYm94IGRpdiB7XG4gICAgcGFkZGluZzogMjhweDtcbiAgfVxuICAuY2Fyb3VzZWxfc2xpZGVfYnRuX2JveCBkaXYgaDIge1xuICAgIGNvbG9yOiAjZWZlY2VjO1xuICAgIGZvbnQtc2l6ZTogMjZweDtcbiAgICBtYXJnaW4tYm90dG9tOiAxOXB4O1xuICB9XG4gIC5jYXJvdXNlbF9zbGlkZV9idG5fYm94IGRpdiBwIHtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgZm9udC1zaXplOiAxOXB4O1xuICAgIGxpbmUtaGVpZ2h0OiAyNnB4O1xuICB9XG4gIC5jYXJvdXNlbF9zbGlkZV9idG5fYm94IGRpdiBidXR0b24ge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBmb250LXdlaWdodDogNzAwO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgcGFkZGluZzogMC41cmVtIDEuMXJlbTtcbiAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgICBsaW5lLWhlaWdodDogMS41O1xuICAgIGJvcmRlci1yYWRpdXM6IDAuM3JlbTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGJvdHRvbTogLTEzcHg7XG4gICAgcmlnaHQ6IDE0cHg7XG4gIH1cbiAgLmNhcm91c2VsX3NsaWRlX2J0bl9ib3ggZGl2IHtcbiAgICBwYWRkaW5nOiAxM3B4O1xuICB9XG4gIC5jYXJvdXNlbF9zbGlkZV9idG5fYm94IGRpdiBoMiB7XG4gICAgY29sb3I6ICNlZmVjZWM7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICAgIG1hcmdpbi1ib3R0b206IDdweDtcbiAgICBsaW5lLWhlaWdodDogMTdweDtcbiAgICBwYWRkaW5nLWJvdHRvbTogOXB4O1xuICB9XG4gIC5jYXJvdXNlbF9zbGlkZV9idG5fYm94IGRpdiBwIHtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxOHB4O1xuICAgIGZvbnQtZmFtaWx5OiBcImhlbC1yZWdcIjtcbiAgfVxuICAuR2FsbGVyeV9ib3hfcmlndGgge1xuICAgIGhlaWdodDogYXV0byAhaW1wb3J0YW50O1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG4gIGNhcm91c2VsIHtcbiAgICBmaWx0ZXI6IGJsdXIoMHB4KSAhaW1wb3J0YW50O1xuICB9XG59XG5jYXJvdXNlbCB7XG4gIGZpbHRlcjogYmx1cig3cHgpO1xufVxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GalleryComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-gallery',
                templateUrl: './gallery.component.html',
                styleUrls: ['./gallery.component.less']
            }]
    }], function () { return [{ type: _shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_1__["MediaControlService"] }]; }, { galleryImg: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/doctor-portal/page/overview/overview.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/doctor-portal/page/overview/overview.component.ts ***!
  \*******************************************************************/
/*! exports provided: OverviewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OverviewComponent", function() { return OverviewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/UI_service/media-control.service */ "./src/app/shared/UI_service/media-control.service.ts");
/* harmony import */ var ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng-zorro-antd/grid */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-grid.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var ng_zorro_antd_collapse__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-zorro-antd/collapse */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-collapse.js");






function OverviewComponent_ng_container_5_img_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 20);
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r2.doctor.profile_pic, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
} }
function OverviewComponent_ng_container_5_img_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 21);
} }
function OverviewComponent_ng_container_5_ng_container_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h3", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Experience ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h3", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r4.drCMS.yearsOfExperience, " ");
} }
const _c0 = function () { return { span: 24 }; };
const _c1 = function () { return { span: 12 }; };
const _c2 = function () { return { span: 16 }; };
const _c3 = function () { return { span: 8 }; };
function OverviewComponent_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, OverviewComponent_ng_container_5_img_3_Template, 1, 1, "img", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, OverviewComponent_ng_container_5_img_4_Template, 1, 0, "img", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "i", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "h2", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "h3", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "h3", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, OverviewComponent_ng_container_5_ng_container_19_Template, 5, 1, "ng-container", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](14, _c0))("nzLg", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](15, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.doctor.profile_pic && ctx_r0.doctor.profile_pic != "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r0.doctor.profile_pic);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u00A0 ", ctx_r0.location, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"]("Dr. ", ctx_r0.doctor.doc_first_name, " ", ctx_r0.doctor.doc_last_name, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](16, _c1))("nzLg", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](17, _c2));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.doctor.doctor_education);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.doctor.doc_speciality);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](18, _c1))("nzLg", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](19, _c3));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.drCMS);
} }
const _c4 = function (a0) { return { "themes_text": a0 }; };
function OverviewComponent_ng_container_9_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function OverviewComponent_ng_container_9_ng_template_2_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11); const i_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index; const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r9.collapse(i_r6); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const i_r6 = ctx_r12.index;
    const item_r5 = ctx_r12.$implicit;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](2, _c4, ctx_r8.collapseNum == i_r6));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r5.categoryName);
} }
const _c5 = function (a0) { return { "themes_bg": a0 }; };
function OverviewComponent_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "nz-collapse-panel", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, OverviewComponent_ng_container_9_ng_template_2_Template, 3, 4, "ng-template", null, 23, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "p", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\u2019s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "p", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "qualification");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "p", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Lorem ipsum dolor sit amet consectetur adipisicing");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "p", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Lorem ipsum dolor sit amet consectetur adipisicing");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "p", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "qualification");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "p", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Lorem ipsum dolor sit amet consectetur adipisicing");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "p", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Lorem ipsum dolor sit amet consectetur adipisicing");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const i_r6 = ctx.index;
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzActive", i_r6 == 0)("nzHeader", _r7)("nzShowArrow", true)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](4, _c5, ctx_r1.collapseNum == i_r6));
} }
const _c6 = function (a0, a1) { return [a0, a1]; };
class OverviewComponent {
    constructor(_viewMedia) {
        this._viewMedia = _viewMedia;
        this.Overview = [
            { categoryName: 'About' },
            { categoryName: 'Work Experience' },
            { categoryName: 'Speciality' },
        ];
        this.lists = ['About', 'Work Experience', 'Speciality'];
        this.tab_toggle = true;
        this.hGutter = 70;
        this.vGutter = 70;
        this.collapseNum = 0;
    }
    ngOnInit() {
        console.log(this.drCMS);
    }
    dataToggle(param) {
        this.tab_toggle = param;
    }
    collapse(param) {
        this.collapseNum = param;
    }
    ngAfterContentChecked() {
        this.thisDevice = this._viewMedia.mediaPort();
        if (this._viewMedia.winMedia) {
            this.hGutter = 10;
            this.vGutter = 10;
        }
    }
}
OverviewComponent.ɵfac = function OverviewComponent_Factory(t) { return new (t || OverviewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_1__["MediaControlService"])); };
OverviewComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: OverviewComponent, selectors: [["app-overview"]], inputs: { doctor: "doctor", drCMS: "drCMS", location: "location" }, decls: 10, vars: 11, consts: [[1, "overview_container"], [1, "overview_box"], [1, "app_dashboard_heading"], ["nz-row", "", 1, "page_y", 3, "nzGutter"], [4, "ngIf"], ["nz-col", "", 1, "doctor_col_details", 3, "nzXs", "nzLg"], [1, "accordion_container"], ["nzAccordion", "", 1, "app_shadow_b", 3, "nzExpandIconPosition"], [4, "ngFor", "ngForOf"], ["nz-col", "", 1, "doctor_img_col", 3, "nzXs", "nzLg"], [1, "doctor_profile_bar"], ["class", "doctor_profile_img", "alt", "", 3, "src", 4, "ngIf"], ["src", "assets/img/doctor_profile.png", "class", "doctor_profile_img", "alt", "", 4, "ngIf"], [1, "doctor_profile"], [1, "location", "themes_bg", "themes_text"], [1, "fa", "fa-map-marker"], [1, "Dr_name", "mb-2"], ["nz-row", ""], ["nz-col", "", 3, "nzXs", "nzLg"], [1, "other_detail"], ["alt", "", 1, "doctor_profile_img", 3, "src"], ["src", "assets/img/doctor_profile.png", "alt", "", 1, "doctor_profile_img"], [3, "nzActive", "nzHeader", "nzShowArrow", "ngClass"], ["panelName", ""], [1, "accordion_box"], [1, "themes_text_invert"], [1, "data_list"], [1, "list_heading"], [1, "list"], [1, "Accordion_panel", 3, "click"], [3, "ngClass"]], template: function OverviewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h2", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "overview");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, OverviewComponent_ng_container_5_Template, 20, 20, "ng-container", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "nz-collapse", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, OverviewComponent_ng_container_9_Template, 21, 6, "ng-container", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzGutter", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](6, _c6, ctx.hGutter, ctx.vGutter));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.doctor);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](9, _c0))("nzLg", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](10, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzExpandIconPosition", "right");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.Overview);
    } }, directives: [ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_2__["NzRowDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_2__["NzColDirective"], ng_zorro_antd_collapse__WEBPACK_IMPORTED_MODULE_4__["NzCollapseComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], ng_zorro_antd_collapse__WEBPACK_IMPORTED_MODULE_4__["NzCollapsePanelComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgClass"]], styles: [".overview_container[_ngcontent-%COMP%] {\n  min-height: auto;\n  background-color: white;\n}\n.overview_page_heading[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 44px;\n  text-transform: capitalize;\n  color: #525050;\n  padding: 13px 0px 13px 0px;\n}\n.doctor_profile_bar[_ngcontent-%COMP%] {\n  position: relative;\n  height: 500px;\n  width: 100%;\n}\n.doctor_img_col[_ngcontent-%COMP%]   .doctor_profile_bar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n}\n.doctor_profile[_ngcontent-%COMP%] {\n  -webkit-backdrop-filter: blur(4px);\n          backdrop-filter: blur(4px);\n  background-color: rgba(0, 0, 0, 0.1);\n  height: 167px;\n  width: 100%;\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  display: grid;\n  align-items: center;\n  padding: 12px;\n}\n.Dr_name[_ngcontent-%COMP%] {\n  font-size: 46px;\n  color: white;\n  font-weight: bold;\n  line-height: 47px;\n  font-family: \"hel-bold\";\n}\n.other_detail[_ngcontent-%COMP%] {\n  color: white;\n  font-size: 23px;\n  font-weight: bold;\n  line-height: 27px;\n  font-family: \"hel-reg\";\n}\nnz-collapse-panel[_ngcontent-%COMP%] {\n  border-radius: 8px;\n}\nnz-collapse[_ngcontent-%COMP%] {\n  border: none;\n}\nnz-collapse-panel[_ngcontent-%COMP%] {\n  background-color: white;\n}\n.Accordion_panel[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 19px;\n  line-height: 25px;\n  font-weight: normal;\n  text-transform: capitalize;\n  font-family: \"hel-reg\";\n}\n.Accordion_panel[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  float: right;\n}\n.accordion_container[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.accordion_box[_ngcontent-%COMP%] {\n  height: 313px;\n  overflow-y: scroll;\n}\n.accordion_box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  line-height: 26px;\n  font-family: \"hel-reg\";\n}\n.data_list[_ngcontent-%COMP%]   .list_heading[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: bold;\n  line-height: 34px;\n  text-transform: capitalize;\n  color: #696969;\n  font-family: \"ralewaybold\";\n}\n.data_list[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%] {\n  font-size: 16px;\n  line-height: 4px;\n  font-weight: normal;\n  color: #818181;\n  font-family: \"ralewaybold\";\n}\n.active[_ngcontent-%COMP%] {\n  max-height: 100vh !important;\n}\n.location[_ngcontent-%COMP%] {\n  padding: 5px 8px 5px 8px;\n  position: absolute;\n  top: 0;\n  right: 22px;\n  border-radius: 5px;\n  font-size: 12px;\n  font-weight: bold;\n}\n.doctor_profile_img[_ngcontent-%COMP%] {\n  height: 500px;\n  width: 100%;\n}\n@media screen and (max-width: 768px) {\n  .overview_page_heading[_ngcontent-%COMP%] {\n    text-align: start;\n    font-size: 28px;\n  }\n  .doctor_img_col[_ngcontent-%COMP%]   .doctor_profile_bar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .doctor_profile[_ngcontent-%COMP%] {\n    background-color: rgba(0, 0, 0, 0.4);\n    min-height: 108px;\n    width: 100%;\n    position: absolute;\n    bottom: 0;\n    right: 0px;\n    padding: 12px;\n    border-radius: 10px 10px 0px 0px;\n  }\n  .dr_point[_ngcontent-%COMP%] {\n    margin-bottom: 7px;\n  }\n  .Dr_name[_ngcontent-%COMP%] {\n    font-size: 32px;\n  }\n  .dr_point[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n    color: #6d6c6c;\n    font-size: 15px;\n    font-weight: 700;\n  }\n  .dr_point[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    color: gray;\n  }\n  .other_detail[_ngcontent-%COMP%] {\n    font-size: 14px;\n    line-height: 18px;\n    font-family: \"hel-reg\";\n  }\n  .collapse[_ngcontent-%COMP%] {\n    padding: 0px 0px 0px 0px;\n  }\n  .accordion_container[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .data_list[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%] {\n    font-size: 16px;\n    line-height: 16px;\n    font-weight: normal;\n    color: #818181;\n  }\n  .doctor_profile_img[_ngcontent-%COMP%] {\n    height: 348px;\n    width: 100%;\n  }\n  .doctor_profile_bar[_ngcontent-%COMP%] {\n    height: 348px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZG9jdG9yLXBvcnRhbC9wYWdlL292ZXJ2aWV3L0Y6L09GRklDRSBXT1JLL0RJR0lTQ1JJQkUvT2ZmaWNlX1Byb2plY3RzL2FwcGxpY2F0aW9uL3BhdGllbnRfcG9ydGFsL3NyYy9hcHAvZG9jdG9yLXBvcnRhbC9wYWdlL292ZXJ2aWV3L292ZXJ2aWV3LmNvbXBvbmVudC5sZXNzIiwic3JjL2FwcC9kb2N0b3ItcG9ydGFsL3BhZ2Uvb3ZlcnZpZXcvb3ZlcnZpZXcuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBQTtFQUNBLHVCQUFBO0FDQ0Y7QURDQTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLDBCQUFBO0VBQ0EsY0FBQTtFQUNBLDBCQUFBO0FDQ0Y7QURDQTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLFdBQUE7QUNDRjtBRElBO0VBQ0UsY0FBQTtFQUNBLFdBQUE7QUNGRjtBRElBO0VBQ0Usa0NBQUE7VUFBQSwwQkFBQTtFQUNBLG9DQUFBO0VBQ0EsYUFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxRQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtBQ0ZGO0FESUE7RUFDRSxlQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0EsaUJBQUE7RUFDQSx1QkFBQTtBQ0ZGO0FESUE7RUFDRSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsaUJBQUE7RUFDQSxzQkFBQTtBQ0ZGO0FETUE7RUFDRSxrQkFBQTtBQ0pGO0FETUE7RUFDRSxZQUFBO0FDSkY7QURNQTtFQUNFLHVCQUFBO0FDSkY7QURNQTtFQUNFLGVBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsMEJBQUE7RUFDQSxzQkFBQTtBQ0pGO0FETUE7RUFDRSxZQUFBO0FDSkY7QURNQTtFQUNFLFdBQUE7QUNKRjtBRE1BO0VBQ0UsYUFBQTtFQUNBLGtCQUFBO0FDSkY7QURTQTtFQUNFLGVBQUE7RUFDQSxpQkFBQTtFQUNBLHNCQUFBO0FDUEY7QURTQTtFQUNFLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0EsMEJBQUE7RUFDQSxjQUFBO0VBQ0EsMEJBQUE7QUNQRjtBRFNBO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0VBQ0EsMEJBQUE7QUNQRjtBRGtFQTtFQUNFLDRCQUFBO0FDaEVGO0FEa0VBO0VBQ0Usd0JBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUNoRUY7QURrRUE7RUFDRSxhQUFBO0VBQ0EsV0FBQTtBQ2hFRjtBRGtFQTtFQUNFO0lBQ0UsaUJBQUE7SUFDQSxlQUFBO0VDaEVGO0VEa0VBO0lBQ0UsV0FBQTtFQ2hFRjtFRGtFQTtJQUNFLG9DQUFBO0lBQ0EsaUJBQUE7SUFDQSxXQUFBO0lBQ0Esa0JBQUE7SUFDQSxTQUFBO0lBQ0EsVUFBQTtJQUNBLGFBQUE7SUFDQSxnQ0FBQTtFQ2hFRjtFRGtFQTtJQUNFLGtCQUFBO0VDaEVGO0VEa0VBO0lBQ0UsZUFBQTtFQ2hFRjtFRGtFQTtJQUNFLGNBQUE7SUFDQSxlQUFBO0lBQ0EsZ0JBQUE7RUNoRUY7RURrRUE7SUFDRSxXQUFBO0VDaEVGO0VEa0VBO0lBQ0UsZUFBQTtJQUNBLGlCQUFBO0lBQ0Esc0JBQUE7RUNoRUY7RURrRUE7SUFDRSx3QkFBQTtFQ2hFRjtFRGtFQTtJQUNFLFdBQUE7RUNoRUY7RURrRUE7SUFDRSxlQUFBO0lBQ0EsaUJBQUE7SUFDQSxtQkFBQTtJQUNBLGNBQUE7RUNoRUY7RURrRUE7SUFDRSxhQUFBO0lBQ0EsV0FBQTtFQ2hFRjtFRGtFQTtJQUNFLGFBQUE7RUNoRUY7QUFDRiIsImZpbGUiOiJzcmMvYXBwL2RvY3Rvci1wb3J0YWwvcGFnZS9vdmVydmlldy9vdmVydmlldy5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIi5vdmVydmlld19jb250YWluZXIge1xuICBtaW4taGVpZ2h0OiBhdXRvO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cbi5vdmVydmlld19wYWdlX2hlYWRpbmcge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogNDRweDtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG4gIGNvbG9yOiAjNTI1MDUwO1xuICBwYWRkaW5nOiAxM3B4IDBweCAxM3B4IDBweDtcbn1cbi5kb2N0b3JfcHJvZmlsZV9iYXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGhlaWdodDogNTAwcHg7XG4gIHdpZHRoOiAxMDAlO1xufVxuLy8gaW1nX2NvbnRpbmVyXG4vLyAuZG9jdG9yX2ltZ19jb2wge1xuLy8gfVxuLmRvY3Rvcl9pbWdfY29sIC5kb2N0b3JfcHJvZmlsZV9iYXIgaW1nIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxMDAlO1xufVxuLmRvY3Rvcl9wcm9maWxlIHtcbiAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDRweCk7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgaGVpZ2h0OiAxNjdweDtcbiAgd2lkdGg6IDEwMCU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAwO1xuICByaWdodDogMDtcbiAgZGlzcGxheTogZ3JpZDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcGFkZGluZzogMTJweDtcbn1cbi5Ecl9uYW1lIHtcbiAgZm9udC1zaXplOiA0NnB4O1xuICBjb2xvcjogd2hpdGU7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBsaW5lLWhlaWdodDogNDdweDtcbiAgZm9udC1mYW1pbHk6IFwiaGVsLWJvbGRcIjtcbn1cbi5vdGhlcl9kZXRhaWwge1xuICBjb2xvcjogd2hpdGU7XG4gIGZvbnQtc2l6ZTogMjNweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGxpbmUtaGVpZ2h0OiAyN3B4O1xuICBmb250LWZhbWlseTogXCJoZWwtcmVnXCI7XG59XG5cbi8vIC8vIGNvbGxhcHNlX3RhYlxubnotY29sbGFwc2UtcGFuZWwge1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG59XG5uei1jb2xsYXBzZSB7XG4gIGJvcmRlcjogbm9uZTtcbn1cbm56LWNvbGxhcHNlLXBhbmVsIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG4uQWNjb3JkaW9uX3BhbmVsIGgxIHtcbiAgZm9udC1zaXplOiAxOXB4O1xuICBsaW5lLWhlaWdodDogMjVweDtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG4gIGZvbnQtZmFtaWx5OiBcImhlbC1yZWdcIjtcbn1cbi5BY2NvcmRpb25fcGFuZWwgaDEgaSB7XG4gIGZsb2F0OiByaWdodDtcbn1cbi5hY2NvcmRpb25fY29udGFpbmVyIHtcbiAgd2lkdGg6IDEwMCU7XG59XG4uYWNjb3JkaW9uX2JveCB7XG4gIGhlaWdodDogMzEzcHg7XG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcbn1cblxuLy8gY3VzdG9tIGRhdGFcblxuLmFjY29yZGlvbl9ib3ggcCB7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgbGluZS1oZWlnaHQ6IDI2cHg7XG4gIGZvbnQtZmFtaWx5OiBcImhlbC1yZWdcIjtcbn1cbi5kYXRhX2xpc3QgLmxpc3RfaGVhZGluZyB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGxpbmUtaGVpZ2h0OiAzNHB4O1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbiAgY29sb3I6ICM2OTY5Njk7XG4gIGZvbnQtZmFtaWx5OiBcInJhbGV3YXlib2xkXCI7XG59XG4uZGF0YV9saXN0IC5saXN0IHtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBsaW5lLWhlaWdodDogNHB4O1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBjb2xvcjogIzgxODE4MTtcbiAgZm9udC1mYW1pbHk6IFwicmFsZXdheWJvbGRcIjtcbn1cbi8vIC5jb2xsYXBzZSB7NDUyXG4vLyAgIHBhZGRpbmc6IDBweCAyNXB4IDBweCAyNXB4O1xuLy8gfVxuLy8gLmNvbGxhcHNlX3RhYl9jb250ZW50IGRpdiB7XG4vLyAgIHBhZGRpbmc6IDhweDtcbi8vIH1cbi8vIC5jb2xsYXBzZV90YWJfY29udGVudCAuc3VtbWFyeSB7XG4vLyAgIGZvbnQtc2l6ZTogMTdweDtcbi8vICAgbGluZS1oZWlnaHQ6IDI1cHg7XG4vLyB9XG4vLyAuY29sbGFwc2VfdGFiIC5jb2xsYXBzZV90b2dnbGUge1xuLy8gICBkaXNwbGF5OiBub25lO1xuLy8gfVxuLy8gLmNvbGxhcHNlX3RhYiA+IGxhYmVsIHtcbi8vICAgZm9udC1zaXplOiAxN3B4O1xuLy8gICBwb3NpdGlvbjogcmVsYXRpdmU7XG4vLyAgIGRpc3BsYXk6IGJsb2NrO1xuLy8gICBwYWRkaW5nOiAxMnB4IDEycHggMTJweCAxMnB4O1xuLy8gICBjdXJzb3I6IHBvaW50ZXI7XG4vLyAgIG1hcmdpbi10b3A6IDBweDtcbi8vICAgYm9yZGVyLXJhZGl1czogMTFweDtcbi8vICAgYm9yZGVyOiAxcHggc29saWQgI2QwY2ZjZjtcbi8vIH1cbi8vIC5jb2xsYXBzZV90YWIgPiBsYWJlbDo6YWZ0ZXIge1xuLy8gICBjb250ZW50OiBcIlxcZjEwN1wiO1xuLy8gICBmb250LWZhbWlseTogRm9udEF3ZXNvbWU7XG4vLyAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbi8vICAgdG9wOiAwcHg7XG4vLyAgIHJpZ2h0OiAyMHB4O1xuLy8gICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcbi8vICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3M7XG4vLyAgIGZvbnQtc2l6ZTogMzZweDtcbi8vIH1cbi8vIC5jb2xsYXBzZV90YWIgPiAuY29sbGFwc2VfdG9nZ2xlOmNoZWNrZWQgfiBsYWJlbDo6YWZ0ZXIge1xuLy8gICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xuLy8gfVxuLy8gLmNvbGxhcHNlX3RhYiA+IC5jb2xsYXBzZV90YWJfY29udGVudCB7XG4vLyAgIG1heC1oZWlnaHQ6IDA7XG4vLyAgIHRyYW5zaXRpb246IGFsbCAwLjRzO1xuLy8gICBvdmVyZmxvdzogaGlkZGVuO1xuLy8gfVxuLy8gLmNvbGxhcHNlX3RhYiA+IC5jb2xsYXBzZV90b2dnbGU6Y2hlY2tlZCB+IC5jb2xsYXBzZV90YWJfY29udGVudCB7XG4vLyAgIG1heC1oZWlnaHQ6IDEwMHZoO1xuLy8gfVxuLy8gLmRyX3BvaW50IHtcbi8vICAgbWFyZ2luLWJvdHRvbTogN3B4O1xuLy8gfVxuLy8gLmRyX3BvaW50IGg0IHtcbi8vICAgY29sb3I6ICM2ZDZjNmM7XG4vLyAgIGZvbnQtc2l6ZTogMTVweDtcbi8vICAgZm9udC13ZWlnaHQ6IDcwMDtcbi8vIH1cbi8vIC5kcl9wb2ludCBoMyB7XG4vLyAgIGNvbG9yOiBncmF5O1xuLy8gfVxuLy8gY29udGVudDpcIlxcZjEwN1wiO1xuXG4uYWN0aXZlIHtcbiAgbWF4LWhlaWdodDogMTAwdmggIWltcG9ydGFudDtcbn1cbi5sb2NhdGlvbiB7XG4gIHBhZGRpbmc6IDVweCA4cHggNXB4IDhweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAyMnB4O1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG4uZG9jdG9yX3Byb2ZpbGVfaW1nIHtcbiAgaGVpZ2h0OiA1MDBweDtcbiAgd2lkdGg6IDEwMCU7XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweCkge1xuICAub3ZlcnZpZXdfcGFnZV9oZWFkaW5nIHtcbiAgICB0ZXh0LWFsaWduOiBzdGFydDtcbiAgICBmb250LXNpemU6IDI4cHg7XG4gIH1cbiAgLmRvY3Rvcl9pbWdfY29sIC5kb2N0b3JfcHJvZmlsZV9iYXIgaW1nIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuICAuZG9jdG9yX3Byb2ZpbGUge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40KTtcbiAgICBtaW4taGVpZ2h0OiAxMDhweDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYm90dG9tOiAwO1xuICAgIHJpZ2h0OiAwcHg7XG4gICAgcGFkZGluZzogMTJweDtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4IDEwcHggMHB4IDBweDtcbiAgfVxuICAuZHJfcG9pbnQge1xuICAgIG1hcmdpbi1ib3R0b206IDdweDtcbiAgfVxuICAuRHJfbmFtZSB7XG4gICAgZm9udC1zaXplOiAzMnB4O1xuICB9XG4gIC5kcl9wb2ludCBoNCB7XG4gICAgY29sb3I6ICM2ZDZjNmM7XG4gICAgZm9udC1zaXplOiAxNXB4O1xuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIH1cbiAgLmRyX3BvaW50IGgzIHtcbiAgICBjb2xvcjogZ3JheTtcbiAgfVxuICAub3RoZXJfZGV0YWlsIHtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgbGluZS1oZWlnaHQ6IDE4cHg7XG4gICAgZm9udC1mYW1pbHk6IFwiaGVsLXJlZ1wiO1xuICB9XG4gIC5jb2xsYXBzZSB7XG4gICAgcGFkZGluZzogMHB4IDBweCAwcHggMHB4O1xuICB9XG4gIC5hY2NvcmRpb25fY29udGFpbmVyIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuICAuZGF0YV9saXN0IC5saXN0IHtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgbGluZS1oZWlnaHQ6IDE2cHg7XG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgICBjb2xvcjogIzgxODE4MTtcbiAgfVxuICAuZG9jdG9yX3Byb2ZpbGVfaW1nIHtcbiAgICBoZWlnaHQ6IDM0OHB4O1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG4gIC5kb2N0b3JfcHJvZmlsZV9iYXIge1xuICAgIGhlaWdodDogMzQ4cHg7XG4gIH1cbn1cbiIsIi5vdmVydmlld19jb250YWluZXIge1xuICBtaW4taGVpZ2h0OiBhdXRvO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cbi5vdmVydmlld19wYWdlX2hlYWRpbmcge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogNDRweDtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG4gIGNvbG9yOiAjNTI1MDUwO1xuICBwYWRkaW5nOiAxM3B4IDBweCAxM3B4IDBweDtcbn1cbi5kb2N0b3JfcHJvZmlsZV9iYXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGhlaWdodDogNTAwcHg7XG4gIHdpZHRoOiAxMDAlO1xufVxuLmRvY3Rvcl9pbWdfY29sIC5kb2N0b3JfcHJvZmlsZV9iYXIgaW1nIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxMDAlO1xufVxuLmRvY3Rvcl9wcm9maWxlIHtcbiAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDRweCk7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgaGVpZ2h0OiAxNjdweDtcbiAgd2lkdGg6IDEwMCU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAwO1xuICByaWdodDogMDtcbiAgZGlzcGxheTogZ3JpZDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcGFkZGluZzogMTJweDtcbn1cbi5Ecl9uYW1lIHtcbiAgZm9udC1zaXplOiA0NnB4O1xuICBjb2xvcjogd2hpdGU7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBsaW5lLWhlaWdodDogNDdweDtcbiAgZm9udC1mYW1pbHk6IFwiaGVsLWJvbGRcIjtcbn1cbi5vdGhlcl9kZXRhaWwge1xuICBjb2xvcjogd2hpdGU7XG4gIGZvbnQtc2l6ZTogMjNweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGxpbmUtaGVpZ2h0OiAyN3B4O1xuICBmb250LWZhbWlseTogXCJoZWwtcmVnXCI7XG59XG5uei1jb2xsYXBzZS1wYW5lbCB7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbn1cbm56LWNvbGxhcHNlIHtcbiAgYm9yZGVyOiBub25lO1xufVxubnotY29sbGFwc2UtcGFuZWwge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cbi5BY2NvcmRpb25fcGFuZWwgaDEge1xuICBmb250LXNpemU6IDE5cHg7XG4gIGxpbmUtaGVpZ2h0OiAyNXB4O1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbiAgZm9udC1mYW1pbHk6IFwiaGVsLXJlZ1wiO1xufVxuLkFjY29yZGlvbl9wYW5lbCBoMSBpIHtcbiAgZmxvYXQ6IHJpZ2h0O1xufVxuLmFjY29yZGlvbl9jb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbn1cbi5hY2NvcmRpb25fYm94IHtcbiAgaGVpZ2h0OiAzMTNweDtcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xufVxuLmFjY29yZGlvbl9ib3ggcCB7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgbGluZS1oZWlnaHQ6IDI2cHg7XG4gIGZvbnQtZmFtaWx5OiBcImhlbC1yZWdcIjtcbn1cbi5kYXRhX2xpc3QgLmxpc3RfaGVhZGluZyB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGxpbmUtaGVpZ2h0OiAzNHB4O1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbiAgY29sb3I6ICM2OTY5Njk7XG4gIGZvbnQtZmFtaWx5OiBcInJhbGV3YXlib2xkXCI7XG59XG4uZGF0YV9saXN0IC5saXN0IHtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBsaW5lLWhlaWdodDogNHB4O1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBjb2xvcjogIzgxODE4MTtcbiAgZm9udC1mYW1pbHk6IFwicmFsZXdheWJvbGRcIjtcbn1cbi5hY3RpdmUge1xuICBtYXgtaGVpZ2h0OiAxMDB2aCAhaW1wb3J0YW50O1xufVxuLmxvY2F0aW9uIHtcbiAgcGFkZGluZzogNXB4IDhweCA1cHggOHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgcmlnaHQ6IDIycHg7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cbi5kb2N0b3JfcHJvZmlsZV9pbWcge1xuICBoZWlnaHQ6IDUwMHB4O1xuICB3aWR0aDogMTAwJTtcbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5vdmVydmlld19wYWdlX2hlYWRpbmcge1xuICAgIHRleHQtYWxpZ246IHN0YXJ0O1xuICAgIGZvbnQtc2l6ZTogMjhweDtcbiAgfVxuICAuZG9jdG9yX2ltZ19jb2wgLmRvY3Rvcl9wcm9maWxlX2JhciBpbWcge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG4gIC5kb2N0b3JfcHJvZmlsZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjQpO1xuICAgIG1pbi1oZWlnaHQ6IDEwOHB4O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBib3R0b206IDA7XG4gICAgcmlnaHQ6IDBweDtcbiAgICBwYWRkaW5nOiAxMnB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHggMTBweCAwcHggMHB4O1xuICB9XG4gIC5kcl9wb2ludCB7XG4gICAgbWFyZ2luLWJvdHRvbTogN3B4O1xuICB9XG4gIC5Ecl9uYW1lIHtcbiAgICBmb250LXNpemU6IDMycHg7XG4gIH1cbiAgLmRyX3BvaW50IGg0IHtcbiAgICBjb2xvcjogIzZkNmM2YztcbiAgICBmb250LXNpemU6IDE1cHg7XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgfVxuICAuZHJfcG9pbnQgaDMge1xuICAgIGNvbG9yOiBncmF5O1xuICB9XG4gIC5vdGhlcl9kZXRhaWwge1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBsaW5lLWhlaWdodDogMThweDtcbiAgICBmb250LWZhbWlseTogXCJoZWwtcmVnXCI7XG4gIH1cbiAgLmNvbGxhcHNlIHtcbiAgICBwYWRkaW5nOiAwcHggMHB4IDBweCAwcHg7XG4gIH1cbiAgLmFjY29yZGlvbl9jb250YWluZXIge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG4gIC5kYXRhX2xpc3QgLmxpc3Qge1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICBsaW5lLWhlaWdodDogMTZweDtcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgIGNvbG9yOiAjODE4MTgxO1xuICB9XG4gIC5kb2N0b3JfcHJvZmlsZV9pbWcge1xuICAgIGhlaWdodDogMzQ4cHg7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbiAgLmRvY3Rvcl9wcm9maWxlX2JhciB7XG4gICAgaGVpZ2h0OiAzNDhweDtcbiAgfVxufVxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](OverviewComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-overview',
                templateUrl: './overview.component.html',
                styleUrls: ['./overview.component.less']
            }]
    }], function () { return [{ type: _shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_1__["MediaControlService"] }]; }, { doctor: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], drCMS: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], location: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/doctor-portal/page/testimonial/testimonial.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/doctor-portal/page/testimonial/testimonial.component.ts ***!
  \*************************************************************************/
/*! exports provided: TestimonialComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestimonialComponent", function() { return TestimonialComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/UI_service/media-control.service */ "./src/app/shared/UI_service/media-control.service.ts");
/* harmony import */ var angular_responsive_carousel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular-responsive-carousel */ "./node_modules/angular-responsive-carousel/__ivy_ngcc__/fesm2015/angular-responsive-carousel.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var ng_zorro_antd_avatar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-zorro-antd/avatar */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-avatar.js");
/* harmony import */ var ng_zorro_antd_typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng-zorro-antd/typography */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-typography.js");
/* harmony import */ var _shared_components_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../shared/components/pipes/truncate.pipe */ "./src/app/shared/components/pipes/truncate.pipe.ts");








const _c0 = function () { return [420]; };
function TestimonialComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "nz-avatar", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "h4", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "h3", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](8, "truncate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "i", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzSize", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzEllipsisRows", 2)("innerHTML", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](8, 4, item_r1.description, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](7, _c0)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeHtml"]);
} }
class TestimonialComponent {
    constructor(_viewMedia) {
        this._viewMedia = _viewMedia;
        this.persons = [
            { name: 'Mark Ruffalo', img: 'https://i.insider.com/5d3b271c36e03c17f03d6946?width=600&format=jpeg&auto=webp' },
            { name: 'Alex Wolff', img: 'https://vignette.wikia.nocookie.net/collider/images/1/1f/Alex-wolff-age-1529006828-view-0.jpg/revision/latest?cb=20181119020148' },
            { name: 'Katherine Langford', img: 'https://assets.capitalfm.com/2020/28/katherine-langford-1594918637-view-0.jpg' },
            { name: 'jason momoa', img: 'https://www.w3schools.com/howto/img_avatar.png' }
        ];
    }
    // sm: 340,
    // md: 355,
    // lg: 440,
    ngOnInit() {
    }
}
TestimonialComponent.ɵfac = function TestimonialComponent_Factory(t) { return new (t || TestimonialComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_1__["MediaControlService"])); };
TestimonialComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TestimonialComponent, selectors: [["app-testimonial"]], inputs: { reviews: "reviews" }, decls: 6, vars: 5, consts: [[1, "testimonial_page", "page_p_y"], [1, "app_dashboard_heading"], [1, "carousel_container", "page_y"], ["height", "350", 3, "dots", "arrows", "cellWidth", "objectFit"], ["class", "carousel-cell", 4, "ngFor", "ngForOf"], [1, "carousel-cell"], [1, "testimonial_card", "center_xy", "app_shadow_b", "text-center"], ["nzIcon", "user", 1, "mar-10", 3, "nzSize"], [1, "name"], ["nz-typography", "", "nzEllipsis", "", "nzExpandable", "", 3, "nzEllipsisRows", "innerHTML"], [1, "fa", "fa-quote-left", "quote_mark", "themes_text_invert"]], template: function TestimonialComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Testimonial");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "carousel", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, TestimonialComponent_div_5_Template, 10, 8, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dots", true)("arrows", false)("cellWidth", 355)("objectFit", "cover");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.reviews);
    } }, directives: [angular_responsive_carousel__WEBPACK_IMPORTED_MODULE_2__["CarouselComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], ng_zorro_antd_avatar__WEBPACK_IMPORTED_MODULE_4__["NzAvatarComponent"], ng_zorro_antd_typography__WEBPACK_IMPORTED_MODULE_5__["NzTypographyComponent"]], pipes: [_shared_components_pipes_truncate_pipe__WEBPACK_IMPORTED_MODULE_6__["TruncatePipe"]], styles: [".testimonial_page[_ngcontent-%COMP%] {\n  background-color: white;\n  position: relative;\n  z-index: 1;\n}\n.carousel_container[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.carousel_card[_ngcontent-%COMP%] {\n  height: 350px;\n  width: 430px;\n  background-color: #cccaca;\n  border-radius: 13px;\n  border: 1px solid #ecebeb;\n}\n.carousel_card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 90px !important;\n}\n.testimonial_card[_ngcontent-%COMP%] {\n  width: 100%;\n  background-color: white;\n  border-radius: 13px;\n  border: 1px solid #ecebeb;\n  position: relative;\n}\n.quote_mark[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 1px;\n  left: 19px;\n  font-size: 30px;\n}\n.T_avtar[_ngcontent-%COMP%] {\n  width: 100px;\n  height: 100px;\n  background-size: cover;\n  background-position: center center;\n  background-repeat: no-repeat;\n  margin-left: auto;\n  margin-right: auto;\n  border-radius: 50%;\n}\n.testimonial_card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: black;\n  padding: 0px 5px 0px 5px;\n  margin-top: 10px;\n}\n.testimonial_card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  display: block;\n  margin: auto;\n  border-radius: 50%;\n  width: 90px !important;\n}\n.testimonial_card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #707070;\n  font-size: 15px;\n  text-align: center;\n  padding-top: 15px;\n  padding-bottom: 19px;\n  font-family: \"ralewayregular\";\n  font-weight: normal !important;\n  letter-spacing: 1px;\n  line-height: 1.5;\n}\n.name[_ngcontent-%COMP%] {\n  color: #2e7c86;\n  text-align: center;\n  font-size: 16px !important;\n  font-family: \"hel-bold\";\n}\n.testimonial_card[_ngcontent-%COMP%]   .post[_ngcontent-%COMP%] {\n  color: black;\n  text-align: center;\n  font-size: 12px;\n  font-weight: 500;\n  line-height: 6px;\n  font-family: \"hel-reg\";\n}\n@media screen and (max-width: 768px) {\n  .testimonial_page[_ngcontent-%COMP%] {\n    padding-bottom: 0px;\n  }\n  .testimonial_heading[_ngcontent-%COMP%] {\n    text-align: start;\n    font-size: 28px;\n    padding: 5px 0px 6px 0px;\n  }\n  .testimonial_card[_ngcontent-%COMP%] {\n    width: 98%;\n  }\n}\n@media screen and (max-width: 360px) {\n  .testimonial_card[_ngcontent-%COMP%] {\n    width: 93%;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZG9jdG9yLXBvcnRhbC9wYWdlL3Rlc3RpbW9uaWFsL0Y6L09GRklDRSBXT1JLL0RJR0lTQ1JJQkUvT2ZmaWNlX1Byb2plY3RzL2FwcGxpY2F0aW9uL3BhdGllbnRfcG9ydGFsL3NyYy9hcHAvZG9jdG9yLXBvcnRhbC9wYWdlL3Rlc3RpbW9uaWFsL3Rlc3RpbW9uaWFsLmNvbXBvbmVudC5sZXNzIiwic3JjL2FwcC9kb2N0b3ItcG9ydGFsL3BhZ2UvdGVzdGltb25pYWwvdGVzdGltb25pYWwuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtBQ0NGO0FEQ0E7RUFDRSxXQUFBO0FDQ0Y7QURDQTtFQUNFLGFBQUE7RUFDQSxZQUFBO0VBQ0EseUJBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0FDQ0Y7QURDQTtFQUNFLHNCQUFBO0FDQ0Y7QURDQTtFQUVFLFdBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkFBQTtBQ0FGO0FERUE7RUFDRSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxVQUFBO0VBQ0EsZUFBQTtBQ0FGO0FERUE7RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0Esa0NBQUE7RUFDQSw0QkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtBQ0FGO0FER0E7RUFDRSxZQUFBO0VBQ0Esd0JBQUE7RUFDQSxnQkFBQTtBQ0RGO0FER0E7RUFDRSxjQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0Esc0JBQUE7QUNERjtBREdBO0VBQ0UsY0FBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0Esb0JBQUE7RUFDQSw2QkFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtBQ0RGO0FER0E7RUFDRSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSwwQkFBQTtFQUNBLHVCQUFBO0FDREY7QURHQTtFQUNFLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0Esc0JBQUE7QUNERjtBRElBO0VBQ0U7SUFDRSxtQkFBQTtFQ0ZGO0VESUE7SUFDRSxpQkFBQTtJQUNBLGVBQUE7SUFDQSx3QkFBQTtFQ0ZGO0VESUE7SUFDRSxVQUFBO0VDRkY7QUFDRjtBRElBO0VBQ0U7SUFDRSxVQUFBO0VDRkY7QUFDRiIsImZpbGUiOiJzcmMvYXBwL2RvY3Rvci1wb3J0YWwvcGFnZS90ZXN0aW1vbmlhbC90ZXN0aW1vbmlhbC5jb21wb25lbnQubGVzcyIsInNvdXJjZXNDb250ZW50IjpbIi50ZXN0aW1vbmlhbF9wYWdlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgei1pbmRleDogMTtcbn1cbi5jYXJvdXNlbF9jb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbn1cbi5jYXJvdXNlbF9jYXJkIHtcbiAgaGVpZ2h0OiAzNTBweDtcbiAgd2lkdGg6IDQzMHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjA0LCAyMDIsIDIwMik7XG4gIGJvcmRlci1yYWRpdXM6IDEzcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYigyMzYsIDIzNSwgMjM1KTtcbn1cbi5jYXJvdXNlbF9jYXJkIGltZyB7XG4gIHdpZHRoOiA5MHB4ICFpbXBvcnRhbnQ7XG59XG4udGVzdGltb25pYWxfY2FyZCB7XG4gIC8vIGhlaWdodDogMzUwcHg7XG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgYm9yZGVyLXJhZGl1czogMTNweDtcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiKDIzNiwgMjM1LCAyMzUpO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4ucXVvdGVfbWFyayB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxcHg7XG4gIGxlZnQ6IDE5cHg7XG4gIGZvbnQtc2l6ZTogMzBweDtcbn1cbi5UX2F2dGFyIHtcbiAgd2lkdGg6IDEwMHB4O1xuICBoZWlnaHQ6IDEwMHB4O1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG59XG5cbi50ZXN0aW1vbmlhbF9jYXJkIHNwYW4ge1xuICBjb2xvcjogYmxhY2s7XG4gIHBhZGRpbmc6IDBweCA1cHggMHB4IDVweDtcbiAgbWFyZ2luLXRvcDogMTBweDtcbn1cbi50ZXN0aW1vbmlhbF9jYXJkIHNwYW4gaW1nIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbjogYXV0bztcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICB3aWR0aDogOTBweCAhaW1wb3J0YW50O1xufVxuLnRlc3RpbW9uaWFsX2NhcmQgc3BhbiBoMyB7XG4gIGNvbG9yOiAjNzA3MDcwO1xuICBmb250LXNpemU6IDE1cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcGFkZGluZy10b3A6IDE1cHg7XG4gIHBhZGRpbmctYm90dG9tOiAxOXB4O1xuICBmb250LWZhbWlseTogXCJyYWxld2F5cmVndWxhclwiO1xuICBmb250LXdlaWdodDogbm9ybWFsICFpbXBvcnRhbnQ7XG4gIGxldHRlci1zcGFjaW5nOiAxcHg7XG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG59XG4ubmFtZSB7XG4gIGNvbG9yOiAjMmU3Yzg2O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMTZweCAhaW1wb3J0YW50O1xuICBmb250LWZhbWlseTogXCJoZWwtYm9sZFwiO1xufVxuLnRlc3RpbW9uaWFsX2NhcmQgLnBvc3Qge1xuICBjb2xvcjogYmxhY2s7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBmb250LXdlaWdodDogNTAwO1xuICBsaW5lLWhlaWdodDogNnB4O1xuICBmb250LWZhbWlseTogXCJoZWwtcmVnXCI7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC50ZXN0aW1vbmlhbF9wYWdlIHtcbiAgICBwYWRkaW5nLWJvdHRvbTogMHB4O1xuICB9XG4gIC50ZXN0aW1vbmlhbF9oZWFkaW5nIHtcbiAgICB0ZXh0LWFsaWduOiBzdGFydDtcbiAgICBmb250LXNpemU6IDI4cHg7XG4gICAgcGFkZGluZzogNXB4IDBweCA2cHggMHB4O1xuICB9XG4gIC50ZXN0aW1vbmlhbF9jYXJkIHtcbiAgICB3aWR0aDogOTglO1xuICB9XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAzNjBweCkge1xuICAudGVzdGltb25pYWxfY2FyZCB7XG4gICAgd2lkdGg6IDkzJTtcbiAgfVxufVxuIiwiLnRlc3RpbW9uaWFsX3BhZ2Uge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB6LWluZGV4OiAxO1xufVxuLmNhcm91c2VsX2NvbnRhaW5lciB7XG4gIHdpZHRoOiAxMDAlO1xufVxuLmNhcm91c2VsX2NhcmQge1xuICBoZWlnaHQ6IDM1MHB4O1xuICB3aWR0aDogNDMwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNjY2NhY2E7XG4gIGJvcmRlci1yYWRpdXM6IDEzcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlY2ViZWI7XG59XG4uY2Fyb3VzZWxfY2FyZCBpbWcge1xuICB3aWR0aDogOTBweCAhaW1wb3J0YW50O1xufVxuLnRlc3RpbW9uaWFsX2NhcmQge1xuICB3aWR0aDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDEzcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlY2ViZWI7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi5xdW90ZV9tYXJrIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDFweDtcbiAgbGVmdDogMTlweDtcbiAgZm9udC1zaXplOiAzMHB4O1xufVxuLlRfYXZ0YXIge1xuICB3aWR0aDogMTAwcHg7XG4gIGhlaWdodDogMTAwcHg7XG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbn1cbi50ZXN0aW1vbmlhbF9jYXJkIHNwYW4ge1xuICBjb2xvcjogYmxhY2s7XG4gIHBhZGRpbmc6IDBweCA1cHggMHB4IDVweDtcbiAgbWFyZ2luLXRvcDogMTBweDtcbn1cbi50ZXN0aW1vbmlhbF9jYXJkIHNwYW4gaW1nIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbjogYXV0bztcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICB3aWR0aDogOTBweCAhaW1wb3J0YW50O1xufVxuLnRlc3RpbW9uaWFsX2NhcmQgc3BhbiBoMyB7XG4gIGNvbG9yOiAjNzA3MDcwO1xuICBmb250LXNpemU6IDE1cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcGFkZGluZy10b3A6IDE1cHg7XG4gIHBhZGRpbmctYm90dG9tOiAxOXB4O1xuICBmb250LWZhbWlseTogXCJyYWxld2F5cmVndWxhclwiO1xuICBmb250LXdlaWdodDogbm9ybWFsICFpbXBvcnRhbnQ7XG4gIGxldHRlci1zcGFjaW5nOiAxcHg7XG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG59XG4ubmFtZSB7XG4gIGNvbG9yOiAjMmU3Yzg2O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMTZweCAhaW1wb3J0YW50O1xuICBmb250LWZhbWlseTogXCJoZWwtYm9sZFwiO1xufVxuLnRlc3RpbW9uaWFsX2NhcmQgLnBvc3Qge1xuICBjb2xvcjogYmxhY2s7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBmb250LXdlaWdodDogNTAwO1xuICBsaW5lLWhlaWdodDogNnB4O1xuICBmb250LWZhbWlseTogXCJoZWwtcmVnXCI7XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweCkge1xuICAudGVzdGltb25pYWxfcGFnZSB7XG4gICAgcGFkZGluZy1ib3R0b206IDBweDtcbiAgfVxuICAudGVzdGltb25pYWxfaGVhZGluZyB7XG4gICAgdGV4dC1hbGlnbjogc3RhcnQ7XG4gICAgZm9udC1zaXplOiAyOHB4O1xuICAgIHBhZGRpbmc6IDVweCAwcHggNnB4IDBweDtcbiAgfVxuICAudGVzdGltb25pYWxfY2FyZCB7XG4gICAgd2lkdGg6IDk4JTtcbiAgfVxufVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMzYwcHgpIHtcbiAgLnRlc3RpbW9uaWFsX2NhcmQge1xuICAgIHdpZHRoOiA5MyU7XG4gIH1cbn1cbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TestimonialComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-testimonial',
                templateUrl: './testimonial.component.html',
                styleUrls: ['./testimonial.component.less']
            }]
    }], function () { return [{ type: src_app_shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_1__["MediaControlService"] }]; }, { reviews: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/doctor-portal/page/treatements/treatements.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/doctor-portal/page/treatements/treatements.component.ts ***!
  \*************************************************************************/
/*! exports provided: TreatementsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TreatementsComponent", function() { return TreatementsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/UI_service/media-control.service */ "./src/app/shared/UI_service/media-control.service.ts");
/* harmony import */ var ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng-zorro-antd/grid */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-grid.js");
/* harmony import */ var ng_zorro_antd_collapse__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-zorro-antd/collapse */ "./node_modules/ng-zorro-antd/__ivy_ngcc__/fesm2015/ng-zorro-antd-collapse.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");






function TreatementsComponent_nz_collapse_panel_8_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h2", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r2.categoryName);
} }
function TreatementsComponent_nz_collapse_panel_8_div_3_h1_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const data_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", data_r9, " ");
} }
function TreatementsComponent_nz_collapse_panel_8_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, TreatementsComponent_nz_collapse_panel_8_div_3_h1_1_Template, 3, 1, "h1", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", item_r2.subCategories);
} }
const _c0 = function (a0) { return { "themes_bg": a0 }; };
function TreatementsComponent_nz_collapse_panel_8_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nz-collapse-panel", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TreatementsComponent_nz_collapse_panel_8_Template_nz_collapse_panel_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12); const i_r3 = ctx.index; const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r11.collapse(i_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, TreatementsComponent_nz_collapse_panel_8_ng_template_1_Template, 2, 1, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, TreatementsComponent_nz_collapse_panel_8_div_3_Template, 2, 1, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const i_r3 = ctx.index;
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzHeader", _r4)("nzActive", ctx_r0.collapseNum == i_r3)("nzShowArrow", true)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](5, _c0, ctx_r0.collapseNum == i_r3));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", item_r2.subCategories.length > 0);
} }
const _c1 = function () { return { span: 24 }; };
const _c2 = function () { return { span: 10 }; };
function TreatementsComponent_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "img", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](2, _c1))("nzLg", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](3, _c2));
} }
const _c3 = function (a0, a1) { return [a0, a1]; };
const _c4 = function () { return { span: 14 }; };
class TreatementsComponent {
    constructor(_viewMedia) {
        this._viewMedia = _viewMedia;
        this.tab_toggle = true;
        this.hGutter = 70;
        this.vGutter = 70;
        this.panel = [1, 2, 3, 4, 5, 6];
        this.collapseNum = 0;
    }
    ngOnInit() {
    }
    ngAfterContentChecked() {
        this.thisDevice = this._viewMedia.mediaPort();
        if (this._viewMedia.winMedia) {
            this.hGutter = 10;
            this.vGutter = 10;
        }
    }
    dataToggle(param) {
        this.tab_toggle = param;
    }
    collapse(param) {
        this.collapseNum = param;
    }
}
TreatementsComponent.ɵfac = function TreatementsComponent_Factory(t) { return new (t || TreatementsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_1__["MediaControlService"])); };
TreatementsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TreatementsComponent, selectors: [["app-treatements"]], inputs: { treatments: "treatments" }, decls: 10, vars: 11, consts: [[1, "treatements", "page_p_y"], [1, "treatements_container"], [1, "app_dashboard_heading"], ["nz-row", "", "nz-row", "", 1, "page_y", 3, "nzGutter"], ["nz-col", "", 1, "gutter-row", 3, "nzXs", "nzLg"], [1, "accordion"], ["nzAccordion", "", 1, "app_shadow_b", 3, "nzExpandIconPosition"], [3, "nzHeader", "nzActive", "nzShowArrow", "ngClass", "click", 4, "ngFor", "ngForOf"], [4, "ngIf"], [3, "nzHeader", "nzActive", "nzShowArrow", "ngClass", "click"], ["categoryName", ""], ["class", "accordion_box", 4, "ngIf"], [1, "categoryName"], [1, "accordion_box"], ["class", "Accordion_data_list", 4, "ngFor", "ngForOf"], [1, "Accordion_data_list"], ["src", "assets/icon/arrowGrey.svg", "width", "28px", "alt", ""], [1, "treatements_img_container"], ["src", "https://images.unsplash.com/photo-1534057308991-b9b3a578f1b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80", "alt", "", 1, "img-res"]], template: function TreatementsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h2", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "treatement");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "nz-collapse", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, TreatementsComponent_nz_collapse_panel_8_Template, 4, 7, "nz-collapse-panel", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, TreatementsComponent_ng_container_9_Template, 4, 4, "ng-container", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzGutter", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](6, _c3, ctx.hGutter, ctx.vGutter));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzXs", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](9, _c1))("nzLg", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](10, _c4));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzExpandIconPosition", "right");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.treatments);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.thisDevice);
    } }, directives: [ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_2__["NzRowDirective"], ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_2__["NzColDirective"], ng_zorro_antd_collapse__WEBPACK_IMPORTED_MODULE_3__["NzCollapseComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], ng_zorro_antd_collapse__WEBPACK_IMPORTED_MODULE_3__["NzCollapsePanelComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgClass"]], styles: [".treatements[_ngcontent-%COMP%] {\n  height: auto;\n  background: white;\n}\n.accordion[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 599px;\n  margin-top: 8px;\n  margin-bottom: 3px;\n}\n.treatements_img_container[_ngcontent-%COMP%] {\n  height: 599px;\n  width: 100%;\n}\n.treatements_img_container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  height: 599px;\n  width: 100%;\n}\nnz-collapse-panel[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  position: relative;\n}\nnz-collapse[_ngcontent-%COMP%] {\n  border: none;\n  padding: 0px;\n}\n.accordion_box[_ngcontent-%COMP%] {\n  height: 155px;\n  overflow-y: scroll;\n}\n.Accordion_panel[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 22px;\n  line-height: 30px;\n  font-weight: normal;\n  text-transform: capitalize;\n  padding-top: 4px;\n  padding-bottom: 4px;\n  font-family: \"hel-reg\";\n}\n.treatements_container[_ngcontent-%COMP%] {\n  padding: 1px;\n}\n.Accordion_panel[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  float: right;\n}\n.Accordion_data_list[_ngcontent-%COMP%] {\n  font-size: 19px;\n  line-height: 30px;\n  color: #656565;\n  font-weight: normal;\n  position: relative;\n  font-family: \"hel-reg\";\n}\n.Accordion_data_list[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 17px;\n  right: 0;\n}\n[nzType=\"up\"][_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.categoryName[_ngcontent-%COMP%] {\n  font-size: 19px;\n  line-height: 25px;\n  font-weight: normal;\n  text-transform: capitalize;\n  font-family: \"hel-reg\";\n}\n@media screen and (max-width: 768px) {\n  .treatements_img_container[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .accordion[_ngcontent-%COMP%] {\n    width: 100%;\n    height: 599px;\n    margin-top: 8px;\n    margin-bottom: 3px;\n  }\n  .Accordion_data_list[_ngcontent-%COMP%] {\n    font-size: 15px;\n    line-height: 22px;\n    color: #656565;\n    font-weight: normal;\n    position: relative;\n  }\n  .Accordion_panel[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 16px;\n    line-height: 22px;\n    font-weight: normal;\n    text-transform: capitalize;\n    padding-top: 4px;\n    padding-bottom: 4px;\n  }\n  .accordion[_ngcontent-%COMP%] {\n    height: auto;\n  }\n  .accordion_box[_ngcontent-%COMP%] {\n    height: 147px;\n    overflow-y: scroll;\n  }\n}\nnz-collapse-panel[_ngcontent-%COMP%] {\n  background-color: white;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZG9jdG9yLXBvcnRhbC9wYWdlL3RyZWF0ZW1lbnRzL0Y6L09GRklDRSBXT1JLL0RJR0lTQ1JJQkUvT2ZmaWNlX1Byb2plY3RzL2FwcGxpY2F0aW9uL3BhdGllbnRfcG9ydGFsL3NyYy9hcHAvZG9jdG9yLXBvcnRhbC9wYWdlL3RyZWF0ZW1lbnRzL3RyZWF0ZW1lbnRzLmNvbXBvbmVudC5sZXNzIiwic3JjL2FwcC9kb2N0b3ItcG9ydGFsL3BhZ2UvdHJlYXRlbWVudHMvdHJlYXRlbWVudHMuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFBO0VBQ0EsaUJBQUE7QUNDRjtBRENBO0VBQ0UsV0FBQTtFQUNBLGFBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QUNDRjtBRENBO0VBQ0UsYUFBQTtFQUNBLFdBQUE7QUNDRjtBRENBO0VBQ0UsYUFBQTtFQUNBLFdBQUE7QUNDRjtBRENBO0VBQ0Usa0JBQUE7RUFDQSxrQkFBQTtBQ0NGO0FEQ0E7RUFDRSxZQUFBO0VBQ0EsWUFBQTtBQ0NGO0FEQ0E7RUFDRSxhQUFBO0VBQ0Esa0JBQUE7QUNDRjtBREVBO0VBQ0UsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSwwQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtBQ0FGO0FERUE7RUFDRSxZQUFBO0FDQUY7QURFQTtFQUNFLFlBQUE7QUNBRjtBREVBO0VBQ0UsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQkFBQTtBQ0FGO0FERUE7RUFDRSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxRQUFBO0FDQUY7QURFQTtFQUNFLGVBQUE7QUNBRjtBREVBO0VBQ0UsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSwwQkFBQTtFQUNBLHNCQUFBO0FDQUY7QURFQTtFQUNFO0lBQ0UsV0FBQTtFQ0FGO0VERUE7SUFDRSxXQUFBO0lBQ0EsYUFBQTtJQUNBLGVBQUE7SUFDQSxrQkFBQTtFQ0FGO0VERUE7SUFDRSxlQUFBO0lBQ0EsaUJBQUE7SUFDQSxjQUFBO0lBQ0EsbUJBQUE7SUFDQSxrQkFBQTtFQ0FGO0VERUE7SUFDRSxlQUFBO0lBQ0EsaUJBQUE7SUFDQSxtQkFBQTtJQUNBLDBCQUFBO0lBQ0EsZ0JBQUE7SUFDQSxtQkFBQTtFQ0FGO0VERUE7SUFDRSxZQUFBO0VDQUY7RURFQTtJQUNFLGFBQUE7SUFDQSxrQkFBQTtFQ0FGO0FBQ0Y7QURFQTtFQUNFLHVCQUFBO0FDQUYiLCJmaWxlIjoic3JjL2FwcC9kb2N0b3ItcG9ydGFsL3BhZ2UvdHJlYXRlbWVudHMvdHJlYXRlbWVudHMuY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudHJlYXRlbWVudHMge1xuICBoZWlnaHQ6IGF1dG87XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xufVxuLmFjY29yZGlvbiB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDU5OXB4O1xuICBtYXJnaW4tdG9wOiA4cHg7XG4gIG1hcmdpbi1ib3R0b206IDNweDtcbn1cbi50cmVhdGVtZW50c19pbWdfY29udGFpbmVyIHtcbiAgaGVpZ2h0OiA1OTlweDtcbiAgd2lkdGg6IDEwMCU7XG59XG4udHJlYXRlbWVudHNfaW1nX2NvbnRhaW5lciBpbWcge1xuICBoZWlnaHQ6IDU5OXB4O1xuICB3aWR0aDogMTAwJTtcbn1cbm56LWNvbGxhcHNlLXBhbmVsIHtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5uei1jb2xsYXBzZSB7XG4gIGJvcmRlcjogbm9uZTtcbiAgcGFkZGluZzogMHB4O1xufVxuLmFjY29yZGlvbl9ib3gge1xuICBoZWlnaHQ6IDE1NXB4O1xuICBvdmVyZmxvdy15OiBzY3JvbGw7XG4gIC8vIGJhY2tncm91bmQtY29sb3I6ICNmMWYyZjY7XG59XG4uQWNjb3JkaW9uX3BhbmVsIGgxIHtcbiAgZm9udC1zaXplOiAyMnB4O1xuICBsaW5lLWhlaWdodDogMzBweDtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG4gIHBhZGRpbmctdG9wOiA0cHg7XG4gIHBhZGRpbmctYm90dG9tOiA0cHg7XG4gIGZvbnQtZmFtaWx5OiBcImhlbC1yZWdcIjtcbn1cbi50cmVhdGVtZW50c19jb250YWluZXIge1xuICBwYWRkaW5nOiAxcHg7XG59XG4uQWNjb3JkaW9uX3BhbmVsIGgxIGkge1xuICBmbG9hdDogcmlnaHQ7XG59XG4uQWNjb3JkaW9uX2RhdGFfbGlzdCB7XG4gIGZvbnQtc2l6ZTogMTlweDtcbiAgbGluZS1oZWlnaHQ6IDMwcHg7XG4gIGNvbG9yOiAjNjU2NTY1O1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGZvbnQtZmFtaWx5OiBcImhlbC1yZWdcIjtcbn1cbi5BY2NvcmRpb25fZGF0YV9saXN0IGltZyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxN3B4O1xuICByaWdodDogMDtcbn1cbltuelR5cGU9XCJ1cFwiXSB7XG4gIGZvbnQtc2l6ZTogMTdweDtcbn1cbi5jYXRlZ29yeU5hbWUge1xuICBmb250LXNpemU6IDE5cHg7XG4gIGxpbmUtaGVpZ2h0OiAyNXB4O1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbiAgZm9udC1mYW1pbHk6IFwiaGVsLXJlZ1wiO1xufVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgLnRyZWF0ZW1lbnRzX2ltZ19jb250YWluZXIge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG4gIC5hY2NvcmRpb24ge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogNTk5cHg7XG4gICAgbWFyZ2luLXRvcDogOHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDNweDtcbiAgfVxuICAuQWNjb3JkaW9uX2RhdGFfbGlzdCB7XG4gICAgZm9udC1zaXplOiAxNXB4O1xuICAgIGxpbmUtaGVpZ2h0OiAyMnB4O1xuICAgIGNvbG9yOiAjNjU2NTY1O1xuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB9XG4gIC5BY2NvcmRpb25fcGFuZWwgaDEge1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICBsaW5lLWhlaWdodDogMjJweDtcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuICAgIHBhZGRpbmctdG9wOiA0cHg7XG4gICAgcGFkZGluZy1ib3R0b206IDRweDtcbiAgfVxuICAuYWNjb3JkaW9uIHtcbiAgICBoZWlnaHQ6IGF1dG87XG4gIH1cbiAgLmFjY29yZGlvbl9ib3gge1xuICAgIGhlaWdodDogMTQ3cHg7XG4gICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuICB9XG59XG5uei1jb2xsYXBzZS1wYW5lbCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xufVxuIiwiLnRyZWF0ZW1lbnRzIHtcbiAgaGVpZ2h0OiBhdXRvO1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbn1cbi5hY2NvcmRpb24ge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiA1OTlweDtcbiAgbWFyZ2luLXRvcDogOHB4O1xuICBtYXJnaW4tYm90dG9tOiAzcHg7XG59XG4udHJlYXRlbWVudHNfaW1nX2NvbnRhaW5lciB7XG4gIGhlaWdodDogNTk5cHg7XG4gIHdpZHRoOiAxMDAlO1xufVxuLnRyZWF0ZW1lbnRzX2ltZ19jb250YWluZXIgaW1nIHtcbiAgaGVpZ2h0OiA1OTlweDtcbiAgd2lkdGg6IDEwMCU7XG59XG5uei1jb2xsYXBzZS1wYW5lbCB7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxubnotY29sbGFwc2Uge1xuICBib3JkZXI6IG5vbmU7XG4gIHBhZGRpbmc6IDBweDtcbn1cbi5hY2NvcmRpb25fYm94IHtcbiAgaGVpZ2h0OiAxNTVweDtcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xufVxuLkFjY29yZGlvbl9wYW5lbCBoMSB7XG4gIGZvbnQtc2l6ZTogMjJweDtcbiAgbGluZS1oZWlnaHQ6IDMwcHg7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuICBwYWRkaW5nLXRvcDogNHB4O1xuICBwYWRkaW5nLWJvdHRvbTogNHB4O1xuICBmb250LWZhbWlseTogXCJoZWwtcmVnXCI7XG59XG4udHJlYXRlbWVudHNfY29udGFpbmVyIHtcbiAgcGFkZGluZzogMXB4O1xufVxuLkFjY29yZGlvbl9wYW5lbCBoMSBpIHtcbiAgZmxvYXQ6IHJpZ2h0O1xufVxuLkFjY29yZGlvbl9kYXRhX2xpc3Qge1xuICBmb250LXNpemU6IDE5cHg7XG4gIGxpbmUtaGVpZ2h0OiAzMHB4O1xuICBjb2xvcjogIzY1NjU2NTtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBmb250LWZhbWlseTogXCJoZWwtcmVnXCI7XG59XG4uQWNjb3JkaW9uX2RhdGFfbGlzdCBpbWcge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMTdweDtcbiAgcmlnaHQ6IDA7XG59XG5bbnpUeXBlPVwidXBcIl0ge1xuICBmb250LXNpemU6IDE3cHg7XG59XG4uY2F0ZWdvcnlOYW1lIHtcbiAgZm9udC1zaXplOiAxOXB4O1xuICBsaW5lLWhlaWdodDogMjVweDtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG4gIGZvbnQtZmFtaWx5OiBcImhlbC1yZWdcIjtcbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC50cmVhdGVtZW50c19pbWdfY29udGFpbmVyIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuICAuYWNjb3JkaW9uIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDU5OXB4O1xuICAgIG1hcmdpbi10b3A6IDhweDtcbiAgICBtYXJnaW4tYm90dG9tOiAzcHg7XG4gIH1cbiAgLkFjY29yZGlvbl9kYXRhX2xpc3Qge1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICBsaW5lLWhlaWdodDogMjJweDtcbiAgICBjb2xvcjogIzY1NjU2NTtcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgfVxuICAuQWNjb3JkaW9uX3BhbmVsIGgxIHtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgbGluZS1oZWlnaHQ6IDIycHg7XG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbiAgICBwYWRkaW5nLXRvcDogNHB4O1xuICAgIHBhZGRpbmctYm90dG9tOiA0cHg7XG4gIH1cbiAgLmFjY29yZGlvbiB7XG4gICAgaGVpZ2h0OiBhdXRvO1xuICB9XG4gIC5hY2NvcmRpb25fYm94IHtcbiAgICBoZWlnaHQ6IDE0N3B4O1xuICAgIG92ZXJmbG93LXk6IHNjcm9sbDtcbiAgfVxufVxubnotY29sbGFwc2UtcGFuZWwge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TreatementsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-treatements',
                templateUrl: './treatements.component.html',
                styleUrls: ['./treatements.component.less']
            }]
    }], function () { return [{ type: _shared_UI_service_media_control_service__WEBPACK_IMPORTED_MODULE_1__["MediaControlService"] }]; }, { treatments: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/interface/patient.ts":
/*!**************************************!*\
  !*** ./src/app/interface/patient.ts ***!
  \**************************************/
/*! exports provided: Patient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Patient", function() { return Patient; });
class Patient {
    constructor() {
        this.otherDiseases = [];
        this.knownAllergies = [];
    }
    //   proofImageUrl?: string; //proof of residence and name
    //   isPregnant?: boolean;
    //   pastSurgery?: { value: string[]; when: string };
    //   occupation?: string;
    //   lastPhysicalCheckup?: { date: string; doctorName: string };
    //   currentMedications?: string[];
    //   knownDrugAllergies?: string[];
    //   knownFoodAllergies?: string[];
    //   knowCronicIllness?: string[];
    static get default() {
        return {
            _id: "",
            patient_title: "",
            channels: [],
            patient_marital_status: "",
            type: "patient",
            doc_id: "",
            patient_age: 0,
            patient_age_day: 0,
            patient_height_feet: 0,
            patient_height_inch: 0,
            patient_phone: "",
            patient_id: "",
            patient_email: "",
            patient_dob: "",
            patient_blood_type: "",
            patient_name: "",
            patient_last_name: "",
            patient_gender: "",
            patient_weight: "",
            patient_state: '',
            patient_height: 0,
            patient_address_line_1: "",
            patient_address_line_2: "",
            patient_city: "",
            patient_pincode: 0,
            isVerify: false,
            timestamp: Math.floor(new Date().getTime()),
            created_date: "",
            patient_weight_kgs: 0,
            patient_age_month: 0,
            isOnline: true,
            patient_img_path: "",
            patient_img_local: "",
            patient_img_name: "",
            patientImgOffline: false,
            prescriptionlang: "en",
        };
    }
}


/***/ }),

/***/ "./src/app/services/lazy.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/lazy.service.ts ***!
  \******************************************/
/*! exports provided: LazyService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LazyService", function() { return LazyService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");





class LazyService {
    constructor(doc) {
        this.doc = doc;
        this.list = {};
        this.cached = {};
        this._notify = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
    }
    get change() {
        return this._notify.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["share"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])((ls) => ls.length !== 0));
    }
    clear() {
        this.list = {};
        this.cached = {};
    }
    load(paths) {
        if (!Array.isArray(paths)) {
            paths = [paths];
        }
        const promises = [];
        paths.forEach((path) => {
            if (path.endsWith('.js')) {
                promises.push(this.loadScript(path));
            }
            else {
                promises.push(this.loadStyle(path));
            }
        });
        return Promise.all(promises).then((res) => {
            this._notify.next(res);
            return Promise.resolve(res);
        });
    }
    loadScript(path, innerContent) {
        return new Promise((resolve, reject) => {
            if (this.list[path] === true) {
                resolve(Object.assign(Object.assign({}, this.cached[path]), { status: 'loading' }));
                return;
            }
            this.list[path] = true;
            const onSuccess = (item) => {
                this.cached[path] = item;
                resolve(item);
                this._notify.next([item]);
            };
            const onError = (item) => {
                this.cached[path] = item;
                reject(item);
                this._notify.next([item]);
            };
            const node = this.doc.createElement('script');
            node.type = 'text/javascript';
            node.src = path;
            node.charset = 'utf-8';
            if (innerContent) {
                node.innerHTML = innerContent;
            }
            if (node.readyState) {
                // IE
                node.onreadystatechange = () => {
                    if (node.readyState === 'loaded' || node.readyState === 'complete') {
                        node.onreadystatechange = null;
                        onSuccess({
                            path,
                            status: 'ok',
                        });
                    }
                };
            }
            else {
                node.onload = () => onSuccess({
                    path,
                    status: 'ok',
                });
            }
            node.onerror = (error) => onError({
                path,
                status: 'error',
                error,
            });
            this.doc.getElementsByTagName('head')[0].appendChild(node);
        });
    }
    loadStyle(path, rel = 'stylesheet', innerContent) {
        return new Promise((resolve) => {
            if (this.list[path] === true) {
                resolve(this.cached[path]);
                return;
            }
            this.list[path] = true;
            const node = this.doc.createElement('link');
            node.rel = rel;
            node.type = 'text/css';
            node.href = path;
            if (innerContent) {
                node.innerHTML = innerContent;
            }
            this.doc.getElementsByTagName('head')[0].appendChild(node);
            const item = {
                path,
                status: 'ok',
            };
            this.cached[path] = item;
            resolve(item);
        });
    }
}
LazyService.ɵfac = function LazyService_Factory(t) { return new (t || LazyService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"])); };
LazyService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: LazyService, factory: LazyService.ɵfac });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LazyService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"]]
            }] }]; }, null); })();


/***/ }),

/***/ "./src/app/services/patient-service/socket-service.service.ts":
/*!********************************************************************!*\
  !*** ./src/app/services/patient-service/socket-service.service.ts ***!
  \********************************************************************/
/*! exports provided: SocketServiceService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocketServiceService", function() { return SocketServiceService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var socket_io_client_build_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! socket.io-client/build/index */ "./node_modules/socket.io-client/build/index.js");
/* harmony import */ var socket_io_client_build_index__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(socket_io_client_build_index__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _doctor_service_doctor_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../doctor-service/doctor.service */ "./src/app/services/doctor-service/doctor.service.ts");







class SocketServiceService {
    constructor(doctorService) {
        this.doctorCalling = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](null);
        console.log("Socket service");
        doctorService.doctorUsernameChanged$.subscribe((data) => {
            if (data) {
                this.disconnect();
            }
        });
    }
    get doctorCalling$() {
        return this.doctorCalling.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])((node) => !!node));
    }
    get isSocketConnected() {
        return this.socket ? this.socket.connected : false;
    }
    connect(patientId, doctorMobile, doctorId) {
        this.disconnect();
        this.socket = Object(socket_io_client_build_index__WEBPACK_IMPORTED_MODULE_2__["io"])(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiEndpoint, {
            query: {
                userId: patientId,
                doctorId: doctorId,
            },
            transports: ["websocket"],
        });
        this.socket.on("connect", (msg) => {
            console.log("connect called");
            this.joinRoom(doctorMobile);
        });
        this.socket.on("doctorCalling", () => {
            console.log("doctor calling");
            this.doctorCalling.next(true);
        });
        this.socket.on("disconnect", () => {
            console.log("disconnected");
        });
    }
    disconnect() {
        console.log("disconnecting");
        try {
            if (this.socket) {
                this.socket.io.removeAllListeners();
                this.socket.disconnect();
                this.socket.close();
                this.socket = null;
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    joinRoom(roomName) {
        this.socket.emit("joinRoom", {
            roomName: roomName,
        });
        console.log("joining room", roomName);
    }
    ngOnDestroy() {
        this.disconnect();
    }
}
SocketServiceService.ɵfac = function SocketServiceService_Factory(t) { return new (t || SocketServiceService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_doctor_service_doctor_service__WEBPACK_IMPORTED_MODULE_5__["DoctorService"])); };
SocketServiceService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: SocketServiceService, factory: SocketServiceService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SocketServiceService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root",
            }]
    }], function () { return [{ type: _doctor_service_doctor_service__WEBPACK_IMPORTED_MODULE_5__["DoctorService"] }]; }, null); })();


/***/ })

}]);
//# sourceMappingURL=doctor-portal-doctor-portal-module.js.map