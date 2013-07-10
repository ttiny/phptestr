<?

namespace phptestr\tmp;

/**
 * Just declares some common stream methods.
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
interface IStream {
	/**
	 * Retrieves the URI of the stream.
	 * @return string|null
	 */
	function getUri ();
	
	/**
	 * Closes the stream.
	 * @return bool
	 */
	function close ();
}