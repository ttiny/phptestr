<?
/**
@package phptestr.host
*/


namespace phptestr;


// arguments for when running in script/fork mode
define( 'TESTSCRIPT_ARG_FILE', '__file' );
define( 'TESTSCRIPT_ARG_ARGS', '__args' );
define( 'TESTSCRIPT_ARG_INIT', '__init' );

// arguments for when running in host mode
define( 'TESTHOST_ARG_ARGS', 'args' );
define( 'TESTHOST_ARG_CFG', 'target' );
define( 'TESTHOST_DEF_PATTERN', '*.php:_*' );

// check if we are running as fork
define( 'PHPTESTR_IS_FORK', !empty( $_REQUEST[ TESTSCRIPT_ARG_FILE ] ) );

// chek if we are running in CLI
define( 'PHPTESTR_IS_CLI', empty( $_SERVER[ 'SERVER_ADDR' ] ) );


// include all stuff
require_once __DIR__ . '/travelsdk-core-php/src/init.php';
if ( !PHPTESTR_IS_FORK ) {
	require_once __DIR__ . '/TestHost.php';
}


// if running in cli mode make sure we got the arguments right, otherwise we'll end in endless loop
if ( PHPTESTR_IS_CLI && !defined( 'JSDOCGEN_PHP_PARSER' ) ) {
	\Process::normalizeArgv();
}


/**
Executes a test script and prints the results for the test host.
This function uses the arguments passed by the test host to know
which script to execute.
@author Borislav Peev <borislav.asdf@gmail.com>
*/
function RunTestScript () {
	$logfn = tempnam( sys_get_temp_dir(), 'log' );
	ini_set( 'error_log', $logfn );
	ini_set( 'log_errors_max_len', 0 );
	ini_set( 'display_errors', 'Off' );
	error_reporting( E_ALL ^ E_NOTICE );
	
	require_once __DIR__ . '/test_environment.php';
	testLogFn( $logfn );

	if ( !empty( $_REQUEST[ TESTSCRIPT_ARG_INIT ] ) ) {
		require_once $_REQUEST[ TESTSCRIPT_ARG_INIT ];
	}

	$script = isset( $_REQUEST[ TESTSCRIPT_ARG_FILE ] ) ? $_REQUEST[ TESTSCRIPT_ARG_FILE ] : null;
	$arguments = isset( $_REQUEST[ TESTSCRIPT_ARG_ARGS ] ) ? $_REQUEST[ TESTSCRIPT_ARG_ARGS ] : null;
	unset( $_REQUEST[ TESTSCRIPT_ARG_ARGS ] );
	unset( $_REQUEST[ TESTSCRIPT_ARG_FILE ] );
	
	TestScript::run( $script, $arguments );
	
	return null;
}
	
?>