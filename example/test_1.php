<?

// two ways to make a test case
// number 1
testCase( 'Description of the test', function () {
	// test a condition and mark the case as failed
	if ( $GLOBALS['initialized'] ) {
		testDump( 'ExampleProject initialized...' );
	}
	test( 1 === true, '1 is not identical to true' );
} );

?>