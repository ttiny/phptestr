<?

namespace phptestr\tmp;

/**
 * A write-only stream.
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
interface IOutputStream extends IStream {

	/**
	 * Writes a string to the stream.
	 * @param string
	 * @return int|bool The number of bytes written, false on error.
	 */
	function write ( $data );
	
	/**
	 * Flushes the stream buffers, if any.
	 * @return bool
	 */
	function flush ();

}

?>