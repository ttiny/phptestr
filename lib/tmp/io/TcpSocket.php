<?

namespace phptestr\tmp;

/**
 * A stream interface for reading/writing sockets over the TCP protocol.
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
class TcpSocket extends Socket {

	/**
	 * Connects a socket to the specified IP address over TCP.
	 * Throws exception on error.
	 * @param string An IP address.
	 */
	function __construct ( $address ) {
		parent::__construct( 'tcp://' . $address );
	}
	
	/**
	 * Same as the constructor but doesn't throw.
	 * @param string An IP address.
	 * @return TcpSocket|null
	 */
	static function open ( $address ) {
		return parent::open( 'tcp://' . $address );
	}
}
 
 ?>