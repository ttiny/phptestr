<?

namespace phptestr\tmp;

/**
 * A seekable [stream].
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
interface ISeekable {

	/**
	 * Retrieves the current position.
	 * @return int|false returns null if the position can not be retrieved.
	 */
	function position ();
	
	/**
	 * Seeks to a give position.
	 * @param int If $whence is SEEK_END this must be a negative number
	 * @param int SEEK_SET or SEEK_END or SEEK_CUR
	 * @return bool
	 */
	function seek ( $offset, $whence = SEEK_SET );

}

?>