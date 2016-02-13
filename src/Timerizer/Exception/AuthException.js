function AuthException(message)
{
	this.code = 403;
	this.statucCode = this.AUTHORIZATION;
	this.message = 'Authtentication fail ' + (message ? message : '');
}

require('util').inherits(AuthException, require("./ApiException"));

module.exports = AuthException;