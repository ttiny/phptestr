<?
/**
 * @package phptestr.host
 */
 
namespace phptestr {

	include_once __DIR__ . '/TestScriptRun.php';
	require_once __DIR__ . '/TestScripts.php';
	
	/**
	 * A host for running tests scripts.
	 * The scripts are executed in separated environment
	 * so they wont crash the host. Each script
	 * uses a set of functions which writes to stdout,
	 * the test host captures this output and determines
	 * if the script was successful.
	 * ```
	 * $sandbox = new TestHost();
	 * $sandbox->run( array('test.php', 'test2.php') );
	 * $sandbox->getResults();
	 * ```
	 * For information about how to write tests see {@see lib/test_environment.php}.
	 * @author Borislav Peev <borislav.asdf@gmail.com>
	 */
	class TestHost {
	
		private $_results = null;	
		private $_current = null;
		private $_argNameFile = null;
		private $_argNameArgs = null;
		private $_argNameInit = null;

		/**
		 * @param string Name of the argument that will contain the script file for the forked process.
		 * @param string Name of the argument that will contain the script parameters for the forked process.
		 * @param string Name of the argument that will contain the init script file for the forked process.
		 */
		function __construct ( $_argNameFile = null, $_argNameArgs = null, $_argNameInit = null ) {
			$this->_argNameFile = $_argNameFile ? $_argNameFile : TESTSCRIPT_ARG_FILE;
			$this->_argNameArgs = $_argNameArgs ? $_argNameArgs : TESTSCRIPT_ARG_ARGS;
			$this->_argNameInit = $_argNameInit ? $_argNameInit : TESTSCRIPT_ARG_INIT;
		}
		
		private function parseLine($line) {
			$json = @json_decode($line, true);
			if ( is_array($json) ) {
				if ( !empty($json['Method']) ) {
					$method = $json['Method'];
					if ( substr($method, 0, 4) == 'test' && isset($json['Args']) ) {
						if ( method_exists($this->_current, $method) ) {
							$this->_current->$method($json['Args']);
							return;
						}
					}
				}

			}
			$this->_current->putError('UNEXPECTED_SCRIPT_OUTPUT', $line, null);
		}
		
		private function testScriptBegin($script, $url, $args ) {
			$this->_current = new TestScriptRun($script, $url, $args);
		}
		
		private function testScriptEnd( $callback, $tests, $test ) {

			$result = $this->_current->end(null);

			if ( is_callable( $callback ) ) {
				call_user_func( $callback, $tests, $test, $result, false );
			}

			$this->_results[$this->_current->Script][] = $result;
			$ret = $this->_current->getReRunArgs();
			$this->_current = null;
			return $ret;
		}
		
		/**
		 * Executes the selected test scripts and collects the results.
		 * Scripts are excuted by forking the current process and passing the test script file and arguments
		 * to the fork.
		 * @param TestScripts
		 * @param mixed[] Arguments for the forked process.
		 * @param callback `function ( TestScripts, string $file, mixed[] $result, bool $last )`
		 * @return $this
		 */ 
		function run ( $tests, $args = null, $callback = null ) {
			$process = \CurrentProcess::getInstance();
			
			foreach ( $tests->Files as $test ) {
				$testfn = realpath( $tests->BaseDirectory . '/' . $test );
				$lastScriptArgs = null;
				do {
					$fork = $process->fork(
						array(
							$this->_argNameFile => $testfn,
							$this->_argNameArgs => $args,
							$this->_argNameInit => $tests->InitScript
						),
						false
					);
					$out = $fork->getOutStream();
					//skip the headers, we don't care
					if ( $out instanceof \HttpReader ) {
						$out->readHeadersSync();
					}

					$this->testScriptBegin($testfn, $fork->getUri(), $args);
					while ( $this->_current->shouldContinue() ) {
						$line = $out->readLineBlock();
						if ( $line === false || $line == "\r\n" ) break;
						$this->parseLine($line);
					}
					$rerun = $this->testScriptEnd( $callback, $tests, $test );
					
					$lastScriptArgs = $args;
					$args = $rerun;
					if($args !== null && $args == $lastScriptArgs) {
						$this->testScriptBegin($testfn, $fork->getUri(), $args);
							$this->_current->putError('INFINITE_RERUN', null, null);
						$this->testScriptEnd( $callback, $tests, $test );
						$args = null;
					}

				} while($args !== null);

				if ( is_callable( $callback ) ) {
					call_user_func( $callback, $tests, $test, $this->_results[$testfn], true );
				}
			}

			return $this;
		}
		
		/**
		 * Retrieves the results of the test scripts.
		 * @return array
		 */
		function getResults() {
			return $this->_results;
		}

		/**
		 * Retrieves results of the test scripts that had some error in them or echoed some information.
		 * @return array
		 */
		function getSignificantResults() {
			$ret = [];
			foreach ($this->_results as $k => $script) {
				$r = [];
				foreach ( $script as $run ) {
					if ( !empty($run['Errors']) || !empty($run['Echo']) ) {
						$r[] = $run;
					}
				}
				if ( !empty($r) ) {
					$ret[$k][] = $r;
				}
			}
			return $ret;
		}
	
	}

}