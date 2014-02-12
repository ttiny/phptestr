"use strict";

require( 'Prototype' );
var open = require( 'open' );
var clr = require( './CliColors.js' );
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
	var IP = argv['host'] /*|| '127.0.0.1'*/;
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

		if ( location.pathname == '/view/frontend/settings.js' ) {
			response.writeHead( 200, {
				'Connection': 'close',
				'Content-Type': 'text/javascript'
			} );

			response.end( 'var Argv = ' + JSON.stringify( argv ) + ';' );
		}

		// serve files in /view
		else if ( location.pathname.startsWith( '/view/' ) ) {
			response.writeHead( 200, {
				'Connection': 'close',
				'Content-Type': ContentType[ Path.extname( location.pathname ) ]
			} );
			
			Fs.readFile( __dirname + '/..' + location.pathname, 'utf8', function ( err, data ) {
				response.end( data );
			} );
		}

		// read file content
		else if ( location.pathname.startsWith( '/read' ) ) {
			response.writeHead( 200, {
				'Connection': 'close',
				'Content-Type': 'text/plain'
			} );
			
			console.log( clr.intensewhite + 'read ' + location.query.file );
			Fs.readFile( location.query.file, 'utf8', function ( err, data ) {
				response.end( data );
			} );
		}

		// open file
		else if ( argv['remotemode'] === undefined && location.pathname.startsWith( '/open' ) ) {
			response.writeHead( 200, {
				'Connection': 'close'
			} );
			response.end();
			console.log( clr.intensewhite + 'open ' + location.query.file );
			open( location.query.file );
		}

		// do some tests
		else if ( location.pathname.startsWith( '/phptestr' ) ) {

			console.log( clr.intensewhite + location.path + clr.def );

			response.writeHead( 200, {
				'Connection': 'close',
				'Content-Type': 'text/html'
			} );

			callback( location.query, response, function () {
				response.end();
			} );
		}
		
		// logout
		else if ( location.pathname == '/exit' ) {
			response.writeHead( 200, {
				'Connection': 'close'
			} );
			response.end();
			console.log( clr.intensewhite + 'Exiting on request' + clr.def );
			process.exit( 0 )
		}
		
		else {
			response.end();
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
		if ( argv['remotemode'] === undefined ) {
			open( 'http://' + (IP || '127.0.0.1') + ':' + PORT + '/phptestr' + ( args ? '?'+args : '' ) );
		}
	} );
}

module.exports = HttpHost;