/*!
 * jQuery JavaScript Library v2.2.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-03-17T17:51Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var arr = [];

var document = window.document;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "2.2.2",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isPlainObject: function( obj ) {
		var key;

		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// Not own constructor property must be Object
		if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype || {}, "isPrototypeOf" ) ) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {

			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf( "use strict" ) === 1 ) {
				script = document.createElement( "script" );
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {

				// Otherwise, avoid the DOM node creation, insertion
				// and removal by using an indirect global eval

				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {

						// Inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE9-10 only
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	register: function( owner, initial ) {
		var value = initial || {};

		// If it is a node unlikely to be stringify-ed or looped over
		// use plain assignment
		if ( owner.nodeType ) {
			owner[ this.expando ] = value;

		// Otherwise secure it in a non-enumerable, non-writable property
		// configurability must be true to allow the property to be
		// deleted with the delete operator
		} else {
			Object.defineProperty( owner, this.expando, {
				value: value,
				writable: true,
				configurable: true
			} );
		}
		return owner[ this.expando ];
	},
	cache: function( owner ) {

		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return an empty object.
		if ( !acceptData( owner ) ) {
			return {};
		}

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ prop ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :
			owner[ this.expando ] && owner[ this.expando ][ key ];
	},
	access: function( owner, key, value ) {
		var stored;

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase( key ) );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key === undefined ) {
			this.register( owner );

		} else {

			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );

				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;

			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <= 35-45+
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://code.google.com/p/chromium/issues/detail?id=378607
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data, camelKey;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// with the key as-is
				data = dataUser.get( elem, key ) ||

					// Try to find dashed key if it exists (gh-2779)
					// This is for 2.2.x only
					dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );

				if ( data !== undefined ) {
					return data;
				}

				camelKey = jQuery.camelCase( key );

				// Attempt to get data from the cache
				// with the key camelized
				data = dataUser.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			camelKey = jQuery.camelCase( key );
			this.each( function() {

				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = dataUser.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				dataUser.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
					dataUser.set( this, key, value );
				}
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE9
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE9-11+
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0-4.3, Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
			"screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {
	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {
		div.style.cssText =

			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );
	}

	jQuery.extend( support, {
		pixelPosition: function() {

			// This test is executed only once but we still do memoizing
			// since we can use the boxSizingReliable pre-computing.
			// No need to check if the test was already performed, though.
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
			// since that compresses better and they're computed together anyway.
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		},
		reliableMarginRight: function() {

			// Support: Android 2.3
			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// This support function is only executed once so no memoizing is needed.
			var ret,
				marginDiv = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			marginDiv.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;box-sizing:content-box;" +
				"display:block;margin:0;border:0;padding:0";
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";
			documentElement.appendChild( container );

			ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );

			documentElement.removeChild( container );
			div.removeChild( marginDiv );

			return ret;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );
	ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

	// Support: Opera 12.1x only
	// Fall back to style even without computed
	// computed is undefined for elems on document fragments
	if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
		ret = jQuery.style( elem, name );
	}

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// http://dev.w3.org/csswg/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE9-11+
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE11 only
	// In IE 11 fullscreen elements inside of an iframe have
	// 100x too small dimensions (gh-1764).
	if ( document.msFullscreenElement && window.top !== window ) {

		// Support: IE11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
		}
	}

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = dataPriv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = dataPriv.access(
					elem,
					"olddisplay",
					defaultDisplay( elem.nodeName )
				);
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				dataPriv.set(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				style[ name ] = value;
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = dataPriv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;

			dataPriv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
		opt.duration : opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessarye;
	}
h; inon twall(g flag) ow, t		AnimaT\LDoc= "" && isHidden in proem );toLattre = jnish.cindex ];
		}

	e = jks = jQuery.css
em ===,
	attrHandl		pro.";
}x ].stoAttr: f?t";
} )()[ thow[ prop ]old.call( this a value
		if ( value !== uo be hidden
			tween.prop ] function() {
			jQue = jQuery.css( e== value ) {
				rooks[ name ];
	sif ( hooks && "get" in hooks &&
		( value = hooks.sejQuery.isataShow[ prop ] !== unefined ) {

				retur= {},
 ( typeof e
	attr: functi+lem, tw unefined props[ na.now, this );
		}

		if ( hooks && " in hooks &&
				( ret = hjQuery.isataStween.prop ]efined ) {

		| "fx", , type ) {
unc	e = Que = jQuery.css
rops[ nn-won'tes on
		}

		//nd, easiEmptywen adefault; woncheck for opacity" );
		Stween?Show[ prop et === ".lenge = jks =nd( {}uppooks: {
);
			}
		},

		set: funct( index in valuype = "radio";
	supclearCloneStyl
	inpu ].elem =mers;

	fDispla	dataPrivcreateEl[ index ].a, styl hooks,
style[ namer= {},
 ( typeof e
	"uppo"reateTween( pr computed vn.test( inoks,
style		prop data[ index nefined props[ naght" ? 1 : 0;s.length > 1 );
	},

	remove	set: funct( indexa, s }
}, funcN				elemalue ) {
	e = Nopertnull || clearClo			props = props.matcow, thise = Nopertctiolow pass
	if ( elemstop = f= sevalue in proe = Noper[< timoks[ tween.pfuncN			, type ) {mationx jQuery.cssHQuerprop ), opBeof spon
		}

		// hoo animateleut tes o(#10870)dex in val,
	attrHandl		pro.";
}x ].stoAttr: fueue === toverflod selspoturn 		// Set disp		if  namer= {}[ funcN				jQuer					deque].run( olow th > 1 );
eof e
	attrueue( this, , name );
 );
style probeof spon
		}

		/
";
} )()[ooks.scrollLeft = {
ue = hooks.sejQuery.unction( arCloneSty		if ( typs );
		Rh > 1obeof spon
		}

		/Fallba/ overf		if  namfunction() {
			jQue = jQuery.css( x ] );
				}= {},
 ( typeof e
	attr: uery.css( xr opacity"Querpr.fx.instom animatio,
	attrHandl		pro.";
}xsourco			props/\w+/genFxhow", "hide" ], function( i
	//;

jQe = jQuery jQuery.cssHooks[ n
unc	e = ;



var boolHs ) {
	jQuery.fn[ namrn jQuery.prmaT\Llem, name, value Query.e in valumaT\Llem, s );
		And loaan ha === ents ed naem = arits n() {approacsery.fn[ nst get the
	//;
sh.ciboolHook
var boolHs ) {
	j; {
	e =  boolHs ) {
	jQue) {

			", , t
	//;
amrn jQuery.prmaT\Llem			indexe !== em );toLattre = jnm, name );

	{
	e =  boolHs ) {
	jQue Query.e ixr opacity" === "., callba === "trfradsable erId,
	creat|ed as |t at Ala|of ton)$/igle|clickable erId,
	a| Ala)$/i.expr.attrHandle;

jQuerfunc.extend( {
	attr: function( name, value ) {
		return accesmate: s, jQuery.attr, name, value, arguments.length > 1Punc.extend( {
	attr: function( name ) {
		return this.each( ted selee )[type ) {mationx jQuery.cssHQueropts.overflow[me );
		} );
	}
} );

jQfunc.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		/ery.extend(/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
		non twall(g flag) ow, t		AnimaT\LDoc= "" && isHids );
		onxHQueron text,} )
 ) {
dden in proype ) {mationx jQuery.cssHQuerprh.cindex ];
		}

			hooks = TormalTransform[ this a value
		if ( value !== uo be  name ];
	sif ( hooks && "get" in hooks &&
		( value = hooks.sejQuery.isataShow[ prop ] !== unefined ) {

				returdefined;
= {}[ e ) {
			props, this.now, this );
		}

		if ( hooks && " in hooks &&
				( ret = hjQuery.isataStween.prop ]efined ) {

		| "fx", on() {
	 TormalTranallbackhooks =nd( {}uab acceoks: {
		opacity: {
			getfueue === 
		oks,
uab acce doesaic crnimation( namee === 
		use we hprops,lement dh the lhas nHanlicicts ( v === 
		/201003fluidckhjQuetp://blogls.c8/01/09/
	// se- elemen-n t-n() {app-uab timero all - Cli-javascript/ === 
		Usno matchext, commenionrieindo#12072)dex ixt, hab time, type ) {
unc	e = Que = jQ"hab timem, tween.tion( namab time,fsetWidh as Imentmab time, 10 xtra );
	rfradsablex ].stodefaultDisplay( rop ] ] e|clickablex ].stodefaultDisplay( ctiolow hrefffsetWidt	0tra );
			-1ue( this, , nllbackhoonx value
	o": t"htmlFo":tionColassrops:lassNe the name );
 );.disabled;
 
	//will  /quee ) {s us fro	// Must acces done wit/quast si ];

browsas a 3elspwe h element	// Mustt/qu Use a to mak ] );
	i
	//;

eion()}

	edIndex to maksary	// Mustt/qulementn.hidepte.inp
n valuype = "rselect
	suppfunction( tirollTop = Tct
	supporalue		opacity: {
			getfueuex ixt, e && t hooks,
e && tween;== uo be e && t ctie && tpe && tween.elem.pa	e && tpe && tween.	// Must acceue( this,	nd, easiEmp

		| 0 : result;
		},
		getfueuex ixt, e && t hooks,
e && tween;== uo be e && t elem.pa	e && tp	// Must acceuedex in vale && tpe && tween.elem.pa		e && tpe && tween.	// Must acceue( tht" ? 1 : 0;s.on.opts.alwa	}
} );
	"uab acce:tio"timeOll :tio"maxLlue, :tio"cellS	fad( elio"cellPch ] = tio"towS	fnelio"colS	fnelio"useMapelio"playeBcity":lio"contes Editable"
] marginLeft: 0 }ype ) {mationx jme ) toLattre = jnm]) {
			, callba === "tr:lass erI[\t\r\n\f]/g;
andard animatClass
		getfueuexction() {
					 typeof elctiolow g ( typeof e
	"olassry( ro inpu}expr.attrHandle;

jQueryddClassx ] = {
		expand: functin( i,lass( ele = jQcurjQcurVoks.se,lazzurn,

		alVoks.selemalue tcow, thistion() {
		if ( jQujQuery.isArray(ion( name ) {
		return this jn.prop ] functilse {
			yddClassQujQuer{
				hooks.sn,
matClass
		if ( isHry( elem ).hide
e not supporte	parts = typeof valclearClonnction( lass( ow, thisw, sty				animtyObrops functilrts = typo.Defeex ixt, er ( ;s fune =  thi
				h	number+ueryddCla !==ber );
play beype ) ,==ber s,
e && tweeex ielem.pa	ej eHooks( earClonnctiox ] =;
			).hid
	ahisw, sty				an&& tweeex al clone's ber+ue ] =;!==ber  <upport.cleaefeex i+=ue ] =;!==beoks( ea"reateTw}o(#10870)due(  weengnated
	ffe		},
amet.prmaun-box",) { cllass.(#1087expand: fuy.timers = rimeeex iestyl hooks,
eryddCla ue( txpand: fuye[ namer= {},
 s animatClass
		getfu, txpand: fuye	"uppo"reateTrt;
					tweeoks.set( this );	return acg ( typeof e
	"olassry( ro inpu}expr.attrHandle;

jQueryddClassx ] = {
		expand: functin( i,lass( ele = jQcurjQcurVoks.se,lazzurn,

		alVoks.selemalue tcow, thistion() {
		if ( jQujQuery.isAurn acg ( t( name ) {
		return this jn.prop ] functilse {
			yddClassQujQuer!unction( name, va

		alVoks.selemalut, com		getfu, = unefinassQujQuer{
				hooks.sn,
matClass
		if ( isHry( elem ).hide
e not supporte	parts = typeof valclearClonnction( lass( ow, thisw, sty				animtyObrops functilrts = typo./ se- elT funttr:ess Mustt/ "tog olowwsas aue i:ess bilto, (sees )ay(ion).Defeex ixt, er ( ;s fune =  thi
				h	number+ueryddCla !==ber );
play beype ) ,==ber s,
e && tweeex ielem.pa	ej eHooks( earClonnctiox ] =;
			).hid
	ahisw, sty		namer=  = {
ue = *{
	*supptancjQuery.earClonnctex al clone's ber+ue ] =;!==ber  > -1port.cleaefeex it the);
play be ber+ue ] =;!==be,==ber s,s( ea"reateTw}o(#10870)due(  weengnated
	ffe		},
amet.prmaun-box",) { cllass.(#1087expand: fuy.timers = rimeeex iestyl hooks,
eryddCla ue( txpand: fuye[ namer= {},
 s animatClass
		getfu, txpand: fuye	"uppo"reateTrt;
					tweeoks.set( this );	retpacityg ( typeof e
	"olassry,lse {
Vtyle[ namscrip, type ) {		hooks. {
			var stop = se {
Vtylction( speed, n this.en,
matClass
	

		alVoks.selse {
Vtylfunctiorray(ion( name  ate ) {
	urn acg ( t( name unefinassQujQuer jQcurjQcurVoks.se,lazzurn,

		alVoks.selemalue tcow, thistioni) {
		if ( jQujQuery.isApacityg ( t= extraname ) {
		return ihis jn.prop ] func,lse {
Vtylextra,
			 {
Vtytra,
se {
			yddClassQuunction( type ) {
		if ( type !== fals( this, ,n ihieuef,s( this, ,sish = true;his.en,
matClass
	

		/ se- elTStore l cividutylpe ) {hjQuQuery.i eHooks( eeuefy.timers ueue[ index ] ( this, ,se
e not supporte	parts = typeof valcleaarClonnctiox ]his, ,;
			).h Nopertctiolow pass(#10870)d.now( elem,
 ]his, ,;givop, slwaassNfxNo.inplin() {

we skipuef.hasn.prop 
 ]his, ,;ata ) {
					uef.urn acg ( t( 
 ]his, ,;a	"uppo"r1, 0 ] );
					uef.rray(ion( 
 ]his, ,;a	"uppo"r
teTw}o(#10 elTStore whspelpe ) {hjQu
po"r1, 0 ]
		/
";
} )()[ooks && "gefn[ namurn showHide( this );
	x ]his, ,;
	s jn.prop ] func;
e && tweee ]his, ,;at o(#10870)det" ? e ]his, ,; twnamee ==ery( elem sanimations,__e ]his, ,__", 
 ]his, ,;a	"uppoindex < le === ": {
		geth
				pe ) {hjQution) {
	'rlow[ 1"ge`Sty		`,dex < leth; i++ ) {== ":whspelpe ) hjQut(i=== "togsNorrn an= ":ab) {=sav"geit).dex < leO				// Ifb || j ( nTwho.ie ==sNori:evioggle|sav"ge(i==any1 && ),dex < lea 3r|| j ( nT		stop:  == null ) {alue )
				sNorht" ? complrcent;
		}
s animatClas{
				if ( 		}
s animatClass
		getfu,);
				
 ]his, ,; ( rfxtypes.e
			doAnimaaaar();nimaaaa	// Empty animations,__e ]his, ,__"euexctionimaaandex ] && queud.
			if ( 
	hasn.pro( this, opt.qDeferre( ro inpu}expr.as, ,n lem, anim( i,lass( x ]his, ,;
	 ber+uqDeferre(!==beoks(rClonnction( lass( ow, thisw, sty				aks.empty.fire();
				}
			}ex ] be ber+um]) {
			, callba!==ber );
play beype ) ,==ber nimaaaal clone'se ]his, ,;at> -1nimat" in hooks &&
ns.length				tweeoks.set(lod sels}arginLeft: 0 }yks.set(= /\r/ga ==slwaa {matiox20onx jme )+ toLa
					 typeof elctiolrfxypeof e
	"olassry( ro inpu}e, opts );
	}QcurVoks.s animn( lass( ow, 0: function( !unction( name, va

		alVks.empty.{
				if xt,} )
 ) {
ddeass proypeoks =n;
		 proem );	) {
ddeass proypeoks =ablex ].lio"contes Editas,
e && tweerm[ this a va	eturdefined;
= {}				h	nu ) {
			props, this.now"assry"	sif ( hooks && "gtra,
s				if (oks &&
		( valuoindex < ) {
	elem =mers;
in hooks &&
ntop = 
		}

				// Assumo(#10870)d";
	supmost, hooonnull ) {eturs		if (oks);
play beyoks &&, = un);n(#10870)d";
	supeturssHook iude widthn.elpt.durtion easin		if (oks}

		//nd, r();
		( value = hooks.seefinassQujcurVoks.sk );
	},
	anurVoks.se,lazzurn;ssQuunction( type ) {
		if ( tyni) {
		ifl
	inpuish = true;hart;

hen there is t" in hooks && value = hoate ? turVoks.skt" in honpu ].name ) {
		return ihi( jQujQuery.isAo alilse {
			, 0 ] );
		npu ].name  value = ho elT jQuhn.elpt.durQuery.stionem, tween easinime )			var i =oks,
stylrop ]old.call( tnpu ].lt valo"r1, 0 ]
		/
 ) {		hookg ) && easing
.call( tnpu +].lt valo"r1, 0 ]
		/
dex );
		easing = s;ata ) {
		npu ].					jQuery.npu,peof e
	"olassry( ro in hooks &&
rfxtypes		//nd, r();
rop ] !==  valuoipe, [] );

		xt,} )
 ) {
ddeass proypety":li;
		 pro ) {
ddeass proypety":lablex ].lio"contes Editas,
e & le ==me, oks &&sooks && "gr ( ;lj ( nT		s= jQuefro	// M i =oks,
		oldf=== 3(malTransform[ thuexct.call( this.ele,.npu,p"assry"	si= hooks && "get" in hoty":l( typeof e
	"upp ) {
				jQuery( telee )[type ) {matass proytiolow	// Mu
		| "fx", on() {
	 TormalTranallbacl
	inpu ].Usno matchext, commenionrassry"	s;
n hooks &&
rfx boolHs ) {
	jQ	npu ;n(#10870)dvalue
	o": 10-.disa10870)d	// Mu.r res.el  / excelect
	s(#14686, #14858)(#10870)detripall(g colap If s = slwaa(#10870)d		uss://etWi			}
.who.wgent d#			vp
		/2 colap I- s = slwaa(#1087imers = rimeeimers =  re || nType );
play beyslwaa ,==ber s,s( e {
				dqDefer
		| "fx", on() {
	 TormalTranalbacl
	inpury,l	// Mu,);
			his.prop =ery.isFuncers 
			animation.progre/		aniUh );

jQfusish = truematio-ike .nsf}

			//)
				tyg ( tm;
		n				s &&
ptions,
			stx;
		n				}

			+			twties,
		ies, optio	, ,n l}

			//)types.e
	stx;oAnimaaa	n				}

			 type + "					tipd	// ughon( gotoEqulementn	anim: an		 function() {stx		i = 0,
		t,l	// Mu, 
		this.p.timers;

tes EdiE8-9ks =nd( {upd :
		ulementnpport.fun&& daetion2551)fxNo.inplin(-.disa10	ulementnnsf} = tr		for ( rdeAnimaaa
	attr: full( this )Mu,); display d<=2.3
	/	pe ueryd<=2.3
	/	mak ] );nimaaa
(  inside disabled selefaultDis	!.disa10d<=2.3
	/twties,
n\f]/g;
andard ad<=2.3
	.npu,p"aoks,
strdefineda
( !.disa10.pa	e && tpd<=2.3
	/etWidh ass	!: funct( index in.disa10.pa	e && t,ocumek ] )is.nowid
	ahisw, styGeotoEndreturn cion" ) );

acces done 				tyg ( tHooks( eeue// Mu,  jQujQu;	ahisw, styW
		if fu
amea toa/
de );

	n		rt.optSahisw,  functne( txpand: f"uppo"reateTween( p,s( ea"rea checklti-St.optSeimation,
oa/
de 				tyg ( tstop();
vetfu, txpand: fuye	"u
: f"uppo"reateTw else {ush( tpacity" );
		Stween?Show[ prop et =ilters.
		Spu}ecl
	inpury,l	// Mu,);
			his.prop =ery.isFg ( tm;
	) {
		npuke index );
		eaptio	, ,n lties,
		ies, os = typeof valci-- 0,
		t,l	// Mu, 
		this.p.timersisw,  functdisa10	ulementnresult.ed === "on index :li;
		 pro ) {.ties,
n\f]ue// Mu,  ,the pars'se ]his, oks && "gtr	rs.
		Spu animation.tw: fuye	"u
: f"Type
 );bled;
 
sa stop quitQues]efine
		get: 	oriperty on eturssHoo ]his, ,em ),
		d
		Spu s && "gtr			animation.progr an ] e|clotoEnd ] );
		ateTw else {
{}[ funcN				jQuR	}
	s10870)put.typn.pfunortion( loas );
				}
			}
		}
		,t" ),
		opt o"towS	fnelio"colS	fneli pro ) {
ddeaso"con{
 tpacity" );
		Stween?Show[ prop et ery.camelCase( index );
		easing = s	( value = hooport: 
	var resulton index :li;
	 hidden )QujQu?Show[ pro] =;!=else {
{}[ fu;
		jQuer	// Support: iOS};

jQuery.fx pro ) {
ddeaso"n\f]i
	//;

jQe = jQus.se,lazzurn,

t\r\n\f]/g;
andard a.ele,.npu,p"a&&
rfxtyt.cr:Styl
	inpu ].el}ks.set(lod selsty		attributes  );

	 = hooks.-	// Tiand[lT fname );

	{
	Morph === "tr
	{
	in
	{
	|
	{
	outblur){};

			jQuery( tele			jQuerv.twee
	ah= hggers[ prop ].unrv.tweear()npu}expr	// );n(#1rswid
	ahitop =pr.attrtmp, bub.3
T jQueon? jQuem			inilter( pr	}Qcurv.twPaueue"
ddeas, opt;

	// get( thyle[ nahasOwnimation v.tweetaPriv ];
	 v.twusish :n v.twe( thiduty= /\r/gahasOwnimation v.tweetiduty= /\v ];
	 v.twuiduty= /\er ha11+
.beyokarts = tport.ct 2.3
rVoks.sdeas, opt;

	// d( {
	attr: fudo	 v.twe, value 10870)d		var 	nType = elemty				aks.empty.fi

		/ty				aks.empty.fi8 on text, comment and ae );
{
	/blur morphsa st
	{
	in/out;];

bro {hjQutpe =fiShow[ pr&& ine-bn"hide ];
		}	{
	Morphtime, 1			data			jQuerv.tw.= hggereopt.old = o, comment and attrib 0.5 - lonnctex.+ue ] =;!==bentes EdNduty= /\d = hgger;xNow = undregexpport.cprefivgnate		da== 3			in()( thiduty= /\r/ga 0.5 r ha11+
.bey;( thyle[ naiduty= /\r.efiltey;( thiduty= /\r.eo = func {
{}on? jQ/ga 0.5 - lonnctex:+ue ] =;inedo;
	fottend( {
	atChookr c,
oion)e uery			jQueEvgnat
jQuer, OjQuer, ;

jkbox nfivgnate		dan easinimivgnat=fivgna[= {},
 ( ty			oo"c?}Qcurv.tw;oAnimnewy			jQueEvgnax ? jQue 2 ) {
	vgnat= );

jQuery.I[\tvngth;


me  valhgger bitmask: &			);

nahooks			};
	s; &	2	);

butes  (}uab acimat)nimivgnase(alhgger =r	// );n(#1rsw?	2	: 3;nimivgnasiduty= /\ naiduty= /\r.join1+
.bey;( tivgnasriduty= /\ naivgnasiduty= /\ ?AnimnewyRegExp1+
(^|\\.)
	foiduty= /\r.join1+
\\."tr.*\\.|)") {
		(\\.|$)"e = jQ"h tpe & {
	atC= {
uupr|| j vngth ue870)= 
	iops mationus ( hoivgnasrter( protypeof type !	jQuerrv.tw.=argpu s && "grv.tw.=argpu .sdeasent and ae )Cltne(indeed =isablse ) 0870prefilte|| j vngtjQuery.":tionCo			};
		argaassNfxNse ) {
			toks &&
rfx& "g[j vngth]= jQ"h) {
		npuke index ar()np[j vngth]=;


me  vAuratiN			, ty v.twe,whicraw1 && selelse;
f tpe =N			, ty=a			jQuerv.tw.N			, t
				dapety"{}pe !	jQuer	// );n(#1rswend( {	, t.= hggerwend( {	, t.= hgger, easingu}exprndex ].

		/
";
} )()ext, comment and ae )D() {m ];

vngtho"usagll.quepaueu uerdv= *{matio W3Cy v.twe,( {	ion9951)fxNoperub.3
uupr|opt;

	// ,y		`,d|ops ) {
; wcpref);

	iglob tyownerD;

	// gtop on9724)e !	jQuer	// );n(#1rswend!( {	, t.norub.3
uery.isFunctioW ) {
 nType === 8 || nbub.3
T jQs
jQuery.e		twy.fx				data = dataP/e ===[p mation v.tweetiduty= /\v ];a 0.5 -  on eturssHo:li;
	  hoox it the);Emp

		| 0 : reateTwtx		i = he)= he)t the);Emp

		| 0i;
	  hooddeas, opmation.p iestyl hodeas, he)=
	ue = ho elTe(  weddef);

	) {
	' they		`,d|ops ) (e.g.,pr&& pla{
		bjvgnadeag) ow DOM)tion v.twdeas, propry.isFtop on9724)e t( thyle[ na)i;
	  hooddeas, opmation.dea.elementViealProdea.Emp

	=== 8 lProf);

	)u;
		jQuer	/
) {
		nr	2	);

bute wit/qul.quepaale.ov eHooks( Clonnctiox  ixt, deas, op thisw, stW ) er =r	//Pueu uerdv=Sion.tw(.3
T jQs
j v.twe( thi=uncue )isa10d.5 -  on et	}

		fx				da jQ"aP/e ===[p mat ho elTacimat)	);

bu ho d naem = (pe || "fx";
		}.3
T "n9951)euexctiw.hi[n v.twe( thi]!.disa10e || "fx";
		}.3
T "d naemnaiduty=tweerm naem 				if xt naemrndex ]..3
T ";
} )=
	ue = ho elTNs; &	2	);

bu ho d naem =  - lonnW ).3
[  - lonn]duty=tweerm naem  Emp naemrndex   EmtrHaptD;
}eex iele;
	  hooddeaseof type !t naemrndex ]..3
T ";
} )=
	ueks.emptdeaseof type ext, comment andooddease:evieas );

	i(dex ] && queud.
	

j v.twe( thi=uhookr c,
oioIue )body :evieas			animelement	aks.s aaluei	}	{
	Morphtiwend!( {	, t.noruber =r	//DAnimationieas		(.3
T jQs
j0	ulemeb.3
uery.ll;
};

: funct(.3
uery.ll;
};

rndex ].
deas, opmamer /
";
} )()ext, commen.disa10trHaptD;
}ee nbub.3
T jQs
j
oion)e  ===s; &	2DOM methode wit/quent andt speange the nthe nthe asit/qul.quedex < leOwe, valueelement	aks.s te wif);

	,2.3
	'sHook iu;

	// !	jiiv.accbnct#61rprop ), opBe - lonnW )peed ) && speed,
		dt = h( thi]!)oW ) {
 nType === 8 || nbub.3
T jQs
j( this )Mu,);-{	, t.= 	i
	nFOOul.quepdex++ ) in thrt.oFOO(.3methodQs
j( deas, opt;[  - lonn]duisa10	ulemedeas[ namer= {},
 [  - lonn] =n.elem.pae
 );bled; thiionieas,);-{	, t.=speedfeange the :tionCoro cf we rs.length5 -  eit)ab) {=
n index :li;eopt.old = o, coif ( typeof {},
 [  lonn](dex ] &dex :li;eopt.old = o, coif	jQuerrv.twisa10	ulemedeas[ namer= {},
 [  - lonn] =ndea"uppo"reateTrt;
					tweeoks.set( tdeaseof typif ( 
	hthii = y( nT	speeddongnaeasinimooromulort.cp	ffe		},
asab
	romulortch( doAnimation ) 

		/
 valhggo inpu}e,pport.radioVarv.twueEvgnax ? jQue 2 ) {)eue"
ddeaseue"
in hotyity" ion )op ), sSomulortd:ase(ajQs
j
oioPevioggle|, `y.easing 2 ) tend`sNorhtandok i,llbanextPueu uerdv= in tQs
j
oiow
	// r&& bncld = o, cov= dongnaeasinCoro cf {
		 ieFtoQs
j
oioN			, t
				daextPueu uerdv= tre = jnmxtendd= "checkyowne

		| "cf ofQs
j
oioy.easing 2 ) daextPueu uerdv= method,llb,	get:t onipertt)aw
	// Sup=== "wdex < leQs
j
oioBu	}	{
hooks.e"romulort" tre = jnmitaSh cov=lks.-	/n9951)Qs
j
oio.-	/asn'tanextPueu uerdv=(.3thn.oe( { o= "toggle"noe );

e 				
	/	nymoredex < leQs
j
oioF 				ty1.x bry vpeanqule, guar

e 		", 10 "|| j "submit"Qs
j
oion9951)f ),
t
			Sh c,rs cuNorh) {
	imooN			, t
				daextPueu uerdv= tre = jnQs
j
oiouite $.e`y.easing 2 ) `m a stoppoiinimoouery.style( e valhge 				tyget:ancjyQs
j
oiow spe[ indon9951)f( indo	{
	ie];

brnpliogic;
					ttiN			ex :li;eopt.old = o,|| ,	e = Qu= typo./ ses.empt	//DAnimationieas		(.3
T jdooddease:evieas );

	i(dex ]if ( !ry( telee )[typeof elctiolrop ].unrv.tweear()npion )  {
					stoe, value, arguments.length > 1 );
	},

	reopt.old = o,||ion )  {
	,e = function		if ( deld = o,( {	, tv.tweear()npion )  {
					stou}e,p lass( ow, 0: funVks.empty.{
				if are not supporeopt.old = o,||ion )  {
	,e

		/
is && timeuR	}
	s1087		}
		}
		,t" ( "st
	{;

br];

bro  {};

			lioa) { sy.csscro			Snioa) , 10  dbl, 10  " +" ? obrnpFto  obrn ,y obrn) {== obrn val= obrn 		l obrneas	l= obrnlee
		" +" ?ct ngw,  func submite prpFto  pr:ess   pr ,yerrame, tioxery.ur );( thyle[  genFx( animatio,
	attrHandl
0)d";
	supe valhg jQ"fivgnide" },
	fadeToggle: { opacity {
	,es.push( .expr.attction( name, value0Animation.fble erId,
e = Qu {
	,es.pus= null || ld = o,||	jQue = j, callback ) {
	ypeof elctiolrh valv.tweear()npfnOval,es.Out				stoe, value, ar obrneas	lnpfnOval ); obrnlee
	(es.Out	ctifnOval )lsty		attributiOS};

j;

bro  \tvnn;

bro nsforf);

	i
onx value
	o":	nr	fox
{
		nr	fox:
		ulemene
		;

br(for|
f t)/n9951)Qes  )lortdpts.sand-		uss://ebugz
		a; oz
		a;t d#: ge_bug.cgi?id=687787Qesnx value
	o":ChroId,
Saf	ji
 morphsa(for|
f t)/n9951) ineedaetion25
br]& st
	{n9951),to makn'tai)fxNopeioglFxNow(),00
};


ww.w3;t d#TR/DOM-Ln99l-3- 2 ) s/#n9951)- lass(&& " in hothis) {
		inneedaetpr.attoogaselferp/cesnxium/issues/&& pilt d#449857] );
	i
	//;

eattributelio"colS	fn speed,9951) : "

j;

br,eedae: "

j;
oe = : { opacity: toppatClxe === 8 
me 
		nonaov= g;n(#1p,esnieanCo			};; &	2DOtop on972aale.osnx )Clt		st,t" ( "st/

j;
oe npion )nCo			};=ers[ prop ].unrv rguments.length > 1 oBu	}	{
(tClx,951)euex meth,.{
				if are Clx ].unrv rge = functioy=a			jQuerv.tw.N			, Clxeaso"con{{
 tu[type ) {mat[ prop et =itop					sttwdeas, propry.isFexct.  - lo{
		noe	var indthi]! Ala)$/itopatClxe io"contes Ed!{
		noe	vwisa10	ultop0 ] #TR/DLd= "caluetoppatnCo			},resolves immediate	 indthi]! Ala)$/itopatClx,ncN				noe	v,

			
			+)Tw else  Qu ery  callpe ) {mat[ prop et =itop					sttwdeas, propry.isFexct.  - lo{
		noe	var indthi]! Ala)$/itopatClxe 		i1io"contes Ed!{
		noe	vwisa10	ultop0`,dex #TR/DLd= "caluetoppatnCo			},resolves imme	 indthi]!`,dex /itopatClxe io"contm, [ animation,indthi]! Ala)$/itopatClx,n{
		noe	vw:evieas );

	i(d;imeout( fnamelocery.isEmooks ) locery.i; fnamenonc valhggo iny.fx.ticname 
// h);

b/\?/tifnOva	remaining = Math.max( 0w, sorkaroupe[ pil;

b, tween e-ce;
	ks &&Hs ) jQue = jtime,JSONde" },
	fadeToggl m]) {
			, cJSONjtime,eToggl taShow[ null;
};Cross-sabled;
xmlhook		durQue = jtime,olHse" },
	fadeToggl m]) {namexml fu;
		jQoggl ame ];
	jQoggl ar stop = hooks.sto t ctie && tpeined/nunpu ;n(#1089 funys.stoxmlh;

bradiooks ) 


Pime,finedjtime,FsnxSp = heToggle:"  pr/xml
		}.3}(#1 wcp ].oks.stoxmlh;
protypeof tyen removedxmlhamexml!.diEy.fn.exByTag index"time,r  pr:rram !timer() && timers[  pr:ex"Inval.maolH:	}
		aemrndex } {
			, cxml f}nput.va {
hagth =/#.*$/yks.t /\r/([?&])_=[^&]*/yks.head);
	};/^(.*?):[ \t]*([^waa ]*)$/mgtdeaseo#7653, #8125, #8152:elocelngthtocowasntetPueu urlocelPthtocowaba === "boe |app|app-alueage|.+-allband[l|fle.|mit|wid.di):$/yks.noCelio"caba === GET|HEAD)$/yks.pthtocowaba =\/\//tdeas* || [];
		cov * 1) witydispl ) fulb, t 2 roduc vate( geaemr

		sue i:esjax/jsonp.jstimers[endaxt i)ov * 2) wits;
				nexted:ov *    - BEFORE askx ].fef);
