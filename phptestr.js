"use strict";

var TestHost = require( './lib/TestHost.js' );
var ArgvUtils = require( 'ArgvUtils' );
var PathUtils = require( 'PathUtils' );
var argv = ArgvUtils.parseArgs() || {};

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
	
} );