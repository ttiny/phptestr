<?
/**
Performs specified tests.
This file needs to be loaded with arguments describing
the tests to be peformed.
- `target` - target directory where to look for *phptestr.json* or for sources.
- `filter` - additional file name filter pattern for the test files.
- `args` - arguments to pass to the script.
@package phptestr.host
@author Borislav Peev <borislav.asdf@gmail.com>
*/

namespace phptestr;

use Exception;


require_once __DIR__ . '/lib/init.php';




if ( PHPTESTR_IS_FORK ) {
	RunTestScript();
}

else {
	if ( empty( $_REQUEST[ TESTHOST_ARG_CFG ] ) ) {
		if ( file_exists( './phptestr.json' ) ) {
			$_REQUEST[ TESTHOST_ARG_CFG ] = '.';
		}
		else {
			throw new Exception( 'Argument "' . TESTHOST_ARG_CFG . '" is missing' );
		}
	}

	$tests = TestScripts::lookUp( $_REQUEST[ TESTHOST_ARG_CFG ] );

	if ( empty( $tests->Files ) ) {
		throw new Exception('Nothing to test');
	}

	$filter = isset( $_REQUEST['filter'] ) ? $_REQUEST['filter'] : null;
	if ( $filter !== null ) {
		$filtered = [];
		foreach ( $tests->Files as $value ) {
			if ( \PathUtils::match( $value, $filter ) ) {
				$filtered[] = $value;
			}
		}
		$tests->Files = $filtered;
	}

	if ( empty( $tests->Files ) ) {
		throw new Exception('Nothing to test');
	}

	if ( isset( $_REQUEST['format'] ) && $_REQUEST['format'] == 'json' ) {
		header('Content-Type: application/json');
		$results = $tests->run()->getResults();
		echo json_encode( $results );
	}
	else {
		include __DIR__ . '/view/view.php';
	}
}

?>