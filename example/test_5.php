<?

$args = testGetArgs();
//this echo is for debugging the test script, it won't break any test case
testEcho( $args === null ? 'Script started w/o arguments' : 'Script started with arguments' );
if ( $args === null ) {
	testReRun( 'fork myself' );
}

?>