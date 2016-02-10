
function LegoError()
{
}

LegoError.BRICK_NOT_FOUND = 0;
LegoError.INVALID_CALLBACK = 1;

LegoError.prototype = {
	message: null,
	code: null
};

module.exports = LegoError;