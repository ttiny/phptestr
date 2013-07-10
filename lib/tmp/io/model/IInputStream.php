<?

namespace phptestr\tmp;

/**
 * A read-only stream.
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
interface IInputStream {

	/**
	 * Reads up to $length bytes from the stream.
	 * @param int Desired number of bytes to read. -1 to read while there is available data.
	 * @return string|false False on error.
	 */
	function read ( $length );

	/**
	 * Reads a line from the stream up to $maxlen bytes long
	 * @param int maximum line length. -1 means unlimited.
	 * @return string|bool Returns false on error, or EOF.
	 */
	function readLine ( $maxlen = -1 );
	
	/**
	 * Checks for end of file condition.
	 * @return bool
	 */
	function eof ();

}

?>