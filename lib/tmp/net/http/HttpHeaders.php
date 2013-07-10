<?

namespace phptestr\tmp;

use Exception, ArrayAccess;

/**
 * Holds an array of HTTP headers.
 * @todo Implement Iterator, Countable
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
class HttpHeaders implements ArrayAccess {
	
	const CONTENT_TYPE = 'Content-Type';
	const CONTENT_TYPE_FORM = 'application/x-www-form-urlencoded';
	const CONTENT_TYPE_JSON = 'application/json';
	const CONTENT_TYPE_XML = 'text/xml';
	const CONTENT_TYPE_HTML = 'text/html';
	const CONTENT_TYPE_TEXT = 'text/plain';
	const CONTENT_TYPE_BINARY = 'application/octet-stream';
	const ACCEPT_ENCODING = 'Accept-Encoding';
	const VARY = 'Vary';
	
	const CONTENT_LENGTH = 'Content-Length';
	const CONTENT_ENCODING = 'Content-Encoding';
	const ENCODING_IDENTITY = 'identity';
	const ENCODING_GZIP = 'gzip';
	const ENCODING_DEFLATE = 'deflate';
	const TRANSFER_ENCODING = 'Transfer-Encoding';
	const TRANSFER_ENCODING_CHUNKED = 'chunked';
	const TRANSFER_ENCODING_IDENTITY = 'identity';
	const CONNECTION = 'Connection';
	const CONNECTION_CLOSE = 'close';
	const HOST = 'Host';

	private $_headers = [0 => "GET / HTTP/1.1"];
	private $_path = '/';
	private $_query = null;
	private $_method = 'GET';
	private $_httpVersion = '1.1';


	/**
	 * Parses a line of headers.
	 * @param string Header line like Content-Type: text/plain\r\n
	 * @return bool True if the line was parsed, false otherwise and when there are no more headers (i.e. blank line).
	 */
	function addHeaderLine ( $line ) {
		$i = strpos($line, ':');
		if ($i === false) {
			$line = trim($line);
			if ( empty($line) ) {
				return false;
			}
			$this->_headers[] = $line;
		}
		else {
			$key = trim(substr($line, 0, $i));
			$value = trim(substr($line, $i + 1));
			
			if ( strcasecmp($key, self::CONTENT_LENGTH) == 0 ) {
				$this->_headers[self::CONTENT_LENGTH] =(int)$value;
			}
			else if( strcasecmp($key, self::CONNECTION) == 0 ) {
				$this->_headers[self::CONNECTION] = strtolower($value);
			}
			else if( strcasecmp($key, self::TRANSFER_ENCODING) == 0 ) {
				$this->_headers[self::TRANSFER_ENCODING] = strtolower($value);
			}
			else {
				$this->_headers[$key] = $value;
			}
		}
		return true;
	}
	
	function __toString() {
		$ret = '';
		foreach ($this->_headers as $k => $v) {
			if ( is_int($k) ) {
				$ret .= $v . "\r\n";
			}
			else {
				$ret .= $k . ': ' . $v . "\r\n";
			}
		}
		return $ret . "\r\n";
	}

	/**
	 * Renders the HTTP headers as string.
	 * @return string
	 */
	function toString() {
		return $this->__toString();
	}

	private function _updateHeader0 () {
		$this->_headers[0] = $this->_method . ' ' . $this->_path . $this->_query . ' HTTP/' . $this->_httpVersion;
	}

	/**
	 * Sets the HTTP method.
	 * Throws if the method is not supported.
	 * @param string 'GET' or 'POST'.
	 * @return $this
	 */
	function setMethod($method) {
		if ($method != 'GET' && $method != 'POST') {
			throw new Exception('Unsupported method');
		}
		$this->_method = $method;
		$this->_updateHeader0();
		return $this;
	}

	/**
	 * Retrieves the HTTP method used.
	 * @return string
	 */
	function getMethod () {
		return $this->_method;
	}
	
	/**
	 * Used with GET requests to set the query params of the request.
	 * @param array
	 * @return $this
	 */
	function setQuery($params) {
		if ( is_array($params) ) {
			$this->_query = '?' . http_build_query($params);
		}
		else {	
			$this->_query = $params;
		}
		$this->_updateHeader0();
		return $this;
	}

	/**
	 * Retrieves the query parameters of the request.
	 * @return string
	 */
	function getQuery() {
		return $this->_query;
	}
	
	/**
	 * Sets the path of the HTTP request.
	 * @param string
	 * @return $this
	 */
	function setPath($path) {
		$this->_path = $path;
		$this->_updateHeader0();
		return $this;
	}

	/**
	 * Retrieves the path of the HTTP request.
	 * @return string
	 */
	function getPath() {
		return $this->_path;
	}


	///////// ArrayAccess

	function offsetExists ( $offset ) {
		return isset( $this->_headers[$offset] );
	}

	/**
	 * Retrieves the value of a single header.
	 * @param mixed|null Null if there is no such header.
	 */
	function offsetGet ( $offset ) {
		return isset( $this->_headers[$offset] ) ? $this->_headers[$offset] : null;
	}

	/**
	 * Adds a header to the list of headers.
	 * @param string Name of the header, e.g. 'Content-Type';
	 * @param string Value of the header, e.g. 'application/json'
	 * @return string The value of header.
	 */
	function offsetSet ( $offset, $value ) {
		return $this->_headers[$offset] = $value;
	}

	function offsetUnset ( $offset ) {
		unset( $this->_headers[$offset] );
	}
 
}

?>