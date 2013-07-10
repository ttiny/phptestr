<?
/**
@package phptestr.host
*/

namespace phptestr;

/**
Contains a list of the test scripts found in a specific directory and their configuration.
@author Borislav Peev <borislav.asdf@gmail.com>
*/
class TestScripts {

	/**
	Test scripts that were found matching the configuration.
	The file names are relative to the {@see $BaseDirectory}.
	@var string[]|null
	*/
	public $Files = null;

	/**
	@var string Base directory for the scripts.
	*/
	public $BaseDirectory = null;

	/**
	@var string Init script for the tests.
	*/
	public $InitScript = null;

	/**
	Instances of this class are created with {@see lookUp()}.
	*/
	protected function __construct ( $dir, $init, $tests ) {
		$this->BaseDirectory = $dir;
		$this->InitScript = $init;
		$this->Files = $tests;
	}

	/**
	Finds test scripts in specified directory.
	This function loads the test configuration file phptestr.json
	if it is present. Otherwise the defaults are used.
	@param string Directory where too look for configuration file and/or scripts.
	@return TestScripts
	*/
	static function lookUp ( $dir ) {
		$phptestrjson = $dir . '/phptestr.json';
		$cfg = new \stdClass;
		if ( file_exists( $phptestrjson ) ) {
			$cfg = json_decode( file_get_contents( $dir . '/phptestr.json' ) );
		}
		$dir = empty( $cfg->dir ) ? $dir : $cfg->dir;
		$pattern = empty( $cfg->pattern ) ? TESTHOST_DEF_PATTERN : $cfg->pattern;
		$init = empty( $cfg->init ) ? null : realpath( $dir . '/' . $cfg->init );
		return new TestScripts(
			$dir,
			$init,
			\PathUtils::listPath( $dir, $pattern, \PathUtils::LIST_DEFAULT )
		);
	}

	/**
	Performs the test scripts in a sandbox.
	Test scripts are sandboxed by forking the main script
	with different arguments, so the tests couldn't crash test
	host.
	@return TestHost
	*/
	function run ( $callback = null ) {

		$arguments = isset( $_REQUEST[ TESTHOST_ARG_ARGS ] ) ? $_REQUEST[ TESTHOST_ARG_ARGS ] : null;
		unset( $_REQUEST[ TESTHOST_ARG_ARGS ] );

		$sandbox = new TestHost( TESTSCRIPT_ARG_FILE, TESTSCRIPT_ARG_ARGS, TESTSCRIPT_ARG_INIT );
		return $sandbox->run( $this, $arguments, $callback );
	}
}

?>