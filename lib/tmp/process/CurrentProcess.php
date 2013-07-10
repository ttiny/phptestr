<?

namespace phptestr\tmp;

/**
 * A Process class object representing the current process.
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
class CurrentProcess extends Process {

	/**
	 * Creates new representation of the current process that can be forked.
	 * @param string If the current process is run in CLI mode pass the path to the PHP interpreter.
 	 */
	function __construct($phpCli = 'php') {
		
		//fork in web mode
		if (isset($_SERVER['SERVER_ADDR'])) {
			$scheme = ($_SERVER['SERVER_PROTOCOL'] == 'HTTP/1.1' || $_SERVER['SERVER_PROTOCOL'] == 'HTTP/1.0') ? 'http' : null;
			if($scheme === null) {
				throw new Exception('Unknown server protocol ', $_SERVER['SERVER_PROTOCOL']);
			}
			$cmd = $scheme . '://' . $_SERVER['SERVER_ADDR'] . ':' . $_SERVER['SERVER_PORT'] . $_SERVER['SCRIPT_NAME'];
			$uri = $cmd;
			if (!empty($_REQUEST)) {
				$uri .= '?' . http_build_query($_REQUEST);
			}
			parent::__construct(null, $uri, $cmd, $_REQUEST, null, null, null);
		}
		//fork in cli mode
		else {
			if (empty($phpCli)) {
				throw new InvalidArgumentException('Need the PHP interpreter path to fork in CLI mode');
			}
			$cmd = escapeshellarg($phpCli) . ' -f ' . escapeshellarg($_SERVER['argv'][0]);
			$args = count($_SERVER['argv'] > 1) ? array_slice($_SERVER['argv'], 1) : null;
			$uri = $cmd;
			if ( is_array($args) && !empty($args) ) {
				$uri .= ' --';
				foreach ($args as $arg) {
					$uri .= ' ' . escapeshellarg($arg);
				}
			}
			parent::__construct(null, $uri, $cmd, $args, null, null, null);
		}
	}
	
	function __destruct() {
	}

	/**
	 * More expressive variant of new CurrentProcess.
	 * @param string If the current process is run in CLI mode pass the path to the PHP interpreter.
	 * @return CurrentProcess
	 */
	static function getInstance($phpCli = 'php') {
		return new CurrentProcess($phpCli);
	}

	function getInStream() {
		if ($this->in === null) {
			$this->in = new Stream('php://stdin', Stream::READ);
		}
		return $this->in;
	}
	
	function getOutStream() {
		if ($this->out === null) {
			$this->out = new Stream('php://stdout', Stream::WRITE);
		}
		return $this->out;
	}
	
	function getErrStream() {
		if ($this->err === null) {
			$this->err = new Stream('php://stderr', Stream::WRITE);
		}
		return $this->err;
	}
	
	function getIOStream() {
		return new ProcessStream($this);
	}
	
	function isRunning() {
		return true;
	}

	/*
	function run() {
		throw new Exception('Current process is always running');
	}
	*/
	
	function close() {
		throw new Exception('Can\'t close one\'s own self');
	}
}

?>