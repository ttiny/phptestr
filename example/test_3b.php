<?
testCase(function() {
	//set some expectations
	testExpect(1, 2, 3);
	if ( 1 ) {
		//output something expected
		testOut(1);
	}
	if ( 0 ) {
		//output something expected
		testOut(2);
	}
	if ( 3 ) {
		//output something expected
		testOut(3);
	}
	//the test case will fail because the output is 1, 3 and 1, 2, 3 is expected
	testCheckExpect();
});
?>