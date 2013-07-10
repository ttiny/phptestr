<?

namespace phptestr\tmp;

/**
 * A compilation of file path related functions
 * @author Borislav Peev <borislav.asdf@gmail.com>
 */
class PathUtils {

	/**
	 * Flag for {@see walk()} - include patterns match files only
	 */
	const WALK_INCLUDE_FILES = 1;

	/**
	 * Flag for {@see walk()} - include patterns match dirs only
	 */
	const WALK_INCLUDE_DIRS = 2;

	/**
	 * Flag for {@see walk()} - include patterns match files and dirs
	 */
	const WALK_INCLUDE_ALL = 3;

	/**
	 * Flag for {@see walk()} - exclude patterns match files only
	 */
	const WALK_EXCLUDE_FILES = 4;

	/**
	 * Flag for {@see walk()} - exclude patterns match dirs only
	 */
	const WALK_EXCLUDE_DIRS = 8;

	/**
	 * Flag for {@see walk()} - exclude patterns match files and dirs
	 */
	const WALK_EXCLUDE_ALL = 12;

	/**
	 * Flag for {@see walk()} - work recursively
	 */
	const WALK_RECURSIVE = 16;

	/**
	 * Default flag for {@see walk()} - {@see WALK_INCLUDE_FILES} | {@see WALK_EXCLUDE_ALL | {@see WALK_RECURSIVE}}
	 */
	const WALK_DEFAULT = 29;

	/**
	 * Flag for {@see listPath()} - includes files in the listing.
	 */
	const LIST_FILES = 32;

	/**
	 * Flag for {@see listPath()} - includes directories in the listing.
	 */
	const LIST_DIRS = 64;

	/**
	 * Flag for {@see listPath()} - {@see LIST_FILES | {@see LIST_DIRS}.
	 */
	const LIST_ALL = 96;

	/**
	 * Flag for {@see listPath()} - the entries are included in the listing with their full path.
	 */
	const LIST_FULL_PATH = 128;

	/**
	 * Default flag for {@see listPath()} - {@see WALK_DEFAULT} | {@see LIST_ALL}.
	 */
	const LIST_DEFAULT = 125;

	/*
	 * Deletes all 'old' files in a directory
	 * @param string directory path
	 * @param int maximum age of the files in seconds. Files older than this number of seconds will be deleted. If this is 0, all files will be deleted
	 * @param bool if to clean the old files recusively in the subdiretories also
	 * @todo Rewrite with walk() and rename to clean
	 */
	static function cleanOldFiles($path, $secondsold, $recursive = false) {
		$timeLimit = time() - $secondsold;
		if(file_exists($path) && is_dir($path) && ($dir = @opendir($path))) {
			while(($fname = @readdir($dir)) !== false) {
				if($fname == '.' || $fname == '..') continue;
				$fname = $path . DIRECTORY_SEPARATOR . $fname;
				if(is_dir($fname)) {
					if($recursive) self::cleanOldFiles($fname, $secondsold, true);
				}
				else if($secondsold == 0 || @filemtime($fname) < $timeLimit) @unlink($fname);
			}
			@closedir($dir);
		}
	}
	
	/**
	 * Computes the relative path between two paths.
	 * <code>
	 * //this will return ../../system32
	 * PathUtils::relativePath('/windows/system/drivers', '/windows/system32');
	 * </code>
	 * @param string base path
	 * @param string destination path
	 * @return string|null
	 */
	static function relativePath ( $basepath, $destpath ) {
		if ( empty( $destpath ) ) {
			return null;
		}
		if ( empty( $basepath ) ) {
			return $destpath;
		}

		$basepath = str_replace( '\\', '/', $basepath );
		$destpath = str_replace( '\\', '/', $destpath );

		$drv1 = strpos( $basepath, ':/' ) == 1 ? strtolower( $basepath[0] ) : null;
		$drv2 = strpos( $destpath, ':/' ) == 1 ? strtolower( $destpath[0] ) : null;
		
		$s1 = 0;
		$s2 = 0;
		if ( $drv1 !== null && $drv2 !== null && $drv1 != $drv2 ) {
			//different drives - return absolute path
			return $destpath;
		}
		else {
			if ( $drv1 !== null ) {
				$s1 = strlen( $drv1 ) + 1;
			}
			if ( $drv2 !== null ) {
				$s2 = strlen( $drv2 ) + 1;
			}
		}

		$basedirs = $s1 < strlen( $basepath ) ? explode( '/', substr( $basepath, $s1 ) ) : null;
		$destdirs = $s2 < strlen( $destpath ) ? explode( '/', substr( $destpath, $s2 ) ) : null;
		for ( $i = 0; $i < 2; ++$i ) {
			if ( $i == 0 ) {
				$arr = &$basedirs;
			}
			else if( $i == 1 ) {
				$arr = &$destdirs;
			}
			do {
				$done = true;
				foreach ( $arr as $k => $v ) {
					if ( $v == '..' ) {
						if ( $k == 0 ) {
							throw new InvalidArgumentException( 'Invalid base path' );
						}
						array_splice( $arr, $k - 1, 2 );
						$done = false;
						break;
					}
					if ( $v == '.' ) {
						array_splice( $arr, $k, 1 );
						$done = false;
						break;
					}
				}
			} while ( $done != true );
		}

		$maxCompare = min( count( $basedirs ), count( $destdirs ) );
		$lastCommonDir = -1;

		for ( $i = 0; $i < $maxCompare; ++$i ) {
			if ( $basedirs[$i] != $destdirs[$i] ) {
				break;
			}
			$lastCommonDir = $i;
		} 

		$ret = '';
		$end = count( $basedirs ) - ( $lastCommonDir + 1 );
		for( $i = 0; $i < $end; ++$i ) {
			$ret .= '../';
		}
		array_splice( $destdirs, 0, $lastCommonDir + 1 );
		if ( !empty( $destdirs ) ) {
			$ret .= implode( '/', $destdirs );
		}
		if ( empty( $ret ) ) {
			$ret = './';
		}
		return $ret;
	}
	
