<?

testCaseBegin('case 1');
	test(true);
testCaseEnd();


testCase('case 2', function() {
	test(true, 'true is not true');
});


testCase('case 3', function() {
	test(!true, 'true is not false');
});

?>