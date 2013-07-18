"use strict";

var clr = require( './lib/CliColors.js' );
var TestHost = require( './lib/php/TestHost.js' );
var ArgvUtils = require( 'ArgvUtils' );
var PathUtils = require( 'PathUtils' );
var Fs = require( 'fs' );
var defaults = Fs.existsSync( __dirname + '/phptestr.json' ) ? JSON.parse( Fs.readFileSync( __dirname + '/phptestr.json', 'utf8' ) ) : {};
var argv = defaults.merge( ArgvUtils.parseArgs() || {} );


/// this is used in browser mode

//var tmpl1 = Fs.readFileSync( __dirname + '/view/header.html' );
function tmpl2 ( script, result ) {
	var tmpl2 = '\n<script type="text/javascript"> OnScriptRunResult(\n' + 
	            JSON.stringify( script ) + ',\n' + 
	            JSON.stringify( result ) + '\n); </script>\n';
	return tmpl2;
}
var tmpl3 = Fs.readFileSync( __dirname + '/view/footer.html' );


/// this is used in cli mode

var haderrors = false;
function OnScriptRunResult ( script, result ) {

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
				if ( err.Trace ) {
					for ( var i = 0; i < err.Trace.length; ++i ) {
						var trace = err.Trace[i];
						if ( trace.file == script ) {
							scriptline = clr.def + ' ===> @from ' + trace.line;
							break;
						}
					}
				}
				if ( scriptline == '' && err.ExceptionTrace ) {
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
		var host = new TestHost( request.target, argv );

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
						response.write( OnScriptRunResult( file, result ) );
					}
				}, function () {
					callback();
					if ( haderrors ) {
						process.exit( 1 );
					}
				} );
			}
			else {
				//response.write( tmpl1 );
				response.write( Fs.readFileSync( __dirname + '/view/header.html' ) );
				host.run( request.args, function ( file, result, last ) {
					if ( !last ) {
						process.stdout.write( OnScriptRunResult( file, result ) );
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