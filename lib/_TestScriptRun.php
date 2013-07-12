<?
/**
 * @package phptestr.host
 */
 
 
namespace phptestr {

	/**
	 * @private
	 */
	class TestScriptRun {
	
		public $Script = null;
		public $Args = null;
		public $Url = null;
		public $Cases = [];
		public $ExpectedTestCount = 0;
		public $ExpectedOutput = null;
		public $Output = [];
		public $WillCrash = false;
		public $Errors = [];
		public $ReRun = null;
		public $Echo = [];
		public $CaseCount = 0;
		public $LogFile = null;
		private $_case = null;
		
		function __construct($script, $url, $args) {
			$this->Script = realpath($script);
			$this->Url = $url;
			$this->Args = $args;
		}
		
		function shouldContinue() {
			return empty($this->Errors) && ($this->_case === null || $this->_case['Failed'] === null);
		}
		
		function putError($code, $value, $details) {
			$err = [
				'Code' => $code
			];
			
			if ( $value !== null ) {
				$err['Value'] = $value;
			}
			
			if ( $details !== null ) {
				$err['Details'] = $details;
			}
			
			$this->Errors[] = $err;
		}
		
		function testLogFn ( $args ) {
			$this->LogFile = $args['File'];
		}
		
		function testReRun($args) {
			$this->ReRun = $args['Args'];
		}
		
		function getReRunArgs() {
			return $this->ReRun;
		}
		
		function testEcho ( $args ) {
			$this->Echo = array_merge( $this->Echo, $args['Echo'] );
		}
		
		function testUnpredictedError($args) {
			if ( !$this->WillCrash ) {
				$this->putError('UNPREDICTED_ERROR', null, $args);
			}
		}
		
		function testSetCaseCount($args) {
			$this->ExpectedTestCount = $args['Count'];
		}
		
		function testCaseBegin($args) {
		
			if ( $this->_case !== null ) {
				$this->_current->putError('MISSING_TESTCASEEND', 'A new test case was started without ending the previous one', $args);
			}
			
			$this->Output = [];
			
			$this->_case = array(
				'Name' => $args['Name'],
				'Failed' => null
			);
		}

		private function finishCase() {
			if ( empty($this->_case['Failed']) ) {
				unset($this->_case['Failed']);
			}

			$this->Cases[] = $this->_case;
			++$this->CaseCount;
			$this->_case = null;
		}
		
		function testCaseEnd($args) {
			if ( $this->WillCrash ) {
				$this->putError('FAILED_DID_NOT_CRASH', 'Test script was expected to crash, but didn\'t', $this->getCaseFailDetails($args));
			}
			
			if ( $this->ExpectedOutput !== null ) {
				$this->putError('FAILED_EXPECTATIONS_NOT_MET', 'Test case was expected to produce some predefined output, but it didn\'t', $this->getCaseFailDetails($args));
				$this->ExpectedOutput = null;
			}

			$this->finishCase();
		}
		
		private function getCaseFailDetails($args) {
			$d = [];
			//if ( !empty($this->_case['Name']) ) {
				$d['Case'] = count( $this->Cases ) + 1;
			//}
			
			if ( $this->Script != $args['Debug']['Trace']['File'] ) {
				$d['File'] = $args['Debug']['Trace']['File'];
			}
			$d['Line'] = $args['Debug']['Trace']['Line'];
			
			return $d;
		}

		function testFailed($args) {
		
			$this->putError('TESTCASE_FAILED', $args['Text'], $this->getCaseFailDetails($args));
			$this->finishCase();
			
			/*
			$f = [];
			if ( !empty($args['Text']) ) {
				$f['Reason'] = $args['Text'];
			}
			
			if ( $this->Script != $args['Debug']['File']['Line'] ) {
				$f['File'] = $args['Debug']['File']['Line'];
			}
			$f['Line'] = $args['Debug']['Trace']['Line'];
			
			$this->_case['Failed'] = $f;
			*/
		}
		
