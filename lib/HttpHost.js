"use strict";

//var TestHost = require( './TestHost.js' );
var Http = require( 'http' );
var Url = require( 'url' );

function HttpHost ( argv ) {
	var server = Http.createServer();

	var PORT = argv['port'] || '3355';
	var IP = argv['ip'] || '127.0.0.1';
	var TIMEOUT = parseInt( argv['timeout'] );


	if ( TIMEOUT > 0 ) {
		server.setTimeout( TIMEOUT * 1000 );
	}

	server.on( 'request', function ( request, response ) {
		if ( request.method != 'GET' ) {
			console.error( 'Unknown request ' + request.method + ' ' + request.url );
			process.exit( 1 );
		}
		
		response.writeHead( 200, {
			'Content-Type': 'text/html'
		} );
		
		var location = Url.parse( request.url );
		console.log( location.path );
		
		response.write( JSON.stringify( location ) );
		response.end();

		if ( location.pathname == '/exit' ) {
			console.log( 'Exiting on request' );
			process.exit( 0 )
		}
	} );

	server.on( 'timeout', function () {
		console.log( 'Timeout, exiting gracefully' );
		process.exit( 0 );
	} );

	server.listen( PORT, IP, function () {
		console.log( 'phptestr started on ' + IP + ':' + PORT );
		require( 'open' )( 'http://' + IP + ':' + PORT + '/phptestr' );
	} );
}

module.exports = HttpHost;