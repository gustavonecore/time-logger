var LegoError = require("./LegoError");

function BrickNotFoundError(name)
{
	this.message = 'Brick ' + name + ' not defined';
	this.code = LegoError.BRICK_NOT_FOUND;
}

// Extends from LegoError
require('util').inherits(BrickNotFoundError , LegoError);

module.exports = BrickNotFoundError;