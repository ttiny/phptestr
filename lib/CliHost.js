"use strict";

function CliHost ( argv, callback ) {
	callback( argv, process.stdout, function () {} );
}

module.exports = CliHost;