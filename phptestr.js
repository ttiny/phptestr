"use strict";

var ArgvUtils = require( 'ArgvUtils' );
var argv = ArgvUtils.parseArgs() || {};

var Host = require( argv.cli ? './lib/CliHost.js' : './lib/HttpHost.js' );
var host = new Host( argv );
//host.run();