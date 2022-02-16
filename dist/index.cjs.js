'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var dataGrid = require('@material-ui/data-grid');
var createPlotlyComponent = require('react-plotly.js/factory');
var timeago = require('timeago.js');
var filesize = require('filesize');
var xDataGrid = require('@mui/x-data-grid');
var Link = require('next/link');
var parse = require('html-react-parser');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var createPlotlyComponent__default = /*#__PURE__*/_interopDefaultLegacy(createPlotlyComponent);
var timeago__namespace = /*#__PURE__*/_interopNamespace(timeago);
var filesize__default = /*#__PURE__*/_interopDefaultLegacy(filesize);
var Link__default = /*#__PURE__*/_interopDefaultLegacy(Link);
var parse__default = /*#__PURE__*/_interopDefaultLegacy(parse);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}var AsyncMode=l;var ConcurrentMode=m;var ContextConsumer=k;var ContextProvider=h;var Element=c;var ForwardRef=n;var Fragment=e;var Lazy=t;var Memo=r;var Portal=d;
var Profiler=g;var StrictMode=f;var Suspense=p;var isAsyncMode=function(a){return A(a)||z(a)===l};var isConcurrentMode=A;var isContextConsumer=function(a){return z(a)===k};var isContextProvider=function(a){return z(a)===h};var isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};var isForwardRef=function(a){return z(a)===n};var isFragment=function(a){return z(a)===e};var isLazy=function(a){return z(a)===t};
var isMemo=function(a){return z(a)===r};var isPortal=function(a){return z(a)===d};var isProfiler=function(a){return z(a)===g};var isStrictMode=function(a){return z(a)===f};var isSuspense=function(a){return z(a)===p};
var isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};var typeOf=z;

var reactIs_production_min = {
	AsyncMode: AsyncMode,
	ConcurrentMode: ConcurrentMode,
	ContextConsumer: ContextConsumer,
	ContextProvider: ContextProvider,
	Element: Element,
	ForwardRef: ForwardRef,
	Fragment: Fragment,
	Lazy: Lazy,
	Memo: Memo,
	Portal: Portal,
	Profiler: Profiler,
	StrictMode: StrictMode,
	Suspense: Suspense,
	isAsyncMode: isAsyncMode,
	isConcurrentMode: isConcurrentMode,
	isContextConsumer: isContextConsumer,
	isContextProvider: isContextProvider,
	isElement: isElement,
	isForwardRef: isForwardRef,
	isFragment: isFragment,
	isLazy: isLazy,
	isMemo: isMemo,
	isPortal: isPortal,
	isProfiler: isProfiler,
	isStrictMode: isStrictMode,
	isSuspense: isSuspense,
	isValidElementType: isValidElementType,
	typeOf: typeOf
};