		function testExpect($args) {
			$this->ExpectedOutput = $args['Expected'];
		}
		
		static function makeUnexpectedMsg ( $expected, $output, $i, $a, $b ) {
			return 'At index ' . ((string)$i) . '; Expected: ' . $a . ', Found: ' . $b . "\n\n"
			       . 'Expected: ' . json_encode( $expected ) . "\n"
			       . 'Output: ' . json_encode( $output );
		}
		
		function testCheckExpect($args) {
			$finish = false;
			if ( is_array($this->ExpectedOutput) && !empty($this->ExpectedOutput) ) {
				foreach ( $this->ExpectedOutput as $k => $v ) {
					
					if ( !isset($this->Output[$k]) ) {
						$this->putError('UNEXPECTED_OUTPUT', self::makeUnexpectedMsg($this->ExpectedOutput, $this->Output, $k, $v, 'undefined'), $this->getCaseFailDetails($args));
						$finish = true;
						break;
					}
					else if ( $this->Output[$k] !== $v ) {
						$this->putError('UNEXPECTED_OUTPUT', self::makeUnexpectedMsg($this->ExpectedOutput, $this->Output, $k, $v, $this->Output[$k]), $this->getCaseFailDetails($args));
						$finish = true;
						break;
					}
				}
				$this->ExpectedOutput = null;
			}
			else {
				$this->putError('MEET_EXPECTATIONS_WITHOUT_SUCH', null, $this->getCaseFailDetails($args));
				$finish = true;
			}
			$this->Output = [];
			if ( $finish ) {
				$this->finishCase();
			}
		}
		
		function testOut($args) {
			$this->Output = array_merge( $this->Output, $args['Out'] );
		}
		
		function testWillCrash() {
			$this->WillCrash = true;
		}
		
		function end() {
		
			if ( $this->WillCrash ) {
				$this->finishCase();
			}

			if ( $this->ExpectedOutput !== null ) {
				$this->putError('FAILED_EXPECTATIONS_NOT_MET', 'Test case was expected to produce some predefined output, but it didn\'t', null);
			}

			if ( $this->ExpectedTestCount > 0 && $this->ExpectedTestCount != $this->CaseCount ) {
				$this->putError('FAILED_TESTCASE_COUNT', 'Test case count expected ' . $this->ExpectedTestCount . ', performed ' . $this->CaseCount, null);
			}

			/*if ( empty( $this->Errors ) && ( ( !$this->WillCrash /*&& $this->_case !== null*//* ) || empty( $this->Cases ) ) ) {
				$this->putError('UNEXPECTED_TERMINATION', 'Test script was terminated without ending the last case block. Check error.log for more info.', null);
			}*/

			if ( $this->LogFile !== null && file_exists( $this->LogFile ) ) {
				if ( empty( $this->Errors ) && ( ( !$this->WillCrash /*&& $this->_case !== null*/ ) || empty( $this->Cases ) ) ) {
					$log = file_get_contents( $this->LogFile );
					preg_match_all( '/^\\[(.+?)\\] (.+?):  (.+) in (.+) on line (\d+)/m', $log, $matches );
					foreach ( $matches[3] as $key => $value ) {
						$this->putError( 'ERROR_LOG', $value, [ 'Error' => ['File' => $matches[4][$key], 'Line' => $matches[5][$key], 'Type' => $matches[2][$key], 'Trace' => []] ] );
					}
				}
				@unlink( $this->LogFile );
				$this->LogFile = null;
			}
		
			$ret = [
				'Url' => $this->Url,
				'Args' => $this->Args
			];
			
			if ( !empty( $this->Cases ) ) {
				$ret['Cases'] = $this->Cases;
			}
			
			if ( !empty( $this->Errors ) ) {
				$ret['Errors'] = $this->Errors;
			}
			//else {
			//	unset($ret['Url']);
			//}
			
			if ( !empty( $this->Echo ) ) {
				$ret['Echo'] = $this->Echo;
			}
			
			return $ret;
		}
	}

}

?>