<?
return [
	
	realpath(__DIR__ . '/' . basename(__FILE__, '.out.php') . '.in.php') =>
	[
		[
			'Args' => null,
			'Errors' => [
				[
					'Code' => 'FAILED_DID_NOT_CRASH',
					'Value' => 'Test script was expected to crash, but didn\'t',
					'Details' => ['Case' => 1, 'Line' => 5]
				]
			]
		]
	]

];
?>