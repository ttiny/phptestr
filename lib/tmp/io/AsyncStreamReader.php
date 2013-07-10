<?

namespace phptestr\tmp;

/**
 * Utility class to simplify reading a string over a non-blocking stream.
 * <code>
 * $socket = new TcpSocket('127.0.0.1:100000');
 * $reader = new AsyncStreamReader($socket);
 * $ret = $reader->readLine();
 * if ( $ret === false ) {
 * 	if ( $ret->Error ) {
 * 		//damn
 * 	}
 *	else {
 * 		echo $ret->Data;
 *	}
 * }
 * else {
 * 	//can't read anymore at the moment
 * 	//go do something else and call read again later
 * }
 * </code>
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
class AsyncStreamReader {
	private $_stream = null;
	private $_length = 0;
	
	/**
	 * @var bool Indicates an error occured in the last read.
	 */
	public $Error = false;
	
	/**
	 * @var string The data that has been read so far.
	 */
	public $Data = null;
	
	/**
	 * @var int The number of bytes read so far.
	 */
	public $Read = 0;
	
	/**
	 * Creates a new async reader.
	 * @param IInputStream Stream to read from.
	 * @param int Number of bytes to read. -1 to read until EOF.
	 */
	function __construct($stream, $length = -1) {
		$this->_stream = $stream;
		$this->_length = $length;
	}
	
	/**
	 * Writes a as much as possible from the target stream without blocking if reading is not possible.
	 * @return bool True if the read needs to be called again, false if no more reading is possible either because of error or eof.
	 */
	function read() {
		if ( $this->_length == 0 ) {
			$this->Error = false;
			return false;
		}
		$ret = $this->_stream->read( $this->_length );
		if ( $ret == false ) {
			$this->Error = true;
			return false;
		}
		else {
			$this->Error = false;
		}
		
		$this->Data .= $ret;
		$len = strlen($ret);
		$this->Read += $len;
		if ( $this->_length > 0 ) {
			$this->_length -= $len;
			if ( $this->_length == 0 ) {
				return false;
			}
			else {
				return true;
			}
		}
		else {
			if ( $len == 0 && $this->eof() ) {
				return false;
			}
			else {
				return true;
			}
		}
	}
	
	/**
	 * The same as read() but returns if a new line is found.
	 * @see read()
	 */
	function readLine() {
		if ( $this->_length == 0 ) {
			$this->Error = false;
			return false;
		}
		$ret = $this->_stream->readLine( $this->_length );
		if ( $ret == false ) {
			$this->Error = true;
			return false;
		}
		else {
			$this->Error = false;
		}
		
		$this->Data .= $ret;
		$len = strlen($ret);
		$this->Read += $len;
		if ( $this->_length > 0 ) {
			$this->_length -= $len;
			if ( $this->_length == 0 ) {
				return false;
			}
			else {
				return true;
			}
		}
		else {
			if ( $len == 0 && $this->eof() ) {
				return false;
			}
			else {
				return true;
			}
		}
	}
}
 
?>