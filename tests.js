"use strict";

var TestHost = require( './lib/php/TestHost.js' );
var ArgvUtils = require( 'ArgvUtils' );
var Path = require( 'path' );
var Fs = require( 'fs' );
var defaults = Fs.existsSync( __dirname + '/phptestr.json' ) ? JSON.parse( Fs.readFileSync( __dirname + '/phptestr.json', 'utf8' ) ) : {};
var argv = defaults.merge( ArgvUtils.parseArgs() || {} );

function CompareResults ( file, results, expected, ret ) {
	var compare = results.duplicate();
	for ( var j = compare.length - 1; j >= 0; --j ) {
		var cmp = compare[j];
		if ( cmp['Errors'] ) {
			for ( var i = cmp['Errors'].length - 1; i >= 0; --i ) {
				var error = cmp['Errors'][i];
				if ( error['Code'] == 'UNPREDICTED_ERROR' || error['Code'] == 'ERROR_LOG' ) {
					delete error['Details'];
				}
			}
		}
		delete cmp['Cases'];
		delete cmp['Url'];
	}
	ret.compare = compare;
	return JSON.stringify( compare ) == JSON.stringify( expected );
}

var host = new TestHost( __dirname + '/tests', argv ).run( null, function ( file, results, last ) {
	if ( !last ) {
		return;
	}
	var name = Path.basename( file, '.in.php' );
	file = Path.resolve( this.BaseDirectory + '/' + file );
	
	process.stdout.write( 'TestTest ' + name + '... ' );
	var expected = JSON.parse( Fs.readFileSync( Path.resolve( this.BaseDirectory + '/' + name + '.out.json' ), 'utf8' ) );
	var ret = {};
	if ( CompareResults( file, results, expected, ret ) ) {
		console.log( 'OK' );
	}
	else {
		console.log( 'FAILED', "\n" );
		console.log( "==== Result:\n\n", JSON.stringify( ret.compare ), "\n" );
		console.log( "==== Expected:\n\n", JSON.stringify( expected ), "\n" );
		console.log( "==== Debug:\n\n", JSON.stringify( results ), "\n" );
	}
} );