"use strict";

require( 'Prototype' );

function TestHost () {

}

TestHost.defineStatic( { DEFAULT_PATTERN: '*.php:.*|_*' } );

module.exports = TestHost;