<?

namespace phptestr\tmp;

/**
 * Extended input stream functionality on top of IInputStream.
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
interface IInputStream2 extends IInputStream {

	/**
	 * A blocking read that will retry reading until the requested length have been read or error occurs or EOF.
	 * @param int Desired number of bytes to read. -1 to read until eof or error.
	 * @return string|false False on error.
	 */
	function readBlock ( $length );

	/**
	 * Reads a line from the stream up to $maxlen bytes long.
	 * This function would block a non-blocking stream.
	 * @param int Maximum line length. -1 means unlimited.
	 * @return string|bool Returns false on error, or EOF.
	 */
	function readLineBlock ( $maxlen = -1 );

}

?>