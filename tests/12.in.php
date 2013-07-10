<?

testSetCaseCount(3);

testCase(function() {
});

testCase(function() {
	testExpect(1, 2, 3);
	testOut(1);
	testOut(2);
	testOut(3);
	testCheckExpect();
});

testCase(function() {
	testWillCrash();
	exit;
});
	
?>