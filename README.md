phptestr
========
A framework and GUI for writing unitests for PHP.

For complete information and quick start download the package and open docs/index.html or
alternatively the documentation is available online at <http://perennials.github.io/phptestr> .

Features:
- Easy to start and use, no dependecies to install
- Short and uncomplicated tests 
- Code coverage

What does the GUI look like?
----------------------------

![Screenshot](https://raw.github.com/Perennials/phptestr/master/example/screenshot.png)

What does a test look like?
---------------------------

```php
<?

testCase( 'My Test', function () {
	test( true ); //this condition will pass
	test( false ); //this condition will fail so will the test case
} );

?>
```

### Credits
Third-party software used:
- [Highlight.js](https://github.com/isagalaev/highlight.js)
- [node-open](https://github.com/pwnall/node-open)

### Authors
Borislav Peev (borislav.asdf at gmail dot com)
