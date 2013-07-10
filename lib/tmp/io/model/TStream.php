<?

namespace phptestr\tmp;

/**
 * This trait must be used togerther with TFInputStream, TFOutputStream, TFSeekable.
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
trait TStream {

	private $_handle = null;
	private $_flags = 0;
	
	/**
	 * Opens a stream with the given access flags, always in binary mode.
	 * Throws an exception on error.
	 * @see open()
	 * @param string|resource stream url like c:\myfile.txt or http://google.com or resource handle to already opened stream
	 * @param int access flags. see the constants defined in the Stream class
	 */
	function __construct($uri, $options = null) {
	
		if(is_resource($uri)) {
			$handle = $uri;
		}
		else {
			$mode = null;
			if(($options&Stream::WRITE) != 0) {
				if(($options&Stream::CREATE) != 0) {
					if(($options&Stream::TRUNCATE) != 0) $mode = 'w';
					else $mode = 'c';
				}
				else {
					if(file_exists($uri)) throw new Exception('Unable to open stream: "'.$uri.'" already exists');
					else {
						if(($options&Stream::TRUNCATE) != 0) $mode = 'w';
						else $mode = 'c';
					}
				}
				if(($options&Stream::READ) != 0) $mode .= '+';
			}
			else {
				$mode = 'r';
			}
			
			$mode .= 'b';
			$handle = @fopen($uri, $mode);
			if($handle === false) throw new Exception('Error opening stream "'.$uri.'"');
		}

		$this->_flags = $options;
		$this->_handle = $handle;
	}

	function close () {
		if ( is_resource( $this->_handle ) && fclose( $this->_handle ) ) {
			$this->_handle = null;
			return true;
		}
		else {
			return false;
		}
	}
	
	/**
	 * Closes the stream.
	 */
	function __destruct () {
		if ( ( $this->_flags & Stream::DONT_OWN ) == 0 ) {
			$this->close();
		}
	}
	
	/**
	 * Sets the stream in blocking or non-blocking mode.
	 * @param bool True means blocking.
	 * @return bool If the operation was successful.
	 */
	function setBlocking ( $blocking ) {
		return stream_set_blocking( $this->_handle, $blocking ? 1 : 0 );
	}

	/**
	 * @return bool
	 */
	function isSeekable () {
		$data = stream_get_meta_data($this->_handle);
		if(is_array($data) && isset($data['seekable'])) return $data['seekable'];
		else return false;
	}
	
	/**
	 * @return bool
	 */
	function isReadable () {
		return ($this->_flags & Stream::READ) != 0;
	}
	
	/**
	 * @return bool
	 */
	function isWriteable () {
		return ($this->_flags & Stream::WRITE) != 0;
	}

	function getUri () {
		$data = stream_get_meta_data( $this->_handle );
		if ( is_array( $data ) && isset( $data['uri'] ) ) {
			return $data['uri'];
		}
		else {
			return null;
		}
	}
	
	/**
	 * @see getUri()
	 * @return string
	 */
	function __toString () {
		return $this->getUri();
	}
	
	/**
	 * Retrieves the resource handle of this stream
	 * @return resource|null
	 */
	function getHandle () {
		return $this->_handle;
	}
}

?>