	/**
	 * Converts from a MIME type to file extension.
	 * For example the extension for 'application/json' is 'json',
	 * the extension for 'image/jpeg' is 'jpg', etc.
	 * The function supports common web formats, currently json, jpg, png, gif, html, xml, txt.
	 * @param string MIME string. Could be like 'text/html' or 'text/html; charset=UTF-8',
	 * the charset part will be ignored and the function will succeed.
	 * @param string default extension. This will be returned if the MIME string is unknown to the function.
	 */
	static function mimeToFileExt ( $contentType, $default = null ) {
		$p = strpos( $contentType, ';' ); //could be application/json; charset=UTF-8
		if ( $p !== false ) {
			$contentType = substr( $contentType, 0, $p );
		}
		switch ( $contentType ) {
			case 'application/json': return 'json';
			case 'image/jpeg': return 'jpg';
			case 'image/png': return 'png';
			case 'image/gif': return 'gif';
			case 'text/html': return 'html';
			case 'text/xml': return 'xml';
			case 'text/plain': return 'txt';
			default: return $default;
		}
	}

	/**
	 * Matches a path agains a wildcard pattern.
	 * The pattern format is simple: * matches everything but a slash (/), ** matches everything. Non greedy.
	 * Supports only forward slashes.
	 * Examples:
	 * <ul>
	 * <li>"*.cpp" will not match "dir/file.cpp"</li>
	 * <li>"**.cpp" will match "dir/file" in "dir/file.cpp"</li>
	 * <li>"**&#47;*.cpp" will match "dir" and "file" in "dir/file.cpp"</li>
	 * <li>"***.cpp" will match "dir/" and "file" in "dir/file.cpp"</li>
	 * <li>"***.cpp" will match "dir/subdir/" and "file" in "dir/subdir/file.cpp"</li>
	 * <li>"***.cpp" will match "" and "file" in "file.cpp"</li>
	 * </ul>
	 * @param string Path to match.
	 * @param string Wild card pattern.
	 * @return array|false The matches.
	 */
	static function match ( $path, $pattern ) {

		if ( $pattern === '**' ) {
			return true;
		}

		$pattern = preg_quote( $pattern, '~' );
		$pattern = str_replace( '\\*\\*', '(.*?)', $pattern );
		$pattern = str_replace( '\\*', '([^/]*?)', $pattern );

		$pattern = '~^' . $pattern . '$~';

		if ( preg_match( $pattern, $path, $matches ) > 0 ) {
			return $matches;
		}
		return false;
	}

	/**
	 * Performs a {@see match()} on a list of patterns.
	 * @param string Path to match.
	 * @param string[] List of patterns.
	 * @return bool true if all of the patterns match.
	 */
	static function matchAnd ( $path, $patterns ) {
		foreach ( $patterns as $pattern ) {
			if ( PathUtils::match( $path, $pattern ) === false ) {
				return false;
			}
		}
		return true;
	}

	/**
	 * Performs a {@see match()} on a list of patterns.
	 * @param string Path to match.
	 * @param string[] List of patterns.
	 * @return bool true if all of the patterns match.
	 */
	static function matchOr ( $path, $patterns ) {
		foreach ( $patterns as $pattern ) {
			if ( PathUtils::match( $path, $pattern ) !== false ) {
				return true;
			}
		}
		return false;
	}

