<?

namespace phptestr\tmp;

/**
 * Provides some higher level writing functions on top of IOutputStream.
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
trait TOutputStream2 {

	use TOutputStream;

	function writeBlock ( $data ) {
		$len = strlen($data);
		$written = 0;
		do {
			$ret = $this->write($data);
			if ( $ret === false) {
				return $written;
			}
			else if ( $ret == $len ) {
				return true;
			}
			else {
				$len -= $ret;
				$written += $ret;
				$data = substr( $data, $ret );
				continue;
			}
		} while ( true );
	}

}

?>