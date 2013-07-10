<?
/**
Performs tests of the framework itself.
@package phptestr.host
@author Borislav Peev <borislav.asdf@gmail.com>
*/

namespace phptestr;

require_once __DIR__ . '/lib/init.php';


if ( PHPTESTR_IS_FORK ) {
	RunTestScript();
}

else {

	/**
	@private
	*/
	function CompareResults ( $file, &$results, $expected, &$compare ) {
		$cmp = $results;
		foreach ( $cmp[$file] as &$scriptrun ) {
			if ( !empty($scriptrun['Errors']) ) {
				foreach ( $scriptrun['Errors'] as &$error ) {
					if ( $error['Code'] == 'UNPREDICTED_ERROR' || $error['Code'] == 'ERROR_LOG' ) {
						unset( $error['Details'] );
					}
				}
			}
			unset( $scriptrun['Cases'] );
			unset( $scriptrun['Url'] );
		}
		$compare = $cmp;
		return $cmp == $expected;
	}

	header('Content-Type: text/plain');
	TestScripts::lookUp( __DIR__ . '/tests' )->run( function ( $TestScripts, $file, $results, $last ) {

		if ( !$last ) {
			return;
		}
		$name = basename( $file, '.in.php' );
		$file = realpath( $TestScripts->BaseDirectory . '/' . $file );
		
		echo 'TestTest ', $name, '... ';
		$expected = include( realpath( $TestScripts->BaseDirectory . '/' . $name . '.out.php' ) );
		$results = [ $file => $results ];
		if ( CompareResults( $file, $results, $expected, $compare ) ) {
			echo 'OK', "\n";
			flush();
		}
		else {
			echo 'FAILED', "\n\n";
			echo "==== Result:\n\n", var_export( $compare, true ), "\n\n";
			echo "==== Expected:\n\n", var_export( $expected, true ), "\n\n";
			echo "==== Debug:\n\n", var_export( $results, true ), "\n\n";
			flush();
		}
	} );

}

?>