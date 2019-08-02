(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, (function () {
		var current = global.cnfBarcode;
		var exports = global.cnfBarcode = factory();
		exports.noConflict = function () { global.cnfBarcode = current; return exports; };
	}()));
}(this, function () { 'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.9' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && _has(exports, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? _ctx(out, _global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return _cof(arg) == 'Array';
	};

	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)


	_export(_export.S, 'Array', { isArray: _isArray });

	var isArray = _core.Array.isArray;

	var isArray$1 = isArray;

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var _library = true;

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode:  'pure' ,
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (_core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
	};

	// 19.1.2.14 Object.keys(O)



	_objectSap('keys', function () {
	  return function keys(it) {
	    return _objectKeys(_toObject(it));
	  };
	});

	var keys = _core.Object.keys;

	var keys$1 = keys;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var classCallCheck = _classCallCheck;

	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

	var $Object = _core.Object;
	var defineProperty = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};

	var defineProperty$1 = defineProperty;

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;

	    defineProperty$1(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	var createClass = _createClass;

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined(that));
	    var i = _toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var _redefine = _hide;

	var _iterators = {};

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var document$2 = _global.document;
	var _html = document$2 && document$2.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = _sharedKey('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe');
	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks');

	var Symbol = _global.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var def = _objectDp.f;

	var TAG = _wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$2 = _sharedKey('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

	var ITERATOR = _wks('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if (( FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    _hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  _iterators[NAME] = $default;
	  _iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) _redefine(proto, key, methods[key]);
	    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	var $at = _stringAt(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	_iterDefine(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep(1);
	  }
	  if (kind == 'keys') return _iterStep(0, index);
	  if (kind == 'values') return _iterStep(0, O[index]);
	  return _iterStep(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	_iterators.Arguments = _iterators.Array;

	var TO_STRING_TAG = _wks('toStringTag');

	var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
	  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
	  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
	  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
	  'TextTrackList,TouchList').split(',');

	for (var i = 0; i < DOMIterables.length; i++) {
	  var NAME = DOMIterables[i];
	  var Collection = _global[NAME];
	  var proto = Collection && Collection.prototype;
	  if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
	  _iterators[NAME] = _iterators.Array;
	}

	var f$1 = _wks;

	var _wksExt = {
		f: f$1
	};

	var iterator = _wksExt.f('iterator');

	var iterator$1 = iterator;

	var _meta = createCommonjsModule(function (module) {
	var META = _uid('meta');


	var setDesc = _objectDp.f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !_fails(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};
	});
	var _meta_1 = _meta.KEY;
	var _meta_2 = _meta.NEED;
	var _meta_3 = _meta.fastKey;
	var _meta_4 = _meta.getWeak;
	var _meta_5 = _meta.onFreeze;

	var defineProperty$2 = _objectDp.f;
	var _wksDefine = function (name) {
	  var $Symbol = _core.Symbol || (_core.Symbol =  {} );
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty$2($Symbol, name, { value: _wksExt.f(name) });
	};

	var f$2 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$2
	};

	var f$3 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$3
	};

	// all enumerable object keys, includes symbols



	var _enumKeys = function (it) {
	  var result = _objectKeys(it);
	  var getSymbols = _objectGops.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = _objectPie.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

	var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

	var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return _objectKeysInternal(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$4
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

	var gOPN = _objectGopn.f;
	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	var f$5 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
	};

	var _objectGopnExt = {
		f: f$5
	};

	var gOPD = Object.getOwnPropertyDescriptor;

	var f$6 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = _toIobject(O);
	  P = _toPrimitive(P, true);
	  if (_ie8DomDefine) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$6
	};

	// ECMAScript 6 symbols shim





	var META = _meta.KEY;





















	var gOPD$1 = _objectGopd.f;
	var dP$1 = _objectDp.f;
	var gOPN$1 = _objectGopnExt.f;
	var $Symbol = _global.Symbol;
	var $JSON = _global.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE$2 = 'prototype';
	var HIDDEN = _wks('_hidden');
	var TO_PRIMITIVE = _wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = _shared('symbol-registry');
	var AllSymbols = _shared('symbols');
	var OPSymbols = _shared('op-symbols');
	var ObjectProto$1 = Object[PROTOTYPE$2];
	var USE_NATIVE = typeof $Symbol == 'function' && !!_objectGops.f;
	var QObject = _global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = _descriptors && _fails(function () {
	  return _objectCreate(dP$1({}, 'a', {
	    get: function () { return dP$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD$1(ObjectProto$1, key);
	  if (protoDesc) delete ObjectProto$1[key];
	  dP$1(it, key, D);
	  if (protoDesc && it !== ObjectProto$1) dP$1(ObjectProto$1, key, protoDesc);
	} : dP$1;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto$1) $defineProperty(OPSymbols, key, D);
	  _anObject(it);
	  key = _toPrimitive(key, true);
	  _anObject(D);
	  if (_has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP$1(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  _anObject(it);
	  var keys = _enumKeys(P = _toIobject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = _toPrimitive(key, true));
	  if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
	  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = _toIobject(it);
	  key = _toPrimitive(key, true);
	  if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
	  var D = gOPD$1(it, key);
	  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN$1(_toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto$1;
	  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto$1) $set.call(OPSymbols, value);
	      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, _propertyDesc(1, value));
	    };
	    if (_descriptors && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
	    return this._k;
	  });

	  _objectGopd.f = $getOwnPropertyDescriptor;
	  _objectDp.f = $defineProperty;
	  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
	  _objectPie.f = $propertyIsEnumerable;
	  _objectGops.f = $getOwnPropertySymbols;

	  if (_descriptors && !_library) {
	    _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  _wksExt.f = function (name) {
	    return wrap(_wks(name));
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

	for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

	_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return _has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	var FAILS_ON_PRIMITIVES = _fails(function () { _objectGops.f(1); });

	_export(_export.S + _export.F * FAILS_ON_PRIMITIVES, 'Object', {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return _objectGops.f(_toObject(it));
	  }
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!_isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	_setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	_setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	_setToStringTag(_global.JSON, 'JSON', true);

	_wksDefine('asyncIterator');

	_wksDefine('observable');

	var symbol = _core.Symbol;

	var symbol$1 = symbol;

	var _typeof_1 = createCommonjsModule(function (module) {
	function _typeof2(obj) { if (typeof symbol$1 === "function" && typeof iterator$1 === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof symbol$1 === "function" && obj.constructor === symbol$1 && obj !== symbol$1.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

	function _typeof(obj) {
	  if (typeof symbol$1 === "function" && _typeof2(iterator$1) === "symbol") {
	    module.exports = _typeof = function _typeof(obj) {
	      return _typeof2(obj);
	    };
	  } else {
	    module.exports = _typeof = function _typeof(obj) {
	      return obj && typeof symbol$1 === "function" && obj.constructor === symbol$1 && obj !== symbol$1.prototype ? "symbol" : _typeof2(obj);
	    };
	  }

	  return _typeof(obj);
	}

	module.exports = _typeof;
	});

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	var assertThisInitialized = _assertThisInitialized;

	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
	    return call;
	  }

	  return assertThisInitialized(self);
	}

	var possibleConstructorReturn = _possibleConstructorReturn;

	// 19.1.2.9 Object.getPrototypeOf(O)



	_objectSap('getPrototypeOf', function () {
	  return function getPrototypeOf(it) {
	    return _objectGpo(_toObject(it));
	  };
	});

	var getPrototypeOf = _core.Object.getPrototypeOf;

	var getPrototypeOf$1 = getPrototypeOf;

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */


	var check = function (O, proto) {
	  _anObject(O);
	  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	var _setProto = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) { buggy = true; }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

	// 19.1.3.19 Object.setPrototypeOf(O, proto)

	_export(_export.S, 'Object', { setPrototypeOf: _setProto.set });

	var setPrototypeOf = _core.Object.setPrototypeOf;

	var setPrototypeOf$1 = setPrototypeOf;

	var getPrototypeOf$2 = createCommonjsModule(function (module) {
	function _getPrototypeOf(o) {
	  module.exports = _getPrototypeOf = setPrototypeOf$1 ? getPrototypeOf$1 : function _getPrototypeOf(o) {
	    return o.__proto__ || getPrototypeOf$1(o);
	  };
	  return _getPrototypeOf(o);
	}

	module.exports = _getPrototypeOf;
	});

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	_export(_export.S, 'Object', { create: _objectCreate });

	var $Object$1 = _core.Object;
	var create = function create(P, D) {
	  return $Object$1.create(P, D);
	};

	var create$1 = create;

	var setPrototypeOf$2 = createCommonjsModule(function (module) {
	function _setPrototypeOf(o, p) {
	  module.exports = _setPrototypeOf = setPrototypeOf$1 || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	module.exports = _setPrototypeOf;
	});

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = create$1(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) setPrototypeOf$2(subClass, superClass);
	}

	var inherits = _inherits;

	var Barcode=function Barcode(data,options){classCallCheck(this,Barcode),this.data=data,this.text=options.text||data,this.options=options;};

	var CODE39=function(_Barcode){function CODE39(data,options){return classCallCheck(this,CODE39),data=data.toUpperCase(),options.mod43&&(data+=getCharacter(mod43checksum(data))),possibleConstructorReturn(this,getPrototypeOf$2(CODE39).call(this,data,options))}return inherits(CODE39,_Barcode),createClass(CODE39,[{key:"encode",value:function encode(){for(var result=getEncoding("*"),i=0;i<this.data.length;i++)result+="".concat(getEncoding(this.data[i]),"0");return result+=getEncoding("*"),{data:result,text:this.text}}},{key:"valid",value:function valid(){return -1!==this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/)}}]),CODE39}(Barcode),characters=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","-","."," ","$","/","+","%","*"],encodings=[20957,29783,23639,30485,20951,29813,23669,20855,29789,23645,29975,23831,30533,22295,30149,24005,21623,29981,23837,22301,30023,23879,30545,22343,30161,24017,21959,30065,23921,22385,29015,18263,29141,17879,29045,18293,17783,29021,18269,17477,17489,17681,20753,35770];function getEncoding(character){return getBinary(characterValue(character))}function getBinary(characterValue){return encodings[characterValue].toString(2)}function getCharacter(characterValue){return characters[characterValue]}function characterValue(character){return characters.indexOf(character)}function mod43checksum(data){for(var checksum=0,i=0;i<data.length;i++)checksum+=characterValue(data[i]);return checksum%=43,checksum}

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    defineProperty$1(obj, key, {
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

	var defineProperty$3 = _defineProperty;

	var _SET_BY_CODE;var SET_A=0;var SET_B=1;var SET_C=2;var SHIFT=98;var START_A=103;var START_B=104;var START_C=105;var MODULO=103;var STOP=106;var FNC1=207;var SET_BY_CODE=(_SET_BY_CODE={},defineProperty$3(_SET_BY_CODE,START_A,SET_A),defineProperty$3(_SET_BY_CODE,START_B,SET_B),defineProperty$3(_SET_BY_CODE,START_C,SET_C),_SET_BY_CODE);var SWAP={101:SET_A,100:SET_B,99:SET_C};var A_START_CHAR=String.fromCharCode(208);var B_START_CHAR=String.fromCharCode(209);var C_START_CHAR=String.fromCharCode(210);var A_CHARS="[\0-_\xC8-\xCF]";var B_CHARS="[ -\x7F\xC8-\xCF]";var C_CHARS="(\xCF*[0-9]{2}\xCF*)";var BARS=[11011001100,11001101100,11001100110,10010011e3,10010001100,10001001100,10011001e3,10011000100,10001100100,11001001e3,11001000100,11000100100,10110011100,10011011100,10011001110,10111001100,10011101100,10011100110,11001110010,11001011100,11001001110,11011100100,11001110100,11101101110,11101001100,11100101100,11100100110,11101100100,11100110100,11100110010,11011011e3,11011000110,11000110110,10100011e3,10001011e3,10001000110,10110001e3,10001101e3,10001100010,11010001e3,11000101e3,11000100010,10110111e3,10110001110,10001101110,10111011e3,10111000110,10001110110,11101110110,11010001110,11000101110,11011101e3,11011100010,11011101110,11101011e3,11101000110,11100010110,11101101e3,11101100010,11100011010,11101111010,11001000010,11110001010,1010011e4,10100001100,1001011e4,10010000110,10000101100,10000100110,1011001e4,10110000100,1001101e4,10011000010,10000110100,10000110010,11000010010,1100101e4,11110111010,11000010100,10001111010,10100111100,10010111100,10010011110,10111100100,10011110100,10011110010,11110100100,11110010100,11110010010,11011011110,11011110110,11110110110,10101111e3,10100011110,10001011110,10111101e3,10111100010,11110101e3,11110100010,10111011110,10111101110,11101011110,11110101110,11010000100,1101001e4,11010011100,1100011101011];

	var CODE128=function(_Barcode){function CODE128(data,options){var _this;return classCallCheck(this,CODE128),_this=possibleConstructorReturn(this,getPrototypeOf$2(CODE128).call(this,data.substring(1),options)),_this.bytes=data.split("").map(function(_char){return _char.charCodeAt(0)}),_this}return inherits(CODE128,_Barcode),createClass(CODE128,[{key:"valid",value:function valid(){return /^[\x00-\x7F\xC8-\xD3]+$/.test(this.data)}},{key:"encode",value:function encode(){var bytes=this.bytes,startIndex=bytes.shift()-105,startSet=SET_BY_CODE[startIndex];if(void 0===startSet)throw new RangeError("The encoding does not start with a start character.");!0===this.shouldEncodeAsEan128()&&bytes.unshift(FNC1);var encodingResult=CODE128.next(bytes,1,startSet);return {text:this.text===this.data?this.text.replace(/[^\x20-\x7E]/g,""):this.text,data:CODE128.getBar(startIndex)+encodingResult.result+CODE128.getBar((encodingResult.checksum+startIndex)%MODULO)+CODE128.getBar(STOP)}}},{key:"shouldEncodeAsEan128",value:function shouldEncodeAsEan128(){var isEAN128=this.options.ean128||!1;return "string"==typeof isEAN128&&(isEAN128="true"===isEAN128.toLowerCase()),isEAN128}}],[{key:"getBar",value:function getBar(index){return BARS[index]?BARS[index].toString():""}},{key:"correctIndex",value:function correctIndex(bytes,set){if(set===SET_A){var charCode=bytes.shift();return 32>charCode?charCode+64:charCode-32}return set===SET_B?bytes.shift()-32:10*(bytes.shift()-48)+bytes.shift()-48}},{key:"next",value:function next(bytes,pos,set){if(!bytes.length)return {result:"",checksum:0};var nextCode,index;if(200<=bytes[0]){index=bytes.shift()-105;var nextSet=SWAP[index];void 0===nextSet?((set===SET_A||set===SET_B)&&index===SHIFT&&(bytes[0]=set===SET_A?95<bytes[0]?bytes[0]-96:bytes[0]:32>bytes[0]?bytes[0]+96:bytes[0]),nextCode=CODE128.next(bytes,pos+1,set)):nextCode=CODE128.next(bytes,pos+1,nextSet);}else index=CODE128.correctIndex(bytes,set),nextCode=CODE128.next(bytes,pos+1,set);var enc=CODE128.getBar(index),weight=index*pos;return {result:enc+nextCode.result,checksum:weight+nextCode.checksum}}}]),CODE128}(Barcode);

	var matchSetALength=function(string){return string.match(new RegExp("^".concat(A_CHARS,"*")))[0].length},matchSetBLength=function(string){return string.match(new RegExp("^".concat(B_CHARS,"*")))[0].length},matchSetC=function(string){return string.match(new RegExp("^".concat(C_CHARS,"*")))[0]};function autoSelectFromAB(string,isA){var ranges=isA?A_CHARS:B_CHARS,untilC=string.match(new RegExp("^(".concat(ranges,"+?)(([0-9]{2}){2,})([^0-9]|$)")));if(untilC)return untilC[1]+String.fromCharCode(204)+autoSelectFromC(string.substring(untilC[1].length));var chars=string.match(new RegExp("^".concat(ranges,"+")))[0];return chars.length===string.length?string:chars+String.fromCharCode(isA?205:206)+autoSelectFromAB(string.substring(chars.length),!isA)}function autoSelectFromC(string){var cMatch=matchSetC(string),length=cMatch.length;if(length===string.length)return string;string=string.substring(length);var isA=matchSetALength(string)>=matchSetBLength(string);return cMatch+String.fromCharCode(isA?206:205)+autoSelectFromAB(string,isA)}var autoSelectModes = (function(string){var newString,cLength=matchSetC(string).length;if(2<=cLength)newString=C_START_CHAR+autoSelectFromC(string);else{var isA=matchSetALength(string)>matchSetBLength(string);newString=(isA?A_START_CHAR:B_START_CHAR)+autoSelectFromAB(string,isA);}return newString.replace(/[\xCD\xCE]([^])[\xCD\xCE]/,function(match,_char){return String.fromCharCode(203)+_char})});

	var CODE128AUTO=function(_CODE){function CODE128AUTO(data,options){var _this;return classCallCheck(this,CODE128AUTO),_this=/^[\x00-\x7F\xC8-\xD3]+$/.test(data)?possibleConstructorReturn(this,getPrototypeOf$2(CODE128AUTO).call(this,autoSelectModes(data),options)):possibleConstructorReturn(this,getPrototypeOf$2(CODE128AUTO).call(this,data,options)),possibleConstructorReturn(_this)}return inherits(CODE128AUTO,_CODE),CODE128AUTO}(CODE128);

	var CODE128A=function(_CODE){function CODE128A(string,options){return classCallCheck(this,CODE128A),possibleConstructorReturn(this,getPrototypeOf$2(CODE128A).call(this,A_START_CHAR+string,options))}return inherits(CODE128A,_CODE),createClass(CODE128A,[{key:"valid",value:function valid(){return new RegExp("^".concat(A_CHARS,"+$")).test(this.data)}}]),CODE128A}(CODE128);

	var CODE128B=function(_CODE){function CODE128B(string,options){return classCallCheck(this,CODE128B),possibleConstructorReturn(this,getPrototypeOf$2(CODE128B).call(this,B_START_CHAR+string,options))}return inherits(CODE128B,_CODE),createClass(CODE128B,[{key:"valid",value:function valid(){return new RegExp("^".concat(B_CHARS,"+$")).test(this.data)}}]),CODE128B}(CODE128);

	var CODE128C=function(_CODE){function CODE128C(string,options){return classCallCheck(this,CODE128C),possibleConstructorReturn(this,getPrototypeOf$2(CODE128C).call(this,C_START_CHAR+string,options))}return inherits(CODE128C,_CODE),createClass(CODE128C,[{key:"valid",value:function valid(){return new RegExp("^".concat(C_CHARS,"+$")).test(this.data)}}]),CODE128C}(CODE128);

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)

	var $getOwnPropertyDescriptor$1 = _objectGopd.f;

	_objectSap('getOwnPropertyDescriptor', function () {
	  return function getOwnPropertyDescriptor(it, key) {
	    return $getOwnPropertyDescriptor$1(_toIobject(it), key);
	  };
	});

	var $Object$2 = _core.Object;
	var getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  return $Object$2.getOwnPropertyDescriptor(it, key);
	};

	var getOwnPropertyDescriptor$1 = getOwnPropertyDescriptor;

	// 26.1.6 Reflect.get(target, propertyKey [, receiver])







	function get(target, propertyKey /* , receiver */) {
	  var receiver = arguments.length < 3 ? target : arguments[2];
	  var desc, proto;
	  if (_anObject(target) === receiver) return target[propertyKey];
	  if (desc = _objectGopd.f(target, propertyKey)) return _has(desc, 'value')
	    ? desc.value
	    : desc.get !== undefined
	      ? desc.get.call(receiver)
	      : undefined;
	  if (_isObject(proto = _objectGpo(target))) return get(proto, propertyKey, receiver);
	}

	_export(_export.S, 'Reflect', { get: get });

	var get$1 = _core.Reflect.get;

	var get$2 = get$1;

	function _superPropBase(object, property) {
	  while (!Object.prototype.hasOwnProperty.call(object, property)) {
	    object = getPrototypeOf$2(object);
	    if (object === null) break;
	  }

	  return object;
	}

	var superPropBase = _superPropBase;

	var get$3 = createCommonjsModule(function (module) {
	function _get(target, property, receiver) {
	  if (typeof Reflect !== "undefined" && get$2) {
	    module.exports = _get = get$2;
	  } else {
	    module.exports = _get = function _get(target, property, receiver) {
	      var base = superPropBase(target, property);
	      if (!base) return;

	      var desc = getOwnPropertyDescriptor$1(base, property);

	      if (desc.get) {
	        return desc.get.call(receiver);
	      }

	      return desc.value;
	    };
	  }

	  return _get(target, property, receiver || target);
	}

	module.exports = _get;
	});

	var SIDE_BIN="101";var MIDDLE_BIN="01010";var BINARIES={L:["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"],G:["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"],R:["1110010","1100110","1101100","1000010","1011100","1001110","1010000","1000100","1001000","1110100"],O:["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"],E:["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"]};var EAN2_STRUCTURE=["LL","LG","GL","GG"];var EAN5_STRUCTURE=["GGLLL","GLGLL","GLLGL","GLLLG","LGGLL","LLGGL","LLLGG","LGLGL","LGLLG","LLGLG"];var EAN13_STRUCTURE=["LLLLLL","LLGLGG","LLGGLG","LLGGGL","LGLLGG","LGGLLG","LGGGLL","LGLGLG","LGLGGL","LGGLGL"];

	var encode=function(data,structure,separator){var encoded=data.split("").map(function(val,idx){return BINARIES[structure[idx]]}).map(function(val,idx){return val?val[data[idx]]:""});if(separator){var last=data.length-1;encoded=encoded.map(function(val,idx){return idx<last?val+separator:val});}return encoded.join("")};

	var EAN=function(_Barcode){function EAN(data,options){var _this;return classCallCheck(this,EAN),_this=possibleConstructorReturn(this,getPrototypeOf$2(EAN).call(this,data,options)),_this.fontSize=!options.flat&&options.fontSize>10*options.width?10*options.width:options.fontSize,_this.guardHeight=options.height+_this.fontSize/2+options.textMargin,_this}return inherits(EAN,_Barcode),createClass(EAN,[{key:"encode",value:function(){return this.options.flat?this.encodeFlat():this.encodeGuarded()}},{key:"leftText",value:function leftText(from,to){return this.text.substr(from,to)}},{key:"leftEncode",value:function leftEncode(data,structure){return encode(data,structure)}},{key:"rightText",value:function rightText(from,to){return this.text.substr(from,to)}},{key:"rightEncode",value:function rightEncode(data,structure){return encode(data,structure)}},{key:"encodeGuarded",value:function encodeGuarded(){var textOptions={fontSize:this.fontSize},guardOptions={height:this.guardHeight};return [{data:SIDE_BIN,options:guardOptions},{data:this.leftEncode(),text:this.leftText(),options:textOptions},{data:MIDDLE_BIN,options:guardOptions},{data:this.rightEncode(),text:this.rightText(),options:textOptions},{data:SIDE_BIN,options:guardOptions}]}},{key:"encodeFlat",value:function encodeFlat(){var data=[SIDE_BIN,this.leftEncode(),MIDDLE_BIN,this.rightEncode(),SIDE_BIN];return {data:data.join(""),text:this.text}}}]),EAN}(Barcode);

	var checksum=function(number){var res=number.substr(0,12).split("").map(function(n){return +n}).reduce(function(sum,a,idx){return idx%2?sum+3*a:sum+a},0);return (10-res%10)%10},EAN13=function(_EAN){function EAN13(data,options){var _this;return classCallCheck(this,EAN13),-1!==data.search(/^[0-9]{12}$/)&&(data+=checksum(data)),_this=possibleConstructorReturn(this,getPrototypeOf$2(EAN13).call(this,data,options)),_this.lastChar=options.lastChar,_this}return inherits(EAN13,_EAN),createClass(EAN13,[{key:"valid",value:function valid(){return -1!==this.data.search(/^[0-9]{13}$/)&&+this.data[12]===checksum(this.data)}},{key:"leftText",value:function leftText(){return get$3(getPrototypeOf$2(EAN13.prototype),"leftText",this).call(this,1,6)}},{key:"leftEncode",value:function leftEncode(){var data=this.data.substr(1,6),structure=EAN13_STRUCTURE[this.data[0]];return get$3(getPrototypeOf$2(EAN13.prototype),"leftEncode",this).call(this,data,structure)}},{key:"rightText",value:function rightText(){return get$3(getPrototypeOf$2(EAN13.prototype),"rightText",this).call(this,7,6)}},{key:"rightEncode",value:function rightEncode(){var data=this.data.substr(7,6);return get$3(getPrototypeOf$2(EAN13.prototype),"rightEncode",this).call(this,data,"RRRRRR")}},{key:"encodeGuarded",value:function encodeGuarded(){var data=get$3(getPrototypeOf$2(EAN13.prototype),"encodeGuarded",this).call(this);return this.options.displayValue&&(data.unshift({data:"000000000000",text:this.text.substr(0,1),options:{textAlign:"left",fontSize:this.fontSize}}),this.options.lastChar&&(data.push({data:"00"}),data.push({data:"00000",text:this.options.lastChar,options:{fontSize:this.fontSize}}))),data}}]),EAN13}(EAN);

	var checksum$1=function(number){var res=number.substr(0,7).split("").map(function(n){return +n}).reduce(function(sum,a,idx){return idx%2?sum+a:sum+3*a},0);return (10-res%10)%10},EAN8=function(_EAN){function EAN8(data,options){return classCallCheck(this,EAN8),-1!==data.search(/^[0-9]{7}$/)&&(data+=checksum$1(data)),possibleConstructorReturn(this,getPrototypeOf$2(EAN8).call(this,data,options))}return inherits(EAN8,_EAN),createClass(EAN8,[{key:"valid",value:function valid(){return -1!==this.data.search(/^[0-9]{8}$/)&&+this.data[7]===checksum$1(this.data)}},{key:"leftText",value:function leftText(){return get$3(getPrototypeOf$2(EAN8.prototype),"leftText",this).call(this,0,4)}},{key:"leftEncode",value:function leftEncode(){var data=this.data.substr(0,4);return get$3(getPrototypeOf$2(EAN8.prototype),"leftEncode",this).call(this,data,"LLLL")}},{key:"rightText",value:function rightText(){return get$3(getPrototypeOf$2(EAN8.prototype),"rightText",this).call(this,4,4)}},{key:"rightEncode",value:function rightEncode(){var data=this.data.substr(4,4);return get$3(getPrototypeOf$2(EAN8.prototype),"rightEncode",this).call(this,data,"RRRR")}}]),EAN8}(EAN);

	var checksum$2=function(data){var result=data.split("").map(function(n){return +n}).reduce(function(sum,a,idx){return idx%2?sum+9*a:sum+3*a},0);return result%10},EAN5=function(_Barcode){function EAN5(data,options){return classCallCheck(this,EAN5),possibleConstructorReturn(this,getPrototypeOf$2(EAN5).call(this,data,options))}return inherits(EAN5,_Barcode),createClass(EAN5,[{key:"valid",value:function valid(){return -1!==this.data.search(/^[0-9]{5}$/)}},{key:"encode",value:function encode$1(){var structure=EAN5_STRUCTURE[checksum$2(this.data)];return {data:"1011".concat(encode(this.data,structure,"01")),text:this.text}}}]),EAN5}(Barcode);

	var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var space = '[' + _stringWs + ']';
	var non = '\u200b\u0085';
	var ltrim = RegExp('^' + space + space + '*');
	var rtrim = RegExp(space + space + '*$');

	var exporter = function (KEY, exec, ALIAS) {
	  var exp = {};
	  var FORCE = _fails(function () {
	    return !!_stringWs[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
	  if (ALIAS) exp[ALIAS] = fn;
	  _export(_export.P + _export.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function (string, TYPE) {
	  string = String(_defined(string));
	  if (TYPE & 1) string = string.replace(ltrim, '');
	  if (TYPE & 2) string = string.replace(rtrim, '');
	  return string;
	};

	var _stringTrim = exporter;

	var $parseInt = _global.parseInt;
	var $trim = _stringTrim.trim;

	var hex = /^[-+]?0[xX]/;

	var _parseInt = $parseInt(_stringWs + '08') !== 8 || $parseInt(_stringWs + '0x16') !== 22 ? function parseInt(str, radix) {
	  var string = $trim(String(str), 3);
	  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
	} : $parseInt;

	// 18.2.5 parseInt(string, radix)
	_export(_export.G + _export.F * (parseInt != _parseInt), { parseInt: _parseInt });

	var _parseInt$1 = _core.parseInt;

	var _parseInt$2 = _parseInt$1;

	var EAN2=function(_Barcode){function EAN2(data,options){return classCallCheck(this,EAN2),possibleConstructorReturn(this,getPrototypeOf$2(EAN2).call(this,data,options))}return inherits(EAN2,_Barcode),createClass(EAN2,[{key:"valid",value:function valid(){return -1!==this.data.search(/^[0-9]{2}$/)}},{key:"encode",value:function encode$1(){var structure=EAN2_STRUCTURE[_parseInt$2(this.data)%4];return {data:"1011".concat(encode(this.data,structure,"01")),text:this.text}}}]),EAN2}(Barcode);

	var UPC=function(_Barcode){function UPC(data,options){var _this;return classCallCheck(this,UPC),-1!==data.search(/^[0-9]{11}$/)&&(data+=checksum$3(data)),_this=possibleConstructorReturn(this,getPrototypeOf$2(UPC).call(this,data,options)),_this.displayValue=options.displayValue,_this.fontSize=options.fontSize>10*options.width?10*options.width:options.fontSize,_this.guardHeight=options.height+_this.fontSize/2+options.textMargin,_this}return inherits(UPC,_Barcode),createClass(UPC,[{key:"valid",value:function valid(){return -1!==this.data.search(/^[0-9]{12}$/)&&this.data[11]==checksum$3(this.data)}},{key:"encode",value:function(){return this.options.flat?this.flatEncoding():this.guardedEncoding()}},{key:"flatEncoding",value:function flatEncoding(){var result="";return result+="101",result+=encode(this.data.substr(0,6),"LLLLLL"),result+="01010",result+=encode(this.data.substr(6,6),"RRRRRR"),result+="101",{data:result,text:this.text}}},{key:"guardedEncoding",value:function guardedEncoding(){var result=[];return this.displayValue&&result.push({data:"00000000",text:this.text.substr(0,1),options:{textAlign:"left",fontSize:this.fontSize}}),result.push({data:"101".concat(encode(this.data[0],"L")),options:{height:this.guardHeight}}),result.push({data:encode(this.data.substr(1,5),"LLLLL"),text:this.text.substr(1,5),options:{fontSize:this.fontSize}}),result.push({data:"01010",options:{height:this.guardHeight}}),result.push({data:encode(this.data.substr(6,5),"RRRRR"),text:this.text.substr(6,5),options:{fontSize:this.fontSize}}),result.push({data:"".concat(encode(this.data[11],"R"),"101"),options:{height:this.guardHeight}}),this.displayValue&&result.push({data:"00000000",text:this.text.substr(11,1),options:{textAlign:"right",fontSize:this.fontSize}}),result}}]),UPC}(Barcode);function checksum$3(number){var i,result=0;for(i=1;11>i;i+=2)result+=_parseInt$2(number[i]);for(i=0;11>i;i+=2)result+=3*_parseInt$2(number[i]);return (10-result%10)%10}

	var EXPANSIONS=["XX00000XXX","XX10000XXX","XX20000XXX","XXX00000XX","XXXX00000X","XXXXX00005","XXXXX00006","XXXXX00007","XXXXX00008","XXXXX00009"],PARITIES=[["EEEOOO","OOOEEE"],["EEOEOO","OOEOEE"],["EEOOEO","OOEEOE"],["EEOOOE","OOEEEO"],["EOEEOO","OEOOEE"],["EOOEEO","OEEOOE"],["EOOOEE","OEEEOO"],["EOEOEO","OEOEOE"],["EOEOOE","OEOEEO"],["EOOEOE","OEEOEO"]],UPCE=function(_Barcode){function UPCE(data,options){var _this;if(classCallCheck(this,UPCE),_this=possibleConstructorReturn(this,getPrototypeOf$2(UPCE).call(this,data,options)),_this.isValid=!1,-1!==data.search(/^[0-9]{6}$/))_this.middleDigits=data,_this.upcA=expandToUPCA(data,"0"),_this.text=options.text||"".concat(_this.upcA[0]).concat(data).concat(_this.upcA[_this.upcA.length-1]),_this.isValid=!0;else{if(-1===data.search(/^[01][0-9]{7}$/))return possibleConstructorReturn(_this);if(_this.middleDigits=data.substring(1,data.length-1),_this.upcA=expandToUPCA(_this.middleDigits,data[0]),_this.upcA[_this.upcA.length-1]===data[data.length-1])_this.isValid=!0;else return possibleConstructorReturn(_this)}return _this.displayValue=options.displayValue,_this.fontSize=options.fontSize>10*options.width?10*options.width:options.fontSize,_this.guardHeight=options.height+_this.fontSize/2+options.textMargin,_this}return inherits(UPCE,_Barcode),createClass(UPCE,[{key:"valid",value:function valid(){return this.isValid}},{key:"encode",value:function(){return this.options.flat?this.flatEncoding():this.guardedEncoding()}},{key:"flatEncoding",value:function flatEncoding(){var result="";return result+="101",result+=this.encodeMiddleDigits(),result+="010101",{data:result,text:this.text}}},{key:"guardedEncoding",value:function guardedEncoding(){var result=[];return this.displayValue&&result.push({data:"00000000",text:this.text[0],options:{textAlign:"left",fontSize:this.fontSize}}),result.push({data:"101",options:{height:this.guardHeight}}),result.push({data:this.encodeMiddleDigits(),text:this.text.substring(1,7),options:{fontSize:this.fontSize}}),result.push({data:"010101",options:{height:this.guardHeight}}),this.displayValue&&result.push({data:"00000000",text:this.text[7],options:{textAlign:"right",fontSize:this.fontSize}}),result}},{key:"encodeMiddleDigits",value:function encodeMiddleDigits(){var numberSystem=this.upcA[0],checkDigit=this.upcA[this.upcA.length-1],parity=PARITIES[_parseInt$2(checkDigit)][_parseInt$2(numberSystem)];return encode(this.middleDigits,parity)}}]),UPCE}(Barcode);function expandToUPCA(middleDigits,numberSystem){for(var c,lastUpcE=_parseInt$2(middleDigits[middleDigits.length-1]),expansion=EXPANSIONS[lastUpcE],result="",digitIndex=0,i=0;i<expansion.length;i++)c=expansion[i],result+="X"===c?middleDigits[digitIndex++]:c;return result="".concat(numberSystem).concat(result),"".concat(result).concat(checksum$3(result))}

	var START_BIN="1010";var END_BIN="11101";var BINARIES$1=["00110","10001","01001","11000","00101","10100","01100","00011","10010","01010"];

	var ITF=function(_Barcode){function ITF(){return classCallCheck(this,ITF),possibleConstructorReturn(this,getPrototypeOf$2(ITF).apply(this,arguments))}return inherits(ITF,_Barcode),createClass(ITF,[{key:"valid",value:function valid(){return -1!==this.data.search(/^([0-9]{2})+$/)}},{key:"encode",value:function encode(){var _this=this,encoded=this.data.match(/.{2}/g).map(function(pair){return _this.encodePair(pair)}).join("");return {data:START_BIN+encoded+END_BIN,text:this.text}}},{key:"encodePair",value:function encodePair(pair){var second=BINARIES$1[pair[1]];return BINARIES$1[pair[0]].split("").map(function(first,idx){return ("1"===first?"111":"1")+("1"===second[idx]?"000":"0")}).join("")}}]),ITF}(Barcode);

	var checksum$4=function(data){var res=data.substr(0,13).split("").map(function(num){return _parseInt$2(num,10)}).reduce(function(sum,n,idx){return sum+n*(3-2*(idx%2))},0);return 10*Math.ceil(res/10)-res},ITF14=function(_ITF){function ITF14(data,options){return classCallCheck(this,ITF14),-1!==data.search(/^[0-9]{13}$/)&&(data+=checksum$4(data)),possibleConstructorReturn(this,getPrototypeOf$2(ITF14).call(this,data,options))}return inherits(ITF14,_ITF),createClass(ITF14,[{key:"valid",value:function valid(){return -1!==this.data.search(/^[0-9]{14}$/)&&+this.data[13]===checksum$4(this.data)}}]),ITF14}(ITF);

	var MSI=function(_Barcode){function MSI(data,options){return classCallCheck(this,MSI),possibleConstructorReturn(this,getPrototypeOf$2(MSI).call(this,data,options))}return inherits(MSI,_Barcode),createClass(MSI,[{key:"encode",value:function encode(){for(var ret="110",i=0;i<this.data.length;i++){var digit=_parseInt$2(this.data[i]),bin=digit.toString(2);bin=addZeroes(bin,4-bin.length);for(var b=0;b<bin.length;b++)ret+="0"==bin[b]?"100":"110";}return ret+="1001",{data:ret,text:this.text}}},{key:"valid",value:function valid(){return -1!==this.data.search(/^[0-9]+$/)}}]),MSI}(Barcode);function addZeroes(number,n){for(var i=0;i<n;i++)number="0".concat(number);return number}

	function mod10(number){for(var n,sum=0,i=0;i<number.length;i++)n=_parseInt$2(number[i]),sum+=0==(i+number.length)%2?n:2*n%10+Math.floor(2*n/10);return (10-sum%10)%10}function mod11(number){for(var n,sum=0,weights=[2,3,4,5,6,7],i=0;i<number.length;i++)n=_parseInt$2(number[number.length-1-i]),sum+=weights[i%weights.length]*n;return (11-sum%11)%11}

	var MSI10=function(_MSI){function MSI10(data,options){return classCallCheck(this,MSI10),possibleConstructorReturn(this,getPrototypeOf$2(MSI10).call(this,data+mod10(data),options))}return inherits(MSI10,_MSI),MSI10}(MSI);

	var MSI11=function(_MSI){function MSI11(data,options){return classCallCheck(this,MSI11),possibleConstructorReturn(this,getPrototypeOf$2(MSI11).call(this,data+mod11(data),options))}return inherits(MSI11,_MSI),MSI11}(MSI);

	var MSI1010=function(_MSI){function MSI1010(data,options){return classCallCheck(this,MSI1010),data+=mod10(data),data+=mod10(data),possibleConstructorReturn(this,getPrototypeOf$2(MSI1010).call(this,data,options))}return inherits(MSI1010,_MSI),MSI1010}(MSI);

	var MSI1110=function(_MSI){function MSI1110(data,options){return classCallCheck(this,MSI1110),data+=mod11(data),data+=mod10(data),possibleConstructorReturn(this,getPrototypeOf$2(MSI1110).call(this,data,options))}return inherits(MSI1110,_MSI),MSI1110}(MSI);

	var pharmacode=function(_Barcode){function pharmacode(data,options){var _this;return classCallCheck(this,pharmacode),_this=possibleConstructorReturn(this,getPrototypeOf$2(pharmacode).call(this,data,options)),_this.number=_parseInt$2(data,10),_this}return inherits(pharmacode,_Barcode),createClass(pharmacode,[{key:"encode",value:function encode(){for(var z=this.number,result="";!isNaN(z)&&0!=z;)0==z%2?(result="11100".concat(result),z=(z-2)/2):(result="100".concat(result),z=(z-1)/2);return result=result.slice(0,-2),{data:result,text:this.text}}},{key:"valid",value:function valid(){return 3<=this.number&&131070>=this.number}}]),pharmacode}(Barcode);

	var codabar=function(_Barcode){function codabar(data,options){var _this;return classCallCheck(this,codabar),0===data.search(/^[0-9\-\$\:\.\+\/]+$/)&&(data="A".concat(data,"A")),_this=possibleConstructorReturn(this,getPrototypeOf$2(codabar).call(this,data.toUpperCase(),options)),_this.text=_this.options.text||_this.text.replace(/[A-D]/g,""),_this}return inherits(codabar,_Barcode),createClass(codabar,[{key:"valid",value:function valid(){return -1!==this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/)}},{key:"encode",value:function encode(){for(var result=[],encodings=this.getEncodings(),i=0;i<this.data.length;i++)result.push(encodings[this.data.charAt(i)]),i!=this.data.length-1&&result.push("0");return {text:this.text,data:result.join("")}}},{key:"getEncodings",value:function getEncodings(){return {0:"101010011",1:"101011001",2:"101001011",3:"110010101",4:"101101001",5:"110101001",6:"100101011",7:"100101101",8:"100110101",9:"110100101","-":"101001101",$:"101100101",":":"1101011011","/":"1101101011",".":"1101101101","+":"101100110011",A:"1011001001",B:"1001001011",C:"1010010011",D:"1010011001"}}}]),codabar}(Barcode);

	var GenericBarcode=function(_Barcode){function GenericBarcode(data,options){return classCallCheck(this,GenericBarcode),possibleConstructorReturn(this,getPrototypeOf$2(GenericBarcode).call(this,data,options))}return inherits(GenericBarcode,_Barcode),createClass(GenericBarcode,[{key:"encode",value:function encode(){return {data:"10101010101010101010101010101010101010101",text:this.text}}},{key:"valid",value:function valid(){return !0}}]),GenericBarcode}(Barcode);

	var barcodes = {CODE39:CODE39,CODE128:CODE128AUTO,CODE128A:CODE128A,CODE128B:CODE128B,CODE128C:CODE128C,EAN13:EAN13,EAN8:EAN8,EAN5:EAN5,EAN2:EAN2,UPC:UPC,UPCE:UPCE,ITF14:ITF14,ITF:ITF,MSI:MSI,MSI10:MSI10,MSI11:MSI11,MSI1010:MSI1010,MSI1110:MSI1110,pharmacode:pharmacode,codabar:codabar,GenericBarcode:GenericBarcode};

	// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperties: _objectDps });

	var $Object$3 = _core.Object;
	var defineProperties = function defineProperties(T, D) {
	  return $Object$3.defineProperties(T, D);
	};

	var defineProperties$1 = defineProperties;

	// all object keys, includes non-enumerable and symbols



	var Reflect$1 = _global.Reflect;
	var _ownKeys = Reflect$1 && Reflect$1.ownKeys || function ownKeys(it) {
	  var keys = _objectGopn.f(_anObject(it));
	  var getSymbols = _objectGops.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

	var _createProperty = function (object, index, value) {
	  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
	  else object[index] = value;
	};

	// https://github.com/tc39/proposal-object-getownpropertydescriptors






	_export(_export.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = _toIobject(object);
	    var getDesc = _objectGopd.f;
	    var keys = _ownKeys(O);
	    var result = {};
	    var i = 0;
	    var key, desc;
	    while (keys.length > i) {
	      desc = getDesc(O, key = keys[i++]);
	      if (desc !== undefined) _createProperty(result, key, desc);
	    }
	    return result;
	  }
	});

	var getOwnPropertyDescriptors = _core.Object.getOwnPropertyDescriptors;

	var getOwnPropertyDescriptors$1 = getOwnPropertyDescriptors;

	var getOwnPropertySymbols = _core.Object.getOwnPropertySymbols;

	var getOwnPropertySymbols$1 = getOwnPropertySymbols;

	function ownKeys(object,enumerableOnly){var keys=keys$1(object);if(getOwnPropertySymbols$1){var symbols=getOwnPropertySymbols$1(object);enumerableOnly&&(symbols=symbols.filter(function(sym){return getOwnPropertyDescriptor$1(object,sym).enumerable})),keys.push.apply(keys,symbols);}return keys}function _objectSpread(target){for(var source,i=1;i<arguments.length;i++)source=null==arguments[i]?{}:arguments[i],i%2?ownKeys(source,!0).forEach(function(key){defineProperty$3(target,key,source[key]);}):getOwnPropertyDescriptors$1?defineProperties$1(target,getOwnPropertyDescriptors$1(source)):ownKeys(source).forEach(function(key){defineProperty$1(target,key,getOwnPropertyDescriptor$1(source,key));});return target}var merge = (function(old,replaceObj){return _objectSpread({},old,{},replaceObj)});

	function linearizeEncodings(encodings){function nextLevel(encoded){if(isArray$1(encoded))for(var i=0;i<encoded.length;i++)nextLevel(encoded[i]);else encoded.text=encoded.text||"",encoded.data=encoded.data||"",linearEncodings.push(encoded);}var linearEncodings=[];return nextLevel(encodings),linearEncodings}

	function fixOptions(options){return options.marginTop=options.marginTop||options.margin,options.marginBottom=options.marginBottom||options.margin,options.marginRight=options.marginRight||options.margin,options.marginLeft=options.marginLeft||options.margin,options}

	function createCommonjsModule$1(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global$1 = createCommonjsModule$1(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core$1 = createCommonjsModule$1(function (module) {
	var core = module.exports = { version: '2.6.9' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1$1 = _core$1.version;

	var _aFunction$1 = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx$1 = function (fn, that, length) {
	  _aFunction$1(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var _isObject$1 = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject$1 = function (it) {
	  if (!_isObject$1(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails$1 = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors$1 = !_fails$1(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$3 = _global$1.document;
	// typeof document.createElement is 'object' in old IE
	var is$1 = _isObject$1(document$3) && _isObject$1(document$3.createElement);
	var _domCreate$1 = function (it) {
	  return is$1 ? document$3.createElement(it) : {};
	};

	var _ie8DomDefine$1 = !_descriptors$1 && !_fails$1(function () {
	  return Object.defineProperty(_domCreate$1('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive$1 = function (it, S) {
	  if (!_isObject$1(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject$1(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject$1(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject$1(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP$2 = Object.defineProperty;

	var f$7 = _descriptors$1 ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject$1(O);
	  P = _toPrimitive$1(P, true);
	  _anObject$1(Attributes);
	  if (_ie8DomDefine$1) try {
	    return dP$2(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp$1 = {
		f: f$7
	};

	var _propertyDesc$1 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide$1 = _descriptors$1 ? function (object, key, value) {
	  return _objectDp$1.f(object, key, _propertyDesc$1(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty$1 = {}.hasOwnProperty;
	var _has$1 = function (it, key) {
	  return hasOwnProperty$1.call(it, key);
	};

	var PROTOTYPE$3 = 'prototype';

	var $export$1 = function (type, name, source) {
	  var IS_FORCED = type & $export$1.F;
	  var IS_GLOBAL = type & $export$1.G;
	  var IS_STATIC = type & $export$1.S;
	  var IS_PROTO = type & $export$1.P;
	  var IS_BIND = type & $export$1.B;
	  var IS_WRAP = type & $export$1.W;
	  var exports = IS_GLOBAL ? _core$1 : _core$1[name] || (_core$1[name] = {});
	  var expProto = exports[PROTOTYPE$3];
	  var target = IS_GLOBAL ? _global$1 : IS_STATIC ? _global$1[name] : (_global$1[name] || {})[PROTOTYPE$3];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && _has$1(exports, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? _ctx$1(out, _global$1)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE$3] = C[PROTOTYPE$3];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? _ctx$1(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export$1.R && expProto && !expProto[key]) _hide$1(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export$1.F = 1;   // forced
	$export$1.G = 2;   // global
	$export$1.S = 4;   // static
	$export$1.P = 8;   // proto
	$export$1.B = 16;  // bind
	$export$1.W = 32;  // wrap
	$export$1.U = 64;  // safe
	$export$1.R = 128; // real proto method for `library`
	var _export$1 = $export$1;

	var toString$2 = {}.toString;

	var _cof$1 = function (it) {
	  return toString$2.call(it).slice(8, -1);
	};

	// 7.2.2 IsArray(argument)

	var _isArray$1 = Array.isArray || function isArray(arg) {
	  return _cof$1(arg) == 'Array';
	};

	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)


	_export$1(_export$1.S, 'Array', { isArray: _isArray$1 });

	var isArray$2 = _core$1.Array.isArray;

	var isArray$1$1 = isArray$2;

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined$1 = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// 7.1.13 ToObject(argument)

	var _toObject$1 = function (it) {
	  return Object(_defined$1(it));
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject$1 = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof$1(it) == 'String' ? it.split('') : Object(it);
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject$1 = function (it) {
	  return _iobject$1(_defined$1(it));
	};

	// 7.1.4 ToInteger
	var ceil$1 = Math.ceil;
	var floor$1 = Math.floor;
	var _toInteger$1 = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor$1 : ceil$1)(it);
	};

	// 7.1.15 ToLength

	var min$2 = Math.min;
	var _toLength$1 = function (it) {
	  return it > 0 ? min$2(_toInteger$1(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max$1 = Math.max;
	var min$1$1 = Math.min;
	var _toAbsoluteIndex$1 = function (index, length) {
	  index = _toInteger$1(index);
	  return index < 0 ? max$1(index + length, 0) : min$1$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes$1 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject$1($this);
	    var length = _toLength$1(O.length);
	    var index = _toAbsoluteIndex$1(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var _shared$1 = createCommonjsModule$1(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global$1[SHARED] || (_global$1[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core$1.version,
	  mode:  'pure' ,
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id$1 = 0;
	var px$1 = Math.random();
	var _uid$1 = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id$1 + px$1).toString(36));
	};

	var shared$1 = _shared$1('keys');

	var _sharedKey$1 = function (key) {
	  return shared$1[key] || (shared$1[key] = _uid$1(key));
	};

	var arrayIndexOf$1 = _arrayIncludes$1(false);
	var IE_PROTO$3 = _sharedKey$1('IE_PROTO');

	var _objectKeysInternal$1 = function (object, names) {
	  var O = _toIobject$1(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO$3) _has$1(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has$1(O, key = names[i++])) {
	    ~arrayIndexOf$1(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys$1 = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys$1 = Object.keys || function keys(O) {
	  return _objectKeysInternal$1(O, _enumBugKeys$1);
	};

	// most Object methods by ES6 should accept primitives



	var _objectSap$1 = function (KEY, exec) {
	  var fn = (_core$1.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  _export$1(_export$1.S + _export$1.F * _fails$1(function () { fn(1); }), 'Object', exp);
	};

	// 19.1.2.14 Object.keys(O)



	_objectSap$1('keys', function () {
	  return function keys(it) {
	    return _objectKeys$1(_toObject$1(it));
	  };
	});

	var keys$2 = _core$1.Object.keys;

	var keys$1$1 = keys$2;

	function q(v){return "\""+v+"\""}function json2html(json){var child="";json.child&&(child=json.child.map(function(c){return json2html(c)}).join(""));var attr="";if(json.attr&&(attr=keys$1$1(json.attr).map(function(key){var value=json.attr[key];return isArray$1$1(value)&&(value=value.join(" ")),key+"="+q(value)}).join(" "),""!==attr&&(attr=" "+attr)),"element"===json.node){var tag=json.tag;if(-1<["area","base","basefont","br","col","frame","hr","img","input","isindex","link","meta","param","embed"].indexOf(tag))return "<"+json.tag+attr+"/>";var open="<"+json.tag+attr+">",close="</"+json.tag+">";return open+child+close}return "text"===json.node?json.text:"comment"===json.node?"<!--"+json.text+"-->":"root"===json.node?child:void 0}

	var black = "black";
	var navy = "navy";
	var darkblue = "darkblue";
	var mediumblue = "mediumblue";
	var blue = "blue";
	var darkgreen = "darkgreen";
	var green = "green";
	var teal = "teal";
	var darkcyan = "darkcyan";
	var deepskyblue = "deepskyblue";
	var darkturquoise = "darkturquoise";
	var mediumspringgreen = "mediumspringgreen";
	var lime = "lime";
	var springgreen = "springgreen";
	var aqua = "aqua";
	var cyan = "cyan";
	var midnightblue = "midnightblue";
	var dodgerblue = "dodgerblue";
	var lightseagreen = "lightseagreen";
	var forestgreen = "forestgreen";
	var seagreen = "seagreen";
	var darkslategray = "darkslategray";
	var limegreen = "limegreen";
	var mediumseagreen = "mediumseagreen";
	var turquoise = "turquoise";
	var royalblue = "royalblue";
	var steelblue = "steelblue";
	var darkslateblue = "darkslateblue";
	var mediumturquoise = "mediumturquoise";
	var indigo = "indigo";
	var darkolivegreen = "darkolivegreen";
	var cadetblue = "cadetblue";
	var cornflowerblue = "cornflowerblue";
	var mediumaquamarine = "mediumaquamarine";
	var dimgray = "dimgray";
	var dimgrey = "dimgrey";
	var slateblue = "slateblue";
	var olivedrab = "olivedrab";
	var slategray = "slategray";
	var lightslategray = "lightslategray";
	var mediumslateblue = "mediumslateblue";
	var lawngreen = "lawngreen";
	var chartreuse = "chartreuse";
	var aquamarine = "aquamarine";
	var maroon = "maroon";
	var purple = "purple";
	var olive = "olive";
	var gray = "gray";
	var skyblue = "skyblue";
	var lightskyblue = "lightskyblue";
	var blueviolet = "blueviolet";
	var darkred = "darkred";
	var darkmagenta = "darkmagenta";
	var saddlebrown = "saddlebrown";
	var darkseagreen = "darkseagreen";
	var lightgreen = "lightgreen";
	var mediumpurple = "mediumpurple";
	var darkviolet = "darkviolet";
	var palegreen = "palegreen";
	var darkorchid = "darkorchid";
	var yellowgreen = "yellowgreen";
	var sienna = "sienna";
	var brown = "brown";
	var darkgray = "darkgray";
	var lightblue = "lightblue";
	var greenyellow = "greenyellow";
	var paleturquoise = "paleturquoise";
	var lightsteelblue = "lightsteelblue";
	var powderblue = "powderblue";
	var firebrick = "firebrick";
	var darkgoldenrod = "darkgoldenrod";
	var mediumorchid = "mediumorchid";
	var rosybrown = "rosybrown";
	var darkkhaki = "darkkhaki";
	var silver = "silver";
	var mediumvioletred = "mediumvioletred";
	var indianred = "indianred";
	var peru = "peru";
	var chocolate = "chocolate";
	var tan = "tan";
	var lightgray = "lightgray";
	var thistle = "thistle";
	var orchid = "orchid";
	var goldenrod = "goldenrod";
	var palevioletred = "palevioletred";
	var crimson = "crimson";
	var gainsboro = "gainsboro";
	var plum = "plum";
	var burlywood = "burlywood";
	var lightcyan = "lightcyan";
	var lavender = "lavender";
	var darksalmon = "darksalmon";
	var violet = "violet";
	var palegoldenrod = "palegoldenrod";
	var lightcoral = "lightcoral";
	var khaki = "khaki";
	var aliceblue = "aliceblue";
	var honeydew = "honeydew";
	var azure = "azure";
	var sandybrown = "sandybrown";
	var wheat = "wheat";
	var beige = "beige";
	var whitesmoke = "whitesmoke";
	var mintcream = "mintcream";
	var ghostwhite = "ghostwhite";
	var salmon = "salmon";
	var antiquewhite = "antiquewhite";
	var linen = "linen";
	var lightgoldenrodyellow = "lightgoldenrodyellow";
	var oldlace = "oldlace";
	var red = "red";
	var fuchsia = "fuchsia";
	var magenta = "magenta";
	var deeppink = "deeppink";
	var orangered = "orangered";
	var tomato = "tomato";
	var hotpink = "hotpink";
	var coral = "coral";
	var darkorange = "darkorange";
	var lightsalmon = "lightsalmon";
	var orange = "orange";
	var lightpink = "lightpink";
	var pink = "pink";
	var gold = "gold";
	var peachpuff = "peachpuff";
	var navajowhite = "navajowhite";
	var moccasin = "moccasin";
	var bisque = "bisque";
	var mistyrose = "mistyrose";
	var blanchedalmond = "blanchedalmond";
	var papayawhip = "papayawhip";
	var lavenderblush = "lavenderblush";
	var seashell = "seashell";
	var cornsilk = "cornsilk";
	var lemonchiffon = "lemonchiffon";
	var floralwhite = "floralwhite";
	var snow = "snow";
	var yellow = "yellow";
	var lightyellow = "lightyellow";
	var ivory = "ivory";
	var white = "white";
	var colors = {
		black: black,
		"#000000": "black",
		navy: navy,
		"#000080": "navy",
		darkblue: darkblue,
		"#00008b": "darkblue",
		mediumblue: mediumblue,
		"#0000cd": "mediumblue",
		blue: blue,
		"#0000ff": "blue",
		darkgreen: darkgreen,
		"#006400": "darkgreen",
		green: green,
		"#008000": "green",
		teal: teal,
		"#008080": "teal",
		darkcyan: darkcyan,
		"#008b8b": "darkcyan",
		deepskyblue: deepskyblue,
		"#00bfff": "deepskyblue",
		darkturquoise: darkturquoise,
		"#00ced1": "darkturquoise",
		mediumspringgreen: mediumspringgreen,
		"#00fa9a": "mediumspringgreen",
		lime: lime,
		"#00ff00": "lime",
		springgreen: springgreen,
		"#00ff7f": "springgreen",
		aqua: aqua,
		"#00ffff": "cyan",
		cyan: cyan,
		midnightblue: midnightblue,
		"#191970": "midnightblue",
		dodgerblue: dodgerblue,
		"#1e90ff": "dodgerblue",
		lightseagreen: lightseagreen,
		"#20b2aa": "lightseagreen",
		forestgreen: forestgreen,
		"#228b22": "forestgreen",
		seagreen: seagreen,
		"#2e8b57": "seagreen",
		darkslategray: darkslategray,
		"#2f4f4f": "darkslategray",
		limegreen: limegreen,
		"#32cd32": "limegreen",
		mediumseagreen: mediumseagreen,
		"#3cb371": "mediumseagreen",
		turquoise: turquoise,
		"#40e0d0": "turquoise",
		royalblue: royalblue,
		"#4169e1": "royalblue",
		steelblue: steelblue,
		"#4682b4": "steelblue",
		darkslateblue: darkslateblue,
		"#483d8b": "darkslateblue",
		mediumturquoise: mediumturquoise,
		"#48d1cc": "mediumturquoise",
		indigo: indigo,
		"#4b0082": "indigo",
		darkolivegreen: darkolivegreen,
		"#556b2f": "darkolivegreen",
		cadetblue: cadetblue,
		"#5f9ea0": "cadetblue",
		cornflowerblue: cornflowerblue,
		"#6495ed": "cornflowerblue",
		mediumaquamarine: mediumaquamarine,
		"#66cdaa": "mediumaquamarine",
		dimgray: dimgray,
		"#696969": "dimgrey",
		dimgrey: dimgrey,
		slateblue: slateblue,
		"#6a5acd": "slateblue",
		olivedrab: olivedrab,
		"#6b8e23": "olivedrab",
		slategray: slategray,
		"#708090": "slategray",
		lightslategray: lightslategray,
		"#778899": "lightslategray",
		mediumslateblue: mediumslateblue,
		"#7b68ee": "mediumslateblue",
		lawngreen: lawngreen,
		"#7cfc00": "lawngreen",
		chartreuse: chartreuse,
		"#7fff00": "chartreuse",
		aquamarine: aquamarine,
		"#7fffd4": "aquamarine",
		maroon: maroon,
		"#800000": "maroon",
		purple: purple,
		"#800080": "purple",
		olive: olive,
		"#808000": "olive",
		gray: gray,
		"#808080": "gray",
		skyblue: skyblue,
		"#87ceeb": "skyblue",
		lightskyblue: lightskyblue,
		"#87cefa": "lightskyblue",
		blueviolet: blueviolet,
		"#8a2be2": "blueviolet",
		darkred: darkred,
		"#8b0000": "darkred",
		darkmagenta: darkmagenta,
		"#8b008b": "darkmagenta",
		saddlebrown: saddlebrown,
		"#8b4513": "saddlebrown",
		darkseagreen: darkseagreen,
		"#8fbc8f": "darkseagreen",
		lightgreen: lightgreen,
		"#90ee90": "lightgreen",
		mediumpurple: mediumpurple,
		"#9370db": "mediumpurple",
		darkviolet: darkviolet,
		"#9400d3": "darkviolet",
		palegreen: palegreen,
		"#98fb98": "palegreen",
		darkorchid: darkorchid,
		"#9932cc": "darkorchid",
		yellowgreen: yellowgreen,
		"#9acd32": "yellowgreen",
		sienna: sienna,
		"#a0522d": "sienna",
		brown: brown,
		"#a52a2a": "brown",
		darkgray: darkgray,
		"#a9a9a9": "darkgray",
		lightblue: lightblue,
		"#add8e6": "lightblue",
		greenyellow: greenyellow,
		"#adff2f": "greenyellow",
		paleturquoise: paleturquoise,
		"#afeeee": "paleturquoise",
		lightsteelblue: lightsteelblue,
		"#b0c4de": "lightsteelblue",
		powderblue: powderblue,
		"#b0e0e6": "powderblue",
		firebrick: firebrick,
		"#b22222": "firebrick",
		darkgoldenrod: darkgoldenrod,
		"#b8860b": "darkgoldenrod",
		mediumorchid: mediumorchid,
		"#ba55d3": "mediumorchid",
		rosybrown: rosybrown,
		"#bc8f8f": "rosybrown",
		darkkhaki: darkkhaki,
		"#bdb76b": "darkkhaki",
		silver: silver,
		"#c0c0c0": "silver",
		mediumvioletred: mediumvioletred,
		"#c71585": "mediumvioletred",
		indianred: indianred,
		"#cd5c5c": "indianred",
		peru: peru,
		"#cd853f": "peru",
		chocolate: chocolate,
		"#d2691e": "chocolate",
		tan: tan,
		"#d2b48c": "tan",
		lightgray: lightgray,
		"#d3d3d3": "lightgray",
		thistle: thistle,
		"#d8bfd8": "thistle",
		orchid: orchid,
		"#da70d6": "orchid",
		goldenrod: goldenrod,
		"#daa520": "goldenrod",
		palevioletred: palevioletred,
		"#db7093": "palevioletred",
		crimson: crimson,
		"#dc143c": "crimson",
		gainsboro: gainsboro,
		"#dcdcdc": "gainsboro",
		plum: plum,
		"#dda0dd": "plum",
		burlywood: burlywood,
		"#deb887": "burlywood",
		lightcyan: lightcyan,
		"#e0ffff": "lightcyan",
		lavender: lavender,
		"#e6e6fa": "lavender",
		darksalmon: darksalmon,
		"#e9967a": "darksalmon",
		violet: violet,
		"#ee82ee": "violet",
		palegoldenrod: palegoldenrod,
		"#eee8aa": "palegoldenrod",
		lightcoral: lightcoral,
		"#f08080": "lightcoral",
		khaki: khaki,
		"#f0e68c": "khaki",
		aliceblue: aliceblue,
		"#f0f8ff": "aliceblue",
		honeydew: honeydew,
		"#f0fff0": "honeydew",
		azure: azure,
		"#f0ffff": "azure",
		sandybrown: sandybrown,
		"#f4a460": "sandybrown",
		wheat: wheat,
		"#f5deb3": "wheat",
		beige: beige,
		"#f5f5dc": "beige",
		whitesmoke: whitesmoke,
		"#f5f5f5": "whitesmoke",
		mintcream: mintcream,
		"#f5fffa": "mintcream",
		ghostwhite: ghostwhite,
		"#f8f8ff": "ghostwhite",
		salmon: salmon,
		"#fa8072": "salmon",
		antiquewhite: antiquewhite,
		"#faebd7": "antiquewhite",
		linen: linen,
		"#faf0e6": "linen",
		lightgoldenrodyellow: lightgoldenrodyellow,
		"#fafad2": "lightgoldenrodyellow",
		oldlace: oldlace,
		"#fdf5e6": "oldlace",
		red: red,
		"#ff0000": "red",
		fuchsia: fuchsia,
		"#ff00ff": "magenta",
		magenta: magenta,
		deeppink: deeppink,
		"#ff1493": "deeppink",
		orangered: orangered,
		"#ff4500": "orangered",
		tomato: tomato,
		"#ff6347": "tomato",
		hotpink: hotpink,
		"#ff69b4": "hotpink",
		coral: coral,
		"#ff7f50": "coral",
		darkorange: darkorange,
		"#ff8c00": "darkorange",
		lightsalmon: lightsalmon,
		"#ffa07a": "lightsalmon",
		orange: orange,
		"#ffa500": "orange",
		lightpink: lightpink,
		"#ffb6c1": "lightpink",
		pink: pink,
		"#ffc0cb": "pink",
		gold: gold,
		"#ffd700": "gold",
		peachpuff: peachpuff,
		"#ffdab9": "peachpuff",
		navajowhite: navajowhite,
		"#ffdead": "navajowhite",
		moccasin: moccasin,
		"#ffe4b5": "moccasin",
		bisque: bisque,
		"#ffe4c4": "bisque",
		mistyrose: mistyrose,
		"#ffe4e1": "mistyrose",
		blanchedalmond: blanchedalmond,
		"#ffebcd": "blanchedalmond",
		papayawhip: papayawhip,
		"#ffefd5": "papayawhip",
		lavenderblush: lavenderblush,
		"#fff0f5": "lavenderblush",
		seashell: seashell,
		"#fff5ee": "seashell",
		cornsilk: cornsilk,
		"#fff8dc": "cornsilk",
		lemonchiffon: lemonchiffon,
		"#fffacd": "lemonchiffon",
		floralwhite: floralwhite,
		"#fffaf0": "floralwhite",
		snow: snow,
		"#fffafa": "snow",
		yellow: yellow,
		"#ffff00": "yellow",
		lightyellow: lightyellow,
		"#ffffe0": "lightyellow",
		ivory: ivory,
		"#fffff0": "ivory",
		white: white,
		"#ffffff": "white"
	};

	function getEncodingHeight(encoding,options){return options.height+(options.displayValue&&0<encoding.text.length?options.fontSize+options.textMargin:0)+options.marginTop+options.marginBottom}function getBarcodePadding(textWidth,barcodeWidth,options){if(options.displayValue&&barcodeWidth<textWidth){if("center"==options.textAlign)return Math.floor((textWidth-barcodeWidth)/2);if("left"==options.textAlign)return 0;if("right"==options.textAlign)return Math.floor(textWidth-barcodeWidth)}return 0}function calculateEncodingAttributes(encodings,barcodeOptions,context){for(var i=0;i<encodings.length;i++){var textWidth,encoding=encodings[i],options=merge(barcodeOptions,encoding.options);textWidth=options.displayValue?messureText(encoding.text,options,context):0;var barcodeWidth=encoding.data.length*options.width;encoding.width=Math.ceil(Math.max(textWidth,barcodeWidth)),encoding.height=getEncodingHeight(encoding,options),encoding.barcodePadding=getBarcodePadding(textWidth,barcodeWidth,options);}}function getTotalWidthOfEncodings(encodings){for(var totalWidth=0,i=0;i<encodings.length;i++)totalWidth+=encodings[i].width;return totalWidth}function getMaximumHeightOfEncodings(encodings){for(var maxHeight=0,i=0;i<encodings.length;i++)encodings[i].height>maxHeight&&(maxHeight=encodings[i].height);return maxHeight}function messureText(string,options,context){var ctx;if(context)ctx=context;else if("undefined"!=typeof document)ctx=document.createElement("canvas").getContext("2d");else return 0;ctx.font="".concat(options.fontOptions," ").concat(options.fontSize,"px ").concat(options.font);var size=ctx.measureText(string).width;return size}

	var svgns="http://www.w3.org/2000/svg",SVGRenderer=function(){function SVGRenderer(encodings,options){classCallCheck(this,SVGRenderer),this.svgJson={node:"element",tag:"svg",attr:{style:""},child:[]},this.barCode="",this.encodings=encodings,this.options=options;}return createClass(SVGRenderer,[{key:"render",value:function render(){var currentX=this.options.marginLeft;this.prepareSVG();for(var i=0;i<this.encodings.length;i++){var encoding=this.encodings[i],encodingOptions=merge(this.options,encoding.options),group=this.createGroup(currentX,encodingOptions.marginTop,this.options.useTranslate);this.setGroupOptions(group,encodingOptions),this.drawSvgBarcode(group,encodingOptions,encoding),this.drawSVGText(group,encodingOptions,encoding),this.svgJson.child.push(group),currentX+=encoding.width;}this.barCode=json2html(this.svgJson);}},{key:"prepareSVG",value:function prepareSVG(){for(;this.svgJson.child[0];)this.svgJson.child.shift();calculateEncodingAttributes(this.encodings,this.options);var totalWidth=getTotalWidthOfEncodings(this.encodings),maxHeight=getMaximumHeightOfEncodings(this.encodings),width=totalWidth;if(this.options.useTranslate&&(width=totalWidth+this.options.marginLeft+this.options.marginRight),this.setSvgAttributes(width,maxHeight),this.options.background){var rect=this.drawRect(0,0,width,maxHeight,this.svgJson),color=colors[this.options.background.toLowerCase()];color||(color="white",console.warn("background Not Support ".concat(this.options.background,";"))),rect.attr.style=(rect.attr.style||"")+"fill:".concat(color,";");}}},{key:"drawSvgBarcode",value:function drawSvgBarcode(parent,options,encoding){var yFrom,binary=encoding.data;yFrom="top"==options.textPosition?options.fontSize+options.textMargin:0;for(var barWidth=0,x=0,b=0;b<binary.length;b++)x=b*options.width+encoding.barcodePadding,"1"===binary[b]?barWidth++:0<barWidth&&(this.drawRect(x-options.width*barWidth+parent.x,yFrom,options.width*barWidth,options.height,parent),barWidth=0);0<barWidth&&this.drawRect(x-options.width*(barWidth-1)+parent.x,yFrom,options.width*barWidth,options.height,parent);}},{key:"setSvgAttributes",value:function setSvgAttributes(width,height){var svg=this.svgJson;svg.attr.width="".concat(width,"px"),svg.attr.height="".concat(width,"px"),svg.attr.x="0px",svg.attr.y="0px",svg.attr.viewBox="0 0 ".concat(width," ").concat(height),svg.attr.xmlns=svgns,svg.attr.version="1.1";}},{key:"createGroup",value:function createGroup(x,y,useTranslate){return useTranslate?{node:"element",tag:"g",x:0,y:0,attr:{transform:"translate(".concat(x,", ").concat(y,")")},child:[]}:{node:"element",tag:"g",x:x,y:y,attr:{},child:[]}}},{key:"setGroupOptions",value:function setGroupOptions(group,options){group.attr||(group.attr={});var color=colors[options.lineColor.toLowerCase()];color||(color="black",console.warn("lineColor Not Support ".concat(options.lineColor,";"))),group.attr.style=(group.attr.style||"")+";fill:".concat(color,";");}},{key:"drawRect",value:function drawRect(x,y,width,height,parent){var rect={node:"element",tag:"rect",attr:{style:""}};return rect.attr.x=x,rect.attr.y=y,rect.attr.width=width,rect.attr.height=height,isArray$1(parent.child)&&parent.child.push(rect),rect}},{key:"drawSVGText",value:function drawSVGText(parent,options,encoding){var textElem={node:"element",tag:"text",attr:{style:""},text:"",child:[]};if(options.displayValue){var x,y;textElem.attr.style+=";font:".concat(options.fontOptions," ").concat(options.fontSize,"px ").concat(options.font,";"),y="top"==options.textPosition?options.fontSize-options.textMargin:options.height+options.textMargin+options.fontSize,"left"==options.textAlign||0<encoding.barcodePadding?(x=0,textElem.attr["text-anchor"]="start"):"right"==options.textAlign?(x=encoding.width-1,textElem.attr["text-anchor"]="end"):(x=encoding.width/2,textElem.attr["text-anchor"]="middle"),textElem.attr.x=x+parent.x,textElem.attr.y=y,textElem.child.push({node:"text",tag:"",text:encoding.text}),parent.child.push(textElem);}}}]),SVGRenderer}();

	var renderers = {SVGRenderer:SVGRenderer};

	function getRenderProperties(){var type=0<arguments.length&&arguments[0]!==void 0?arguments[0]:"svg";return {type:type,renderer:renderers.SVGRenderer}}

	function optionsFromStrings(options){var intOptions=["width","height","textMargin","fontSize","margin","marginTop","marginBottom","marginLeft","marginRight"];for(var intOption in intOptions)intOptions.hasOwnProperty(intOption)&&(intOption=intOptions[intOption],"string"==typeof options[intOption]&&(options[intOption]=_parseInt$2(options[intOption],10)));return "string"==typeof options.displayValue&&(options.displayValue="false"!=options.displayValue),options}

	var ErrorHandler=function(){function ErrorHandler(api){classCallCheck(this,ErrorHandler),this.api=api;}return createClass(ErrorHandler,[{key:"handleCatch",value:function handleCatch(e){if("InvalidInputException"!==e.name)throw e;else if(this.api._options.valid!==this.api._defaults.valid)this.api._options.valid(!1);else throw e.message;this.api.render=function(){};}},{key:"wrapBarcodeCall",value:function wrapBarcodeCall(func){try{var result=func.apply(void 0,arguments);return this.api._options.valid(!0),result}catch(e){return this.handleCatch(e),this.api}}}]),ErrorHandler}();

	var _redefineAll = function (target, src, safe) {
	  for (var key in src) {
	    if (safe && target[key]) target[key] = src[key];
	    else _hide(target, key, src[key]);
	  } return target;
	};

	var _anInstance = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

	// call something on iterator step with safe closing on error

	var _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) _anObject(ret.call(iterator));
	    throw e;
	  }
	};

	// check on default Array iterator

	var ITERATOR$1 = _wks('iterator');
	var ArrayProto = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
	};

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG$1 = _wks('toStringTag');
	// ES3 wrong here
	var ARG = _cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
	    // builtinTag case
	    : ARG ? _cof(O)
	    // ES3 arguments fallback
	    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var ITERATOR$2 = _wks('iterator');

	var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$2]
	    || it['@@iterator']
	    || _iterators[_classof(it)];
	};

	var _forOf = createCommonjsModule(function (module) {
	var BREAK = {};
	var RETURN = {};
	var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () { return iterable; } : core_getIteratorMethod(iterable);
	  var f = _ctx(fn, that, entries ? 2 : 1);
	  var index = 0;
	  var length, step, iterator, result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
	    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = _iterCall(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};
	exports.BREAK = BREAK;
	exports.RETURN = RETURN;
	});

	var SPECIES = _wks('species');

	var _setSpecies = function (KEY) {
	  var C = typeof _core[KEY] == 'function' ? _core[KEY] : _global[KEY];
	  if (_descriptors && C && !C[SPECIES]) _objectDp.f(C, SPECIES, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};

	var _validateCollection = function (it, TYPE) {
	  if (!_isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
	  return it;
	};

	var dP$3 = _objectDp.f;









	var fastKey = _meta.fastKey;

	var SIZE = _descriptors ? '_s' : 'size';

	var getEntry = function (that, key) {
	  // fast case
	  var index = fastKey(key);
	  var entry;
	  if (index !== 'F') return that._i[index];
	  // frozen object case
	  for (entry = that._f; entry; entry = entry.n) {
	    if (entry.k == key) return entry;
	  }
	};

	var _collectionStrong = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      _anInstance(that, C, NAME, '_i');
	      that._t = NAME;         // collection type
	      that._i = _objectCreate(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    _redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        for (var that = _validateCollection(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
	          entry.r = true;
	          if (entry.p) entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function (key) {
	        var that = _validateCollection(this, NAME);
	        var entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.n;
	          var prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if (prev) prev.n = next;
	          if (next) next.p = prev;
	          if (that._f == entry) that._f = next;
	          if (that._l == entry) that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        _validateCollection(this, NAME);
	        var f = _ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;
	        while (entry = entry ? entry.n : this._f) {
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while (entry && entry.r) entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(_validateCollection(this, NAME), key);
	      }
	    });
	    if (_descriptors) dP$3(C.prototype, 'size', {
	      get: function () {
	        return _validateCollection(this, NAME)[SIZE];
	      }
	    });
	    return C;
	  },
	  def: function (that, key, value) {
	    var entry = getEntry(that, key);
	    var prev, index;
	    // change existing entry
	    if (entry) {
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if (!that._f) that._f = entry;
	      if (prev) prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if (index !== 'F') that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function (C, NAME, IS_MAP) {
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    _iterDefine(C, NAME, function (iterated, kind) {
	      this._t = _validateCollection(iterated, NAME); // target
	      this._k = kind;                     // kind
	      this._l = undefined;                // previous
	    }, function () {
	      var that = this;
	      var kind = that._k;
	      var entry = that._l;
	      // revert to the last existing entry
	      while (entry && entry.r) entry = entry.p;
	      // get next entry
	      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
	        // or finish the iteration
	        that._t = undefined;
	        return _iterStep(1);
	      }
	      // return step by kind
	      if (kind == 'keys') return _iterStep(0, entry.k);
	      if (kind == 'values') return _iterStep(0, entry.v);
	      return _iterStep(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    _setSpecies(NAME);
	  }
	};

	var SPECIES$1 = _wks('species');

	var _arraySpeciesConstructor = function (original) {
	  var C;
	  if (_isArray(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
	    if (_isObject(C)) {
	      C = C[SPECIES$1];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


	var _arraySpeciesCreate = function (original, length) {
	  return new (_arraySpeciesConstructor(original))(length);
	};

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex





	var _arrayMethods = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  var create = $create || _arraySpeciesCreate;
	  return function ($this, callbackfn, that) {
	    var O = _toObject($this);
	    var self = _iobject(O);
	    var f = _ctx(callbackfn, that, 3);
	    var length = _toLength(self.length);
	    var index = 0;
	    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var val, res;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      val = self[index];
	      res = f(val, index, O);
	      if (TYPE) {
	        if (IS_MAP) result[index] = res;   // map
	        else if (res) switch (TYPE) {
	          case 3: return true;             // some
	          case 5: return val;              // find
	          case 6: return index;            // findIndex
	          case 2: result.push(val);        // filter
	        } else if (IS_EVERY) return false; // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

	var dP$4 = _objectDp.f;
	var each = _arrayMethods(0);


	var _collection = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
	  var Base = _global[NAME];
	  var C = Base;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var proto = C && C.prototype;
	  var O = {};
	  if (!_descriptors || typeof C != 'function' || !(IS_WEAK || proto.forEach && !_fails(function () {
	    new C().entries().next();
	  }))) {
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    _redefineAll(C.prototype, methods);
	    _meta.NEED = true;
	  } else {
	    C = wrapper(function (target, iterable) {
	      _anInstance(target, C, NAME, '_c');
	      target._c = new Base();
	      if (iterable != undefined) _forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
	      var IS_ADDER = KEY == 'add' || KEY == 'set';
	      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) _hide(C.prototype, KEY, function (a, b) {
	        _anInstance(this, C, KEY);
	        if (!IS_ADDER && IS_WEAK && !_isObject(a)) return KEY == 'get' ? undefined : false;
	        var result = this._c[KEY](a === 0 ? 0 : a, b);
	        return IS_ADDER ? this : result;
	      });
	    });
	    IS_WEAK || dP$4(C.prototype, 'size', {
	      get: function () {
	        return this._c.size;
	      }
	    });
	  }

	  _setToStringTag(C, NAME);

	  O[NAME] = C;
	  _export(_export.G + _export.W + _export.F, O);

	  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

	var MAP = 'Map';

	// 23.1 Map Objects
	var es6_map = _collection(MAP, function (get) {
	  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key) {
	    var entry = _collectionStrong.getEntry(_validateCollection(this, MAP), key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value) {
	    return _collectionStrong.def(_validateCollection(this, MAP), key === 0 ? 0 : key, value);
	  }
	}, _collectionStrong, true);

	var _arrayFromIterable = function (iter, ITERATOR) {
	  var result = [];
	  _forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON


	var _collectionToJson = function (NAME) {
	  return function toJSON() {
	    if (_classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
	    return _arrayFromIterable(this);
	  };
	};

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON


	_export(_export.P + _export.R, 'Map', { toJSON: _collectionToJson('Map') });

	// https://tc39.github.io/proposal-setmap-offrom/


	var _setCollectionOf = function (COLLECTION) {
	  _export(_export.S, COLLECTION, { of: function of() {
	    var length = arguments.length;
	    var A = new Array(length);
	    while (length--) A[length] = arguments[length];
	    return new this(A);
	  } });
	};

	// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
	_setCollectionOf('Map');

	// https://tc39.github.io/proposal-setmap-offrom/





	var _setCollectionFrom = function (COLLECTION) {
	  _export(_export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
	    var mapFn = arguments[1];
	    var mapping, A, n, cb;
	    _aFunction(this);
	    mapping = mapFn !== undefined;
	    if (mapping) _aFunction(mapFn);
	    if (source == undefined) return new this();
	    A = [];
	    if (mapping) {
	      n = 0;
	      cb = _ctx(mapFn, arguments[2], 2);
	      _forOf(source, false, function (nextItem) {
	        A.push(cb(nextItem, n++));
	      });
	    } else {
	      _forOf(source, false, A.push, A);
	    }
	    return new this(A);
	  } });
	};

	// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
	_setCollectionFrom('Map');

	var map = _core.Map;

	var map$1 = map;

	function _isNativeFunction(fn) {
	  return Function.toString.call(fn).indexOf("[native code]") !== -1;
	}

	var isNativeFunction = _isNativeFunction;

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	var _invoke = function (fn, args, that) {
	  var un = that === undefined;
	  switch (args.length) {
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return fn.apply(that, args);
	};

	var arraySlice = [].slice;
	var factories = {};

	var construct = function (F, len, args) {
	  if (!(len in factories)) {
	    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
	    // eslint-disable-next-line no-new-func
	    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  } return factories[len](F, args);
	};

	var _bind = Function.bind || function bind(that /* , ...args */) {
	  var fn = _aFunction(this);
	  var partArgs = arraySlice.call(arguments, 1);
	  var bound = function (/* args... */) {
	    var args = partArgs.concat(arraySlice.call(arguments));
	    return this instanceof bound ? construct(fn, args.length, args) : _invoke(fn, args, that);
	  };
	  if (_isObject(fn.prototype)) bound.prototype = fn.prototype;
	  return bound;
	};

	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])







	var rConstruct = (_global.Reflect || {}).construct;

	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	var NEW_TARGET_BUG = _fails(function () {
	  function F() { /* empty */ }
	  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
	});
	var ARGS_BUG = !_fails(function () {
	  rConstruct(function () { /* empty */ });
	});

	_export(_export.S + _export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
	  construct: function construct(Target, args /* , newTarget */) {
	    _aFunction(Target);
	    _anObject(args);
	    var newTarget = arguments.length < 3 ? Target : _aFunction(arguments[2]);
	    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
	    if (Target == newTarget) {
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch (args.length) {
	        case 0: return new Target();
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (_bind.apply(Target, $args))();
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto = newTarget.prototype;
	    var instance = _objectCreate(_isObject(proto) ? proto : Object.prototype);
	    var result = Function.apply.call(Target, instance, args);
	    return _isObject(result) ? result : instance;
	  }
	});

	var construct$1 = _core.Reflect.construct;

	var construct$2 = construct$1;

	var construct$3 = createCommonjsModule(function (module) {
	function isNativeReflectConstruct() {
	  if (typeof Reflect === "undefined" || !construct$2) return false;
	  if (construct$2.sham) return false;
	  if (typeof Proxy === "function") return true;

	  try {
	    Date.prototype.toString.call(construct$2(Date, [], function () {}));
	    return true;
	  } catch (e) {
	    return false;
	  }
	}

	function _construct(Parent, args, Class) {
	  if (isNativeReflectConstruct()) {
	    module.exports = _construct = construct$2;
	  } else {
	    module.exports = _construct = function _construct(Parent, args, Class) {
	      var a = [null];
	      a.push.apply(a, args);
	      var Constructor = Function.bind.apply(Parent, a);
	      var instance = new Constructor();
	      if (Class) setPrototypeOf$2(instance, Class.prototype);
	      return instance;
	    };
	  }

	  return _construct.apply(null, arguments);
	}

	module.exports = _construct;
	});

	var wrapNativeSuper = createCommonjsModule(function (module) {
	function _wrapNativeSuper(Class) {
	  var _cache = typeof map$1 === "function" ? new map$1() : undefined;

	  module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
	    if (Class === null || !isNativeFunction(Class)) return Class;

	    if (typeof Class !== "function") {
	      throw new TypeError("Super expression must either be null or a function");
	    }

	    if (typeof _cache !== "undefined") {
	      if (_cache.has(Class)) return _cache.get(Class);

	      _cache.set(Class, Wrapper);
	    }

	    function Wrapper() {
	      return construct$3(Class, arguments, getPrototypeOf$2(this).constructor);
	    }

	    Wrapper.prototype = create$1(Class.prototype, {
	      constructor: {
	        value: Wrapper,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	    return setPrototypeOf$2(Wrapper, Class);
	  };

	  return _wrapNativeSuper(Class);
	}

	module.exports = _wrapNativeSuper;
	});

	var InvalidInputException=function(_Error){function InvalidInputException(symbology,input){var _this;return classCallCheck(this,InvalidInputException),_this=possibleConstructorReturn(this,getPrototypeOf$2(InvalidInputException).call(this)),_this.name="InvalidInputException",_this.symbology=symbology,_this.input=input,_this.message="\"".concat(_this.input,"\" is not a valid input for ").concat(_this.symbology),_this}return inherits(InvalidInputException,_Error),InvalidInputException}(wrapNativeSuper(Error)),InvalidElementException=function(_Error2){function InvalidElementException(){var _this2;return classCallCheck(this,InvalidElementException),_this2=possibleConstructorReturn(this,getPrototypeOf$2(InvalidElementException).call(this)),_this2.name="InvalidElementException",_this2.message="Not supported type to render on",_this2}return inherits(InvalidElementException,_Error2),InvalidElementException}(wrapNativeSuper(Error)),NoElementException=function(_Error3){function NoElementException(){var _this3;return classCallCheck(this,NoElementException),_this3=possibleConstructorReturn(this,getPrototypeOf$2(NoElementException).call(this)),_this3.name="NoElementException",_this3.message="No element to render on.",_this3}return inherits(NoElementException,_Error3),NoElementException}(wrapNativeSuper(Error));

	var defaults={width:2,height:100,format:"auto",displayValue:!0,fontOptions:"",font:"monospace",text:void 0,textAlign:"center",textPosition:"bottom",textMargin:2,fontSize:20,background:"#ffffff",lineColor:"#000000",margin:10,marginTop:void 0,marginBottom:void 0,marginLeft:void 0,marginRight:void 0,valid:function valid(){}};

	var API=function(){},cnfBarcode=function(text,options){var api=new API;return api._renderProperties=getRenderProperties("svg"),api._encodings=[],api._options=defaults,api._errorHandler=new ErrorHandler(api),api.barCodes={},"undefined"!=typeof text&&(options=options||{},!options.format&&(options.format=autoSelectBarcode()),api.options(options)[options.format](text,options).render()),api};for(var name in barcodes)barcodes.hasOwnProperty(name)&&registerBarcode(barcodes,name);function registerBarcode(barcodes,name){API.prototype[name]=API.prototype[name.toUpperCase()]=API.prototype[name.toLowerCase()]=function(text,options){var api=this;return api._errorHandler.wrapBarcodeCall(function(){options.text="undefined"==typeof options.text?void 0:"".concat(options.text);var newOptions=merge(api._options,options);newOptions=optionsFromStrings(newOptions);var Encoder=barcodes[name],encoded=encode$1(text,Encoder,newOptions);return api._encodings.push(encoded),api})};}function encode$1(text,Encoder,options){text="".concat(text);var encoder=new Encoder(text,options);if(!encoder.valid())throw new InvalidInputException(encoder.constructor.name,text);var encoded=encoder.encode();encoded=linearizeEncodings(encoded);for(var i=0;i<encoded.length;i++)encoded[i].options=merge(options,encoded[i].options);return encoded}function autoSelectBarcode(){return barcodes.CODE128?"CODE128":keys$1(barcodes)[0]}API.prototype.options=function(options){return this._options=merge(this._options,options),this},API.prototype.getSvg=function(){return this.barCodes.svg},API.prototype.getSvgBase64=function(){return "data:image/svg+xml;utf8,".concat(encodeURIComponent(this.barCodes.svg))},API.prototype.blank=function(size){var zeroes=Array(size+1).join("0");return this._encodings.push({data:zeroes}),this},API.prototype.init=function(){if(this._renderProperties){isArray$1(this._renderProperties)||(this._renderProperties=[this._renderProperties]);var renderProperty;for(var i in this._renderProperties){renderProperty=this._renderProperties[i];var options=merge(this._options,renderProperty.options);"auto"==options.format&&(options.format=autoSelectBarcode()),this._errorHandler.wrapBarcodeCall(function(){var text=options.value,Encoder=barcodes[options.format.toUpperCase()],encoded=encode$1(text,Encoder,options);render(renderProperty,encoded,options);});}}},API.prototype.render=function(){var _this=this;if(!this._renderProperties)throw new NoElementException;var barCodes={};return isArray$1(this._renderProperties)?this._renderProperties.forEach(function(item){barCodes[item.type]=render(item,_this._encodings,_this._options);}):barCodes[this._renderProperties.type]=render(this._renderProperties,this._encodings,this._options),this.barCodes=barCodes,this},API.prototype._defaults=defaults;function render(renderProperties,encodings,options){encodings=linearizeEncodings(encodings);for(var i=0;i<encodings.length;i++)encodings[i].options=merge(options,encodings[i].options),fixOptions(encodings[i].options);fixOptions(options);var Renderer=renderProperties.renderer,renderer=new Renderer(encodings,options);return renderer.render(),renderProperties.afterRender&&renderProperties.afterRender(),renderer.barCode}

	return cnfBarcode;

}));
//# sourceMappingURL=svg-barcode.dev.js.map
