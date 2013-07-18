<?

class Cat {

  public $x = 0;
  protected $isChasedByDog = false;

  function ai () {
    if ( $this->isChasedByDog ) {
      $this->run();
      return true;
    }
    return false;
  }

  function run () {
    ++$this->x;
  }

  function chase ( $isChasedByDog ) {
    $this->isChasedByDog = $isChasedByDog;
  }
}

?>