var reactIs_development = createCommonjsModule(function (module, exports) {



if (process.env.NODE_ENV !== "production") {
  (function() {

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}
});
reactIs_development.AsyncMode;
reactIs_development.ConcurrentMode;
reactIs_development.ContextConsumer;
reactIs_development.ContextProvider;
reactIs_development.Element;
reactIs_development.ForwardRef;
reactIs_development.Fragment;
reactIs_development.Lazy;
reactIs_development.Memo;
reactIs_development.Portal;
reactIs_development.Profiler;
reactIs_development.StrictMode;
reactIs_development.Suspense;
reactIs_development.isAsyncMode;
reactIs_development.isConcurrentMode;
reactIs_development.isContextConsumer;
reactIs_development.isContextProvider;
reactIs_development.isElement;
reactIs_development.isForwardRef;
reactIs_development.isFragment;
reactIs_development.isLazy;
reactIs_development.isMemo;
reactIs_development.isPortal;
reactIs_development.isProfiler;
reactIs_development.isStrictMode;
reactIs_development.isSuspense;
reactIs_development.isValidElementType;
reactIs_development.typeOf;

var reactIs = createCommonjsModule(function (module) {

if (process.env.NODE_ENV === 'production') {
  module.exports = reactIs_production_min;
} else {
  module.exports = reactIs_development;
}
});

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret$1 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;

var printWarning$1 = function() {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
  var has$1 = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning$1 = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (has$1(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning$1(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning$1(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (process.env.NODE_ENV !== 'production') {
    loggedTypeFailures = {};
  }
};

var checkPropTypes_1 = checkPropTypes;

var has = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret_1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!reactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (process.env.NODE_ENV !== 'production') {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = objectAssign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes_1;
  ReactPropTypes.resetWarningCache = checkPropTypes_1.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  }  shim.isRequired = shim;
  function getShim() {
    return shim;
  }  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var propTypes = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var ReactIs = reactIs;

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = factoryWithThrowingShims();
}
});

/**
 * Displays dataset in tabular form using data grid
 * @param columns: An array of column names with properties: e.g [{field: "col1", headerName: "col1"}, {field: "col2", headerName: "col2"}]
 * @param data: an array of data objects e.g. [ {col1: 1, col2: 2}, {col1: 5, col2: 7} ]
 */

var Table = function Table(_ref) {
  var columns = _ref.columns,
      data = _ref.data;

  var rows = _toConsumableArray(data);

  rows = rows.map(function (row, i) {
    row['id'] = i;
    return row;
  });
  return /*#__PURE__*/React__default['default'].createElement("div", {
    "data-testid": "tableGrid"
  }, /*#__PURE__*/React__default['default'].createElement(dataGrid.DataGrid, {
    rows: rows,
    columns: columns,
    pageSize: 5
  }));
};

Table.propTypes = {
  columns: propTypes.array.isRequired,
  data: propTypes.array.isRequired
};

var Plot;

var PlotlyChart = function PlotlyChart(_ref) {
  var spec = _ref.spec;

  var _useState = React.useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      plotCreated = _useState2[0],
      setPlotCreated = _useState2[1]; //0: false, 1: true


  React.useEffect(function () {
    Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('plotly.js-basic-dist')); }).then(function (Plotly) {
      //import Plotly dist when Page has been generated
      Plot = createPlotlyComponent__default['default'](Plotly);
      setPlotCreated(1);
    });
  }, []);

  if (!plotCreated) {
    return /*#__PURE__*/React__default['default'].createElement("div", null, "Loading...");
  }

  return /*#__PURE__*/React__default['default'].createElement("div", {
    "data-testid": "plotlyChart"
  }, /*#__PURE__*/React__default['default'].createElement(Plot, _extends({}, spec, {
    layout: {
      autosize: true
    },
    style: {
      width: "100%",
      height: "100%"
    },
    useResizeHandler: true
  })));
};

PlotlyChart.propTypes = {
  spec: propTypes.object.isRequired
};

/**
 * KeyInfo component receives two arguments.
 * @param {Object} descriptor A Frictionless datapackage descriptor object with the following fields
 * @param {Array} resources A Frictionless datapackage resource array
 * @returns React Component
 */

var KeyInfo = function KeyInfo(_ref) {
  var _descriptor$licenses, _descriptor$sources;

  var descriptor = _ref.descriptor,
      resources = _ref.resources;
  var formats = resources.map(function (item) {
    return item.format;
  }).join(', ');
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("section", {
    className: "m-8",
    name: "key-info",
    id: "key-info"
  }, /*#__PURE__*/React__default['default'].createElement("h2", {
    className: "text-xl font-bold mb-4"
  }, "Key info"), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "grid grid-cols-7 gap-4"
  }, /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Files")), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Size")), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Format")), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Created")), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Updated")), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Licenses")), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Sources"))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "grid grid-cols-7 gap-4"
  }, /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl"
  }, resources.length)), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl"
  }, descriptor.size || 'N/A')), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl"
  }, formats)), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl"
  }, descriptor.created && timeago__namespace.format(descriptor.created))), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl"
  }, descriptor.updated && timeago__namespace.format(descriptor.updated))), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl"
  }, ((_descriptor$licenses = descriptor.licenses) === null || _descriptor$licenses === void 0 ? void 0 : _descriptor$licenses.length) && descriptor.licenses.map(function (item, index) {
    return /*#__PURE__*/React__default['default'].createElement("a", {
      className: "text-yellow-600",
      href: item.path || '#',
      title: item.title || '',
      key: index
    }, item.name);
  }))), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl"
  }, ((_descriptor$sources = descriptor.sources) === null || _descriptor$sources === void 0 ? void 0 : _descriptor$sources.length) && descriptor.sources.map(function (item, index) {
    return /*#__PURE__*/React__default['default'].createElement("a", {
      className: "text-yellow-600",
      href: item.path,
      key: index
    }, item.title);
  }))))));
};

