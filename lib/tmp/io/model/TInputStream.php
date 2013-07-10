<?

namespace phptestr\tmp;

/**
 * Implements input stream interface using the PHP's f (fopen, fread, etc) family of functions.
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
trait TInputStream {

	function read ( $length ) {
		if ($length == -1) {
			$str = null;
			do {
				$ret = fread($this->_handle, Stream::CHUNK_SIZE);
				if ($ret === false) {
					return false;
				}
				else {
					if (strlen($ret) == 0) {
						return $str;
					}
					else {
						$str .= $ret;
						continue;
					}
				}
			} while (!$this->eof());
		}
		else {
			return fread($this->_handle, $length);
		}
	}

	function readLine ( $maxlen = -1 ) {
		if ( $maxlen > 0 ) {
			$ret = fgets( $this->_handle, $maxlen + 1 );
		}
		else {
			$ret = fgets( $this->_handle );
		}
		if ( $ret === false ) {
			return false;
		}
		else {
			return $ret;
		}
	}

	function eof () {
		return feof( $this->_handle );
	}
}

?>