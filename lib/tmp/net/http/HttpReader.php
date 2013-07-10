<?

namespace phptestr\tmp;
 
/**
 * Handles receiving an HTTP message over a stream.
 * @todo Add/test gzip and deflate support
 * @todo Support reading the content in a Stream
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
class HttpReader extends Stream {

	//hold a ref to the stream so it wont be GC-ed
	private $_stream = null;
	private $_options = null;

	/**
	 * @var HttpHeaders Holds the HTTP headers of the response.
	 */
	public $Headers = null;
	private $_contentLength = null;
	private $_connection = null;
	private $_transferEncoding = null;
	private $_contentDecoder = null;
	
	private $_headersReader = null;
	private $_contentReader = null;
	
	const ERROR_READING_CONTENT = 'Error reading content';
	const ERROR_UNEXPECTED_CONTENT_LENGTH = 'Unable to read the expected content length';
	const ERROR_READING_HEADERS = 'Error reading headers';

	/**
	 * The supported encodings by HttpReader
	 */
	const ACCEPT_ENCODING_VALUE = 'chunked, identity'; //'chunked, gzip, deflate, identity';

	/**
	 * A shortcut for the HttpReader to respect all supported headers.
	 */
	const RESPECT_HEADERS = 7; // 1 | 2 | 4
	
	/**
	 * A HttpReader option. Will make it read up to Content-Length bytes of the content.
	 */
	const RESPECT_CONTENT_LENGTH = 1;
	
	/**
	 * A HttpReader option. Will make it close the connection if there is Connection: close header
	 */
	const RESPECT_CONNECTION = 2;
	
	/**
	 * A HttpReader option. Will know about 'Transfer-encoding: chunks'.
	 */
	const RESPECT_TRANSFER_ENCODING = 4;

	function __construct($stream, $options = 0) {
		$this->_stream = $stream;
		parent::__construct($stream->getHandle(), Stream::READ|Stream::DONT_OWN);
		$this->_options = $options;
		$this->Headers = new HttpHeaders();
	}

	private function _getAutoHeaders () {
		
		if ( ($this->_options&HttpReader::RESPECT_CONTENT_LENGTH) != 0) {
			$this->_contentLength = $this->Headers[ HttpHeaders::CONTENT_LENGTH ];
		}
		
		if ( ($this->_options&HttpReader::RESPECT_CONNECTION) != 0) {
			$this->_connection = $this->Headers[ HttpHeaders::CONNECTION ];
		}

		if ( ($this->_options&HttpReader::RESPECT_TRANSFER_ENCODING) != 0 ) {

			$this->_transferEncoding = $this->Headers[ HttpHeaders::TRANSFER_ENCODING ];
			if ( $this->_transferEncoding !== null ) {
				if ( $this->_transferEncoding == HttpHeaders::TRANSFER_ENCODING_CHUNKED ) {
					$this->_contentDecoder = new ChunkedTransferDecoder( $this->_stream );
				}
				else if ( $this->_transferEncoding != HttpHeaders::TRANSFER_ENCODING_IDENTITY ) {
					throw new Exception('Unsupported HTTP transport ' . $this->_transferEncoding);
				}
			}
			else {
				$this->_contentDecoder = $this->_stream;
			}
		}
	}

	/**
	 * Retrieves the raw underlaying stream, unmodified by a transfer decoder.
	 * @return IInputStream
	 */
	function getStream () {
		return $this->_stream;
	}

	/**
	 * Used to decode the content while reading it.
	 * {@inheritdoc}
	 */
	function read ( $length ) {
		return $this->_contentDecoder->read( $length );
	}

	/**
	 * Used to decode the content while reading it.
	 * {@inheritdoc}
	 */
	function readLine ( $maxLength = -1 ) {
		return $this->_contentDecoder->readLine( $maxLength );
	}

	/**
	 * Reads some HTTP headers.
	 * Throws on error.
	 * @return HttpHeaders
	 */
	function readHeadersSync () {
	
		do {
			$line = $this->_stream->readLineBlock();
			if ( $line === false ) {
				if ( $this->eof() ) {
					break;
				}
				else {
					throw new Exception(self::ERROR_READING_HEADERS);
				}
			}
		} while($this->Headers->addHeaderLine($line));

		$this->_getAutoHeaders();
		
		return $this->Headers;
	}
	
	/**
	 * Reads some HTTP headers.
	 * This function is not guaranteed to finish in one call and may need to be called multiple times.
	 * Throws on error.
	 * @return HttpHeaders|bool True if the function needs to be called again.
	 */
	function readHeadersAsync () {
		
		if ( $this->_headersReader === null ) {
			$this->_headersReader = new AsyncStreamReader($this->_stream);
		}
	
		do {
			$line = $this->_headersReader->readLine();
			if ( $line == false ) {
				if ( $this->_headersReader->Error ) {
					throw new Exception(self::ERROR_READING_HEADERS);
				}
			}
			else {	
				return true;
			}
		} while($this->Headers->addHeaderLine($this->_headersReader->Data));
	
		$this->_getAutoHeaders();

		return $this->Headers;
	}
	
	/**
	 * Reads the content of an HTTP message.
	 * Throws on error.
	 * @return string
	 */
	function readContentSync () {

		$throw = null;
	
		if ($this->_contentLength !== null) {
			$ret = $this->_contentDecoder->readBlock($this->_contentLength);
			if ( $ret === false || strlen($ret) != $this->_contentLength ) {
				$throw = new Exception( self::ERROR_UNEXPECTED_CONTENT_LENGTH );
			}
		}
		else {
			$ret = $this->_contentDecoder->readAll();
			if ( $ret === false ) {
				$throw = new Exception( self::ERROR_READING_CONTENT );
			}
		}
		
		if ( $this->_connection == HttpHeaders::CONNECTION_CLOSE ) {
			$this->close();
		}
		
		if ( $thow ) throw $throw;
		
		return $ret;
		
	}
	
	/**
	 * Reads the content of an HTTP message.
	 * This function is not guaranteed to finish in one call and may need to be called multiple times.
	 * Throws on error.
	 * @return string|bool True if the function needs to be called again to read more data.
	 */
	function readContentAsync () {
		if ( $this->_contentReader === null ) {
			$this->_contentReader = new AsyncStreamReader($this->_contentDecoder, $this->_contentLength !== null ? $this->_contentLength : -1);
		}
		
		$ret = $this->_contentReader->read();
		if ( $ret === false ) {
			if ( $this->_contentLength !== null ) {
				if ( strlen($ret) != $this->_contentLength ) {
					$throw = new Exception( self::ERROR_UNEXPECTED_CONTENT_LENGTH );
				}
			}
			else if ( $this->_contentReader->Error ) {
				$throw = new Exception( self::ERROR_READING_CONTENT );
			}
			
			if ( $this->_connection == HttpHeaders::CONNECTION_CLOSE ) {
				$this->close();
			}
			
			if ( $thow ) throw $throw;
			
			return $this->_contentLength->Data();
		}
		
		return $ret;
	}
}

?>