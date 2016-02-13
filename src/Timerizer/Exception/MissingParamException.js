function MissingParamException(param){
	this.code = 400;
	this.statucCode = this.MISSING_PARAMETER;
	this.message = 'Missing param(s)' + (param ? ' [' + param + ']' : '');
}

require('util').inherits(MissingParamException, require("./ApiException"));

module.exports = MissingParamException;