<?
/**
 * @package phptestr.host
 */

namespace phptestr {

	/**
	 * Holds the stuff of the currenty running test script.
	 * @private
	 * @author Borislav Peev <borislav.asdf@gmail.com>
	 */
	class TestScript {

		static $TestScriptFile = null;
		static $ErrorHandler = null;
		static $TestScriptArguments = null;
		static $BackTraceOffet = 0;
		static $CodeCoverage = false;
		
		static function run ( $script, $arguments = null, $coverage = false ) {
			self::$ErrorHandler = new ErrorHandler(__CLASS__ . '::onError');
			self::$TestScriptFile = $script;self::$TestScriptFile = $script;
			self::$TestScriptArguments = $arguments;
			self::$CodeCoverage = $coverage && function_exists( 'xdebug_get_code_coverage' );
			include self::$TestScriptFile;
		}

		static function cleanTrace ( $trace ) {
			foreach ( $trace as $key => $value ) {
				if ( isset( $value['file'] ) && $value['file'] == __FILE__ ) {
					return array_slice( $trace, 0, $key - 2 - self::$BackTraceOffet );
				}
			}
			return $trace;
		}
		
		static function onError($errno, $errstr, $errfile, $errline, $exc) {
			$arr = array(
				'Error' => array(
					'File' => $errfile,
					'Line' => $errline,
					'Type' => ErrorHandler::phpErrorNoToString($errno),
					'Value' => $errstr,
					'Trace' => self::cleanTrace( array_slice( debug_backtrace(), 2 + self::$BackTraceOffet ) ),
				)
			);
			if ( $exc instanceof \Exception ) {
				$arr['Error']['ExceptionTrace'] = self::cleanTrace( array_slice( $exc->getTrace(), 1 + self::$BackTraceOffet ) );
			}
			self::tellHost('testUnpredictedError', $arr);
			exit;
		}
	
		static function tellHost($what, $args = array()) {
			//if ( !isset($args['Debug']) ) {
			//	$args['Debug'] = array();
			//}
			//if ( !isset($args['Debug']['Timestamp']) ) {
			//	$args['Debug']['Timestamp'] = microtime();
			//}
			if( !isset($args['Debug']['Trace']) ) {
				$trace = debug_backtrace();
				$offset = 1 + self::$BackTraceOffet;
				if ( isset($trace[$offset]['file']) ) {
					$args['Debug']['Trace'] = array(
						'File' => $trace[$offset]['file'],
						'Line' => $trace[$offset]['line'],
					);
				}
			}
			//clean coverage
			if ( isset( $args['Coverage'] ) ) {
				$cmp = __DIR__ . DIRECTORY_SEPARATOR;
				$len = strlen( $cmp );
				$coverage = array();
				foreach ( $args['Coverage'] as $key => $value ) {
					if ( strncmp( $key, $cmp, $len ) !== 0 ) {
						$coverage[$key] = array_keys( $value );
					}
				}
				if ( empty( $coverage ) ) {
					unset( $args['Coverage'] );
				}
				else {
					$args['Coverage'] = $coverage;
				}
			}
			echo json_encode(array('Method' => $what, 'Args' => $args)), "\n";
		}
	
	}
	
	/**
	 * @private
	 */
	class ErrorHandler {

		private $enabled = true;
		private $param = null;
		private $callback = null;
		
		static function phpErrorNoToString($errno) {
			switch($errno) {
				case E_ERROR: return 'E_ERROR';
				case E_WARNING: return 'E_WARNING';
				case E_PARSE: return 'E_PARSE';
				case E_NOTICE: return 'E_NOTICE';
				case E_CORE_ERROR: return  'E_CORE_ERROR';
				case E_CORE_WARNING: return  'E_CORE_WARNING';
				case E_COMPILE_ERROR: return  'E_COMPILE_ERROR';
				case E_COMPILE_WARNING: return  'E_COMPILE_WARNING';
				case E_USER_ERROR: return  'E_USER_ERROR';
				case E_USER_WARNING: return  'E_USER_WARNING';
				case E_USER_NOTICE: return  'E_USER_NOTICE';
				case E_STRICT: return  'E_STRICT';
				case E_RECOVERABLE_ERROR: return  'E_RECOVERABLE_ERROR';
				case E_DEPRECATED: return  'E_DEPRECATED';
				case E_USER_DEPRECATED: return 'E_USER_DEPRECATED';
				default: return $errno;
			}
		}

		function onError($errno, $errstr, $errfile, $errline) {
			if($this->enabled) {
				return call_user_func($this->callback, $errno, $errstr, $errfile, $errline, null, $this->param);
			}
		}
		
		function onFatalError() {
			if($this->enabled) {
				$err = error_get_last();
				if($err !== null && $err['type'] == E_ERROR) return call_user_func($this->callback, $err['type'], $err['message'], $err['file'], $err['line'], null, $this->param);
			}
		}
		
		function onException($exc) {
			if($this->enabled) {
				return call_user_func($this->callback, get_class($exc), $exc->getMessage(), $exc->getFile(), $exc->getLine(), $exc, $this->param);
			}
		}

		function __construct($callback, $param = null) {
			$this->param = $param;
			$this->callback = $callback;
			set_error_handler(array($this, 'onError'));
			set_exception_handler(array($this, 'onException'));
			register_shutdown_function(array($this, 'onFatalError'));
		}
		
		function enable() {
			$this->enabled = true;
		}
		
		function disable() {
			$this->enabled = false;
		}
	}

}