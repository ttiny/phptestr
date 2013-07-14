"use strict";

var clr = require( './lib/CliColors.js' );
var TestHost = require( './lib/TestHost.js' );
var ArgvUtils = require( 'ArgvUtils' );
var PathUtils = require( 'PathUtils' );
var argv = ArgvUtils.parseArgs() || {};


// this stuff will be cleaned in the next release

/// this is used in browser mode

var tmpl1 = '<!DOCTYPE html>\n' +
            '<html>\n' +
            '	<head>\n' +
            '		<link rel="stylesheet" href="/view/view.css" />\n' +
            '		<script type="text/javascript" src="/view/jquery-1.8.3.min.js"></script>\n' +
            '		<script type="text/javascript" src="/view/view.js"></script>\n' +
            '	</head>\n' +
            '	<body>\n' +
            '		<div id="exit">exit</div>\n' +
            '		<div id="failed"></div>\n' +
            '		<div id="success"></div>\n';

function tmpl2 ( script, result ) {
	var tmpl2 = '\n<script type="text/javascript"> ScriptRunResult(\n' + 
	            JSON.stringify( script ) + ',\n' + 
	            JSON.stringify( result ) + '\n); </script>\n';
	return tmpl2;
}

var tmpl3 = '	</body>\n' +
            '</html>';


/// this is used in cli mode


var haderrors = false;
function ScriptRunResult ( script, result ) {

	function makeError( code, value, err ) {
		if ( value === undefined && err !== undefined ) {
			value = err.Value;
		}
		var ret = clr.def + code + clr.def;
		if ( value ) {
			ret += '\n' + clr.red + value;
		}
		if ( err ) {
			var scriptline = '';
			if ( err.File != script ) {
				for ( var i = 0; i < err.Trace.length; ++i ) {
					var trace = err.Trace[i];
					if ( trace.file == script ) {
						scriptline = clr.def + ' ===> @from ' + trace.line;
						break;
					}
				}
				if ( scriptline == '' && err.ExceptionTrace !== undefined ) {
					for ( var i = 0; i < err.ExceptionTrace.length; ++i ) {
						var trace = err.ExceptionTrace[i];
						if ( trace.file == script ) {
							scriptline = clr.def + ' ===> @from ' + trace.line;
							break;
						}
					}
				}
			}
			ret += '\n' + clr.def + err.Type + ': ' + err.File + '@' + err.Line + scriptline;
		}
		return ret;
	}

	var ret = '\n' + (result.Errors !== undefined ? clr.intensered : clr.intensegreen) + script;
	if ( result.Args !== undefined ) {
		ret += ' ' + result.Args;
	}
	ret += clr.def;

	if ( result.Errors !== undefined ) {
		haderrors = true;
		for ( var i = result.Errors.length - 1; i >= 0; i-- ) {
			var err = result.Errors[i];
			if ( err.Details !== undefined && ( err.Details.Case !== undefined && result.Cases ) ) {
				continue;
			}
			ret += '\n' + makeError( err.Code, err.Value, err.Details !== undefined ? err.Details.Error : undefined );
		}
	}

	if ( result.Errors !== undefined ) {
		for ( var i = result.Errors.length - 1; i >= 0; i-- ) {
			var error = result.Errors[i];
			if ( error.Details !== undefined && error.Details.Case !== undefined ) {
				var icase = error.Details.Case;
				var casename = result.Cases[icase-1].Name || ('[unnamed case '+icase+']');
				ret += '\n' + clr.def + casename + clr.def + ' ===> @from ' + error.Details.Line;
				ret += '\n' + makeError( error.Code, error.Value );
			}
		}
	}

	return ret + clr.reset + '\n';
}
















var Platform = require( argv.cli ? './lib/CliHost.js' : './lib/HttpHost.js' );
var platform = new Platform( argv, function ( request, response, callback ) {
	
	
	if ( !request.target ) {
		response.write( 'Argument "target" is missing' );
		callback();
	}

	else {
		var host = new TestHost( request.target, argv.phpbin );

		if ( String.isString( request.filter ) && request.filter ) {
			host.Tests = host.Tests.filter( function ( file ) {
				return PathUtils.match( file, request.filter );
			} );
		}

		if ( host.Tests.length == 0 ) {
			response.write( 'Nothing to test' );
			callback();
		}
		else {

			if ( argv.cli ) {
				host.run( request.args, function ( file, result, last ) {
					if ( !last ) {
						response.write( ScriptRunResult( file, result ) );
					}
				}, function () {
					callback();
					if ( haderrors ) {
						process.exit( 1 );
					}
				} );
			}
			else {
				response.write( tmpl1 );
				host.run( request.args, function ( file, result, last ) {
					if ( !last ) {
						response.write( tmpl2( file, result ) );
					}
				}, function () {
					response.write( tmpl3 );
					callback();
				} );
			}
		}
	}
	
} );