KeyInfo.propTypes = {
  descriptor: propTypes.object.isRequired,
  resources: propTypes.array.isRequired
};

/**
 * ResourceInfo component displays all resources in a data package 
 * @param {Array} resources A Frictionless datapackage resource object
 * @returns React Component
 */

var ResourcesInfo = function ResourcesInfo(_ref) {
  var resources = _ref.resources;
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("section", {
    className: "m-8",
    name: "file-list"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "grid grid-cols-7 gap-4"
  }, /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "File")), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Description")), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Size")), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Created")), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Updated")), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-1xl font-bold mb-2"
  }, "Download"))), resources.map(function (resource, index) {
    return /*#__PURE__*/React__default['default'].createElement("div", {
      key: "".concat(index, "_").concat(resource.name),
      className: "grid grid-cols-7 gap-4"
    }, /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
      className: "text-1xl"
    }, resource.title || resource.name)), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
      className: "text-1xl"
    }, resource.description || "No description")), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
      className: "text-1xl"
    }, resource.size ? filesize__default['default'](resource.size, {
      bits: true
    }) : 0)), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
      className: "text-1xl"
    }, resource.created && timeago__namespace.format(resource.created))), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
      className: "text-1xl"
    }, resource.updated && timeago__namespace.format(resource.updated))), /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("h3", {
      className: "text-1xl"
    }, /*#__PURE__*/React__default['default'].createElement("a", {
      className: "text-yellow-600",
      href: resource.path
    }, resource.format))));
  })));
};

ResourcesInfo.propTypes = {
  resources: propTypes.array.isRequired
};

/**
 * ReadMe component displays the markdown description of a datapackage
 * @param {string} readme parsed html of data package readme
 * @returns React Component
 */

var ReadMe = function ReadMe(_ref) {
  var readme = _ref.readme;
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("section", {
    className: "m-8",
    name: "sample-table"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "prose"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    dangerouslySetInnerHTML: {
      __html: readme
    }
  }))));
};

ReadMe.propTypes = {
  readme: propTypes.string.isRequired
};

/**
 * Opens a frictionless resource in data explorer. Data explorer gives you
 * an interface to interact with a resource. That means you can do things like 
 * data filtering, sorting, e.t.c
 * @param resources: A array of frictionless datapackage resource
 */

