<?

namespace phptestr\tmp;
 
/**
 * A stream interface for making HTTP requests.
 * <code>
 * $http = new HttpClient('http://mysite.com/search.php');
 * //at this point the socket is connect and we can send the headers
 * $http->Request->Headers->setMethod('POST');
 * $http->Request->Headers->setContent(array('query' => 'find me'));
 * $http->writeHeadersSync();
 * $http->Response->readHeadersSync();
 * $http->Response->readContentSync();
 * </code>
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
class HttpClient extends TcpSocket {

	private $_options = 0;
	private $_address = null;
	private $_host = null;
	private $_port = null;
	private $_path = null;
	private $_query = null;
	
	/**
	 * @var HttpWriter Used to send data to the server. It acts on the same socket as the HttpClient itsef.
	 */
	public $Request = null;
	
	/**
	 * @var HttpReader Used to receive data from the server. It acts on the same socket as the HttpClient itsef.
	 */
	public $Response = null;

	/**
	 * Creates a new HTTP client.
	 * @param string Url address to request, e.g. http://mysite.com/remote.php
	 * @param int Combination of {@see Http} options.
	 */
	function __construct($address, $options = null) {
		$this->_options = ($options > 0 ? $options : 0);
		$parts = parse_url($address);
		$this->_host = $parts['host'];
		$this->_address = gethostbyname($this->_host);
		$this->_port = empty($parts['port']) ? getservbyname('www', 'tcp') : $parts['port'];
		$this->_path = empty($parts['path']) ? '/' : $parts['path'];	
		if ( !empty($parts['query']) ) {
			$params = array();
			parse_str($parts['query'], $params);
			$this->_query = '?' . http_build_query($params);
		}
		
		$this->uri = 'http://' . $this->_host . ':' . $this->_port . $this->_path . $this->_query;
		
		parent::__construct($this->_address . ':' . $this->_port);
		
		$this->Request = new HttpWriter($this, $options);
		
		if ( ($this->_options&HttpWriter::AUTO_HEADERS) != 0 ) {
			$this->Request->Headers[HttpHeaders::HOST] = $this->_host;
			$this->Request->Headers[HttpHeaders::ACCEPT_ENCODING] = HttpReader::ACCEPT_ENCODING_VALUE;
		}
		
		$this->Request->Headers->setPath($this->_path);
		
		if ($this->_query !== null) {
			$this->Request->Headers->setQuery($this->_query);
		}
		
		$this->Response = new HttpReader($this, $options);
	}
	

	static function open($address, $options = null) {
		try {
			return new HttpClient($address, $options);
		}
		catch(Exception $e) {
			return null;
		}
	}
}
 
 ?>