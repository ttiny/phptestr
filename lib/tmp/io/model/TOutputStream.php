<?

namespace phptestr\tmp;

/**
 * Implements output stream interface using the PHP's f (fopen, fread, etc) family of functions.
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
trait TOutputStream {

	function write ( $data ) {
		return fwrite( $this->_handle, $data );
	}

	function flush () {
		return fflush( $this->_handle );
	}

}

?>