var DataExplorer = function DataExplorer(_ref) {
  var resources = _ref.resources,
      columnHeaderStyle = _ref.columnHeaderStyle;

  var _React$useState = React__default['default'].useState(0),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      activeTable = _React$useState2[0],
      setActiveTable = _React$useState2[1];

  var _React$useState3 = React__default['default'].useState(true),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      previewMode = _React$useState4[0],
      setPreviewMode = _React$useState4[1];

  var handleTableNameClick = function handleTableNameClick(index) {
    setActiveTable(index);
  };

  var getDataGridTable = function getDataGridTable(resource, columnHeaderStyle) {
    return /*#__PURE__*/React__default['default'].createElement(xDataGrid.DataGrid, {
      sx: {
        '& .table-column-header-style-class': _objectSpread2({
          backgroundColor: '#f5f5f5',
          color: 'black'
        }, columnHeaderStyle)
      },
      key: resource.name,
      columns: generateColumns(resource),
      rows: prepareRows(resource),
      pageSize: 5,
      rowsPerPageOptions: [5]
    });
  };

  var getDataGridSchema = function getDataGridSchema(resource, columnHeaderStyle) {
    return /*#__PURE__*/React__default['default'].createElement(xDataGrid.DataGrid, {
      sx: {
        '& .table-column-header-style-class': _objectSpread2({
          backgroundColor: '#f5f5f5',
          color: 'black'
        }, columnHeaderStyle)
      },
      key: resource.name,
      columns: generateSchemaColumns(),
      rows: prepareSchemaRows(resource),
      pageSize: 5,
      rowsPerPageOptions: [5]
    });
  };

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: "grid grid-cols-12"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "col-span-3"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex"
  }, /*#__PURE__*/React__default['default'].createElement("img", {
    src: "../../assets/files.svg"
  }), /*#__PURE__*/React__default['default'].createElement("h1", {
    className: "font-bold ml-3"
  }, "Files")), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex-col"
  }, resources.map(function (resource, i) {
    return /*#__PURE__*/React__default['default'].createElement("div", {
      key: "res@".concat(i),
      className: "flex"
    }, /*#__PURE__*/React__default['default'].createElement("img", {
      className: "ml-1",
      src: "./file.svg"
    }), /*#__PURE__*/React__default['default'].createElement("button", {
      className: "ml-3 focus:outline-none",
      id: i,
      onClick: function onClick() {
        return handleTableNameClick(i);
      }
    }, i === activeTable ? /*#__PURE__*/React__default['default'].createElement("h3", null, resource.name, ".", resource.format) : /*#__PURE__*/React__default['default'].createElement("h3", {
      className: "text-gray-400"
    }, resource.name, ".", resource.format)));
  }))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "col-span-9 border-2"
  }, /*#__PURE__*/React__default['default'].createElement("h1", {
    className: "font-bold ml-3 mb-2 capitalize"
  }, resources[activeTable].name), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex mr-3"
  }, /*#__PURE__*/React__default['default'].createElement("a", {
    href: resources[activeTable].path
  }, /*#__PURE__*/React__default['default'].createElement("img", {
    className: "ml-3 mr-1",
    src: "./download.svg"
  })), /*#__PURE__*/React__default['default'].createElement("span", null, resources[activeTable].size ? formatResourceSize(resources[activeTable].size) : 'N/A')), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "mr-3 text-gray-500"
  }, "|"), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex mr-3"
  }, /*#__PURE__*/React__default['default'].createElement("span", null, resources[activeTable].sample.length, " rows")), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "mr-3 text-gray-500"
  }, "|"), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex mr-3"
  }, /*#__PURE__*/React__default['default'].createElement("span", null, resources[activeTable].schema.fields.length, " columns"))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex mt-5 mb-4"
  }, /*#__PURE__*/React__default['default'].createElement("button", {
    className: "".concat(previewMode && 'font-bold underline', " ml-3 mr-5 focus:outline-none"),
    onClick: function onClick() {
      return setPreviewMode(!previewMode);
    }
  }, "Preview"), /*#__PURE__*/React__default['default'].createElement("button", {
    className: "".concat(!previewMode && 'font-bold underline', " ml-3 mr-5 focus:outline-none"),
    onClick: function onClick() {
      return setPreviewMode(!previewMode);
    }
  }, "Table Schema")), previewMode && /*#__PURE__*/React__default['default'].createElement("div", {
    className: "ml-3",
    style: {
      height: "370px"
    }
  }, getDataGridTable(resources[activeTable], columnHeaderStyle)), !previewMode && /*#__PURE__*/React__default['default'].createElement("div", {
    className: "ml-3",
    style: {
      height: "370px"
    }
  }, getDataGridSchema(resources[activeTable], columnHeaderStyle))));
};

var generateColumns = function generateColumns(resource) {
  var _resource$schema;

  return (_resource$schema = resource.schema) === null || _resource$schema === void 0 ? void 0 : _resource$schema.fields.map(function (field) {
    return {
      field: field.name,
      headerName: field.name,
      width: 150,
      description: field.description,
      headerClassName: 'table-column-header-style-class'
    };
  });
};

var prepareRows = function prepareRows(resource) {
  return resource.sample.map(function (row, i) {
    row['id'] = i;
    return row;
  });
};

var generateSchemaColumns = function generateSchemaColumns() {
  return [{
    field: "name",
    headerName: "Field",
    flex: 0.5,
    description: "Field name",
    headerClassName: 'table-column-header-style-class'
  }, {
    field: "type",
    headerName: "Type",
    width: 150,
    description: "Field type",
    headerClassName: 'table-column-header-style-class'
  }, {
    field: "description",
    headerName: "Description",
    flex: 1,
    description: "Field description",
    headerClassName: 'table-column-header-style-class'
  }];
};

