<?
/**
Executes a test script and prints the results for the test host.
This function uses the arguments passed by the test host to know
which script to execute.
@author Borislav Peev <borislav.asdf@gmail.com>
@package phptestr.host
*/

namespace phptestr;

define( 'TESTSCRIPT_ARG_FILE', 1 );
define( 'TESTSCRIPT_ARG_ARGS', 2 );
define( 'TESTSCRIPT_ARG_INIT', 3 );

$logfn = tempnam( sys_get_temp_dir(), 'log' );
ini_set( 'error_log', $logfn );
ini_set( 'log_errors_max_len', 0 );
ini_set( 'display_errors', 'Off' );
error_reporting( E_ALL ^ E_NOTICE );

require_once __DIR__ . '/TestScript.php';
require_once __DIR__ . '/test_environment.php';
testLogFn( $logfn );

$_REQUEST = $_SERVER['argv'];
if ( !empty( $_REQUEST[ TESTSCRIPT_ARG_INIT ] ) ) {
	require_once $_REQUEST[ TESTSCRIPT_ARG_INIT ];
}

$script = isset( $_REQUEST[ TESTSCRIPT_ARG_FILE ] ) ? $_REQUEST[ TESTSCRIPT_ARG_FILE ] : null;
$arguments = isset( $_REQUEST[ TESTSCRIPT_ARG_ARGS ] ) ? @json_decode( $_REQUEST[ TESTSCRIPT_ARG_ARGS ] ) : null;

TestScript::run( $script, $arguments );
	
?>