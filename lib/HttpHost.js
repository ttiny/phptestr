"use strict";

require( 'Prototype' );
var Http = require( 'http' );
var Url = require( 'url' );
var Fs = require( 'fs' );
var Path = require( 'path' );
var QueryString = require( 'querystring' );

var ContentType = {
	'.html': 'text/html',
	'.css': 'text/css',
	'.js': 'text/javascript'
};

function HttpHost ( argv, callback ) {
	var server = Http.createServer();

	var PORT = argv['port'] || '3355';
	var IP = argv['host'] || '127.0.0.1';
	/*var TIMEOUT = parseInt( argv['timeout'] );


	if ( TIMEOUT > 0 ) {
		server.setTimeout( TIMEOUT * 1000 );
	}*/

	server.on( 'request', function ( request, response ) {
		if ( request.method != 'GET' ) {
			console.error( 'Unknown request ' + request.method + ' ' + request.url );
			process.exit( 1 );
		}
		
		var location = Url.parse( request.url, true );

		// serve files in /view
		if ( location.pathname.startsWith( '/view/' ) ) {
			response.writeHead( 200, {
				'Content-Type': ContentType[ Path.extname( location.pathname ) ]
			} );
			
			response.write( Fs.readFileSync( __dirname + '/..' + location.pathname, 'utf8' ) );
			response.end();
		}

		// do some tests
		else if ( location.pathname.startsWith( '/phptestr' ) ) {

			console.log( location.path );

			response.writeHead( 200, {
				'Content-Type': 'text/html'
			} );

			callback( location.query, response, function () {
				response.end();
			} );
		}
		
		// logout
		if ( location.pathname == '/exit' ) {
			response.end();
			console.log( 'Exiting on request' );
			process.exit( 0 )
		}
	} );

	/*server.on( 'timeout', function () {
		console.log( 'Timeout, exiting gracefully' );
		process.exit( 0 );
	} );*/

	server.listen( PORT, IP, function () {
		console.log( 'phptestr started on ' + IP + ':' + PORT );
		var args = {};
		if ( argv.target ) {
			args.target = argv.target;
		}
		if ( String.isString( argv.filter ) && argv.filter ) {
			args.filter = argv.filter;
		}
		if ( argv.args ) {
			args.args = argv.args;
		}
		var args = QueryString.stringify( args );
		require( 'open' )( 'http://' + IP + ':' + PORT + '/phptestr' + ( args ? '?'+args : '' ) );
	} );
}

module.exports = HttpHost;