<?
// testing unhandled exception


function asd ( $c ) {
	if ( $c == 5 ) {
		throw new Exception();
	}
}

function qwe ( $a, $b ) {
	asd( $a - $b );
}

qwe( 10, 5 );
?>