var prepareSchemaRows = function prepareSchemaRows(resource) {
  var _resource$schema2;

  return (_resource$schema2 = resource.schema) === null || _resource$schema2 === void 0 ? void 0 : _resource$schema2.fields.map(function (field, i) {
    field['id'] = i;
    return field;
  });
};

var formatResourceSize = function formatResourceSize(bytes) {
  if (bytes < 1024) {
    return bytes + ' b';
  } else if (bytes < 1048576) {
    return (bytes / 1024).toFixed(2) + ' kb';
  } else if (bytes < 1073741824) {
    return (bytes / 1048576).toFixed(2) + ' mb';
  } else {
    return bytes;
  }
};

DataExplorer.propTypes = {
  resources: propTypes.array.isRequired
};

/**
 * Displays information about an organization in a dataset page
 * @param {Object} props object describing the dataset organization. 
 * organization: {
 *   image_url: The image url of the organization
 *   name: The name of the organization
 *   title: The title of the organization
 * } 
 * @returns 
 */

var Org = function Org(_ref) {
  var organization = _ref.organization;
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, organization ? /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("img", {
    src: organization.image_url || 'https://datahub.io/static/img/datahub-cube-edited.svg',
    className: "h-5 w-5 mr-2 inline-block",
    alt: "org_img"
  }), /*#__PURE__*/React__default['default'].createElement(Link__default['default'], {
    href: "/@".concat(organization.name)
  }, /*#__PURE__*/React__default['default'].createElement("a", {
    className: "font-semibold text-primary underline"
  }, organization.title || organization.name))) : '');
};

Org.propTypes = {
  organization: propTypes.object.isRequired
};

/**
 * Displays a blog post page
 * @param {object} props 
 * post = {
 *  title: <The title of the blog post>
 *  content: <The body of the blog post. Can be plain text or html>
 *  createdAt: <The utc date when the post was last modified>.
 *  featuredImage: <Url/relative url to post cover image>
 * }
 * @returns 
 */

var Post = function Post(_ref) {
  var post = _ref.post;
  var title = post.title,
      content = post.content,
      createdAt = post.createdAt,
      featuredImage = post.featuredImage;
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("h1", {
    className: "text-3xl font-semibold text-primary my-6 inline-block"
  }, title), /*#__PURE__*/React__default['default'].createElement("p", {
    className: "mb-6"
  }, "Posted: ", createdAt), /*#__PURE__*/React__default['default'].createElement("img", {
    src: featuredImage,
    className: "mb-6",
    alt: "featured_img"
  }), /*#__PURE__*/React__default['default'].createElement("div", null, parse__default['default'](content)));
};

Post.propTypes = {
  page: propTypes.shape({
    title: propTypes.string.isRequired,
    content: propTypes.string.isRequired,
    createdAt: propTypes.number,
    featuredImage: propTypes.string
  })
};

/**
 * Displays a list of blog posts with the title and a short excerp from the content. 
 * @param {object} props 
 * {
 *  posts: {
 *    title: <The title of the blog post>
 *    excerpt: <A short excerpt from the post content>
 *   }
 * } 
 * @returns 
 */

var PostList = function PostList(_ref) {
  var posts = _ref.posts;
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, posts.map(function (post, index) {
    return /*#__PURE__*/React__default['default'].createElement("div", {
      key: index
    }, /*#__PURE__*/React__default['default'].createElement("a", {
      href: "/blog/".concat(post.slug),
      className: "text-2xl font-semibold text-primary my-6 inline-block"
    }, parse__default['default'](post.title)), /*#__PURE__*/React__default['default'].createElement("p", null, parse__default['default'](post.excerpt)));
  }));
};

PostList.propTypes = {
  posts: propTypes.object.isRequired
};

/**
 * Error message component with consistent portal style
 * @param {object} props 
 * {
 *  message: The error message to display
 * } 
 * @returns 
 */

var ErrorMessage = function ErrorMessage(_ref) {
  var message = _ref.message;
  return /*#__PURE__*/React__default['default'].createElement("aside", null, message, /*#__PURE__*/React__default['default'].createElement("style", {
    jsx: true
  }, "\n        aside {\n          padding: 1.5em;\n          font-size: 14px;\n          color: white;\n          background-color: red;\n        }\n      "));
};

