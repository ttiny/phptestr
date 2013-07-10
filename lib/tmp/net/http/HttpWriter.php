<?

namespace phptestr\tmp;
 
/**
 * Handles sending an HTTP message over a stream.
 * @todo Add/test gzip and deflate support
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
class HttpWriter extends Stream {

	//hold a ref to the stream so it wont be GC-ed
	private $_stream = null;

	private $_options = null;

	/**
	 * @var HttpHeaders Headers of the request.
	 */
	public $Headers = null;
	private $_content = null;

	private $_headersWriter = null;
	private $_contentWriter = null;
	
	private $_contentString = null;
	private $_contentLength = null;
	
	const ERROR_WRITING_CONTENT = 'Error writing content';
	const ERROR_WRITING_HEADERS = 'Error writing headers';
	const ERROR_READING_INPUT_STREAM = 'Error reading content from input stream';

	/**
	 * This option will make the HttpWriter send some headers automatically.
	 * These are 'Content-Length', 'Accept-Encoding' and in case it is not specified 'Content-Type'
	 * 'Host', and 'Connection: close'.
	 */
	const AUTO_HEADERS = 0x00010000;
	
	function __construct($stream, $options = 0) {
		$this->_stream = $stream;
		parent::__construct($stream->getHandle(), Stream::WRITE|Stream::DONT_OWN);
		$this->_options = $options;
		$this->Headers = new HttpHeaders();
	}

	/**
	 * Used with POST requests the set the content of the request.
	 * @param array|string|Stream Array will be converted to URL encoded sting and 
	 * optionally set the content type to 'application/x-www-form-urlencoded'.
	 * Streams will be written to the output in chunks of {@see Stream::CHUNK_SIZE} size.
	 * String will be written as it is.
	 * @return $this
	 */
	function setContent($content) {
		if (is_array($this->_content)) {
			$this->_contentString = http_build_query($content);
			$this->_contentLength = strlen($this->_contentString);
			
			if (($this->_options&HttpWriter::AUTO_HEADERS) != 0) {
			
				if ( !isset( $this->Headers[ HttpHeaders::CONTENT_TYPE ] ) ) {
					$this->Headers[HttpHeaders::CONTENT_TYPE] = HttpHeaders::CONTENT_TYPE_FORM;
				}
			
				if ( !isset($this->Headers[ HttpHeaders::CONTENT_LENGTH ] ) ) {
					$this->Headers[HttpHeaders::CONTENT_LENGTH] = (string)$this->_contentLength;
				}
			}
		}
		
		else if (is_string($content)) {
			$this->_contentString = $content;
			$this->_contentLength = strlen($this->_contentString);
			
			if (($this->_options&HttpWriter::AUTO_HEADERS) != 0) {
				if ( !isset( $this->Headers[HttpHeaders::CONTENT_LENGTH] ) ) {
					$this->Headers[HttpHeaders::CONTENT_LENGTH] = (string)$this->_contentLength;
				}
			}
		}
		
		else {
			if (($this->_options&HttpWriter::AUTO_HEADERS) != 0) {
				if ( !isset( $this->Headers[HttpHeaders::CONTENT_LENGTH] ) && $content->isSeekable() ) {
					$pos = $content->position();
					$content->seek(0, SEEK_END);
					$this->_contentLength = $content->position() - $pos;
					$content->seek($pos, SEEK_SET);
					$this->Headers[HttpHeaders::CONTENT_LENGTH] = $this->_contentLength;
				}
			}
		}
		
		$this->_content = $content;
		return $this;
	}
	
	/**
	 * Retrieves the headers as string with possibly some header added automatically.
	 * @return string
	 */
	function getAutoHeaders() {
		if (($this->_options&HttpWriter::AUTO_HEADERS) != 0) {
			if ( !isset( $this->Headers[HttpHeaders::CONNECTION] ) ) {
				$this->Headers[HttpHeaders::CONNECTION] = HttpHeaders::CONNECTION_CLOSE;
			}
		}
		return (string)$this->Headers;
	}

	/**
	 * Sends the HTTP headers.
	 * Throws on error.
	 * @return false
	 */
	function writeHeadersSync() {
		if ( $this->writeBlock($this->getAutoHeaders()) === false ) {
			throw new Exception(self::ERROR_WRITING_HEADERS);
		}
		return false;
	}
	
	/**
	 * Sends the HTTP headers.
	 * This function is not guaranteed to finish in one call and may need to be called multiple times.
	 * Throws on error.
	 * @return bool False if there is nothing more to write, true if the function needs to be called again.
	 */
	function writeHeadersAsync() {
		if ( $this->_headersWriter === null ) {
			$this->_headersWriter = new AsyncStreamWriter($this, $this->getAutoHeaders());
		}
		if ( $this->_headersWriter->write() === false ) {
			if ( $this->_headersWriter->Error ) {
				throw new Exception(self::ERROR_WRITING_HEADERS);
			}
			else {
				return false;
			}
		}
		else {
			return true;
		}
	}
	
	/**
	 * Sends the content of an HTTP message.
	 * Throws on error.
	 * @see setContent()
	 * @return false
	 */
	function writeContentSync() {
		if ( $this->_content instanceof IInputStream2 ) {
			$this->_contentString = $this->_content->readBlock(Stream::CHUNK_SIZE);
		}
		
		$ret = $this->writeBlock($this->_contentString, $written);
		
		if ( $ret === false || $written != $this->_contentString ) {
			throw new Exception(self::ERROR_WRITING_CONTENT);
		}
		
		if ( $this->_content instanceof Stream && $this->_content->eof() === false ) {
			return $this->writeContentSync();
		}
		
		return false;
	}
	
	/**
	 * Sends the content of an HTTP message.
	 * This function is not guaranteed to finish in one call and may need to be called multiple times.
	 * Throws on error.
	 * @see setContent()
	 * @return bool False if there is nothing more to write, true if the function needs to be called again.
	 */
	function writeContentAsync() {
		if ( $this->_contentWriter === null ) {
			$this->_contentWriter = new AsyncStreamWriter($this, $this->_contentString);
		}
		
		if ( $this->_content instanceof Stream && $this->_contentWriter->Remaining == 0 ) {
			$this->_contentString = $this->_content->read(Stream::CHUNK_SIZE);
			if ( $this->_contentString === false ) {
				throw new Exception(self::ERROR_READING_INPUT_STREAM);
			}
			else if ( empty($this->_contentString) ) {
				return true;
			}
			$this->_contentWriter->setData($this->_contentString);
		}
		
		if ( $this->_contentWriter->write() === false ) {
			if ( $this->_contentWriter->Error ) {
				throw new Exception(self::ERROR_WRITING_CONTENT);
			}
			else {
				if ( $this->_content instanceof Stream && $this->_content->eof() === false ) {
					return $this->writeContentAsync();
				}
				return false;
			}
		}
		else {
			return true;
		}
	}
}

 ?>