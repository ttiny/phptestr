<?

require __DIR__ . '/Cat.php';
require __DIR__ . '/Dog.php';

testCase( 'Dog chases cat', function () {
  $dog = new Dog();
  $cat = new Cat();
  do {
    $dog->ai( $cat );
  }
  while ( $cat->ai() );
} );


testCase( 'Dog chases null', function () {
  $dog = new Dog();
  try { $dog->ai( null ); }
  catch ( Exception $e ) {}
} );


testCase( 'Dog exception', function () {
  CauseDogException();
} );

?>