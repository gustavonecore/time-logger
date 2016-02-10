var LegoError = require("./LegoError");

function InvalidCallbackError()
{
	this.message = 'Invalid callback';
	this.code = this.INVALID_CLLBACK;
}

// Extends from LegoError
require('util').inherits(InvalidCallbackError , LegoError);

module.exports = InvalidCallbackError;