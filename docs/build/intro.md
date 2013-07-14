phptestr
========
phptestr is framework for writing unitests for PHP and GUI for displaying the results.
The project aims to provide flexible environment that makes writing tests quick and easy.
By providing GUI environment for testing it further encourages test driven development.
The project is divided into "host" and "script" part. The host starts each test
script in a new sandbox thus ensuring no kind of error could break it and no error
will remain untraced.

Status
------
**This is release version 0.9**. It is considered beta. I've been using it for quite some time,
but it is missing a feature or two and can use some polish. At the moment I have only Windows
available so only Windows is tested, but there is nothing Windows specific in the project.


Very quick start
----------------
1. Check the screenshot in [example/screenshot.png](https://raw.github.com/Perennials/phptestr/master/example/screenshot.png).
2. Assuming you already have `PHP 5.3` or higher installed in your path.
3. Go to where you have downloaded phptestr and start `phptestr -target=example` - this should open a new browser window
  for the address `http://127.0.0.1:3355/phptestr?target=example` and show the results of the tests.

Further:
- By starting phptestr, it will create a micro server where it listens for commands from your browser.
- Examples are found in the `example` folder, they are really short, nothing requiring a lot of effort to learn.
- From these docs you are only concerned with thepackage `phptestr.test_environment` -
  this is the environment for the test scripts.
- Very quick explanation of the examples is found in the docs in the file
  `lib/test_environment.php` under the package `phptestr.test_environment` (this would be
  [docs/index.html#file/lib/test_environment.php](#file/lib/test_environment.php)).


Authors
-------
Borislav Peev (borislav.asdf at gmail dot com)


Usage
-----
Since this is tester for PHP, you need to have `PHP 5.3` or higher installed, there are no other dependencies.
If you are not using Windows, you will need to convert phptestr.bat to shell script (it is two lines long),
and also download the Node.js binary for your system. Other OS-es will be officially supported in the future.

You can start the tests in either GUI (browser) mode or CLI mode. This is selected by command line arguments.
By just starting `phptestr` it will start in GUI mode, opening your default browser and listening on a specific
port for commands issued by the browser. List of all available command line options is found below.

### Starting the tests
To start the tests just run `phptestr` and point it to the location of your tests,
e.g. `http://127.0.0.1:3355/phptestr?target=example` - this will run the example
tests that come with the project. Alternatively you can start `phptestr -target=example` directly.
The `target` argument is directory relative to the directory where phptestr is located.

If you like to run only a selection of the tests found in this directory you can add
`filter` argument. For example `http://127.0.0.1:3355/phptestr.php?target=example&filter=*_3*.php` or
`phptestr -target=example -filter=*_3*.php` will run only the files 'test\_3a.php' and 'test\_3b.php'.
Filter patterns are explained below.

Finally you can interact with the test scripts by passing them some arguments with the argument
called `args`. For example `http://127.0.0.1:3355/phptestr?target=example&filter=test_5.php&args=1&args=2`
or `phptestr -target=example -filter=test_5.php -args=1 -args=2` will start the fifth example of phptestr,
which can accept arguments, and it will display the value of 'args'.

### Detailed configuration
By loading the directory 'example', phptestr checks for the presence of a file named `phptestr.json`.
This file could be used to specify additional options for your project. None of these
settings is mandatory.

```js
{
	"dir": "",
	"init": "",
	"pattern": "*.php:.*|_*"
}
```

- `dir` - can be used to override the base directory of your scripts.
- `init` - can be used to specify initialization script for your project. E.g. to include some
  prerequisites or to boot your __autoload function.
- `pattern` - can be used to override which files will be recognized as test scripts (see below).
  The default pattern is the one above - includes all '.php' files, non recursively, excluding
  all files starting with dot or underscore.


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

So we have a nice setup and only have to run `phptestr -target=../myproject/tests`.

Be mindful that phptestr expects the error logging configuration of PHP to be in a certain way.
It sets this configuration before running a test script, but you should take care that your
init script or any library it may include will not change these settings. If you do change them
it is possible that errors in your scripts are not properly tracked. If you need to check exactly
what the error logging settings are check the file 'lib/run_test_script.php'. Additionally, your
scripts should not output anything to the console (stdout) or you will get errors in your tests.
If you need to output something while testing use the appropriate functions provided by the
test environment.

### Writing tests
Test are created by writing PHP files describing groups of test conditions. The groups
are called "test cases". And each condition is a test. The simplest test looks like this (the name is optional):

```php
<?
testCase( 'My Test', function () {
	test( true ); //this condition will pass
	test( false ); //this condition will fail so will the test case
} );
?>
```
For overview of all supported functions in the test environment (e.g. testCase(), test(), etc.)
look in the docs for file **'test\_environment.php'** under the package
**'phptestr.test\_environment'**. In this file you will find short overview of all functions
with examples how to use them. These examples are found as working scripts in the *example* subfolder
of phptestr. In the docs, under the same section, you can also check the reference for each
individual function.


### Using the GUI
Starting `phptestr -target=example` will show the results in a simple graphical interface. Each test script
is represented by a box with the title of the file. Scripts that passed all tests will be
green and will be collapsed by default. You can expand them by clicking on the title.
Scripts which failed to pass all tests or have errors in them will be put on the top of the list
and will be expanded by default. In the test script you will see green boxes with the names
all test cases that were successful. Test cases that were not successful are red and will display
what failed or what the error was and on which line of the script it happened. Sometimes you
can find additional details if there is a link "exception..." or "trace..." in the box. This
information will be shown in the browser console. There is additional link called "extract..." next
to the title of the file. This will open the selected script, without other scripts,
in a new browser tab. Useful while developing or debugging. Information echoed by the scripts will be shown
in yellow boxes.

Screenshot of the results of the example tests can be found in [example/screenshot.png](https://raw.github.com/Perennials/phptestr/master/example/screenshot.png).

The GUI is tested only on Google Chrome at the moment, but there is no reason other browsers wouldn't work.


Command line options
--------------------

```
phptestr [OPTIONS]
```

Where **OPTIONS** is:

```
-target=directory
```
Directory where to look for tests or phptestr.json. Optional when starting in GUI mode as
it can be chosen from the browser.

```
-cli
```
Optional. Will not start a browser but run the tests and display the results in the console. This
mode does not support all features and is meant for automation.

```
-phpbin=path
```
Optional. Path to the PHP binary to use for starting the tests. Defaults to 'php' and it must be installed
in the system path for the default to work.

```
-host=hostname
-port=portnumber
```
Optional, only supported in GUI mode. Will make phptestr listen for browser commands on a different host (ip)
and port. Defaults to 127.0.0.1:3355 .


Internals
---------

### Testing the tester
`phptestr test` will check that phptestr is working as expected.