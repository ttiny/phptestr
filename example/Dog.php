<?

function SomeFunction ( $flag ) {
	if ( $flag === true ) {
		$dog = new Dog();
		$dog->ai( $dog );
	}
}

function CallSomeFunction () {
	SomeFunction( true );
}

function CauseDogException () {
	CallSomeFunction();
}

class Dog {

	public $x = 0;

	const RANGE = 10;

	function ai ( $cat ) {
		if ( !($cat instanceof Cat) ) {
			throw new Exception( 'Not a Cat' );
		}
		else {
			if ( $cat->x <= $this->x + self::RANGE ) {
				$cat->chase( true );
			}
			else {
				$cat->chase( false );
			}
		}
	}
}

?>