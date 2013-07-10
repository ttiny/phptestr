<?

namespace phptestr\tmp;

/**
 * Utility class to simplify writing a string over a non-blocking stream.
 * <code>
 * $socket = new TcpSocket('127.0.0.1:100000');
 * $writer = new AsyncStreamWriter($socket, $big_chunk_of_data);
 * $ret = $writer->write();
 * if ( $ret === false ) {
 * 	if ( $ret->Remaining > 0 ) {
 * 		//damn
 * 	}
 * 	else {
 * 		echo 'All have been written';
 * 	}
 * }
 * else {
 * 	//can't write everything at this moment,
 * 	//go do something else and call write again later
 * }
 * </code>
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
class AsyncStreamWriter {
	private $_stream = null;
	private $_data = null;
	
	/**
	 * @var bool Indicates an error occured in the last write.
	 */
	public $Error = false;
	
	/**
	 * @var int The number of bytes written to the stream so far.
	 */
	public $Written = 0;
	
	/**
	 * @var int The remaining bytes that are not yet written.
	 */
	public $Remaining = 0;
	
	/**
	 * Creates a new async writer.
	 * @param IOutputStream Stream to write to.
	 * @param string Data to write.
	 */
	function __construct($stream, $data) {
		$this->_stream = $stream;
		$this->setData($data);
	}
	
	/**
	 * Sets new data to be written.
	 * @param string Data to be written.
	 * @return $this
	 */
	function setData($data) {
		$this->_data = $data;
		$this->Remaining = strlen($data);
		return $this;
	}
	
	/**
	 * Writes a as much as possible in the target stream without blocking if writing is not possible.
	 * @return bool True if the write needs to be called again, false if no more writing is possible either because of error or eof.
	 */
	function write() {
		if ( $this->_data === null ) {
			$this->Error = false;
			return false;
		}
		
		$ret = $this->_stream->write( $this->_data );
		if ( $ret == false ) {
			$this->Error = true;
			return false;
		}
		else {
			$this->Error = false;
		}
		
		$this->Written += $ret;
		$this->Remaining -= $ret;
		$this->_data = substr($this->_data, $ret);
		if ( empty($this->_data) ) {
			$this->_data = null;
			return false;
		}
		else {
			return true;
		}
	}
}
 
?>