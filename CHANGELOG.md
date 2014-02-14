1.1
---

- phptestr can be started without any arguments and it will autodetect `phptestr.json` in the working directory.
- Added `-noexit`.
- Added `-remotemode`.
- `-target` can accept full path to json file, not only directory.
- Misc GUI improvements and fixes.

1.0
---

- New UI based on [docviewjs](https://github.com/Perennials/docviewjs).
- Added stack traces display in the UI.
- Added code coverage support via xdebug.
- Added -coverage option.
- Added -phpini option.
- Added default configuration in phptestr/phptestr.json.
- Added the ability to configure the PHP installation in use from phptestr.json.

0.9
---

- Moved the test host to Node.js. No web server is needed to run the GUI anymore.
- Added CLI mode.
- Bumped down the required PHP version to 5.3.
- Fixed the "extract..." link for scripts with arguments to use these arguments.

0.8
---

First public release.