ErrorMessage.propTypes = {
  message: propTypes.string.isRequired
};

/**
 * Creates a custom link with title
 * @param {object} props 
 * {
 *  url: The url of the custom link
 *  title: The title for the custom link
 * } 
 * @returns React Component
 */

var CustomLink = function CustomLink(_ref) {
  var url = _ref.url,
      title = _ref.title;
  return /*#__PURE__*/React__default['default'].createElement("a", {
    href: url,
    className: "bg-white hover:bg-gray-200 border text-black font-semibold py-2 px-4 rounded"
  }, title);
};

CustomLink.propTypes = {
  url: propTypes.string.isRequired,
  title: propTypes.string.isRequired
};

/**
 * Displays a navigation bar with logo and menu links
 * @param {Object} props object with the following properties:
 * {
 *  logo: The relative url to the logo image
 *  navMenu: An array of objects with menu items. E.g : [{ title: 'Blog', path: '/blog' },{ title: 'Search', path: '/search' }]
 * }
 * @returns React Component
 */

var Nav = function Nav(_ref) {
  var logo = _ref.logo,
      navMenu = _ref.navMenu;

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  var handleClick = function handleClick(event) {
    event.preventDefault();
    setOpen(!open);
  };

  return /*#__PURE__*/React__default['default'].createElement("nav", {
    className: "flex items-center justify-between flex-wrap bg-white p-4 border-b border-gray-200"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex items-center flex-shrink-0 text-gray-700 mr-6"
  }, /*#__PURE__*/React__default['default'].createElement(Link__default['default'], {
    href: "/"
  }, /*#__PURE__*/React__default['default'].createElement("img", {
    src: logo,
    alt: "portal logo",
    width: "40"
  }))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "block lg:hidden mx-4"
  }, /*#__PURE__*/React__default['default'].createElement("button", {
    onClick: handleClick,
    className: "flex items-center px-3 py-2 border rounded text-gray-700 border-orange-400 hover:text-black hover:border-black"
  }, /*#__PURE__*/React__default['default'].createElement("svg", {
    className: "fill-current h-3 w-3",
    viewBox: "0 0 20 20",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React__default['default'].createElement("title", null, "Menu"), /*#__PURE__*/React__default['default'].createElement("path", {
    d: "M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
  })))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "".concat(open ? "block" : "hidden", " lg:block")
  }, navMenu.map(function (menu, index) {
    return /*#__PURE__*/React__default['default'].createElement(Link__default['default'], {
      href: menu.path,
      key: index
    }, /*#__PURE__*/React__default['default'].createElement("a", {
      className: "block mt-4 lg:inline-block lg:mt-0 active:bg-primary-background text-gray-700 hover:text-black mr-6"
    }, menu.title));
  })));
};

Nav.propTypes = {
  logo: propTypes.string.isRequired,
  navMenu: propTypes.array.isRequired
};

/**
 * Displays a list of recent datasets
 * @param {array} props An array of datasets
 * { datasets = [{
 *    organization: {name: <some name>, title: <some title> },
 *    title: <Data package title>
 *    name:  <Data package name>
 *    description: <description of data package>
 *   }]
 * }
 * @returns React Component
 */

var Recent = function Recent(_ref) {
  var datasets = _ref.datasets;
  return /*#__PURE__*/React__default['default'].createElement("section", {
    className: "my-10 mx-4 lg:my-20"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "recent flex flex-col lg:flex-row"
  }, datasets.map(function (dataset, index) {
    return /*#__PURE__*/React__default['default'].createElement("div", {
      key: index,
      className: "border px-4 mb-4 mr-3 border-gray-100 w-5/6 shadow-sm"
    }, /*#__PURE__*/React__default['default'].createElement("h1", {
      className: "text-2xl font-thin"
    }, dataset.title), /*#__PURE__*/React__default['default'].createElement("p", {
      className: "text-gray-500"
    }, dataset.organization && dataset.organization.description), /*#__PURE__*/React__default['default'].createElement(Link__default['default'], {
      href: "/@".concat(dataset.organization ? dataset.organization.name : 'dataset', "/").concat(dataset.name)
    }, /*#__PURE__*/React__default['default'].createElement("a", {
      className: "pt-3 flex justify-end text-orange-500"
    }, "View Dataset")));
  })));
};

