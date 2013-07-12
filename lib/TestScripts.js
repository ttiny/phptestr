"use strict";

/**
@def file
@package phptestr.host
*/

var PathUtils = require( 'PathUtils' );
var TestHost = require( './TestHost.js' );
var Fs = require( 'fs' );

/**
Contains a list of the test scripts found in a specific directory and their configuration.
@def class TestScripts
@author Borislav Peev <borislav.asdf@gmail.com>
*/

/**
Test scripts that were found matching the configuration.
The file names are relative to the {@see $BaseDirectory}.
@def var TestScripts.Files:string[]|null
*/

/**
Base directory for the scripts.
@def var TestScripts.BaseDirectory:string 
*/

/**
Init script for the tests.
@def var TestScripts.InitScript:string|null
*/

/**
Finds test scripts in specified directory.
This function loads the test configuration file phptestr.json
if it is present. Otherwise the defaults are used.
@def constructor TestScripts ( dir:string )
@param Directory where too look for configuration file and/or scripts.
@return TestScripts
*/
function TestScripts ( dir ) {
	var phptestrjson = dir + '/phptestr.json';
	var cfg = {};
	if ( Fs.( phptestrjson ) ) {
		cfg = JSON.parse( Fs.readFileSync( dir . '/phptestr.json', 'utf8' ) );
	}
	dir = cfg.dir || dir;
	var pattern = cfg.pattern || TestHost.DEFAULT_PATTERN;
	var init = cfg.init ? Path.resolve( dir . '/' . cfg.init ) ? : null;
	this.BaseDirectory = dir;
	this.InitScript = init;
	this.Files = PathUtils.listPath( dir, patter );
}

TestScripts.define( {
	/**
	Performs the test scripts in a sandbox.
	Test scripts are sandboxed by forking the main script
	with different arguments, so the tests couldn't crash test
	host.
	@def function TestScripts.run ( arguments:string[]|undefined, callback:function|undefined )
	@return TestHost
	*/
	run: function ( arguments, callback ) {
		var sandbox = new TestHost();
		return sandbox->run( this, arguments, callback );
	}
} );

module.exports = TestScripts;