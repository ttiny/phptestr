<?

namespace phptestr\tmp;

/**
 * Implements sekable interface using the PHP's f (fopen, fread, etc) family of functions.
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
trait TSeekable {

	function position () {
		return ftell( $this->_handle );
	}

	function seek ( $offset, $whence = SEEK_SET ) {
		return fseek( $this->_handle, $offset, $whence ) == 0;
	}
}

?>