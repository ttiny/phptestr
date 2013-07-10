<?
/**
Exposes a set of global functions to the test scripts.
Test scripts perform one or more test cases and
select conditions that needs to be met for the
test to be successful. If these conditions are not met
or the script crashes or have unexpected output,
the TestHost will capture the errors.
```
//two ways to make a test case
//number 1
testCase('Description of the test', function () {
	//test a condition and mark the case as failed
	test(1 === true, '1 is not identical to true');
});

//number 2
testCaseBegin();
	test(null !== 0, 'null is not identical to 0');
testCaseEnd();
```

It is possible to test program flow:
```
testCase(function() {
	if ( 1 ) {
		//fail the test explicitly
		testFailed('Unexpected program flow');
	}
});

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
```

It is also possible to test scripts that will crash:
```
testCase(function() {
	//this test case will succeed only if the script crashes
	testWillCrash();
	$a->crash();
});
```

Test scripts can run themselves again with arguments:
```
//this echo is for debugging the test script, it won't break any test case
$args = testGetArgs();
testEcho($args === null ? 'Script started w/o arguments' : 'Script started with arguments');
if ( $args === null ) {
	testReRun('fork myself');
}
```
@see \phptestr\TestHost
@package phptestr.test_environment
*/


include_once __DIR__ . '/TestScript.php';

/**
 * Reports the PHP error log file used by the test script to the test host.
 * No need to call this function manually.
 * @author Borislav Peev <borislav.asdf@gmail.com>
 * @private
 */ 
function testLogFn ( $fn ) {
	\phptestr\TestScript::tellHost( __FUNCTION__, [ 'File' => $fn ] );
}
 
/**
 * Marks the begining of a test case.
 * @param string|null Optional name for the the test case.
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
function testCaseBegin($name = null) {
	\phptestr\TestScript::tellHost(__FUNCTION__, array('Name' => $name));
}

/**
 * Marks the end of a test case.
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
function testCaseEnd() {
	\phptestr\TestScript::tellHost(__FUNCTION__);
}

/**
 * Performs a test case.
 * This is a shortcut for wrapping a function call with {@see testCaseBegin()} and {@see testCaseEnd()}.
 * @param string|callback Name for the test case or a callback.
 * @param callback|null If the first argument is a name, the callback is passed as sencond argument.
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */ 
function testCase($name, $fn = null) {
	if(is_callable($name) && $fn === null) {
		$fn = $name;
		$name = null;
	}
	\phptestr\TestScript::$BackTraceOffet = 1;
	testCaseBegin($name);
	\phptestr\TestScript::$BackTraceOffet = 0;
	$fn();
	\phptestr\TestScript::$BackTraceOffet = 1;
	testCaseEnd();
	\phptestr\TestScript::$BackTraceOffet = 0;
}

/**
 * Explicitly marks the current test case as failed and aborts the script.
 * @param string|null Optional description why the test failed.
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
function testFailed($text = null) {
	\phptestr\TestScript::tellHost(__FUNCTION__, array('Text' => $text));
}

/**
 * Fails the current test case if the condition is not true.
 * This is a shortcut for {@see testFailed()}.
 * @param bool Condition to test.
 * @param string Optional description of the test.
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
function test ( $cond, $text = 'test' ) {
	if ( !$cond ) {
		\phptestr\TestScript::$BackTraceOffet = 1;
		testFailed( $text );
		\phptestr\TestScript::$BackTraceOffet = 0;
	}
}

/**
 * Predifines some output that is expected to result from the test case in the same order.
 * Takes variable number of mixed parameters. They will be compared with === .
 * @see testOut()
 * @see testCheckExpect()
 * @vaarg
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
function testExpect() {
	$args = func_get_args();
	\phptestr\TestScript::tellHost(__FUNCTION__, array('Expected' => $args));
}

/**
 * Tests if the expetation previously set by {@see textExpect()} are met at this point.
 * If the output was different the test case will fail.
 * @see testExpect()
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
function testCheckExpect() {
	\phptestr\TestScript::tellHost(__FUNCTION__);
}

/**
 * Outputs something for {@see testCheckExpect()}.
 * @param mixed The value must be convertible to JSON.
 * @see testExpect()
 * @see testCheckExpect()
 * @vaarg May output variable number of somethings with one call.
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
function testOut () {
	\phptestr\TestScript::tellHost( __FUNCTION__, array( 'Out' => func_get_args() ) );
}

/**
 * Sets the numer of tests cases in the test script.
 * This can be used as additional check if everything went smooth.
 * @param int The number of tests that are expected to be performed by the test script.
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
function testSetCaseCount($n) {
	\phptestr\TestScript::tellHost(__FUNCTION__, array('Count' => (int)$n));
}

/**
 * For debugging the code of the tests cases themselves.
 * Prints all arguments. Arguments must be convertible to text.
 * @vaarg
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
function testEcho() {
	$args = func_get_args();
	\phptestr\TestScript::tellHost(__FUNCTION__, array('Echo' => $args));
}

/**
Short alias for {@see testEcho()}.
@vaarg
@author Borislav Peev <borislav.asdf@gmail.com>
*/
function te() {
	$args = func_get_args();
	\phptestr\TestScript::tellHost(__FUNCTION__, array('Echo' => $args));
}

/**
 * Same as {@see testEcho()}, but each argument will be displayed using {@see var_dump()}.
 * @vaarg
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
function testDump() {
	$args = func_get_args();
	foreach ( $args as $i => $arg ) {
		ob_start();
		var_dump( $arg );
		$args[$i] = ob_get_clean();
	}
	\phptestr\TestScript::tellHost('testEcho', array('Echo' => $args));
}

/**
Short alias for {@see testDump()}.
@vaarg
@author Borislav Peev <borislav.asdf@gmail.com>
*/
function td() {
	$args = func_get_args();
	foreach ( $args as $i => $arg ) {
		ob_start();
		var_dump( $arg );
		$args[$i] = ob_get_clean();
	}
	\phptestr\TestScript::tellHost('testEcho', array('Echo' => $args));
}

/**
 * Retrieves the input paramaters for the test script.
 * @return array|null The parameters sent to the test script by itself.
 * @see testReRun()
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
function testGetArgs() {
	return \phptestr\TestScript::$TestScriptArguments;
}


/**
 * Re-runs the same test script with the specified arguments.
 * The script is executed after the current one finishes.
 * @param array Arguments to be passed to the new instance of the test script.
 * @see testGetArgs()
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
function testReRun($args) {
	\phptestr\TestScript::tellHost(__FUNCTION__, array('Args' => $args));
}

/**
 * The script is expected to crash after this point (and thus not reach testCaseEnd()).
 * If the script doesn't crash the test case will fail, if it crashes as expected it will succeed.
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
function testWillCrash() {
	\phptestr\TestScript::tellHost(__FUNCTION__);
}


/**
 * By default the test script will have an error handler to automatically report errors to the host.
 * This handler can be disabled or re-enabled with this function.
 * @param bool Enable or disable the error handler.
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
function testEnableErrorHandler($enabled) {
	if ( $enabled ) {
		\phptestr\TestScript::$ErrorHandler->enable();
	}
	else {
		\phptestr\TestScript::$ErrorHandler->disable();
	}
}