@SET PHPTESTR_PATH=%~dp0..\..
@SET JSDOCGEN_PATH=%PHPTESTR_PATH%\..\jsdocgen
@CALL %JSDOCGEN_PATH%\jsdocgen -lang=php -outdir=%~dp0..\docs -projectdir=%PHPTESTR_PATH% -pattern=lib/php/test_environment.php -intro=%PHPTESTR_PATH%\README.md -strict
@CALL %JSDOCGEN_PATH%\jsdocgen build -lang=php -outdir=%~dp0.. -def=ProjectName:phptestr -def="ProjectSubtitle:Unitest framework and GUI for PHP"