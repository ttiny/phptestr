@SET NODE_PATH=%~dp0\lib\node_modules;%~dp0\view\docviewjs\deps\node\node_modules
@SET NODE_BIN=%~dp0\view\docviewjs\deps\node\node.exe
@IF "%1" == "test" (
	"%NODE_BIN%" "%~dp0tests.js" %*
) ELSE  (
	"%NODE_BIN%" "%~dp0phptestr.js" %*
)