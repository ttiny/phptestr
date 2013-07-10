<?
//this echo is for debugging the test script, it won't break any test case
$args = testGetArgs();
testEcho($args === null ? 'Script started w/o arguments' : 'Script started with arguments');
if ( $args === null ) {
	testReRun('fork myself');
}

?>