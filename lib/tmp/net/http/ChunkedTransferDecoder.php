<?

namespace phptestr\tmp;

/**
 * Decodes a HTTP stream with Transfer-Encoding: chunked.
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
class ChunkedTransferDecoder extends Stream {

	//hold a ref to the stream so it wont be GC-ed
	private $_stream = null;
	
	private $_chunkSize = null;
	private $_chunkSizeLine = null;
	private $_chunkSizeSkipLine = false;

	function __construct($stream) {
		parent::__construct( $stream->getHandle(), Stream::READ|Stream::DONT_OWN );
		$this->_stream = $stream;
	}

	function read ( $length ) {
		if ( $this->_chunkSize > 0 ) {
			if ( $length < 0 || $this->_chunkSize < $length ) {
				$ret = $this->_stream->read( $this->_chunkSize );
			}
			else {
				$ret = $this->_stream->read( $length );
			}
			if ($ret === false) {
				return false;
			}
			$len = strlen( $ret );
			$this->_chunkSize -= $len;
			return $ret;
		}
		else {
			$ret = $this->_readNextChunkSize();
			if ( $ret > 0 ) {
				$this->_chunkSize = $ret;
				return $this->read($length);
			}
			else {
				if ($ret === false) {
					return false;
				}
				return null;
			}
		}
	}

	function readLine ( $maxLength = -1 ) {
		if ( $this->_chunkSize > 0 ) {
			$ret = $this->_stream->readLine( $maxLength );
			if ( $ret === false ) {
				return false;
			}
			$len = strlen( $ret );
			$this->_chunkSize -= $len;
			return $ret;
		}
		else {
			$ret = $this->_readNextChunkSize();
			if ( $ret > 0 ) {
				$this->_chunkSize = $ret;
				return $this->readLine( $maxLength );
			}
			else {
				if ( $ret === false ) {
					return false;
				}
				return null;
			}
		}
	}

	private function _readNextChunkSize () {
		$ret = $this->_stream->readLine();
		if ( $ret === false ) {
			return false;
		}
		$len = strlen( $ret );
		if ( $len == 0 ) {
			return 0;
		}
		else {
			$endchar = $ret[$len - 1];
			if ( $endchar == "\n" || $endchar == "\r") {
				if ( $this->_chunkSizeSkipLine || $this->_chunkSize === null ) {
					$ret = trim( $this->_chunkSizeLine . $ret );
					$this->_chunkSizeLine = null;
					$this->_chunkSizeSkipLine = false;
					return (int)base_convert( $ret, 16, 10 );
				}
				else {
					$this->_chunkSizeSkipLine = true;
					$this->_chunkSizeLine .= $ret;
				}
				
			}
			else {
				$this->_chunkSizeLine .= $ret;
				return 0;
			}
		}
	}
}

?>