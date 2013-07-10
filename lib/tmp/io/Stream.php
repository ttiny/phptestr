<?

namespace phptestr\tmp;

/**
 * Wraps the fopen style functions in a class.
 *
 * The main reading functions in this class are read() and readLine() and
 * the rest depend on them. The main writing function is write() and the
 * rest depend on it. So derived classes may only override these functions
 * when needed and the rest will keep the same logic.
 *
 * <code>
 * $file = Stream::open('/myfile.txt', Stream::READ);
 * $line = $file->readLine();
 * </code>
 *
 * <code>
 * $stdout = Stream::open('php://output', Stream::WRITE);
 * $stdout->write('OOP echo');
 * </code>
 *
 * <code>
 * $mem = new Stream('php://memory', Stream::READ|Stream::WRITE);
 * $mem->write('Use a memory buffer with the stream interface');
 * </code>
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
class Stream implements IInputStream2, IOutputStream2, ISeekable {

	use TStream, TInputStream2, TOutputStream2, TSeekable;

	/**
	 * @private
	 */
	const CHUNK_SIZE = 8192;

	/**
	 * Access flag. Open for reading
	 */
	const READ = 1;
	
	/**
	 * Access flag. Open for writing
	 */
	const WRITE = 2;
	
	/**
	 * Access flag. Create the stream (i.e. file) if it doesn't exist
	 */
	const CREATE = 4;
	
	/**
	 * Access flag. Truncate the stream (i.e. file) if it already exists
	 */
	const TRUNCATE = 8;
	
	/**
	 * When constructing a stream from resource won't own the resource, i.e. won't close the stream in the destructor.
	 */
	const DONT_OWN = 16;
	
	/**
	 * Shortcut for READ|WRITE|CREATE|TRUNCATE
	 */
	const WRITE_NEW = 15; //1, 2, 4, 8
	
	/**
	 * Shortcut for READ|WRITE
	 */
	const WRITE_EXISTING = 3;  //1, 2
	
	/**
	 * Wraps the stream constructor in a try-catch block so it won't cause a crash.
	 * @see Stream::__construct()
	 * @param string
	 * @param int
	 * @return Stream|null
	 */
	static function open ( $uri, $options = null ) {
		try {
			return new Stream( $uri, $options );
		}
		catch ( Exception $e ) {
			return null;
		}
	}
	
}

?>