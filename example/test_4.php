<?
testCase('Test me a crash',function() {
	//this test case will succeed only if the script crashes
	testWillCrash();
	$a = new stdClass;
	$a->crash();
});
?>