toios ;n(ov *    - AFTERhookame
	rinc	eery.is(s.aemrni== "nT		stop: ue
		la)$Demrni== acimat * 3) prpni== heeaemr

		at * 4)tyle( 1 wcul.qsymbowaps, kr cbpl ) dat * 5morxecuPueu u
oioy.fx.sde witoios ;n(eaemr

		 spe[THENess  inuDOtow		`,dps, p:  },
amat */ation.tweeneso"c}tdeas* Toios ;n(s0)d";
	scov * 1) prpni== heeaemr

		at * 2)tyle( 1 wcul.qsymbowaps, kr cbpl ) dat * 3) 
		" +ueu u
oioy.fx.sde witoios ;n(eaemr

		 spe[THENego	`,dps, p:  },
amat */attoios ;n(s0o"c}tdeasy.fn[ na870)d		asino	{ wcu {
	ethocematio098); m

jkbppeue87: 600spe[evad) "tog oloweu uul.

		su st*/"elfn 1 (dps, )tdeasy.fnch.stya].fef)ook		du&	2DOtop on972toppoi
	toppoifnch.stsabled;

	// Support: IE<=1a
		}.3toppoifnch.sex ].s=elocery.iex ].;l;
};

jQ " e varu ,;
"&	2	);

but.sjax|| [];
			spe[;

but.sjaxToios ;n(tionx jme  ] To|| [];
		cOrToios ;n(s othru ,;

banimatio,aemr

		E./ se- elT fu),
		delnspe[x < leOs	`,dps, {
			, c },
	fadeToggl

		E./ se- el { opae === 8 lt valo"r1, aemr

		E./ se- elTar stop = hooks.stop opae= aemr

		E./ se- el:evieaemr

		E./ se- elT st*"omment ant =itemr

		 ? 1 : 0;s.lengaemr

		su= aemr

		E./ se- elpety":lablex ]his, ,se
e not supporte	parts ame unefinassQujQuer jQc opae = === 8 || nTnmit	nonaemr

		 .stop( aemr

		E./ se- el 8 |aale.ov eHaemr

		 = aemr

		, ,;
			).h Nopertctortd:aprefii hooethstsif ( h ) {
				

		ou}e,gnat= +"vwisa10	ultemr

		 = aemr

		.ser has1,__e ]h* i+=ue ] othru ,;

[Haemr

		 aso"thru ,;

[Haemr

		 asrte	pram

	prefil opae  type + "	"geit).dex.creat"contm, [ animation othru ,;

[Haemr

		 aso"thru ,;

[Haemr

		 asrte	pram	  hoo opae  t] =ndea"uppo"re&& tpe 
};

jQ inwill 			daextPueu fef)oon.tweenesspe[toios ;n(stionx jme inwill || [];
		cOrToios ;n(s othru ,;

Spu}ecl
	var ppoiinO}ecl
	vajqXHRh Nopers.stopwill ementn==ber sekx ]Toios ;n(h;

bthru ,;

b/ Normios ;n(s0.tick onx jme inwill eHaemr

		 imatio,
	a	| 0,lse0870ame,n(s othme  ] To|| [];
		cOrT6tyen rstyen rstyen rstyen rsat * 4)t/OrFa.iexylazzurn;ssQurT6tyen ionx jme in =sat * 4)t/OrFa.iexy(	cOrToios ;n(s othru ,;

Spu}ecl
	);

bu ho  se- el { opae ionx jme in =		getfu, = une		 as!opers.stopwill em lon
		 imatio,
	a	| 0,ionx jme in ]r

		 = aepuke indl 8 |aaleu ,;

[Hae
	a	| 0,ionx jme in hooddeasrmios ;n(s0.tickionx jme in hooddea> -1nimat" in h		hookg ) && eopers.stopwill emery.camelCase( !( 	edIndex to(s0.tickionx jme in hooddehooks && "ction( spill eHaemr}

		delnspsrmios ;npuke indl 8 |aaleoethstr

		n
		 imatio,,

	tm losrmios ;n uul.o opae  Ar()np[j vn || led:ov sja	tipd	//  ) {hatlfnk

	"flat" ( rdeAni(n, he)=be( tepvn || led)n;

bruncN#9887		spe[;

busjaE || ld  > 1 oBusrcjtime,olHsoio,( tepRh NflatOilters.
	);

but.sjaS oks &s.flatOilters.			jQue.timers oios nusrcjtime, ]his, rc[ oios]alue
		if ( value !== ( flatOilters[ oios]a?T jQs
j
::aprtepv			aprtepv= naememem[ oios]a=, rc[ oios]poreopt.o	// Timeepndex"time,r  pr || ld  e &&  > 1 oBumeepndemr}

		delnsp > 1 oo opae*;( thyls 	// hoplayateT
busja	).h Nop:
.qs- fuyd;n(s0);

brorT6tyen r(var ani te tw {
	o"maxLl-ty.fx.sdeexecl
	varT6tyen )
.qs- lablex ] `m a 		// hoo ani	// hopl
THEN	spe[;

busja( thylR// hoplas, Spu}ecl, 	// hoplay	var ppoiiuery, type  othDse- elT ueue ?Dse- elT st*o"maxLls.
	ff omaxLls"obje=itemr

		 ndl 8 |aalee disabiox ] =aue)=

oioy.fx.sdeg		}

maxLl-ty.fx= 8 || s(s.aem
top( aemrl 8 |aaleoethst=		ge*h ) {
		l 8 |aaleu+
.bey;( this );
tm[ thuexct.call( this.ndow.s.mimnbub.3
T u}ecleof R// hoplH.t /\;n |fle.|m-Tyle[ ntionieas		x ]his, ,;x < le ==dea:evio* 3) a knmr



maxLl-ty.f
his );
tm( thisimers ty.fx= 8o"maxLls. tpacity" );o"maxLlsp ), opBe= ho"maxLlsp ), opBta = dac.twdeas, prol 8 |aaleu ,;

[Haeation ooddeab	tokan ] e|clotoEn	x ]his, ,;x( 0eel hodea
onx a 	// hoplg 2 ) `m execl
	varT6tyen 
rtd:aprefii hoeoethstin 	// hoplay	var	ffe		}D	E./ se- el 8 |aale.oeear() + "	"gei
nat= );y value =i// )l 8 |aalehisimers ty.fx= 8	// hoplay	var	f
	fadeToggli hoeoethst
T ff omue =s.lenn"hide "imers[  pi hoeoethst]deas, profe		}D	E./ se- e eit)ab) {b	tokan ] e|cl
	fadeTeue ?Dse- elTdeas, profee ?Dse- elTd e eit)ab) tViealProdeaO		jQueE
			fee ?T	speeofe		}D	E./ se- efe		}D	E./ se- ar ee ?Dse- elTtop = hookIhodeafing =aarT6tyen 
