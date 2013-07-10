<?
return [
	
	realpath(__DIR__ . '/' . basename(__FILE__, '.out.php') . '.in.php') =>
	[
		[
			'Args' => null,
			'Errors' => [
				[
					'Code' => 'UNEXPECTED_OUTPUT',
					'Value' => "At index 1; Expected: 2, Found: 3\n\nExpected: [1,2,3]\nOutput: [1,3]",
					'Details' => ['Case' => 1, 'Line' => 7]
				]
			]
		]
	]

];
?>