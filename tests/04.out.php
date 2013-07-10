<?
return [
	
	realpath(__DIR__ . '/' . basename(__FILE__, '.out.php') . '.in.php') =>
	[
		[
			'Args' => null,
			'Errors' => [
				['Code' => 'UNPREDICTED_ERROR'],
				//['Code' => 'ERROR_LOG', 'Value' => 'Call to a member function fatalError() on a non-object']
			],
		]
	]

];
?>