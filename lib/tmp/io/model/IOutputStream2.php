<?

namespace phptestr\tmp;

/**
 * Extended input stream functionality extends IOutputStream.
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
interface IOutputStream2 extends IOutputStream {

	/**
	 * A blocking write that will retry writing its data until it's all written or error occurs.
	 * @param string Data to write.
	 * @return true|int True if all data has been written, otherwise the number of bytes written.
	 */
	function writeBlock ( $data );

}

?>