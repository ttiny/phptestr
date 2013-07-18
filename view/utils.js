function _queryParams ( str ) {
	if ( !String.isString( str ) || str.length == 0 ) {
		str = location.search;
	}
	if ( str.charAt( 0 ) == '?' ) {
		str = str.substr( 1 );
	}
	var params = str.split( '&' );
	var ret = {};
	for ( var i = 0, iend = params.length; i < iend; ++i ) {
		var param = params[i];
		var kv = param.split( '=' );
		var key = kv[0];
		var value = kv[1] !== undefined ? decodeURIComponent( kv[1] ) : null;
		ret[key] = value;
	}
	return ret;
}

function _stringifyIndent ( indent ) {
	var prefix = '';
	for ( var i = indent - 1; i >= 0; --i ) {
		prefix += '  ';
	}
	return prefix;
}

/*var funcNameRegex = /function (.{1,})\(/;
function clsname ( obj ) {
	if ( obj.def ) {
		return obj.def;
	}
	var results = funcNameRegex.exec(obj.constructor.toString());
	return (results && results.length > 1) ? results[1] : "";
}*/

function _stringify ( obj, indent ) {
	indent = indent || 0;
	if ( obj instanceof Array ) {
		if ( obj.length == 0 ) {
			return '[]';
		}
		var prefixa = _stringifyIndent( indent );
		var prefix = _stringifyIndent( indent + 1 );
		var ret = '[';
		for ( var i = 0, iend = obj.length; i < iend; ++i ) {
			ret += (i > 0 ? ',' : '') + '\n' + prefix + _stringify( obj[i], indent + 1 );
		}
		return ret + '\n' + prefixa + ']';
	}
	else if ( String.isString( obj ) ) {
		return JSON.stringify( obj );
	}
	else if ( obj instanceof Object ) {
		var cls = '';/*clsname( obj );
		if ( cls == 'Object' ) {
			cls = '';
		}*/
		if ( Object.keys( obj ).length == 0 ) {
			return cls + '{}';
		}
		var prefixa = _stringifyIndent( indent );
		var prefix = _stringifyIndent( indent + 1 );
		var ret = cls + '{';
		var i = 0;
		for ( var key in obj ) {
			ret += (i++ > 0 ? ',' : '') + '\n' + prefix + key + ': ' + _stringify( obj[key], indent + 1 );
		}
		return ret + '\n' + prefixa + '}';
	}
	else {
		return String( obj );
	}
}