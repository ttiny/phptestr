"use strict";

require( 'Prototype' );
var TestScriptRun = require( './TestScriptRun.js' );
var ChildProcess = require( 'child_process' );
var Path = require( 'path' );

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

function TestHost ( argv ) {
	this._phpBin = argv.phpbin || 'php';
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
	
	_testScriptBegin: function (script, url, args ) {
		this._line = '';
		this._current = new TestScriptRun(script, url, args);
	},
	
	_testScriptEnd: function ( callback, tests, test ) {

		this._line = undefined;
		var result = this._current.end(null);

		if ( callback instanceof Function ) {
			callback.call( tests, test, result, false );
		}

		if ( this._results[this._current.Script] === undefined ) {
			this._results[this._current.Script] = [];
		}
		this._results[this._current.Script].push( result );
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
	
	/**
	 * Executes the selected test scripts and collects the results.
	 * Scripts are excuted by forking the current process and passing the test script file and arguments
	 * to the fork.
	 * @def function TestHost.run( tests, args, callback )
	 * @param TestScripts
	 * @param mixed Arguments for the forked process.
	 * @param callback `function ( file:string, result:[], last:bool )`
	 * @param callback
	 * @return this
	 */ 
	run: function ( tests, args, callback, done ) {

		var that = this;

		function runOne ( test, args, done ) {
			var testfn = Path.resolve( tests.BaseDirectory + '/' + test );
			var phpargs = [ __dirname + '/run_test_script.php', testfn, JSON.stringify(args), tests.InitScript ];
			var url = that._phpBin;
			phpargs.forEach( function ( arg ) { arg = arg ? arg.replace( RE_QUOTE, '\\"' ) : ''; url += ' "' + arg + '"'; } );
			//console.log( 'Running ' + url, '\n' );
			
			var php = ChildProcess.spawn( that._phpBin, phpargs, { stdio: 'pipe' } );

			that._testScriptBegin( testfn, url, args );

			function onData ( data ) {
				that._onPhpData( data, false );
				if ( !that._current.shouldContinue() ) {
					php.removeListener( 'data', onData );
				}
			}

			function onReady () {

				php.removeListener( 'data', onData );

				var rerun = that._testScriptEnd( callback, tests, test );

				if ( rerun !== null && JSON.stringify(rerun) == JSON.stringify(args) ) {
					that._testScriptBegin(testfn, url, rerun);
						that._current.putError('INFINITE_RERUN', null, null);
					that._testScriptEnd( callback, tests, test );
					rerun = null;
				}

				if ( rerun != null ) {
					runOne( test, rerun, done );
				}
				else {
					if ( callback instanceof Function ) {
						callback.call( tests, test, that._results[testfn], true );
					}
					if ( done ){
						done();
					}
				}
			}

			php.on( 'close', onReady );
			php.stdout.setEncoding( 'utf8' );
			php.stdout.on( 'data', onData );
			
		}

		function getTest ( i ) {
			if ( i == tests.Files.length ) {
				return done;
			}
			return function () {
				runOne( tests.Files[i], args, getTest( i + 1 ) );
			};
		}

		runOne( tests.Files[0], args, getTest( 1 ) );

		return this;
	},
	
	/**
	 * Retrieves the results of the test scripts.
	 * @def function TestHost.getResults ()
	 * @return array
	 */
	getResults: function () {
		return this._results;
	},

	/**
	 * Retrieves results of the test scripts that had some error in them or echoed some information.
	 * @def function TestHost.getSignificantResults ()
	 * @return []
	 */
	getSignificantResults: function() {
		var ret = [];
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