<?

namespace phptestr\tmp;

/**
 * Provides a bidirectional stream for communication with a Process.
 * This is just a shortcut for {@see Process::getInStream()} and {@see Process::getOutStream()} in a single stream.
 * <code>
 * $process = Process::run();
 * $stream = $process->getIOStream(); //returns ProcessStream
 * $stream->write('hey');
 * $stream->readAll();
 * </code>
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */ 
class ProcessStream extends Stream {

	private $_process = null;
	private $_in = null;
	private $_out = null;

	function __construct($proccess) {
		$this->_process = $process;
		$this->_in = $process->getInStream();
		$this->_out = $process->getOutStream();
	}
	
	function __destruct() {
	}
	
	function setBlocking($block) {
		return $this->_in->setBlocking($block) && $this->_out->setBlocking($block);
	}
	
	function read($length, $nonblock = true) {
		return $this->_out->read($length, $nonblock);
	}
	
	function write($data, $nonblock = true) {
		return $this->_in->write($data, $nonblock);
	}
	
	function readAll($rewind = false) {
		return $this->_out->readAll(false);
	}
	
	function readLine($maxlen = -1) {
		return $this->_out->readLine($maxlen);
	}
	
	function eof() {
		throw new NotImplementedException();
	}
	
	function rewind() {
		throw new NotImplementedException();
	}
	
	function position() {
		throw new NotImplementedException();
	}
	
	function seek($offset, $whence = SEEK_SET) {
		throw new NotImplementedException();
	}
	
	function flush() {
		return $this->_in->flush();
	}
	
	/**
	 * Close the process and its streams.
	 * @return bool See {@see Process::close()}.
	 */
	function close() {
		if ($this->_process->close()) {
			$this->_in = null;
			$this->_out = null;
			$this->_process = null;
			return true;
		}
		return false;
	}
	
	function getHandle() {
		throw new NotImplementedException();
	}
	
	function isSeekable() {
		return false;
	}
	
	function isWritable() {
		return true;
	}
	
	function isReadable() {
		return true;
	}
	
	function getUri() {
		return $process->getUri();
	}
}