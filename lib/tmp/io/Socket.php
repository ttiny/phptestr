<?

namespace phptestr\tmp;

/**
 * A stream interface for reading/writing sockets.
 * @author Borislav Peev <borislav.asdf@gmail.com>
 * @private
 */
class Socket implements IInputStream2, IOutputStream2 {
	use TStream, TInputStream2, TOutputStream2 {
		TStream::__construct as private TStream___construct;
	}

	protected $_uri = null;

	function __construct ( $address ) {
		$handle = stream_socket_client( $address, $errno, $errstr );
		if ($handle === false) {
			throw new Exception( 'Error connecting to socket "' . $address . '": ' . $errstr );
		}
		$this->TStream___construct( $handle, Stream::READ|Stream::WRITE );
		$this->_uri = $address;
	}

	static function open ( $address ) {
		try {
			return new Socket( $address );
		}
		catch(Exception $e) {
			return null;
		}
	}
	
	function getUri () {
		return $this->_uri;
	}
}