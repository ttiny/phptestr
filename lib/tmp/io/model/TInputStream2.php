<?

namespace phptestr\tmp;

/**
 * Provides some higher level writing functions on top of IInputStream.
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
trait TInputStream2 {

	use TInputStream;

	function readBlock ( $length ) {
		$str = null;
		do {
			$ret = $this->read($length);
			if ($ret === false) {
				return false;
			}
			else {
				$len = strlen($ret);
				if ($len == 0) {
					continue;
				}
				else {
					$length -= $len;
					$str .= $ret;
					continue;
				}
			}
		} while ($length != 0 && !$this->eof());
		return $str;
		//return stream_get_contents($this->_handle, $length);
	}

	function readLineBlock ( $maxlen = -1 ) {
		
		$ret = false;
		
		while ( true ) {
			$str = $this->readLine( $maxlen );
			if ( $str === false ) {
				break;
			}
			
			$len = strlen( $str );
			if ( $len == $maxlen ) {
				return $str;
			}
		
			if ( $len > 0 ) {
				$ret = $ret !== false ? $ret . $str : $str;
				
				$last = $str[$len - 1];
				if ( $last == "\n" || $last == "\r" ) {
					break;
				}
			}
		}
		
		return $ret;
	}
}

?>