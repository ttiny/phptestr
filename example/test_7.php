<?
// testing unprediccted error


function asd () {
	throw new Exception();
}

function qwe () {
	asd();
}

qwe();
?>