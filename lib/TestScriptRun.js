"use strict";

var Fs = require( 'fs' );

/**
 * @package phptestr.host
 */
 
function TestScriptRun ( script, url, args ) {
	this.Script = script;
	this.Url = url;
	this.Args = args;
	this.Cases = [];
	this.ExpectedTestCount = 0;
	this.ExpectedOutput = null;
	this.Output = [];
	this.WillCrash = false;
	this.Errors = [];
	this.ReRun = null;
	this.Echo = [];
	this.CaseCount = 0;
	this.LogFile = null;
	this._case = null;
}

var RE_LOG = /^\[([\s\S]+?)\] ([\s\S]+?):  ([\s\S]+) in ([\s\S]+) on line (\d+)/g;


/**
 * @private
 */
TestScriptRun.define( {
	
	shouldContinue: function () {
		return this.Errors.length == 0 && (this._case === null || this._case['Failed'] === null);
	},
	
	putError: function (code, value, details) {
		var err = {
			'Code' : code
		};
		
		if ( value !== null ) {
			err['Value'] = value;
		}
		
		if ( details !== null ) {
			err['Details'] = details;
		}
		
		this.Errors.push( err );
	},
	
	testLogFn: function  ( args ) {
		this.LogFile = args['File'];
	},
	
	testReRun: function (args) {
		this.ReRun = args['Args'];
	},
	
	getReRunArgs: function () {
		return this.ReRun;
	},
	
	testEcho: function  ( args ) {
		this.Echo = this.Echo.concat( args['Echo'] );
	},
	
	testUnpredictedError: function (args) {
		if ( !this.WillCrash ) {
			this.putError('UNPREDICTED_ERROR', null, args);
		}
	},
	
	testSetCaseCount: function (args) {
		this.ExpectedTestCount = args['Count'];
	},
	
	testCaseBegin: function (args) {
	
		if ( this._case !== null ) {
			this._current.putError('MISSING_TESTCASEEND', 'A new test case was started without ending the previous one', args);
		}
		
		this.Output = [];
		
		this._case = {
			'Name' : args['Name'],
			'Failed' : null
		};
	},

	_finishCase: function () {
		if ( !this._case['Failed'] ) {
			delete this._case['Failed'];
		}

		this.Cases.push( this._case );
		++this.CaseCount;
		this._case = null;
	},
	
	testCaseEnd: function ( args ) {
		if ( this.WillCrash ) {
			this.putError('FAILED_DID_NOT_CRASH', 'Test script was expected to crash, but didn\'t', this._getCaseFailDetails(args));
			this.WillCrash = false;
		}
		
		if ( this.ExpectedOutput !== null ) {
			this.putError('FAILED_EXPECTATIONS_NOT_MET', 'Test case was expected to produce some predefined output, but it didn\'t', this._getCaseFailDetails(args));
			this.ExpectedOutput = null;
		}

		if ( args && args.Coverage && this._case ) {
			this._case.Coverage = args.Coverage;
		}

		this._finishCase();
	},
	
	_getCaseFailDetails: function (args) {
		var d = {};
		//if ( !empty(this._case['Name']) ) {
			d['Case'] = this.Cases.length + 1;
		//}
		
		if ( this.Script != args['Debug']['Trace']['File'] ) {
			d['File'] = args['Debug']['Trace']['File'];
		}
		d['Line'] = args['Debug']['Trace']['Line'];
		
		return d;
	},

	testFailed: function (args) {
	
		this.putError('TESTCASE_FAILED', args['Text'], this._getCaseFailDetails(args));
		this._finishCase();
		
		/*
		f = [];
		if ( !empty(args['Text']) ) {
			f['Reason'] = args['Text'];
		}
		
		if ( this.Script != args['Debug']['File']['Line'] ) {
			f['File'] = args['Debug']['File']['Line'];
		}
		f['Line'] = args['Debug']['Trace']['Line'];
		
		this._case['Failed'] = f;
		*/
	},
	
	testExpect: function (args) {
		this.ExpectedOutput = args['Expected'];
	},
	
	_makeUnexpectedMsg: function  ( expected, output, i, a, b ) {
		return 'At index ' + i + '; Expected: ' + a + ', Found: ' + b + "\n\n"
		       + 'Expected: ' + JSON.stringify( expected ) + "\n"
		       + 'Output: ' + JSON.stringify( output );
	},
	
	testCheckExpect: function (args) {
		var finish = false;
		if ( this.ExpectedOutput instanceof Array && this.ExpectedOutput.length > 0 ) {
			for ( var k = 0, iend = this.ExpectedOutput.length; k < iend; ++k ) {
				var v = this.ExpectedOutput[k];
				if ( this.Output[k] !== v ) {
					this.putError('UNEXPECTED_OUTPUT', this._makeUnexpectedMsg(this.ExpectedOutput, this.Output, k, v, this.Output[k]), this._getCaseFailDetails(args));
					finish = true;
					break;
				}
			}
			this.ExpectedOutput = null;
		}
		else {
			this.putError('CHECK_EXPECTATIONS_WITHOUT_SUCH', null, this._getCaseFailDetails(args));
			finish = true;
		}
		this.Output = [];
		if ( finish ) {
			this._finishCase();
		}
	},
	
	testOut: function (args) {
		this.Output = this.Output.concat( args['Out'] );
	},
	
	testWillCrash: function ( args ) {
		this.WillCrash = true;
		if ( args && args.Coverage && this._case ) {
			this._case.Coverage = args.Coverage;
		}
	},
	
	end: function () {
	
		if ( this.WillCrash ) {
			this._finishCase();
		}

		if ( this.ExpectedOutput !== null ) {
			this.putError('FAILED_EXPECTATIONS_NOT_MET', 'Test case was expected to produce some predefined output, but it didn\'t', null);
		}

		if ( this.ExpectedTestCount > 0 && this.ExpectedTestCount != this.CaseCount ) {
			this.putError('FAILED_TESTCASE_COUNT', 'Test case count expected ' + this.ExpectedTestCount + ', performed ' + this.CaseCount, null);
		}

		/*if ( empty( this.Errors ) && ( ( !this.WillCrash /*&& this._case !== null*//* ) || empty( this.Cases ) ) ) {
			this.putError('UNEXPECTED_TERMINATION', 'Test script was terminated without ending the last case block. Check error.log for more info.', null);
		}*/

		if ( this.LogFile !== null && Fs.existsSync( this.LogFile ) ) {
			if ( this.Errors.length == 0 && ( ( !this.WillCrash /*&& this._case !== null*/ ) || this.Cases.length == 0 ) ) {
				var log = Fs.readFileSync( this.LogFile, 'utf8' );
				var m;
				while ( m = RE_LOG.exec( log ) ) {
					this.putError( 'ERROR_LOG', m[3], { 'Error' : {'File' : m[4], 'Line' : m[5], 'Type' : m[2], 'Trace' : null} } );
				}
			}
			Fs.unlink( this.LogFile );
			this.LogFile = null;
		}
	
		var ret = {
			'Url' : this.Url,
			'Script': this.Script,
			'Args' : this.Args
		};
		
		if ( this.Cases.length > 0 ) {
			ret['Cases'] = this.Cases;
		}
		
		if ( this.Errors.length > 0 ) {
			ret['Errors'] = this.Errors;
		}
		//else {
		//	unset(ret['Url']);
		//}
		
		if ( this.Echo.length > 0 ) {
			ret['Echo'] = this.Echo;
		}
		
		return ret;
	},
} );

module.exports = TestScriptRun;