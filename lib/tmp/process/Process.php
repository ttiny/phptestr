<?

namespace phptestr\tmp;

/**
 * This class represents a running application and is able to communicate with it.
 * <code>
 * Process::normalizeArgv();
 * if ( isset($_REQUEST['forked']) && $_REQUEST['forked'] == 'true' ) {
 * 	echo 'I forked myself';
 * }
 * else {
 * 	$fork = CurrentProcess::getInstance()->fork( array('forked' => 'true') );
 * 	echo "The fork says: \n";
 * 	$fork->getOutStream()->readAll();
 * }
 * </code>
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */ 
class Process {

	private $_handle = null;
	protected $in = null;
	protected $out = null;
	protected $err = null;
	private $_uri = null;
	private $_cmd = null;
	private $_args = null;
	
	protected function __construct($handle, $uri, $cmd, $args, $in, $out, $err) {
		$this->_handle = $handle;
		$this->in = $in;
		$this->out = $out;
		$this->err = $err;
		$this->_uri = $uri;
		$this->_cmd = $cmd;
		$this->_args = $args;
	}
	
	function __destruct() {
		$this->close();
	}

	/**
	 * Retrieves the input stream of the process. Write only.
	 * @return Stream|HttpWriter &nbsp; Could be an HTTP stream in case of forked process in web mode.
	 */
	function getInStream() {
		return $this->in;
	}
	
	/**
	 * Retrieves the output stream of the process. Read only.
	 * @return Stream|HttpReader &nbsp; Could be an HTTP stream in case of forked process in web mode.
	 */
	function getOutStream() {
		return $this->out;
	}
	
	/**
	 * Retrieves the error stream of the process. Read only.
	 * Will be null for a forked web process.
	 * @return Stream|null
	 */
	function getErrStream() {
		return $this->err;
	}
	
	/**
	 * Returns an In/Out stream for the process.
	 * @return ProcessStream|Stream &nbsp; In case of forked process in web
	 * mode Stream is returned because it is already bidirectional.
	 */
	function getIOStream() {
		if ($this->_handle) {
			return new ProcessStream($this);
		}
		else {
			return $this->in;
		}
	}
	
	/**
	 * Retrieves the command that was used to start the process.
	 * @return string
	 */
	function getCommand() {
		return $this->_cmd;
	}
	
	/**
	 * Retrieves the arguments that were used to start the process.
	 * @return array|null
	 */
	function getArguments() {
		return $this->_args;
	}
	
	/**
	 * Retrieves the command + arguments that were used to star the process.
	 * @return string
	 */
	function getUri() {
		return $this->_uri;
	}
	
	/**
	 * Checks if the process is still running;
	 * @return bool
	 */
	function isRunning() {
		if ($this->_handle) {
			$ret = proc_get_status($this->_handle);
			if (is_array($ret)) {
				return $ret['running'];
			}
		}
		else if($this->in) {
			return true;
		}
		return false;
	}
	
	/**
	 * Exits the process.
	 * @return int|bool True if the process was already closed,
	 * false on error, otherwise the termination code of the process is returned.
	 */
	function close() {
		if ($this->_handle !== null) {
			$ret = proc_close($this->_handle);
			if ($ret != -1) {
				$this->in->close();
				$this->out->close();
				$this->err->close();
				$this->in = null;
				$this->out = null;
				$this->err = null;
				$this->_handle = null;
				return $ret;
			}
			else {
				return false;
			}
		}
		else {
			if ($this->in) {
				$this->in->close();
				$this->in = null;
			}
			else {
				return false;
			}
		}
		return true;
	}
	
	/**
	 * This function is to ensure compatibility of the arguments passed by {@see fork()}.
	 * If fork is called with named arguments, these will be encoded and
	 * the forked process can call this function to decode the arguments
	 * and populate $_REQUEST with them. init.php will call this function automatically.
	 * @return bool Returns false if the arguments could not be decoded (e.g. the
	 * fork was not started in CLI mode.
	 */
	static function normalizeArgv() {
		if ( !empty($_SERVER['argv']) && count($_SERVER['argv']) == 2 ) {
			parse_str($_SERVER['argv'][1], $params);
			if (!empty($params)) {
				foreach ($params as $k => $v) {
					$_REQUEST[$k] = $v;
				}
				return true;
			}
		}
		return false;
	}
	
	/**
	 * Runs another instance of the current script.
	 * @param array|null Arguments to pass to the forked script. If these are
	 * named arguments and the script forks itself in CLI mode, the arguments
	 * will be encoded to preserve the names and the fork needs to call {@see normalizeArgv()}.
	 * @param bool If to keep the arguments that the current script is invoked with.
	 * If this is true the $args will be appended to the current arguments.
	 * @return Process|null Returns null if the process can not be started.
	 */
	function fork($args = null, $keepCurrentArgs = false) {

		if ($keepCurrentArgs) {
			if (is_array($args)) {
				if (is_array($this->_args)) {
					$args = array_merge($this->_args, $args);
				}
			}
			else {
				$args = $this->_args;
			}
		}
		
		//fork in web mode
		if (isset($_SERVER['SERVER_ADDR'])) {
			$uri = $this->_cmd . ($args === null || $_SERVER['REQUEST_METHOD'] != 'GET' ? null : '?' . http_build_query($args));
			$ret = new HttpClient($this->_cmd, HttpWriter::AUTO_HEADERS|HttpReader::RESPECT_HEADERS);
			$ret->Request->Headers->setMethod($_SERVER['REQUEST_METHOD']);
			$ret->Request->Headers->setQuery($args);
			$ret->Request->writeHeadersSync();
			if ($ret) {
				return new Process(null, $uri, $this->_cmd, $args, $ret->Request, $ret->Response, null);
			}
			return null;
		}
		//fork in cli mode
		else {
			if (is_array($args)) {
				foreach ($args as $k => $v) {
					if (!is_int($k)) {
						$args = array(http_build_query($args));
						break;
					}
				}
			}
			return self::run($this->_cmd, $args, null, array('_PROCESS_IS_FORK' => 'true'));
		}
	}
	
	/**
	 * Runs external program.
	 * @param string Path of the program executable.
	 * @param array|null Arguments to be passed to the program.
	 * @param string|null Working directory for the program.
	 * @param array|null Environment variables for the program.
	 * These will be automatically quoted so no need to worry about spaces.
	 * @return Process|null Returns null if the process can not be started.
	 */
	static function run($cmd, $args = null, $cwd = null, $env = null) {
		$descriptorspec = array(
		   0 => array("pipe", "r"), // stdin is a pipe that the child will read from
		   1 => array("pipe", "w"), // stdout is a pipe that the child will write to
		   2 => array("pipe", "w") // stderr is a pipe that the child will write to
		);

		$other_options = array(
			'suppresserrors' => true,
			'bypass_shell' => true
		);
		
		$uri = $cmd;
		
		if ( is_array($args) && !empty($args) ) {
			$uri .= ' --';
			foreach ($args as $arg) {
				$uri .= ' ' . escapeshellarg($arg);
			}
		}

		$handle = @proc_open($uri, $descriptorspec, $pipes, $cwd, $env, $other_options);
		if (is_resource($handle)) {
			return new Process(
				$handle,
				$uri,
				$cmd,
				$args,
				new Stream($pipes[0], Stream::WRITE),
				new Stream($pipes[1], Stream::READ),
				new Stream($pipes[2], Stream::READ)
			);
		}
		
		return null;
	}
}

?>