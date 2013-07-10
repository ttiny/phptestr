phptestr
========
phptestr is framework for writing unitests for PHP and GUI for displaying the results.
The project aims to provide flexible environment that makes writing tests quick and easy.
By providing GUI environment for testing it further encourages test driven development.
The project is divided into "host" and "script" part. The host forks itself and starts
each script in a new process thus ensuring no kind of error could break it and no error
will remain untraced.

Very quick start
----------------
1. Check the screenshot in [example/screenshot.png](https://raw.github.com/Perennials/phptestr/master/example/screenshot.png).
2. Assuming you already have `PHP 5.4 server`, put phptestr on your server,
   _there are no other dependencies_.
3. Open [phptestr.php?target=example](../phptestr.php?target=example) in your browser.

Further:
- Examples are found in the `example` folder, they are really short,
  nothing special to learn.
- From these docs you are only concerned with thepackage `phptestr.test_environment` -
  this is the environment for the test scripts.
- Very quick explanation of the examples is found in the docs in the file
  `lib/test_environment.php` under the package `phptestr.test_environment` (this would be
  [docs/index.html#file/lib/test_environment.php](#file/lib/test_environment.php)).
- There are some more unitests in 'lib/travelsdk-core-php/tests' which are part of another
  library (actually phptestr was developed because of this library).

Status
------
This is release version 0.8. It is the first public release and is considered beta. I've
been using it for quite some time, but it is missing a feature or two and can use some polish.
At the moment I have only Windows available so only Windows is tested, but (of course)
there is nothing Windows specific in the project.

Usage
-----
At the moment the project requires a web server with `PHP 5.4` to run, no other dependencies.
CLI mode was developed and tested at earlier stages, but it is not supported at the moment
as the GUI is the favoured environment for testing. The CLI code remains and is scheduled
for resurrection in next releases.

### Starting the tests
To start the tests just load *phptestr.php* from the server and point it to the location
of your tests, e.g. [phptestr.php?target=example](../phptestr.php?target=example) - this will
start the example tests that come with the project. The `target` argument is directory
relative to the directory where phptestr is located. This argument defaults to the current
working directory, but only if there is `phptestr.json` found in there, otherwise the `target`
argument must be specified explicitly.

If you like to run only a selection of the tests found in this directory you can add
`filter` argument. For example [phptestr.php?target=example&filter=*_3*.php](../phptestr.php?target=example&filter=*_3*.php)
will run only the files 'test\_3a.php' and 'test\_3b.php'. Filter patterns are explained below.

Finally you can interact with the test scripts by passing them some arguments with the argument
called `args`. For example [phptestr/phptestr.php?target=example&filter=test_5.php&args=1](../phptestr.php?target=example&filter=test_5.php&args=1)
will start the fifth example of phptestr, which can accept arguments, and it will display the value
of 'args'. You can pass multiple arguments as you normally would to a PHP web script `&args[]=1&args[]=2`.

### Detailed configuration
By loading the directory 'example', phptestr checks for the presence of a file named `phptestr.json`.
This file could be used to specify additional options for your project. None of these
settings is mandatory.

```js
{
	"dir": "",
	"init": "",
	"pattern": "*.php:_*"
}
```

- `dir` - can be used to override the base directory of your scripts.
- `init` - can be used to specify initialization script for your project. E.g. to include some
  prerequisites or to boot your __autoload function.
- `pattern` - can be used to override which files will be recognized as test scripts (see below).
  The default pattern is the one above - includes all '.php' files, non recursively, excluding
  all files starting with underscore.


### Wildcard patterns
Patterns are simple regular expressions. `*` matches everything but forward slash `/`, and `**`
matches everything. Non greedy and only forward slashes are supported (they work fine on Windows).
For example `*.php` will match all files with extension 'php' in the same directory. `**.php`
will match all files with extension 'php' in the same directory and all sub directories. Multiple
patterns can be delimited with a pipe `|`. For example `*.php4|*.php5` will match all files 
with extension 'php4' or 'php5'. Additionally a list of exclude patterns can be appended after a
colon `:`. Files and directories matching one of the exclude patterns will be filtered out.


### To sum up the preparation
Lets say we have a folder named 'tests' where we will place our test scripts. We create a file named
`phptestr.json` in this folder and place this inside the file:

```js
{
	"init": "init_tests.php",
	"pattern": "**/**.php:_*|**/_*"
}
```
This will tell `phptestr` to test all files with extension 'php' in all subfolders, but not in the
same folder (we don't want our init script to be treated as a test script) and also to include a
file named 'init_tests.php' before loading each test script.

So we have a nice setup and only have to open `http://localhost/phptestr/phptestr.php?target=../myproject/tests`.


### Writing tests
Test are created by writing PHP files describing groups of test conditions. The groups
are called "test cases". And each condition is a test. The simplest test looks like this:

```php
<?
testCase( function () {
	test( false ); //this condition will fail so will the test case
} );
?>
```
For overview of all supported functions in the test environment, that is the functions available
to your test scripts look in the docs for file **'test\_environment.php'** under the package
**'phptestr.test\_environment'**. In this file you will find short overview of all functions
with examples how to use them. These examples are found as working scripts in the *example* subfolder
of phptestr. In the docs, under the same section, you can also check the reference for each
individual function.


### Using the GUI
Loading `phptestr.php` will show the results in a simple graphical interface. Each test script
is represented by a box with the title of the file. Scripts that passed all tests will be
green and will be collapsed by default. You can expand them by clicking on the title.
Scripts which failed to pass all tests or have errors in them will be put on the top of the list
and will be expanded by default. In the test script you will see green boxes with the names
all test cases that were successful. Test cases that were not successful are red and will display
what failed or what the error was and on which line of the script it happened. Sometimes you
can find additional details if there is a link "exception..." or "trace..." in the box. This
information will be shown in the browser console. There is additional link called "extract..." next
to the title of the file. This will open the selected script, without other scripts,
in a new browser tab. Useful while debugging. Information echoed by the scripts will be shown
in yellow boxes.

Screenshot of the results of the example tests can be found in [example/screenshot.png](https://raw.github.com/Perennials/phptestr/master/example/screenshot.png).

The GUI is tested only on Google Chrome but there is no reason other browsers wouldn't work.


Internals
---------

### Testing the tester
Loading the file [tests.php](../tests.php) will check that phptestr is working as expected.

### Even more internals
Further documentation can be found in the docs under the package `phptestr.host`.