<?
return [
	
	realpath(__DIR__ . '/' . basename(__FILE__, '.out.php') . '.in.php') =>
	[
		[
			'Args' => null,
			'Errors' => [
				[
					'Code' => 'FAILED_EXPECTATIONS_NOT_MET',
					'Value' => 'Test case was expected to produce some predefined output, but it didn\'t',
					'Details' => ['Case' => 1, 'Line' => 5]
				],
			]
		]
	]

];
?>