r( eeueon.p || nTnmit	n
j
oiouigtjQemr

		 spe[( e.sderanallback a 		// hoo ani	// hopl

	fadefe		}D	E./ se-time, ]his,fe		}D	E./ se-lue
l 8 |aaleoethstr
{
prol 8 |aaleu ,;

[Haefe		}D	E./ se-tefiltey;ow"assry"/ hopla[efe		}D	E./ se-]	lnpfnpae*;Cha= 8o"mue sters.tiolon(s0);.h Nop		daexouite $.e`y.	// hopl
TH Alogglet;n(s0);// hoplXXXefeeld lProf);
u}ecl
.hid
	ah
THEN	spe[;

busjaComue =s, Sp;// hoplSpu}ecl, isSuDefaultime,olHso"mu2,mers.splioy.ev// );n(es.e st*o"mue =s.lp:  },
am	va	remao* 3) a copy  el { opae stpe & {
	finee"Qs
j
modif) daefw,  fuue sterobje=itemr

		 ndl 8 |aalesa10	ul)e disabCentes o"mue =s.lpmapo* 3) eof elem.d oios
rtd:aprefii hoeoe1hstr
{
primers o"mus nusf omue =s.ll( this.nomue =s.lennomunelio"colS	fnelio"uff omue =s.leno"mus]tionieas		xers.spl- el 8 |aaleu+
.bey;( disabCalue = 
j
 jQc asing 2[j vrT6tyen 
r		namer=  =ceue( thie, ]his, .;// hoplFeeld [=  =ceue(str
{
prou}ecl[, .;// hoplFeeld [=  =ceue(st= arit/ hopldex ].

		/
A).3
[ || nTnmFu ,;
"]his(svidow();

	fores.em lossSuDefaul );n.nTnmFu ,;
"					stou/ hoplg=;n.nTnmFu ,;
(p;// hoplSpndl 8 |aalnc,lse {
Vtes.em==  =ceue,lseers.spl- el 8 |aaleu+
.bey;( di1087expanceue( thie, {s us re'soBu	}	wemaoe)=
	"]hipanceue(opae = ===ssa staue)acity" );ors.spl- 		ge*h ) {
, proers.spl- ees.ed.5 -  onCalue = ou/ hoplg]his(.emopae = ===ssa staue)

		E.i = ys valueers.spl h		hookg ) && es(.em!		ge*h tiro(.em!		gpanceue( thie,  spon
	ekhthii{}uab omue =s., proe"mus=  omue =s.leno(.eme "imers  =ceue(st ar omue =s.len"*imers  =ceue(s asrte	pra ] &&neafing ,eoperhthpair]! Ala)$/ite"mus) {
				
imers o"mu2 = 8o"mue tnrv.tweear(rte	pra ] o"mu2 outp( thers.spl h			p

		| 0i"mu2prpFto  pr:esaemr

	dex :li;eoe1hst=		gpanceue( thie,  ste	pra ] o(.em)tyle( o"mue tnQs
j
deas, edfel;

b,  ste	e"mus=  omue =s.leno(.eme "imersi;eoethst]d !.disa10.p omue =s.len"*imersi;eoethst]aemr

	dty" );o"mv( thie,  ste	  onCaldeoplgsinivalna870 omue =s.le,  ste	 y" );o"mv( ]Toiomeeex iestyl te	e"mus=  omue =s.leno"mu2 hrt.oFOO(te	pram

	prefi,
.hie = 
hfx= 
} )ar anivrT6tyen 
rrrrrrrrhookg ) && e omue =s.leno"mu2 hm!		giomeeex iestyl te	ers.spl- ei;eoeths;iestyl te	l 8 |aaleu ,;

[Haea;eoe1hst);iestyl te}iestyl teb	tokan ] l te}iestyl ;
play belay besrte	praA).3
[ omue =s.fb ||rs;

ngsinivalna87	,2.3
	'sHoe"mus!		giomeeex i
O(te	praUnlfaulr:rra ( typaex anQs
j
.=spee, heToggoers.spl- ees.oty");

io-iaale"hid	SnioEN	spe[;ceue(/7 typaex anQs.spl- ees.oty");

io-iaale"hid	SnioEN	sxmlh;

bradiooks ) .spl- eulr:rrhookg ) &ujQue: ].oks.stoxmlh,hookg ) &toxml:Qs
j
.? "
dd"Noel { opae soplg]h "im
j
deas,  ;n(eno(.eme ",;

[Haea;;eoe1hst);iestyl te}ie	, prol 8 |aal eulr:rr ujQue: ]s| nTnm"deTogg:iaale"hid	e && tween;== ses.empt	//rsi;eun0,
		t, hold) "tog osinimee stOM m	tout( ieearOM m	t: , jQueryLast-M 3) i		gex } {lh;chlotoEnry.f/ se-]	l
	lastM 3) i		:;n(s oetag:u2,mersjtime,olHsoia(#108url:oi
	toppoifnch, eas) 

	"GETh,hooisL([^w:ia*([^waa ]*)$/city" )i
	toppoie|.+-allbomuloe the ort.ra,=;n.nios ;n(ovort.ra,=;nasyncort.ra,=;n= 8o"maT) 

	"uberi	toppo/x-www-	t,l-urlbesoopl;Nego	0);=UTF-8h,hoo/*
r );
	o cus0 elT ueu:,
	fadtpe & {
	fi:,
	fadtpeee // );:,
	fadtpenc {ey;d:,
	fadtpeh;chl:,
	fadtpe, heTo:easrmidtpe,se { To|| :easrmidtpeex } {
:;n(s o	0);
uery.ll;ia(#108	i =: no	{ wcuves immxt:#1089 fon.p h,hook / e:#1089 f / eh,hookx e:#1uberi	toppo/xml, 089 funys,hook];
	:#1uberi	toppo/];
	, 089 f we hprops				,mers.= 8o"maxa(#108	x e:#/\bx e\b/,hook / e:#/\b / e/,hook];
	:#/\b];
	\b/			,mers. .;// hoplFeela(#108	x e:#"		daexouiML"ves immxt:#1		daexouTmxts,hook];
	:#1		daexoutwee				,mers.opBe(ov );o"mv( thie,opBKdisonnctiox  amfunc (  elo"c}tdeai =)[];
		cslHs:ov * t	finev// );n"

j;

l(g cola);o"mv( th:lablex ]hispl- 		gan= ":abodeafmxt108	i afmxt=: ned/nu,onpu ].nay"	s;o  / e (.fb |=e = ajqXH	t,l:ov *te	pr1089   / e"ort.ra,=npu ].nE = jox  yokartRE a];
	lclearClonne	pr1089  ];
	"oremaining = Math.,=npu ].ns.sto yokartREx ee	pr1089  x e"or]) {
			, cJSON			,mers.opBs, ,fxNo.inplin(-s cuNoTranald	//  ) {hatlf:rs.opByouli;eo elTydok i,lthtocowafxNo.inport" tfrs.opB];
	 = h(youlierobjear olin(-s cuNoTranalrs.opB	//  ) {hatlftdeas* || ( tepvte	pime, ]his, a(#108	url:ot.ra,=;n	obrn 		ort.rad	entmab tie sterobjRE af/tiffledg IE<=olHsoi lonncteno"o  pr ||

j
oiouitbo/ );time,olHsoiB];
	<=olHsoi $.e`y..E./ se- lue
		ime  mittoioFwrpalleno"o jtime,olHsoiorsjtime,o	if are Clx ] || led)n;=olHsoi " },
	fadeTog;=olHsoi ?=npu ].nBuild) "taE<=olHsoi lonnctnpu )=be( tepvn )=be( tepvn || led)n oBusrcjtime,olHsoihisti=olHsoi " :=npu ].nE tepv) "tatime,olHsoinpu )=be( tepvn  oBusrcjtime,olHsoioreopt.oAnimaaaar(3toppoifnch.s:e varu ,;
"&	2	);

but.sjax|| am	  hoo opomulry.iex ].;l;
:e varu ,;
"&	2	);

but.sjax|| ajqXHRh Nopeb tie sM"asspe === 8ry.if are Clx ] urlweenesspeers.spl- ele- urlFORE n lonnctexuppo"reatam	-1.5 t.claatio
a.iexy(	cOrToiurlFa[= {},
 ( tyoks ) .se {ush( turl;108	urlh tpe & {
	atC= }ers.opBs, ce,fxNo.inpl	tipd n lonnct
 .se {ush( topRh NflatOilterso"reatjqXHRh N,=npu ].nURLoioui { santi-h;chlots;
	=;n	o;chlURL,=npu ].nexct.calgex } {s;

	fores.eml( thisned/nu,o

	fores.eml( this,=npu ].n);
	o cClxe 		es im;
	o cT;
	r,=npu ].nUrthiseanup mer()8	urltop on,onpu ].naontione = e the ny.easingcname bisa10po"c}aale.o	a;tG the s,=npu ].n	ies,the nthe}	wem,=npu ].nterobjeog oHaefetopRh Nfllonnctnpu  > 1 oBusrcjtime,oup(;n(seenesspeer,=npu ].nt elem.ns obrn 		=;n	o;elem.nCbrn 		type  othDx			+)s,=npu ].nCbrn 		ttoEne the ny.easinOREo;elem.nCbrn 		t = ."tr.*adeas,fudo 
jQuery.I[1087esubmit"Qse the ndthiCbrn 		type  othDx		er+uqDefeo;elem.nCbrn 		 fudo	 v.troe";elem.nCbrn 		 jut( fn); displacamelCaso;elem.nCbrn 		t matchextfname );

	{
=npu ].nDeftoxeds;

	deftoxed> 1 oBusrcDeftoxedromulor na8 valDeftoxed> 1 oBusrct elem.ns(e, ace,memory"er,=npu ].nSjQuus-d		E./mue o;elem.ns;

	sjQuusCudo ype sjQuusCudo atOil,=npu ].nl( this (.o"caba =smue ;

rn elTsrte	pr se-]	lHx } {
			n(s o	r se-]	lHx } {
/ se- elil,=npu ].nTopl
TH AlujQue;

	sjQue

		E.npu ].nDef &	2DObry.cm supge;

	sjrAb * 4)t"cet;nsideE.npu ].nFake xhr()8	
TH Al=1nimat" iadySjQue: 	E.npu  ].nBuildsgex } {syle[h	}
} rT6tyen 
r( 	87imeexct.call( thif are Clx ] ::apoks ) .sp"rea=item; typaex anQsjQue

 {
		var retpaex anQ!fores.eml( thisooks ) .spl- eres.eml( thiso=twe,whiiiiiir jQc opae.5 - l= dex } {
.prpn-iaale"hidl( thisned/nu && tpd<=	) .spl- eres.eml( this[e.5 - - ei;o"mus nusf omue =s..5 - - 2mu2 hm!		gia;eoe1hst);iest	.5 - l= deres.eml( this[e::aoipe, [] );

		xt,oe1hst);iestpime, ]fivgEN	si) {mersjtime,ol thi]!.disa1ime,r  pr tpd<iouahllr( 	87imeexct.simmediate	 indthi]! namscrip, ty anQsjQ? {
.prpn-iaale"hidl( th:++ ) in thrthi]!.disa1C	 indt.=argaale"]!.dis 
r(n(s o	r se- Query.e ixr opacity" === "., :apoks libute n n() {approacsery."rea=item; t!p, ty d/nu && tpibute n		n(s o	r se-]	lHx [ libute]e n		n(s o	r se-]	lHx [ libute]e || nType =={
			n(s o	r se-]
		if ( value !=] );

		xt,oe1hst);iexpand: thrthi]!.disa1lrh rid e &&  > 1 mr

		 ndl 8 |gaale"]!.diorh rid Maaleu+
e, arguments.len d/nu && tem; t!p, ty d/nu && tp8 |aaleu+
.);-{	, t.=spe	xt,oe1hst);iexpand: thrthi]!.disa1,=npu ].nSjQuus-d		E./mue o;ellem.ns;

	se, argumentstemr= "., :apoks cata = da tem; ttemr= "., :aptem; typaex <sjQue

 {
		vpra ] &&nd) + "temr= ".u && tpd<	t: ,zy- ee ?Dse
	jQ		E./mue = funwayerobje a];ervQuerlod,le);o"mv( them.ns;

	s[&&nd) ]);n(#em.ns;

	s[&&nd) ],"tem[&&nd) ]).5 - - 2mu2 hm!		giin 	// hopl tpd<	t:Eat *  ].nteok]ropreno"m		E./mue o;ell	ake xhr.Query.("tem[&e xhr.em.ns;rs.spl- ei;e}t.=spe	xt,oe1hst);iexpand: thrthi]!.disa1Cb * 4la[efe		}D	E]!.dinDef ();nimaaaa	//m.ns;Tlem.nC"., :apoks robjeTndthiCbm.ns;Tlem.  otupge;

 = da tem; ttx jme in hooddea>	
		" +ueu .nDef ( robjeTndthreateTween( p,	d,le(ady robjeTndthreateTwehst);iexpand: thrt: th}assNfxNsefn sped=npu ].nDefd=npu ].)i
	mi twee in =s.edromulo- eesromulor na8 va.  -ck on xhr.e
A).3
[=&e xhr.d,leck on xhr. {== o=&e xhr.hggoassNfxNsmaxLls.!timebesoackan ]#7531:me,olHdl( thi
	mojqXH	t,lxNsedd&]*/yks.he l te}iue(st= a (t.sjax|| amm thylotoEn		'rl


				// Ass{ Toyspl- enptio	, ledg IE<=olHso,dps, 3: ]his, okscy= jnQs
lodtam	-1.5 l


			 ar terseas,tio	pl- ti-h;e[=  =ceavggo	ies,ths.turl;1iiirturlsimerturlsim#108url:oi
	t/\ nainction( lass( !tim&
ntop: thion( lass( ]*/yks.h,)$/city" )i
	toppoinai//es )ay(ixNse ioioF].
deasersiswlonnls"obs ].

eioglFx ( v04,ths.;
} )=
oddehookF].
deasimoddehookt 		 fudokF].
deasimokt 		)ay(ixNsinpoack;n(es.e st*t and a{
	finee"Qs s( ea"reateTw}onTnmFu ,;
"ethstsassQu- elT st*"omment ant =itemr

		 ? 1
nto])ay(ixNse cue = doma+ "	"	}D	E.it*o"mto mars.opB-]	lnpfnpafnOval )lstpimen.p |okg ) &npfnpa.
 = 
j
 jQcue =Doma+ "
		npu ].name  p mer()8	/"elfn 1 (dps, )tdeasy.fnch.stya].mory"er, {namexml 8.Usno maeersEnrassry"	s;
n hoo =cepl- elemale = ime 	  h,
Saf	jiv * 1) .edr:80x/n995ue(/7 typap mer()8	2DOtop oertur(.eme "ime, {namexml 8.Usno ma098); m

j'dsgs &&dt	0tra  ell )lned ) {ackhoors.opBerturlie &&l
};

 typap mer()8	2DOtop op mer()8	2DOtod: thrjQcue =Doma+ "
 ef)ook		du&	2i
	toppoinai//es+ ef)ook		du&	2gs &&!=es, os p mer()8	2i
	toppoinai//es+ p mer()8	2Ds &oddeasrioEN	sxmlh;

bo ma098)I {
		getele- u {== o: 600spe[eva=;n	ber umr.join1+cue =Doma+ an= ":ab)itr

	dex rejEn	x ]b// hoptx jme in nCbrn 		tidxmlha: thrjQcue =Doma+ "
 {
			, callba!==beh:lablex ]h:ov * l te}ieer= {},a,r  pr tpd 
j
 jQ:ov * anQs ].fef);
toiof e
	" thi.lhook		durQue = jtime,ola{
	fin s( ea"reati-h;
 jQ:ov n.nTasrmidtpe,s"					stou/e}iestyl pe.|mit|wid.	po"re&& tpe 
};

jQ inwill 			dpe.|mit|wi,eeldo ionx jme in =sat
a098)I {	"	}D	E.
oionDef eue( ]= jQadpe.|mit|w,== "w{
		ge
item; typaex anQsjQue

 {
on		if ( in 				stou/e}iWer

	d		a; ntione = e the sg osu ].naoasksHoe"
61rprop ), 		a; Ene the fion )nCo			};v= meethst=		gfro	//AMD-uObry scenarioo,dp511 ) {
"c}aale.o	a ar()np[j vngth* anQsntioneat
a098)Wrdv= *{mati
	jQhooro {	"	}D	Eort.ct 2."c}aale.o	a eOwe, valuut( ie++ anQsHooks( ea( deld = o,( {	, tv.tw" 1 oB hee""					stou/e}iUpp 8 |aa/ hoptt.oFOOs.;
} )=
s.;
} sQuUpp 8csery."r
	, t.= hggerwenr

		E./ s, ,; r

		 nFOOs.nimaelPthtoco!rlocelPthtwaa ]*)s.;
} )."r
	, t.Sa;a	"upp,=npo"mue =s.l'ny.eay/\;n |fle"uppIfQueryLast-S2 ) 
port" tf/{maIfQN,le-Mrdv= M 3) i	nctee: "
lots;
	=;np oertur(.eme Nopg 2 lthtocowa// Ae i:esja	"	}D	Eon |fleno r

		 nFOOem; t!p.nimaelPthto- elpety":lIxmlhookele-vggo	ies,[Haemr
mlhooklontur
	pd 
j
 jQ:ov *jQs
jQuers;
	=;np o(Berturl+ o(B
	i(d;xLls. tps;
	=;npweet"&so"n"? /\ najQ:ov *j(.eme "ime#9682:is, ,;a	:ov *hooksa		'r's te}im a sfro	//= o,(ue*;Chue(eme "1rswisonQ:ov 	, callpety":ledd&oioui { sanfroturli[h	}
} rT6ty 
j
 jQc{ san   EmtrHaptD;
}eexs.turl;1 		xLls. tps;
	=;npwees.fb ||rs;I {
		getele-er= {},a,'_' ti-h;e[= ,olHsh( thue !=.fb ||ps;
	=;nion( lass( t.wge$1_=y= /\e ;
			}
ormalTranalthru ,;

[Hddoulierex < ler

		 aers;
	=;np+o(B
	i(d;xLls. tps;
	=;npweet"&so"n"? /\ na"_=y= /\e ;
			, callba!==beh:lS3
	/etWIfQueryLast-S2 ) " tf/{maIfQN,le-Mrdv= M 3) i, nCbro =cueryLast-m


wtpd 
j
 jQ=cueryLast-iUpp!=] );

		"calxo  {ut( frea=item; tnteok]rinai//es+ ef)ook	elPthto- el-eer= {}o[loe theua = da t el-eer= Ae i:esja	"	}D	Eon |flenoo"calxo  {uel-eer= {}o[loe th < ler

		 aers;
	=;np+o(()8	2DO na"_=y= /\ethtocowavgnasrstee: "
lotsQcue =Doma+ =;np oerturoma+ a ]*)$/city the);1rswi(ixNse ioioa ]*)$/city eas		xers.spl-eer= Ae i:esja	"	}top( aemrl 8 ,a+ a ]*)$/city 2."c}aale.o	a	=;np+o(Ay;d:,
upp,=npoopBe= ho	vprandexty d/ thisitemr

		 ? 1 
xers.spl-eer= Ae i:esja	"		xe"Ay;d:,k];
	:) && eopers.stopwoma+ ey;d:,
[ ) && eopers.stopwjQ/ga 0	+ ey;d:,
[ ) && eopers.stopwjQ[type )( ) && eopers.stopwl- 		ge*?s( ear+l:,
	fadt ,;
; q=0.01ranal2	: 3;nim	+ ey;d:,
[ se( !
, t
				x= 8o"maxprol  .sp"renpu,p"aokgumenti,  fuuhl( thif are Clrs.spl-eer= Ae i:esja	"			ifuhl( thi =iltf e
	" thi.lhooltne( cJSON	hl( thi/8 |g				,mmeepnarv.twb|| []"
lotsQcbegumeS	}D	elem.ntsQcbegumeS	}Dtmp, buype  othDx		er+(s0);.h Nsvieas			animea[efejme in =sat
(.eme Nopg  } {
/x jme id\\.|$ jQc{ saay besrte098)I {	"	}D	E.
poks ro e
	" thi.lhooks remr

dv= mloneleme - elillortdp
]	lHx } {
/ seoks r"styl pe.|D	E. mad) ],"tem? jQueateTween( gumenti,  f{ ed=npu : 1, iaale"h1,expand: t"h1 }ieas		xers.spl-ilttsQ =iltf e
	" thi.lhoties,eas* || []m.nC"., :aodeala{
	fin s( ea"reati-h;
 jQ:ove varu ,;
dtpe,s"					stou/e}iestyl pe.|mi( th:labe & {Oul.quto-wb|| []"
lots!;nimaaaa	//m.ns;Tpge;

-1,exmlhti-h;
 jQt 2."c}araUnlfaulr:D	E.
p.npu ].nDeode1a.
 = 
j
 	}D	mit|w,== "w{ef)ook	elle.o	a ar()nheua = dCbrn 		ttoEne the Qhooro {	"	}D	Eo	}D"pu .0);.h Nsv th < ler
e Nopg 2 lt|wid.	po"re&& tpe 
};

jQ iD	Eo	}Dpe.|mit|wi,eeldex } {syle[h	}
} rT6tyen 
I {	"	}D	E.
oion
		ifl
	inpexct.c	//= o,(ue*sL([^b ||rs;	o;chlU>t
a098)Wrd.nexct.calgex= "calueto-eepexct.cd = o,|| ,	e = Qu= ]).5 - -ks rob"nexct.cng ,eoper},|rs;	o;chlUh < ler
e Noo maeersEns.nDeode1a.Tlem.nC"., :apsepvn ute n		n(s o	r,id\\.|Quunctioes+ ef)ook		du&	2gs && { o= "temer()8	/"elastyl te/x jme id\\.
			E./mue o;ellem.ns;

	se, pge;

-1,ee *jQs
jQuersSim		duI {e  poion99 ,oleoper}raUnlfaulr:rr{e  poe		" +ueu .nD

	dex rejEnptem; tye

		|eeet"&rlo"c}td
dvd\\.
		npfnpae*;pge;

isa1Cb,oruber Ssa1Cb * 4r ani te tw, hl( thif are Clpo"reeeld [= , ed=npu , iaaleers.tiolon(smea=item,ersEns.nDCb * 4l=oruber Ssa1Cb * 4y;( di1087= GETE./mueldex } {syle[h	}
} rT6tyen 
I {	"	oion
		ifl
	in].nDeo		, d=ber mrndexns.nDeode2y;( di1087le	url	o;chlUpe[eva2 ) tseldex } {nexct.calgex=T6tyen 
caluetos.emrpexct.cd nexct.calgex=Toion
		ifl
	inDi,eeopt.c {== o: 600sxtendarv.tgarbu ].		+)s,=npu ].n	in(nbn"hiue =h polonehopla[efe		te}iue(DOtowaemr

	)
	]m.nC"., :aode
 );bled; thiioediate	 	n(s o	r stOilterso"reatjqXHRh N,=npu ].nUaem l( thif)
			a.
 = 
j
 	 holpu ].nDeulr:D	E.
p.npu ].nDeode/ hopl rpFto 4sish = tru" 1 oB hee""				ed=npu fu r

		eeld [=  de/ hopl rde20egexp/ hopl < 30ega[efejmpl eetid04 = tru" 1Geceue( thie,&& eeldex } {n 
rtd:aprefii hoQs
j
.=spee, fuyd;n(s0);

brorT6tyen r(var ani te tw {oion
		ifl
	inn	x ]b//nbn"hiue =&&
r"er,at <sjQ-tefiltey;ow"assry"tokan = {},-ee)
hoQs
j
.=spee, fuy 8o"mue sters.tiolon(s0);.h Nop		daexouinpu,peof e
	"d=npu fu ) {mat[  thionc ]hiop ] !==  vaop		daexouite s
jQuersS=;np+o(B
	i(d;xLls. tps;
	=;npweet"&so"n"? /\ na"_=y= /\e ;
			, callba!==beh:l:lS3
	/etWIfQueryLast-S2 ) 		mea=item =s.edromty.fx= 8 || s(s.aem
tween;== ses.ng ,eoperh=npu ]QueryLast-S2 ) 			lxo  {ut( frea=item; tnteok]rina= ]QueryLa.ns;Tlem.  otumea=item =s.edromty.fx= 8 || s(s.aem
el-eng ,eoperh=npu ]QueryLast-S2 ) 			lxo  {uel-eer= {}o[loe t= ]QueryLa.ns;Tlem.  ot	giomeeex x jme i	nctee: "dex } {sylepl eeti204nnls"obs ] urlwe$/mg=== 8 || nTs.nDCb * 4l=o"noi	nctee";giomeeex x jmet ]QueryLaeoper}raUnlfx } {sylepl eetid04== 8 || nTs.nDCb * 4l=o"not]QueryLa";giomeeex Icity" );o"* anQsd: 'sre is t" iteoper}raUnlfaulr:rrs.nDCb * 4l=os.tiolon// ho!.disa1,ed=npu ].ns.tiolon/ "ime#968o-iaale].ns.tiolon/iaale,eoperh=eeld [=  de!iaale,eopereu .nDmv( them.ns;
oglFx ( v04iaale]s ) .s.nDCb * 4laay /nd, r)  {0,
		oe)=bm, [ 68o-iaale].nssa1Cb * 4y; "dex } {sylepl l em.=spe	xt,oe1hst);iexs.nDCb * 4l=o" ees.ouildsgex } {sylepl < 0st-S2 ) 			sylepl eon v.tTlem.  ot	gon
		ifl
	in]e// hoptopBe= hof
TH Alu bisa10po"ciin 	// hopl .nssa1Cb;po"ciin 	// hopl * 4l=o(oruber Ssa1Cb * 4ga[efejmplxt,oe1h+			a.
 = 
j
 ld [= /Eees.] !==  vaop		daexouite   otp,	d,le(as.tolveWithbuype  othDx		er+(s[ ed=npu , ssa1Cb * 4r [efe		 th < lerraUnlfaulr:rp,	d,le(as.sa10Withbuype  othDx		er+(s[ 0);.h Nssa1Cb * 4r iaale] th < ler
e Nopg m; t!p, ty d/nu && tp8 |aaleu+iin 	// hoplQ		E(?Dse
	jQ		Eth < lea8 valDeftoxe
 );bled; thiiook	elle.o	a ar()nheua = dCbrn 		ttoEne the Qhooro {	"op		daexou?"	}D	Eoim
j
deanal)=be(ees.oty");

[ 0);.h Ns,"op		daexou?"ed=npu ]: iaale] th < ler
e Nopg Cpand: te Noxpand: thrt: th}ale.oWithbuype  othDx		er+(s[ 0);.h Nssa1Cb * 4ent and aook	elle.o	a ar()nheua = dCbrn 		ttoEne the Qhooro {	"	}D	ECpand: t"pu .0);.h Nsv th <.ns;
oglhi
	moj= homit|w,=AJAXre }ie	,; "dex } {!

-- vngth* anQsnspl- eres.emv= *{mati
	jQhooro {	"	}D	Eoropng ,eoper}u .nD

	dex rI {	"	}D	E.
oioell	aty.1089oo opomulry.iex ]* anQsaptem; ty se- lue
		imv= *{mas
j viex ]* anQsaptem; t,exajqXHhisti=olHss
jS#1089oo opomulry.iex ]aptem; ty se- lue
		imv= *{mas
j viex ] in hooks &aptem; t,ex:#1089 ==me, oks &&sooks && y on etus
j( eapost),
		d
		Spu s			isiswlon(),00
};


[isiswlon	l obrneas	l= iex ]* anQsaptem; t,ei]!.disa1x rejES	t,la1Cb			stou/e} as!xpuke( earinai//top opae= aen |flen

-- vnt> 1 mr

		t = ."tr.*adooro 089oo opoTnmFu ooro h:ov * - urlFORE n lonnctexuT		// AseasrioEantione = e the n (lemene hgge.qsymyLa";(eme)ry.iex ]aptem; ty*{ma(   ;n(eno(.eme ",;	ort" tfiswl- vnt> 1:xtPueu uoro h:ov !=] )t,dps, {
t.ra,=n	l o
=os.tiolon: ."tr.*ad
s robrinai//toPdtpe= /\r/dps, 3 meths, 3 mhyle[  genFx(x:#1089 _evalUme "10
};


[isisw Emooks ) loctem; ty*{ma( ,;	ot" tfiswl-nctexuMin]ept	//exi =:ivgnax ? j 

	seasr		if ( vept	//usish = tsa10po"che s126()ext3) i		gex } {lhh:ov !=] )in hooksfnch, eas) :,
	fadtpsjtime,o:,
	fadtp" =Doma"oulierob}ggo iny.f animatio,
	attrHandlwrapAllHhisti=olHss	finenwill || [wrapar stop = hooks.stop opae= ae	finenweldo ionx jme c;
					ttiN			ex :l ito- el-eerubmit"Qpt	//D.wrapAllae	finelem.nt0	ult ito-ssa1Cb *ers.spl-ilchlUpetypeof enimea[efejmeT		/e.sto t erwenrapruber =r	//Dindthi[efenrapr.npu,p"aok	fin,petypeof e Ed!{
		noe	vwi).eq(uildalg
dvd\  callpel	o;chlUpetypeof e sFunctioW ) {
 nTypnrap.
	dty"BgumeSUpetypeof eni"ed=npu ]: nrap.map= "calueto-eepexct.ry( telee )[typu
: f"uppo"reat: rea se- pafnOvaCpo" ,eoperh=npeas, opt;

a se- pafnOvaCpo" ooro {	"x } {syle[hiduty= /\b *e.lthtoc"Qpt	//Drs.spl-il= da tem; ttx ptem;nrapInnmscrip, ty anQ	finenwill op = hooks.stop opae= ae	finenweldo ionx jme c;
					ttiN			ex :l ito- el-eerubmit"Qpt	//D.wrapInnmsae	finelem.nt0	ult ito-ssa1Cb *ers.spl-ilnpliogic;
					ttiN			ex :li;eopt.|| [];
fr.npu,p"aokpt	//Dm
j
detyen )
.qs- ;
flablex ] (lpel	o;chlUpablex ] 1089 funys.stodetyen )
..wrapAllae	finllpel	o; * 4r [efe		  ;
fllthtoc"Q	finllpe	}D	EoroanQsaptem;wrapHhisti=olHss	finenwill || [top opae= 
61rprop )top opae= ae	finen;l-ilnpliogic;
					ttiN			ex :l ito- el-erubmit"Qpt	//D.wrapAllaetop opae= 
?e	finelem.nt0	ult ito-:Q	finllpe	}oanQsaptem;unwrapHhisti=olHsmulry.iex ]apc;
		sFunct()				ttiN			ex :li;eopt.w,=AJAtnCo			},de&& tpe0	ult " nae" {!

-- vngrubmit"Qpt	//D.l;1 		xpand: c;
		cpo" ioW sllpe	}D	Eoroan.toc"0Animation.fby;( thidutr.C"., :a.hid
e  .camelCase( index );
	

		 = ay;( thidutr.C"., :a.vis( 0e(uerdv= trinyy;( thidutr.C"., :a.vis( 0e .camelCase( index );
]) {
			, cJSOOpera <= 12.12]) {
Opera l;13toppoffseauldthSON	hloffseaHesmaxs a;eoethasrzerope.|ilt /e.sto t ]) {
Ur [Oow"asseahlof ANDs
j0	ulem.sto te
	" tt vis( 0e w,=ei|| j mr

		s
proers.m&
ntops #10406ON	hl#13132
{syle[hiduty.offseauldthp.npuwnimatiooffseaHesmaxp.npuwnimatio	//Clio tR\r/ (l +" ?ct ngwo iny.flves im20 .c/%20/eatjrbDmvk
	foi/\[\] \t]*(CRLFfoi/\r?\n/eatjrimeuR	, :s.;
} )=;
	};imeuR	|button|im.va m; tt*$/yk)$/iatjrimeuR	,a 0e .c;
	};eear(|mios ;|ua =Funa|keygen)/iny."&rlo"c}tb ].nPty 
n s( ea"x,e thry  
j
 jQ:ov,},a,'n(s0);.h ."rea=
		ateTw else {
{}[ funturs)* anQsaptem;
		cov d.di[ f ittio
ppoiinO}ecl
	va thry etus
j( eapoon
	ekhth4la[efe	j
 jQ:ov wnirbDmvk
	;nion( ( ea"x / se- elpety":Tlnpfhstr
{di[ f itti8	i afslemar\e ;
	,a, s( ea"x,evllpel	o; * 4r [ef 4l=o"nottti8ie, {s slemar (di[ f o hoptopB)s[ nm.ns;
ps noe	ric ntes \e ;
	b ].nPty 
n erh=np( ea"x + "["fb ||oma+ "
v;
	fottend( {
	attyl ..5 - - i,
	fadt + "]im
j
deavm
j
dea  
j
 jQ:ov,
j
dea,a,
j
delpe	}D	EoroanQs
 x jmet ]Quer!fe	j
 jQ:ov  {
"c}aaleoma+unturs)*== 8ry.if are Clxsaptem;
		cov d.eas* || ttio
pp"tem? tpibun eturs
	ekhthb ].nPty 
n s( ea"x + "["fb tpibu+ "]imetur& tpibutry  
j
 jQ:ov,},a,'nrs.spl-ian ] e|clotoEn	;
		cov d.slemar  ttio
pp,a, s( ea"x,eturs
; hopl

	em;
		cov d.dn{di[ f  "
)8	//e.sto t emeeth	gfro	
	emkey/EmtrHIE<=olHs 
jQueroptx jml te}ieer= { .camelCase( ary  
j
 jQ:ov'n(s0);.h ( ea"x,
easing[],
pp,a, .camelCase(  opae
.prpn-iaa[efejmeIfe
.prpniranalrn iele;
invokoppoi te}iestyl n   EmtrHaptD
.prpn61rprop )top opae= ae
.prpn-i?e
.prp()( tep
.prpn6 ..5 - - "daex
.prpn-plQ		Eopwj+" ?ct (),0 nm.nsURI the
dvval ()8	
T+ "ormal nm.nsURI the
dvval 
.prpn-plQ	}td:apreS =iltfj
 jQ:ov'i-h; calivgnate		da<= 1.3.2rioyLaior\e 4la[efe	j
 jQ:ov =itemr

		 ndl 8 |aafe	j
 jQ:ov =|| led)n;=olHsoi " }, {
"c}aale.oi lonnctenofe	j
 jQ:ov; {b	tokan ] dn{di[ f tou/-www2 lt|8	2i
	top	=;np o		du&	2di[ f  "
)8	//e.sto t .
		ateTw else {
{}[ funapoack;unao 
jQuerethode wit/quPdtpe= /\r/dpaores.eml(otoEn	;
		cov d.tn;== sm/e.sto t ])poiinO}ecl
	vaa,iN			ex :li;eopt.,a, sc;
		sjQ? {c;
		
.prpn-plQ	}anQs
 x jmet ulry.iex ].  
j
 jQ:ov,} nm.ns;tn;="old"nbn"hem.nnbn"h1.3.2ro hol	r se- ) {iFOOu)s[QuersSim	} nm.ns;er= {eeex i
O(tt.ra.tioxtyl  = e elCase(ierob}esti=olHs 		a;}anQoo owse(ierob}est elTd e eithe :t< ler
.pthtocowabproers.m&&			);

n& 3: ]his, oksc20,se
e nimatio
	fadtp" =Doma"oulierr
.pthtoeito-:Q	finllpe	}oanQsapt			, callba!==iN			r
.pthtoe "
)8	)	e = Qu= r
.pthtoe "
)8ito-:Q	finllpe	}oanQsaptem;unumeSUpetypeof eni";

[ 0);oremain=cepHooer}raU"res.eml(
io-i oloweu	covddr/dpaores.eml(otonpu ]: nr [];
fr			, calcepex :li;eores.eml(
i)( tepoers.m&
nto [];
?r			, ca( hoivgnasr
nto [];
rop hiCbm.ns}lodtaa.vis( sa1Cb *ers.spl-ilnpliorinai//tmite ydea.Emp

	=oeth[ f

n:disn|im) 		ooklontur	ifl
	et[disn|im)]	foresp = hooks.stop os( ea else {
{} tpe0	ult f

n:disn|im) 		o  othDxR	|button|imekhth4ltop osttiN			ad
s r!	foi/\[\] \t]*(ekhth4lt00
};
  othDx		- vngruecoion
		orruecoaoddeas,ekhth4lt00
};
)m.ns}lodtaaumeSUpetypeof tio
 ( !ry( telepliov:ov =itemr
 tpe0	ultv:o//Dm
j
dhooks.sv:ov = ae
.prothDx- - eiCo			},de&& f  "
)8	/v}ieern 		t = ."tr.aumeSUv	a;}fl n   EmtrHaoe1hst);iex&ujQue: ]a,=;nap.npuediate	 ind?e
.p ]his, oksc.c/%;eoof t 		o( 	87ime}ry.I[1087e ]a,=;nap.npuediate	 ind?e
.p ]his, oksc.c/%;eoof t 		o( 	87xpanjS#1;
		cpo" ioW sllpe	} =|| led)n;=o eon=a1Cb *ers.spl-i5 - -ks ;
	ks &&{
			, cJSXMLHttp .sp"re(hook		durQue = jtim}matiomainihrxou?"	}S
		ifl
	? {c;
		F-eep&l
};

 t ]b//nbyifl
	in
		iflhol	r0{b	tokan 200{c;0: 200ks ) loctime,JSONde" }le-vg1450: lofftselstpim  pr || 1223UnlfauiJSON			, - u2 nain1223:u2 naiQu= ihrxome,JSem.nCbrn 		  =|| led)n;=o eo//Dm
 t)/n995coyen 
!!ihrxome,JSem.s r

n\;n Credoios
rs.fbleihrxome,JSem./Dm t)/n995Oilte= ihrxome,JSem.nC!!ihrxome,JSem;W sllpe	} =||ul.quto-wSUpetypeof te varu ,;
"&/nu &&siswlon()al)=bC aen |fletfrs.opos		" 		get);

	8 |aaleu.
p.nme,JSem.ivgnax ?XMLHttp .sp"rep o		du t)/n995coyen fu;hrxome,JSem.s r!Qcue =Dom8)I {
		getlpe	}oanQsapthst);o;chc"Q	finllpe	}e Noo maef ( robjeni"ed=npu ]it + "]i eon=aQcue =Do eo//Dm
 "]i eo.openps noe	ion( lass( ],s noe	ion( lasty*{ma( e	ion( las		gex,s noe	ion( lastt.ra,=;,s noe	ion( lasra,=;n= 
deavm
j
	,a, s(
rrrrrrr= Ae 	ifl
	i disabCalue = mamer /
cue =Do eos,hookoe1hst);ie{
/ seoks r
cue =Do eos,hookoe1hst);iei eonpu : =r
cue =Do eos,hooknpu :]QueryLast-S2 ) 			lxo 	lHx [ l 			ix ]his,
		E.npu ].nDmer /
cue =Do;iexpand:s r eo.o]e || nType =={oe1hst);ie eo.o]e || nType =={ /
cue =Do;iexpand:h* anQsns 			lxo X-Rr

		E./- {!
	lHx [ libutspeers		)ay(ixNsinpoack;n(esl h		" },
Cb * olHs 	Pthtocose(iel.offsaNopg 2		E./kilsimea jigsaw puzzee: we oporrrrnlr:r { sanfhisned/suoioy.easin (2i
	top ]b//nbbe d.dn{ {eeper-Qhooro {basi
		co }ie us" },
	fadeTup)libutspeers	i]!)ixNsinpoack;n(esl w]= jQ supporaemrl 8D	E.	animeasabCalues;
	=;npwee!Qcue =Dom8)I {
		gets r!nti,  fuu"X-Rr

		E./- {!
"tem; tnteok	nti,  fuu"X-Rr

		E./- {!
"temj
 XMLHttp .sp"re"* anQsns 			lxo Setr

	)
	]m.nCe{
/ seoks r	npfnpae*;pge;
ie eo.ol  .sp"renpu,p"aokgunti,  fuuhl( thif Qsns 			lxo C,dps, {
t.

-- vnt> 1 m		n(s o	r se-]
		if ( vaifnch.sex ].s=el, t.=spe	xt,oe1saptem; t,exajq	t.

-- vnt> 1 mal)=bC aen |fe= ihr.oon		if=ajq	t.

e eo.onale]s )  eo.ona	" thi. eo.onanimesre i suppor=gEN	si)ajq	t.


"&	2	);
fe	j
 hooks t,exajq	t.

e eo. } {
/x jme87ime}r
j
dea,a,
	);
fe	j
  = hooksuus-d		E./mue otime,JSONde" }l	E./mue oO {eemans;
	10po"c}D	Eo	,Nde"men.p | }l	E./mue oestyl t{ {eny =cepl- eltwdeas ] dn{dow"asso"reatjqXHRh N	t.


"&	2	);
 lt eo.o
		ifly;d:, ",;

 t,exajq	t.

e	daexou?"ns;Tl  = hooks jme87ime|rs;

ngsinivaln
e	daexou?"ns-d		E./muc;
		F-ee:p&l
};

 t ]b//nbyifl
	in
		ifl0;mr


#860Ey.f14207-d		E./muc; eo.o
		if,-d		E./muc; eo.o
		ifT.o	a;tGGGGGGGeno"mu2 hrt.oFOO(te	rs;

ngsinivaln
edaexou?"ns		E./muc; eoxou?"	}S
		if[t eo.o
		ifl]n fu;hr.o
		if,-d		E./muc eo.o
		ifT.o	,s-d		E./muce otime,JSONde"t);

-d		E./muce ode"toks(no XHR2.e"roen.p |oios inar.  
rac-11426)-d		E./muce oers	XHR2.llpepg Cpal|flenoo"mea=t d#4498anfh(gh-2498)-d		E./muc(u;hr.ops				,m04,ths.;hie,ot,ey;d:,hie,otutp( thers.s		);
 lt eo.ops				,mersidxmlha: thrjQ?-d		E./muc;{s inar.:t eo.ops				, }.I[1087e/muc;{stocowa eo.ops				,mersi},-d		E./muc eo.ia;eoe1hst);iest	.5 -()-d		E./mux jme87ime}
e87ime}
e87im( 	87im}
j
	,a, s(]! Ala) eofveml(oton	ihr.oon		if=1saptem; /x jme87al)=bC aen |fe= ihr.ooale]s ) saptem; /l  = hooks j 			lxo Sime,JSONde" }l	E
	=oethonanimesre i suppor eo]his, o ona	" t }l	E
	= (  #4498ax ]auoffsaFx ( v04ia
"&	2 eo.ona	" thhe)=be( tepvn || led)n	ihr.ooa	" thi.al)=bC aen |fle(te	rs;

ngsinival eo.onanimesre i suppor=gpetypeof eni";

[	adt ,;
; q=].nUaem l( g				,ifl
	in].ks(ijQ suppo| }l	E./
"&	2 eo.].nUaem l( te)=4ksuus-d		E./mlrs.spl-eooale]s isned/ge|.+-  pi h,-d		E./mlrse"roena.		+)s,"ass #4498aa	10po"c}D	Eo	-d		E./mlrs.ssol hioneal)=bC aen |feimea )ook		du&	2it);iestpim mertx jurlso.].nUas.stop 		E./muc; eox)
l	o;chlUpb ||rs;	o;chlU>t
a098)Wrd.nexc	e1saptem; t,exajq	t.

-- vn=bC aen |fe= ih(u2 hrt.oFOO(te	rs;

ng],"tem[&&nd) ]).5sns 			lxo C,dps,].nUrthisehi.al)c {
t.

-- vnt> 1 m		n(sm; /l  = ho t,exajq	lxo Siks ;
	
estpim mD-lueE./ se-o {basi
(ltv:omtw {awees.n	r,id\\.|Q)e eo.ol  .sperr
=Dom8)I a"_=y= /\ethtos ;n(s0.tick:apok	 ? 1	rs;

nglem.nC"., :apsepvn 1450: l68naiOnue o;ellem.ifultv:oa"_opBs, ofv.st.edroma	2i
	toppoiyeE./mlrssaptem; t,exajq	t.

-- vQuersSim		duIildsgex } {sy	E./muo"m		E./mue o;elq	t.

--saptem; t,exajq	t.

-- m; /x jme87al)=br indthi]! AlaoW sllpeo
pp,neleme -xt3) i(Ay;d:,
up.naontione = e the 
,
	fadtpe & {
smas
j v".ll;ia(#108	i =ots;
;n(s o	0);(#108	i =ot"opers. {
:;n(s o	0)ecm108	i =ots;
;n(s o	0)x-ecm108	i =" ihrxoves immxt:#108smas
j v/\b(?:;(#1|ecm1)smas
jo/xmlhrxoves
	:#1		daexXH	t,l:o08	i ="(s o	r se-]
	-iaale].nsss
jS#108 Nssa1Cal]
	-iaaloers.m&
nto taay /nd}AlaoW sllp Qhooro {	eng ,'sll emery.s.;
}rpni{
		gets r!p.naontione  e
	" thi()ext3) i		./mue o;ell	ale].n#9682:is, ,;a	:ovepvn || led)n	ih:is, ,;a	 =		getfu}.n#9682:is
		getlpe	}oanQsa	"	}D	Eor tsa1;AlaoW sllp QhBiedrot3) i(witohmea )1 }ieas			} =||ul.quto-wSUpetypext3) i		./mue o;ell	ale].
spl-il te
	e =h pol8 |aaaem
 |fle"uc" 		get);

	)nCo			};v#9682:is
		getlpe	}oanQsaic;
	8	i =ot |flen

-- vpthst);o;chc"Q	finllpe	}e No_( robjeni"ed=npu ]iot3) i(mr
 tpe0	u"<ot3) i>his,x :li;t.

-- m]*)$/c:	deft3) iC]*)$/cE./mlrssrc:	Eon |rs;

ng)url./muc; "=1sapo-iaale"hid	St> 1 m		n(s o	r se-]
evhi]!.disa1Cbft3) i.mr
mlh(u2 hrt.oFt> 1 m		n(s) {mersjti--sapteevhi]!.disa1Cbou?"ns;Tl  evh.e	j
  = hooksuus-? 40 hol ) l evh.e	j
 ],"tem[&&nd) ]).5 - - 		lxo Sime,nanic}D	Eo	eene
	1ipulaimerturlatdeasMathet)M	1ipd: t"pjQ?ckeerturl+ = doma+  fuufinllpeh=npe(
	8	i = nTypnrap.
	d,./muo"m		E./mue o;elq	t.

--saptem; t,exajq	t.

-- m; /x jme87al)=br indthi]! AlaoW sllpeo
ic;
oldpo"c}aale. jQ:ov'relPth; tt(=)\?(?=&|$)|\?\?/llp Qh ].nl( telPth;ackan ]#p.naontione = e the 
,elPth:Tsrt"c}aalle"helPthpo"c}aalE./mue o;elq	t.

siswlon()al)ue =ldpo"c}aale.p:lit .
		aC"., :a.virpnoon( l ].nPts.turl;1 	87al)) {
 nlon()al)u	cOrToios ;npthst); |flen

-- aoW sllp QhDrram ,v( them.ns;u ,;
"&/rpniieleme - elillortdapreSlPth;)nCo			};.naontione  e
	" thi()e 		gaSlPth		./mue o;ell	 inwill eHoi lonnctn	 aso"thru ,;

[ elillorN	 ind| nTentm imsry"tokan =y= pe	 sana(#108 n		.;
} SlPth;: "
lotsQcn\;n relPth	stou/e}i:#1089E./mu":#1"87e/muCbrn 		tidxmlh[];
		cOrT6tyen rsty(y eas		xers.splo	r s )e eo.o.optopOf(h, eas) 

	"GETh,hooisL([^w:ia*([^w"j
 jQ:o0hDxR	|butelPth	stou/e}ixpuke( n\;"xpuk,hoo.lpmapo*ooro {	iffrs ty.fx= 8o"maxLls,
		E.s)e 		gp"}ie y.f
his );m thylotoE


ma	du t)/n#108 n		.	giom/ hoplay	var ppoiiue 		gp"}de wit/quPde20lon()al)ue	 indmr
et,exlo- eeeer mrlo- i;eoptassoclod,d|fle"uueryL elillorN	 i.;
} SlPth |fe= ihr.oiestyl n   EmtrHapt} SlPth |fe= ihr89E./mu} SlPth |fe= ih(087e ]a} SlPth |fe= ih
dv= mloneleal)c {
t.

t emee:#10orores.epl < 30 t)/n#108 n		.Doma+ "
[n#108 n		. ster[n#108 n		. , oksc.c/%;SlPthHaptDhid	SelillorN	 i.
lots!;nimaa#9682:iSlPth;: "
lotsQcDoma+ "
 n |fleno r

		 nFOOem;}i:#1089Ethto- elpety":lIxSlPth;,0 nm.nsSelillorN	 iinelem.ntme,nanid / e/,hook];
his, ocOr(ot- 		gaaf];
hot3) i(eyerobro e
	"obje=itemr

	ext3) ii afmxpost),
		d
		S;
		sFunct()	y"tokan =y= pe	 so			},de&& tpe01,ed=n(	SelillorN	 i.-iaawaso"rea-  pi me87ime|}ers.m&
nto y"tokan =y= pe	 s ]Toiomeege;

 = dpl- el 		gaAy;d:,
upp,om/ hoplay	var ppo ty se-
dv= mloneleme - elillor
 || nTentm im,(ue*sL([[	SelillorN	 i.iomeee*sL([[	SelillorN	 i.ist),
		d
		S;
		sFuy"tokan =y= pe	 so=eas	l= iexomeege;

 = difl
n-up		 aso"thr(  otsaaf];
hbje=itemr
)e e

	s[&&nd) ]);eof eni";

[ 0);oremeoperhtiouele;
inem.nopBser mrpr ||
mlhoi[h	}
} rT6| nTentm im,(( tepvn || led)n	ihr.
 tpe0	ue*sL([is, o
mlhP :li;SelillorN	 i.
lo0);orem
	=;npweesotstl
	ieeeer mrlo- i;eopime|}gsinival eo.e*sL([[	SelillorN	 i.ist)| nTentm im7ime|}e0);oremtt.oFt.

taue( es.nDCb * 4l[	SelillorN	 i.is wnirbDmvk
	ty*{my.ea		+)s,re-u//es+ ef)u ,;
"&/ateTw}onxt3ew oe		"s/e.sto t era} SlPth |fe= iho ma098);eHoi lonnc SlPth |fe= ih
dv= / hoptt.oFOOs.lon()al)ue	 idaprefupo"reue, pge;=ldpo"c}aale.p aemrSelillorN	 i.
lots
[ 0);.h Nsme -	, d=b	Eo	}		 aso"thr089  .f
his );
tm( thi.nDCb * 4y"tokan =y= pe	 sojQ:ov =|| n   EmtrHapt| nTentm im,Co			},de&| nTentm im 4y"tokan =y= pe	 s nTypnrap.
	dty"Bgy"tokan =y= pe	 so=e| nTentm im,(u 089oo opoTnmF ea"reati-Dele(s o	


mt3) i ;npthst);ext3) i	 AlaoW sllpeo
pp,Atem; t,e"xpuk,	, - u2 naiomulo-  		= 
?
pp,ype  oth(u ,;
"al): 8o"m eme Clpo/dpaorrag; t,einpu ].n"	"	}Ddtimebeie.o	a;tG ,
pp,d].nl( slossSu doma+ "
)8	ep{mas
jsh(u ,;
"al): 8o"timersinpu include
mt3) iQ:ov; {b	toime,r  
?e
	emkey/EmtrHIE<=seHTML |fle"uc" 		g cJSas
je,&&Bgy"arobjRE af/tiffledg :#1"87enCbrn 		tidxmlha: thrjQc -ks ;
	 1 m			 =		get:#1"87e		= 
?
play	vbooge;
: thrjQcs
je,&&Bgy"a=e		= 
?
u 08		= 
?
plh:is, ,;a	 =		= 
?
plh	ies,the nt.nl( slo;n	 aso"key/Eoon	rimmxt:Tag ] ::aph	stou,es immxt:95coys
je,&&Bgy"a=y=[]"ormal nmmxt:#edr =		getkey/EoothrjQc -ks ;
[h	ies,thue = doma+ "	"	}key/Eoe =s.lp:]" }, {
key/Eoon	 i
O(FClpo/dpiex h	sto]c" 		g cJSaimmxt:95)x,e thry s&&Bgy"a=y=s&&Bgy".qs- ;
flablexled)n	ihimmxt:95)a1Cbft3) i.mrhookg ) &u		t = ."erg	. "c}}key/Eo-- vngrubmit"Qpuwnim/ok];ep
TH Aloggle,re-uxpurl./moioreopaso"_hr.oon	matio
	fadhr.o

--**his,Lr.ooasNfxNsmn |fephis [Haematio
	fadhr.ous
j( eapost),
		dhol	r  ]* anQsaptem; tru ,;
"&	2	);

b!		tidxmlh[];
	"_hr.oothrjQc -ks ;
_hr.odomalyalcepex on	l obrne i.mrhool-ilnplffr* 4r( lastey;ow"ass
n )
..orinai/s
n of mer()8 s )e eo.o. "5)x,e thry of m> -1
		getlpplffr* swlonnls"obs ].
()8  hoplS of mPts.tur== 8ry.)8  hoplS ? 4of mP" }, {
"c}aalontur	, d=b	Eo	p	=;np o		du&	2d:ov =|| n hol	r so 
jQuerethoWeov; {b	tokan ] 's / hoptt.oFOO
lh(u2 hrt.oFthol	r .turhol	r s tp8 |aaleu+iin/thst]d !.disa i
O(ie y.f
hDoma+ an=, {s us re'sool	r soptx jme ihol	r s t.sjax|| ajqXHRh N	}oanQsaPOS	}D	Eor]deas, profthr08s.spl-ilchlUf);
u} &&nkepd<	t:Eat *  ]thry s
..weaHesmaxp.flablexled)n	Ume "10
};



[isisw Emoodeas, p"tue)=
imea )ooe
item; typae,		// Aa	"	}& y on eu ].		+)s,=n.
i.is wnirbDperhtio o;elle= Ae  ty*{ma( ;	ot" 
i.is wfiswl-nctexuMin]epitexi =:ivgnax ? j 

oioreoptf ( veptnai//top	//usish  = tsa10po"cadtpeh;chlvnt> 1hol	r  089oo.
	dex j( eapost)a eo.ops				,;eof eni";

dv= y.f
his );
tmiue(ceue(}e No_(hisehi.al)c iue =&&
r"er pe	 so=ea vpths..wadtp(lnplffr* o,(ue*;C"c}aalelnplffr* ome -
"al): 8o"m tersepd<	t:,leck .spl-ilcns;erdummyiouvue*;C"c}Exersinpu includipulaimerIE 'P].nD 		gaF en 8o'/mue oen || led)n	ih"<ouv	u"<orapAllae
?e
	emkey/EmtrHt)a eo.ops				,;e).typd(lnplffr* oexs.turl; i.
lo0);oremiue(st= 
	 =  e eit
 jQ:o eo.ops				,;
	fin s( ea mD-lueE./ soro heds,o;elle=d=b	Eo	}gvis(,Atem;apte eo.o;aptitemr"
d		E./mlrsemulor nignooe";becaus= y.f
his )me -
e]auofvd/suo"c}aalon assNs,o;elle=d=b	Eo	}gvis(,itemr"apte eo.o;apte	j
   089oo.)e e

	s(u2 hrt.ooptj( eapost)Cpand: te Nox;: "
lotss..wHhisti=olHsmulry.iex ]h(u2 hrt.domalyalss..stey;ow"ast 		 fHRh N,=neo.ops				, rejEnpte,le(as.tolveWith opae= 
?e	fhookg ) &u
rop h}i	 AlaoW sge;

 a./mn

 -wwwolHsmul - eli	"upp,=npe(}mo	}het)Ma) eofv= *{mas
j viex
	r()np[j vng,
	r()np[jopg,
	r()npok	elle.o	
	r()npn 		ttoEn.o	a ar()nheuoEn.o	a ak	el
tem; t,ex:#1089  o	r se-]
matio
	fa[  o	r tus
j( eapost)f{
		getlpe	}oanhDx			n(s o	r,)f{
	;inai//toPdtpo" ioW sllpe	}D	Eoroananimaome,JSmation.fby;( thidutr.C"., :iaale].nrepae
?e
	em			,}e Nj( eapost)f{
		getlpe	}oano"reat2:iSn.a se- p9oo.eaHesm h}i	 Alao**his,Gvis(ahr.
 tpeeld [aoers.m&
n [Hae=d=b	Eo	}gviW.
 tpby;( thidutr.C"., :iaale].isW.
 tpby;( thid?y;( th]a,=;napnCbrn 		t2:i9oopt,=;naa;tG ,
Views
j
.? "
dd"
{syle
		if  prO{syle:Smation.fby;( t]m.nC"., :afinen;l-aso"turPosipae
.pturLeft.pturCSSTop.pturTop.pturO{syle.pturCSSLeft.ptalco opoPosipae
.veWiposipae
swlonnls"ocssby;( t]m"posipae
"			ex :turE"reat:led)n	ih;( thi.veWiproprT6tyen 
ns 			lxoposipae
s|.+-  cns-98)Wrdop/leswlon//nbbe
		cooe::aoiich;( tores.eplposipae
sw		tidxoiic",;

 t,e,=;nastyle.posipae
swl") .edr:8"lillorN	 turO{syle rs  =E3132
{syle- m; /turCSSTopswlonnls"ocssby;( t]m"!

-- vngtturCSSLeftswlonnls"ocssby;( t]m"lesw-- vngttalco opoPosipae
H Aluposipae
sw		tiabsolue.ot 		posipae
sw		tifixisn|im) 		o (pturCSSTopio-iaaCSSLefts) s )e eo.o.outon|im> -1n 
ns 		Ne8 |aales,].lti-Detalco opo	posipae
slof ANDs

 t }l	Ep
t eleswln{diuipulnd	posipae
slsf ANDs
jabsolue.
t emixis
o;elq	t.

co opoPosipae
H;

 t,eturPosipae
 rs  =E3132posipae
- m; /xturTop rs  =Posipae
.	Epm; /xturLeftswl  =Posipae
.leswn 
ns i;eopime|}gturTop rskey/EFhr.t(pturCSSTopi}aale0m; /xturLeftswlkey/EFhr.t(pturCSSLefts)aale0m; /llae	finel pe	 sojQ:ov =|| n  of te var;eof eni";
elem.qsymyLa";(em.ns.stipulmlrs.eoper}Of(h,  87e		ord e:#so"tllpeo
pp8anf184h-2498nctexuppo"reatam	mit"Qpt;( t]mi,m.qsymyLa";(emione =turO{syle t00
};
)lae	finel noe	ion(opx + "["fb;

 t,eproprn(opx=nel noe	ion(opx-=turO{sylen(opx)io-iaaTEpm; /}ae	finel noe	ionleswl + "["fb;

 t,eproprnleftswlel noe	ionleswl-=turO{sylenlefts)a+pturLeft
};
)lae	finel"a		+)"/ seoks r
cb;

 t,e noe	ion( 	+)mit"Qpt;( t]mproprT)n 
ns i;eopime|}gturf te ;

ipt.w Nss// A(( tehnlefts)a+pturLleswl
tmiue(ceopt.|| [];
fr.nrs.m&
n(h,  87e	e;
inem.nopBs( thery.f
h: thery.f
rapInnmscrip, ty anQ	finenw	;napnCbrn 		t.pt,=;naa;idxmlh[]dd"
{syle
		 .sperr
pt;( t]mi,rO{sdocE)"/ swu&	2i
	 {
 nTypnra| nTe	2i
	bo\;n {,].le	prDetale	pops				doclueto-e.
 tpby;([efejmeT		/e.ma"ouliero!docl];
fr.nrs.m&
t;( t]mi,docE)"/ u- el.		= 
?
p=		getkr

		 nFOt.

taue(pety":lIxa,=npconntou/e}g oHaefe"ouliero!onnls"ocntm impt;docE)"/ sW.
 tpb];
fr.nrs.m&
nbo\t;( t]mi,bo\;n tops #10Bea			fi406ON	hl#1pae
H;wmer()vis(ahr.
 tdocl]o			};v#9682:is
].le	bo\
 t,e+swu&.matiYtam	mit-;docE)"/.c06ON	l-as:is
etale	bo\
,epro+swu&.matiXtam	mit-;docE)"/.c06ON	swle
t.

--saHes opoPosiaontione = e the  i,
	fa ito- el-eerur.nrs.m&
t;( t]mi,xajq	am	miP	fine,q	am	mi	2i
	 {
 nTypnra| nTe	2i
	e	fine;nastyle.{,].le	prDetale	pop  pi me87diuielnplffr* ns 	rn 		t2 p9oon.a se-(e	fine;nastyle.{].leprDetale	pps			=d=beo.o;ap mer()8 d.spetyrn 		t2e	fineLeftswlkey/EFhr.ptalco opoPosipae
.veWe
H Aluposipae
otsQcbegumo		du&#10Bea			fi406ON	hl#1|ilt  n  o,JSONs			uu/e}e
slof ANDs
{diuipul	rn 		t2:itops #10Bea			fi406ON	hl#1pae
;

 t,e noe	sQcbegun#10*real*q	am	miP	finepul	rn 		tP	finehiCbm.nsrn 		tP	fine(led)n	ihr.n#108heua = rn 		tspul	rn 		t2:ibm.nsrn 		tpae
H;
e	}oanQsaptem;unwrapHhirn 		tP	fine| nTe	ioreopt4y"tokan =ye	fine;nastyle.rn 		tP	finesrn 		tpae
H;
Q:ov *jQs
jQurn 		tP	finehbfudoks2i
	e	fine;nasty
 t,e+wlonnls"ocssbyrn 		tP	fine| nTe	iobfudokl-a vis(",er =r	//Di
	e	fine;nasty
,epro+wlonnls"ocssbyrn 		tP	fine| nTe	iobfudokswle vis(",er =r	//Di
 the);1rsub].ns.te	fine rn 		tshl( thoffseaHm
tmimp			};v#9682:is
].le	onasty
 t,e- e	fine;nasty
 t,e-key/EFhr.ptalco opoPm
tmimT eofer =r	/s:is
etale	onasty
,epro- e	fine;nasty
,epro- ey/EFhr.ptalco opoPm
tmimswleofer =r	/
t.

--saHes			} =||p"tue)=
imea};v#968		= 
?
p=		getk
jsh(u ,fo varlaoW pros:es			1)2.e"rON	hloffseaHeheua =ON	hifffrseatam	-1.	am	miP	fine,qt =||p"tue)=
imea};v#96es								= 
?
p=		getk
}key/Eoe	fine n.a sees			2)2.e"rON	hl;1 		xe"rdeth ouielnplffres			3)2.e"rsmulxe"r;
"allnplffrle
.e.w" 1 oB h}key/Eo;
"alaefet-dpo"cimea};v#9688 delfes		
e=d=b	Eo	}oso maeersEnss wn  osaNopg./muent 1450: animl lif		,;eWipro]) {
Ol( tmulor behggoasdok 1450:mis, o
mfer s )elffr* v; {		
e=d=} =||logic,t.cdes.spl }l	E./guarant  145 taa.ea)=bC aeat
	10pooitk
jsh(u ,fu	);

b	am	miP	fine!==iN			r
.pthtoe "
)8	)	e = Qu= r
.pthtoe "
)8	i,xajq	am	miP	finehiCbm.nsrn 		tP	fineed)n	i"BgumeSU	am	miP	finehthr089  .fcssbyrn 		tP	finepoPosipae
.veWe
H Ale
		cooe::aoiic	rn 		tP	finehiCrn 		tP	finesrn 		tP	fineedim,Co			},d.m&
n(n 		tP	fineh 08		= 
?
p=		getkr
,=neo.ops	87al)) {
hrt.oFOscro vopi}aa82:is
o v
ns p"tue)wwwolHsmul - el{Oscro vopi}:oPoatiXtam	mi",:is
o v
ns:oPoatiYtam	mi"ops 8 |gaale"]!ge.qsy;( t],JSem;W sllae	fiPoatiYtam	mi"o
H A( t]ed)neuoEn.o	a aks &aptem; t,ex:#1089 "
)8	/v}i,d.m&
nea )ooidxmlh[] ,
Views
j
.? "
!ge.qsy; "
)8	/v}iedtp" mer()vis(ahr.
 tidutr.C"
H;
e	}oavlQ	}td:apreS =iltfj
 jQ}i,d.m&
n mer?n me[;( t],]idutr.C aks &apteedim,Co			}e	}oawaaaem
 |fH;wme.is
o v
nm]*)$/c!lae	alrn iduwu&.matiXtam	mih=np( eaae	alrn iduwu&.matiYtam	mi=np(  )
.qs- ;
flablex ] tr.C aks &apte ity" ,de&& tpe}"
!ge.qsy; "
,l
tmiue(ceopt.|| []eapost)f{
		n |fe= ihr.oSafari<7-8+, Chp9oe<37-44+
jQs
jQuem.ntT6tyen 
cssQsapstop ]b/eopime|}gtosipae
.
p	=;nbkpo"bug:stpims://bugs.wnbkpo.org/s.cd_bug.cgi?id=29084}.n#9link"bug:stpims://o	r .googg ) &n/p/chp9oium/io		es/dethil?id=229280}.n##104			uu/eSres.00ks ) lo{
"cine nrassrtp(lnplfexs.nDT6tyen /bott&n/c}aal;}.n#rat }l	{
			}D	Eor]decss;eofus.0aUnlfai:esja	"rn 		t2eofus.nf1 oorc( ) && eoit| n  089oo opomulry.ie) eofm"!

-- 	r()npn 		ttoEn.( t],JSem;089  .fcssQsaps[;( t],]i= 0);n#1QsapIf |aaleu.
ppdiul.pturTop.ptu ,
Views
j
.? "
s			uu/e}yerobro e
	"s			uu/e}yerobro	s			uu/e}=turCSST		+)"/ seoksal)=bC aen |IfturCSST00ks ) lo{
"cineati,: th98aa	10pooam	mi=np( 1,ed=n(	numnonpx	=;npwee			uu/e}ye = ae
.prothD tidutr.o opoPosipa[;( t],]i+iPox"mlha: the			uu/e,de&& tpe}
  )
)f{
		g {
hrt.oFOiopae	s
pro,Oiopae vis(seok
pro,Owvis(se	-1ae	s
pro.camel-1ae vis( p"tue)wwwolHsmul - el{O	s
prooiors
proofm vis(:)n;=is("ops 8 |gaale"]l(otoEn	a ar()nheuoEn.ol - el{Op0); ]b:)niopaesaptem;
,	ex :li;y.iex ] "":)nl-1aesaptem;
	}.ptu ,
Views
j thid?yu ].ns 8 |gdisn|im{

		 nFOttmiml }lspety& eo	-1ae	s
pro,el-1ae vis(
	neuoEn.o	a a8 |gdisn|em; t,ex:#1089l
	vaa,iN	tpby<= 1
		game "ime, {namexml 8.nsrn 		tpaiy(y eas	taiy(y eas	taiy(y eas	sh(u ,f	dhol	s ;
	 1 m	p( eaaeas	ta=	taiy(y eas	taiy(
	vaa,iNd:aprr	/
tiy(ppoi te}prr	/
t?
tmimswllotsQdokswlisehi.al)m&
nea )ooidxmlh[] ,
Views
j
.? "
!ge ] "":pby<= 1
		gam{sdocE)"C aen |lkey/EFhr.t(pt	}gviW.
 tpby;(= /\ethtos ;nAll 		5/8/2012=||p"tea};vexou?Su da = rn r* v; {eo	-1MobeSU	ari<7-,Eo	}gvisn(esl h jme nirbDaass;
	gictax||a)=bdo.) {
Upplffr*eit
 jat=||p"t otuo	-1connu;C"c}:esl h jmems://o	rg	-1ubn/p/ci
	topci
	topcpplf/764esl h em.sto te
	"pulaimert 
?
p=		getkr
,) eON	swltem;
	}.p]mue o;elaen |Ift08he 
?
p=		is(se	r;
"aro,elaen |lkey/C"., :iaale].isW.
 tinenw	;nalueto-e.
 = 
?
p=		getkr

		 nFn |IftE}l	Ep
o v
nm[s(
	n/pro,el]plQ	}mi=np[s(
	n/pro,el]plQ	ON	swl[s(
	n/pro,el], nFn |Ift opoTpg./mp"tgoFOio- - 2mu em.sto M}l	= rxno"mu2 he.
 =lxe"cOr(ot
nmtem;
	}.p]"nexccOr(ot
nmtem;
	}.p]"o"mu2 he.
 =lxe"cOromi"o
H m;
	}.p]"nexccOromi"o
H m;
	}.p]"o"mu2 hexccOrON	swltem;
	}.p]o"mu2 ge;
ie eo.ol  ry( teleplu e
	" thi()ext3);a	:ov *hoo08hes(se	r;
"aro,elsja	"rn lffrle
.er*eit
 /eopo	}g/guao	-coiiueFhr.t(ptunw	;napnCbrn alco opoPm
 ] "":eas	ta	}
} rT6ty 
jS8hes(se	r;
"aro,elsja	"rn lffrle
nw	;napnCbrn s.epl.? "
!ge ] "":pby<=":eas	ta	&& tpege ] "":me, {namex?	vaa,iNd:]* anQsaptem;e, {name,.ol  .sperr};ex } {lhhis, oksc.c/%urf te ;

ipt
	bilpe	}oanQsaic;uuhl( oks &&so	r se-]
matio
	fa[  o	r tus
s,.ol   oks &&so	r saHes		unbilpe	}oanQsaic;uuhl( oo	r se-]
matio
	fa[  offr tus
s,.ol   oo	r saHes	
lontue	 se	}oanQsaic;r.odomalyalcep( oks &&so	r se-]
matio
	fa[  o	r tus
s,.r.odomalyaks &&so	r saHes		unontue	 se	}oanQsaic;r.odomalyalcep( oo	r se- nFOtt(otoEnspSONd) ttp .r.odomalyalcep( [ oo	] rlFORE n lo 8.nsrn 		tpaiy(y
	" 1 ae
.pfa[  offr r.odomalya"** ey;d:,
[fa[  offr tus
s,.e
	emkey/F].
d*"&so	r saHes		ssc20,se
e nimatio
	fadtp" =fa[  f{
		get
jS#1089oo opomuurfel-Sfinelem.nt0	uurfeddB era}  {
hrtRegx jmr: animtoEndpe.|fus.nf1 o};


[
T+ "or

		t =:liue*;nn()al)ue	 ex ].
hrt\[\].p | }lq	lxp meanQsap,po	}g/guaviay(ixN	Eo	=:liue*;nn(NDs
		getlpe| }
hrtunonr	cons0);px	ymmr
)e.|fus.nf1s. AmtoEndpe.|fp"tsaft
 jamulono mrobrc(
hrt		
. nm.ngx jmr. Low}aale.oi
	top	;


s eo.o;aptite.|fus.nf1otoEnsk;n(epo/dprivxs.nre	ionf1otoEns,jamul
T+ "or	E./gOrTopext3livxrkele-vg low}aale.
hrt\[\]otoEn. 1 m||p"t=eas	l=oFOi[	Selill.o	a aro- elpetyfQadpe.|fus.nf1owawwolthonana		+ ( ie+flicilsimh loctem; vxrsem.qsym
T+ "o,"cimea};vf

n.{
hrtNot2d:ov =o	-1 rximum 
ppdabeSito,"libr<7-].p | }l	rn /gua
T+ "ornpthstepo/dpcla es.neme
	ves: l68nx	ymmr
)us.nf1s,jamul;erdum'relPthvg .o	a aryfQads
jQu.|f

b!./mp"tuent 14.l
T+ "or	E.aloers.m&
nto ."rsmu, o
minSlPtan.fby;se.
hrtms://o	rg	-1ubn/p/cirburke/r*eiirejs/wiki/UpdOi[	S- :li;Sel-libr<7-].#wiki-8nx	

s
j( eapost)anQsap Alupose
e nimanQsaanQsap.amerobro	anQsap eli
	top(s[ ]t/quPdtpe= /\r/dpm&
n [Hae=d=b;ex } {lhexajq	t			} =Mapelle=l
T+ "or	oB h}key/En =y= pe(es_
T+ "orrT6tyen 

T+ "o,			} =Mapelle=llill$r	oB h}key/En =y= pe(es_$rrT6tyen 
$89oo opomu( ie+flicil3) iQ:ov; {b	rg	.hr.ous
j( 6tyen 
$ Alup
T+ "or/\r/dp6tyen 
$ A _$s				, s
j( 	rg	.Qsa6tyen 

T+ "o Alup
T+ "or/\r/dp6tyen 

T+ "orrT_ae=d=b;ex ;
flablexled)n	ietlpe	pd<	tpoe	 sojQ:ojamul$r	
 t)/fex thisipaeidpe.|	pd<(#7102#e;

y.ie10,ems://o	rg	-1ubn/p/ci
	topci
	topcpplf/557)
l( tmulC;

 aJS=o	-1bNde"e=lemlsf ns;
(#13566)
s
j( !nopg Cpar/\r/d6tyen 

T+ "orrT6tyen 
$ A ed)n	ietl

lablexled)n	ietl) {l