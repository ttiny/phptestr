<?
return [
	
	realpath(__DIR__ . '/' . basename(__FILE__, '.out.php') . '.in.php') =>
	[
		[
			'Args' => null,
			'Errors' => [
				[
					'Code' => 'TESTCASE_FAILED',
					'Value' => 'true is not false',
					'Details' => [
						'Case' => 3,
						'Line' => 14,
					],
				]
			]
		]
	]

];
?>