<?

$basedir = \PathUtils::relativePath( getcwd(), realpath( __DIR__ . '/..' ) );

?>
<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="<?= $basedir ?>/view/view.css" />
		<script type="text/javascript" src="<?= $basedir ?>/view/jquery-1.8.3.min.js"></script>
		<script type="text/javascript" src="<?= $basedir ?>/view/view.js"></script>
	</head>
	<body>
		<div id="failed"></div>
		<div id="success"></div>
		
<?
	$tests->run( function( $tests, $script, $result, $last ) {
		if ( $last ) {
			return;
		}
		echo '<script type="text/javascript"> ScriptRunResult(', json_encode( $script ), ', ', json_encode( $result ), '); </script>';
		flush();
	} );
?>
	</body>
</html>