"use strict";

require( 'Prototype' );
var PathUtils = require( 'PathUtils' );
var TestScriptRun = require( '../TestScriptRun.js' );
var ChildProcess = require( 'child_process' );
var Fs = require( 'fs' );
var Path = require( 'path' );
var clr = require( '../CliColors.js' );

var RE_QUOTE = /"/g;

/**
A host for running tests scripts.
The scripts are executed in separated environment
so they wont crash the host. Each script
uses a set of functions which writes to stdout,
the test host captures this output and determines
if the script was successful.
For information about how to write tests see {@see lib/test_environment.php}.
@def class TestHost
@author Borislav Peev <borislav.asdf@gmail.com>
*/

/**
Test scripts that were found matching the configuration.
The file names are relative to the {@see BaseDirectory}.
@def var TestHost.Tests:string[]|null
*/

/**
Base directory for the scripts.
@def var TestHost.BaseDirectory:string 
*/

/**
Init script for the tests.
@def var TestHost.InitScript:string|null
*/

/**
Finds test scripts in specified directory.
This function loads the test configuration file phptestr.json
if it is present. Otherwise the defaults are used.
@def constructor TestHost ( dir:string, config:Object )
@param Directory where too look for configuration file and/or scripts.
*/
function TestHost ( dir, config ) {

	var phptestrjson;
	if ( Fs.statSync( dir ).isDirectory( dir ) ) {
		phptestrjson =  dir + '/phptestr.json';
	}
	else {
		phptestrjson = dir;
		dir = Path.dirname( phptestrjson );
	}
	var cfg = {};
	if ( Fs.existsSync( phptestrjson ) ) {
		cfg = JSON.parse( Fs.readFileSync( phptestrjson, 'utf8' ) );
	}
	dir = cfg.dir || dir;
	var init = cfg.init ? Path.resolve( dir + '/' + cfg.init ) : null;
	var pattern = cfg.pattern || TestHost.DEFAULT_PATTERN;
	this.BaseDirectory = dir;
	this.InitScript = init;
	this.Tests = PathUtils.listPath( dir, pattern );

	config = config || {};
	this._phpbin = config.phpbin || cfg.phpbin || 'php';
	this._phpini = config.phpini || cfg.phpini || null;
	this._coverage = config.coverage || false;
	this._results = {};
}

TestHost.defineStatic( { DEFAULT_PATTERN: '*.php:.*|_*' } );

TestHost.define( {
	_parseLine: function (line) {
		if ( !line ) {
			return;
		}
		var json = null;
		try {
			json = JSON.parse( line );
		}
		catch ( e ) {
		}
		if ( json instanceof Object && json.Method ) {
			var method = json.Method;
			if ( method.startsWith( 'test' ) && json.Args !== undefined && this._current[method] instanceof Function ) {
				this._current[method]( json.Args );
				return;
			}
		}
		this._current.putError( 'UNEXPECTED_SCRIPT_OUTPUT', line, null );
	},
	
	_testScriptBegin: function ( script, url, args ) {
		this._line = '';
		this._current = new TestScriptRun( script, url, args, this.BaseDirectory );
	},
	
	_testScriptEnd: function ( callback, test ) {

		this._line = undefined;
		var result = this._current.end(null);

		if ( callback instanceof Function ) {
			callback.call( this, test, result, false );
		}

		if ( this._results[test] === undefined ) {
			this._results[test] = [];
		}
		this._results[test].push( result );
		var ret = this._current.getReRunArgs();
		this._current = null;
		return ret;
	},

	_onPhpData: function ( data ) {
		this._line += data;
		var i;
		while ( (i = this._line.indexOf( '\n' )) >= 0 && this._current.shouldContinue() ) {
			this._parseLine( this._line.substr( 0, i ).trim() );
			this._line = this._line.substr( i + 1 );
		}
	},

	_runOne: function ( test, args, testcallback, done ) {
		var testfn = Path.resolve( this.BaseDirectory + '/' + test );
		var phpargs = [
			'-d', 'short_open_tag=1',
			'-f',
			__dirname + Path.sep + 'run_test_script.php',
			'--',
			testfn,
			JSON.stringify(args),
			this.InitScript,
			this._coverage ? 'coverage' : 'nocoverage'
		];
		if ( this._phpini ) {
			phpargs = [ '-c', this._phpini ].concat( phpargs );
		}
		var url = this._phpbin;
		phpargs.forEach( function ( arg ) { arg = arg ? arg.replace( RE_QUOTE, '\\"' ) : ''; url += ' "' + arg + '"'; } );
		//console.log( clr.gray + 'Running ' + url + clr.reset + '\n' );
		
		var php = ChildProcess.spawn( this._phpbin, phpargs, { stdio: 'pipe' } );

		this._testScriptBegin( testfn, url, args );

		var that = this;
		function onData ( data ) {
			that._onPhpData( data, false );
			if ( !that._current.shouldContinue() ) {
				php.removeListener( 'data', onData );
			}
		}

		function onReady () {

			php.removeListener( 'data', onData );

			var rerun = that._testScriptEnd( testcallback, test );

			if ( rerun !== null && JSON.stringify(rerun) == JSON.stringify(args) ) {
				that._testScriptBegin( testfn, url, rerun );
					that._current.putError('INFINITE_RERUN', null, null);
				that._testScriptEnd( testcallback, test );
				rerun = null;
			}

			if ( rerun != null ) {
				that._runOne( test, rerun, testcallback, done );
			}
			else {
				if ( testcallback instanceof Function ) {
					testcallback.call( that, test, that.getResults( test ), true );
				}
				if ( done ){
					done();
				}
			}
		}

		php.on( 'close', onReady );
		php.stdout.setEncoding( 'utf8' );
		php.stdout.on( 'data', onData );
		
	},

	/**
	 * Executes the selected test scripts and collects the results.
	 * Scripts are excuted by forking the current process and passing the test script file and arguments
	 * to the fork.
	 * @def function TestHost.run( tests, args, testcallback, done )
	 * @param TestScripts
	 * @param mixed Arguments for the forked process.
	 * @param callback Function to be notified when each test is complete. `function ( file:string, result:[]|{}, last:bool )`
	 * @param callback Function to be notified when all tests are complete.
	 * @return this
	 */ 
	run: function ( args, testcallback, done ) {

		var that = this;
		function nextTest ( i ) {
			if ( i == that.Tests.length ) {
				return done;
			}
			return function () {
				that._runOne( that.Tests[i], args, testcallback, nextTest( i + 1 ) );
			};
		}

		this._runOne( this.Tests[0], args, testcallback, nextTest( 1 ) );

		return this;
	},
	
	/**
	 * Retrieves the results of the test scripts.
	 * @def function TestHost.getResults ( test:string|undefined )
	 * @return Object
	 */
	getResults: function ( test ) {
		if ( test ) {
			return this._results[test];
		}
		else {
			return this._results;
		}
	},

	/**
	 * Retrieves results of the test scripts that had some error in them or echoed some information.
	 * @def function TestHost.getSignificantResults ()
	 * @return Object
	 */
	getSignificantResults: function() {
		var ret = {};
		for ( var key in this._results ) {
			var script = this._results[key];
			var r = [];
			for ( var skey in script ) {
				var run = script[skey];
				if ( (run.Errors && run.Errors.length > 0) || (run.Echo && run.Echo.length > 0) ) {
					r.push( run );
				}
			}
			if ( r.length > 0 ) {
				if ( ret[key] === undefined ) {
					ret[key] = [];
				}
				ret[key].push( r );
			}
		}
		return ret;
	}

} );

module.exports = TestHost;