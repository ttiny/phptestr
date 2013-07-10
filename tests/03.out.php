<?
return [
	
	realpath(__DIR__ . '/' . basename(__FILE__, '.out.php') . '.in.php') =>
	[
		[
			'Args' => null,
		],
		[
			'Args' => 1,
			'Echo' => [1]
		],
		[
			'Args' => 2,
		],
		[
			'Args' => 2,
			'Errors' => [['Code' => 'INFINITE_RERUN']]
		]
	]

];
?>