/*
* Command validator Inflector, for supported types
* use https://github.com/chriso/validator.js
*
*/

var validator = require('validator');

validator.array = function(data)
{
	if (typeof data === 'undefined')
	{
		throw 'Undefined data in array sanitizer';
	}

	if (!(data instanceof Array))
	{
		return [];
	}
	else
	{
		return data;
	}
};

function CommandInflector()
{
}

CommandInflector.prototype.getSanitizer = function(type)
{
	var command = 'to' + this.capitalize(type);
	if (!validator[command])
	{
		command = type.toLowerCase();
		if (!validator[command])
		{
			throw 'The sanitizer=[' + type + '] is not supported. Use https://github.com/chriso/validator.js';
		}
	}
	return validator[command];
}

CommandInflector.prototype.capitalize = function(str)
{
	return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = CommandInflector;