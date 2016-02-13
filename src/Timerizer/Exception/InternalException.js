function InternalException()
{
	this.code = 500;
	this.statucCode = this.INTERNAL_ERROR;
	this.message = 'Internal error. Try later.';
}

require('util').inherits(InternalException, require("./ApiException"));

module.exports = InternalException;