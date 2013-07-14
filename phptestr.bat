@SET NODE_PATH=%~dp0\node\node_modules
@SET NODE_BIN=%~dp0\node\node.exe
@IF "%1" == "test" (
	"%NODE_BIN%" "%~dp0tests.js" %*
) ELSE  (
	"%NODE_BIN%" "%~dp0phptestr.js" %*
)