	private static function _walk ( $dir, $relative,
		$includePatterns, $excludePatterns,
		$callback, $flags, $recursive, $excludeDirs,
		$includeDirs, $includeFiles, $excludeFiles ) 
	{

		$hdir = @opendir( $dir );
		if ( $hdir === false ) {
			return false;
		}

		while( ( $entry = readdir( $hdir ) ) !== false ) {
			if( $entry == '.' || $entry == '..' ) {
				continue;
			}

			$path = $dir . '/' . $entry;
			$entry = ( $relative ? $relative . '/' : '' ) . $entry;
			$isdir = is_dir( $path );

			if ( $isdir ) {
				// check if dir is not matching an exclude pattern
				if ( $excludeDirs === false || PathUtils::matchOr( $entry, $excludePatterns ) === false ) {

					// check if we are in recursive mode
					if ( $recursive &&
						self::_walk( $path, $entry,
							$includePatterns, $excludePatterns,
							$callback, $flags, $recursive, $excludeDirs,
							$includeDirs, $includeFiles, $excludeFiles
						) === false )
					{
						return false;
					}
					
					// check if dir is matchin an include pattern
					if ( $includeDirs && PathUtils::matchOr( $entry, $includePatterns ) ) {
						if ( $callback( $entry, $isdir, $path ) === false ) {
							return true;
						}
					}

				}
			}
			else {
				
				// check if file is matching an include pattern
				if ( $includeFiles && PathUtils::matchOr( $entry, $includePatterns ) ) {
					// check if file is not matching an exclude pattern
					if ( $excludeFiles === false || PathUtils::matchOr( $entry, $excludePatterns ) === false ) {
						if ( $callback( $entry, $isdir, $path ) === false ) {
							return true;
						}
					}
				}
			
			}
		}
		closedir( $hdir );
	}

	/**
	 * Walks all entries (files, dirs or both) matching a pattern under a given path.
	 * @param string Base directory where to look for matches
	 * @param string Pattern in the format supported by {@see match()}. Could be several patterns separated by |.
	 * A second list of exclude patterns can included separated by :. include|include..:exclude|exclude..
	 * For example *.php|*.js:
	 * @param callback Callback to be notified of each mathiching entry. Accepts three arguments -
	 * first is the path of the entry relative to the base path, second is boolean if the entry is a directory -
	 * true means directory, false means file, third is the full path of the entry.
	 * Return false from the callback to cancel further processing.
	 * @param int Flags specifying the matching behaviour.
	 * @return bool false on error.
	 */
	static function walk ( $basepath, $pattern, $callback, $flags = PathUtils::WALK_DEFAULT ) {
		$pattern = explode( ':', $pattern );
		$includePatterns = explode( '|', $pattern[0] );
		$excludePatterns = isset( $pattern[1] ) ? explode( '|', $pattern[1] ) : null;
		$recursive = ( $flags & PathUtils::WALK_RECURSIVE ) > 0;
		$excludeDirs = $excludePatterns !== null && ( $flags & PathUtils::WALK_EXCLUDE_DIRS ) > 0;
		$includeDirs = ( $flags & PathUtils::WALK_INCLUDE_DIRS ) > 0;
		$includeFiles = ( $flags & PathUtils::WALK_INCLUDE_FILES ) > 0;
		$excludeFiles = $excludePatterns !== null && ( $flags & PathUtils::WALK_EXCLUDE_FILES ) > 0;

		return self::_walk ( $basepath, null,
			$includePatterns, $excludePatterns,
			$callback, $flags, $recursive, $excludeDirs,
			$includeDirs, $includeFiles, $excludeFiles
		);

	}

	/**
	 * A wrapper for {@see walk()} that returns the list of the matches.
	 * @param string {@see walk()}
	 * @param string {@see walk()}
	 * @param int {@see walk()}
	 * @return array|false False on error, array with matched entries on success. The array could be empty.
	 */
	static function listPath ( $basepath, $pattern, $flags = PathUtils::LIST_DEFAULT ) {
		$ret = [];
		$listFiles = ( $flags & PathUtils::LIST_FILES ) > 0;
		$listDirs = ( $flags & PathUtils::LIST_DIRS ) > 0;
		$listFullPath = ( $flags & PathUtils::LIST_FULL_PATH ) > 0;
		if ( PathUtils::walk( $basepath, $pattern, function ( $entry, $isdir, $path ) use ( &$ret, $listFiles, $listDirs, $listFullPath ) {
			if ( ( !$isdir && $listFiles ) || ( $isdir && $listDirs ) ) {
				$ret[] = $listFullPath ? $path : $entry;
			}
		}, $flags ) === false ) {
			return false;
		}
		return $ret;
	}

	/**
	 * Deletes a non empty directory.
	 * @param string Directory path.
	 * @return bool true on success, false on error.
	 */
	static function removeDir ( $path ) {
		if ( PathUtils::walk( $path, '**', function ( $entry, $isdir, $path ) {
			if ( $isdir ) {
				return @rmdir( $path );
			}
			else {
				return @unlink( $path );
			}
		}, PathUtils::WALK_INCLUDE_ALL | PathUtils::WALK_RECURSIVE ) === false ) {
			return false;
		}
		return @rmdir( $path );
	}
}

?>