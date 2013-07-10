<?
testCase('Test me a crash',function() {
	//test there will be no error in the output since test is marked for crash
	testWillCrash();
	$a = new stdClass;
	$a->crash();
});
?>