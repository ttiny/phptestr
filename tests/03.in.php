<?

$arg = testGetArgs();

if ( $arg === null ) {
	testReRun(1);
}
else if ( $arg == 1 ) {
	testEcho($arg);
	testReRun(2);
}
else if ( $arg == 2 ) {
	testReRun($arg);
}

?>