Recent.propTypes = {
  datasets: propTypes.array.isRequired
};

/**
 * Search component form that can be customized with change and submit handlers
 * @param {object} props
 * {
 *  handleChange: A form input change event handler. This function is executed when the
 *                search input or order by input changes.
 *  handleSubmit: A form submit event handler. This function is executed when the
 *                search form is submitted.
 * } 
 * @returns 
 */

var Form = function Form(_ref) {
  var handleSubmit = _ref.handleSubmit;

  var _useState = React.useState(""),
      _useState2 = _slicedToArray(_useState, 2),
      searchQuery = _useState2[0],
      setSearchQuery = _useState2[1];

  return /*#__PURE__*/React__default['default'].createElement("form", {
    onSubmit: function onSubmit(e) {
      return e.preventDefault();
    },
    className: "items-center"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "flex"
  }, /*#__PURE__*/React__default['default'].createElement("input", {
    type: "text",
    name: "search#q",
    value: searchQuery,
    onChange: function onChange(e) {
      setSearchQuery(e.target.value);
    },
    placeholder: "Search",
    "aria-label": "Search",
    className: "bg-white focus:outline-none focus:shadow-outline border border-gray-300 w-1/2 rounded-lg py-2 px-4 block appearance-none leading-normal"
  }), /*#__PURE__*/React__default['default'].createElement("button", {
    onClick: function onClick() {
      return handleSubmit(searchQuery);
    },
    type: "button",
    className: "inline-block text-sm px-4 py-3 mx-3 leading-none border rounded text-white bg-black border-black lg:mt-0"
  }, "Search")));
};

Form.propTypes = {
  handleSubmit: propTypes.func.isRequired
};

/**
 * Single item from a search result showing info about a dataset.
 * @param {object} props data package with the following format:
 * {
 *  organization: {name: <some name>, title: <some title> },
 *  title: <Data package title>
 *  name:  <Data package name>
 *  description: <description of data package>
 *  notes: <Notes associated with the data package>
 * }
 * @returns React Component
 */

var Item = function Item(_ref) {
  var dataset = _ref.dataset;
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/React__default['default'].createElement("h3", {
    className: "text-xl font-semibold"
  }, /*#__PURE__*/React__default['default'].createElement(Link__default['default'], {
    href: "/@".concat(dataset.organization ? dataset.organization.name : 'dataset', "/").concat(dataset.name)
  }, /*#__PURE__*/React__default['default'].createElement("a", {
    className: "text-primary"
  }, dataset.title || dataset.name))), /*#__PURE__*/React__default['default'].createElement(Link__default['default'], {
    href: "/@".concat(dataset.organization ? dataset.organization.name : 'dataset')
  }, /*#__PURE__*/React__default['default'].createElement("a", {
    className: "text-gray-500 block mt-1"
  }, dataset.organization ? dataset.organization.title : 'dataset')), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "leading-relaxed mt-2"
  }, dataset.description || dataset.notes));
};

Item.propTypes = {
  dataset: propTypes.object.isRequired
};

/**
 * Displays the total search result
 * @param {object} props 
 * {
 *  count: The total number of search results
 * } 
 * @returns React Component
 */

var Total = function Total(_ref) {
  var count = _ref.count;
  return /*#__PURE__*/React__default['default'].createElement("h1", {
    className: "text-3xl font-semibold text-primary my-6 inline-block"
  }, count, " results found");
};

Total.propTypes = {
  count: propTypes.number.isRequired
};

exports.CustomLink = CustomLink;
exports.DataExplorer = DataExplorer;
exports.Error = ErrorMessage;
exports.Form = Form;
exports.Item = Item;
exports.ItemTotal = Total;
exports.KeyInfo = KeyInfo;
exports.Nav = Nav;
exports.Org = Org;
exports.PlotlyChart = PlotlyChart;
exports.Post = Post;
exports.PostList = PostList;
exports.ReadMe = ReadMe;
exports.Recent = Recent;
exports.ResourceInfo = ResourcesInfo;
exports.Table = Table;
