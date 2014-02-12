<?
/**
Executes a test script and prints the results for the test host.
This function uses the arguments passed by the test host to know
which script to execute.
@author Borislav Peev <borislav.asdf@gmail.com>
@package phptestr.host
*/

namespace phptestr;

//define( 'TESTSCRIPT_ARG_FILE', 1 );
//define( 'TESTSCRIPT_ARG_ARGS', 2 );
//define( 'TESTSCRIPT_ARG_INIT', 3 );
//define( 'TESTSCRIPT_ARG_COVERAGE', 4 );

$logfn = tempnam( sys_get_temp_dir(), 'log' );
ini_set( 'error_log', $logfn );
ini_set( 'log_errors', 'On' );
ini_set( 'log_errors_max_len', 0 );
ini_set( 'display_errors', 'Off' );
ini_set( 'xdebug.coverage_enable', $_SERVER['argv'][ 4 ] == 'coverage' ? 'On' : 'Off' );
error_reporting( E_ALL ^ E_NOTICE );

// make sure this bullshit is not causing errors because it is likely that in cli mode (at least on windows) the ini setting is not present
$tz = ini_get( 'date.timezone' );
if ( empty( $tz ) ) {
	ini_set( 'date.timezone', 'UTC' );
}
unset( $tz );

require_once __DIR__ . '/TestScript.php';
require_once __DIR__ . '/test_environment.php';
testLogFn( $logfn );
unset( $logfn );

if ( !empty( $_SERVER['argv'][ 3 ] ) ) {
	require_once $_SERVER['argv'][ 3 ];
}

TestScript::run( 
	isset( $_SERVER['argv'][ 1 ] ) ? $_SERVER['argv'][ 1 ] : null,
	isset( $_SERVER['argv'][ 2 ] ) ? @json_decode( $_SERVER['argv'][ 2 ] ) : null,
	isset( $_SERVER['argv'][ 4 ] ) && $_SERVER['argv'][ 4 ] == 'coverage' ? true : false
);

?>