var CommandInflector = require(APPROOT + 'src/Libs/Filter/CommandInflector');

function Filter(Request, Fields)
{
	if (!Request)
	{
		throw 'You must define the request param for Filter';
	}

	if (!Fields)
	{
		throw 'You must define the request param for Filter';
	}

	this.request = Request;
	this.fields = Fields;
	this.sanitize = null;
	this.required = null;

	// Simple stdout log if no one is configured
	Log = {
		error: function(msg)
		{
			console.log('ERROR: ' + msg)
		},
		info: function(msg)
		{
			console.log('INFO: ' + msg)
		},
		warn: function(msg)
		{
			console.log('WARN: ' + msg)
		}
	};

	this.inflector = new CommandInflector();
}

Filter.prototype.inflector = null;

Filter.prototype.logger = null;

Filter.prototype.errors = [];

Filter.prototype.required = [];

Filter.prototype.sanitize = [];

Filter.prototype.request = null;

Filter.prototype.fields = {};

Filter.prototype.requiredFields = function(requiredFields)
{
	this.required = requiredFields;
}

// TODO Deprecated
Filter.prototype.setLogger = function(logger)
{
	//Log = logger;
}

Filter.prototype.has = function(field)
{
	return this.request[field] ? true : false;
}

Filter.prototype.getValue = function(field)
{
	try
	{
		if (typeof this.fields[field] === 'undefined')
		{
			throw 'You must define the field: ' + field + ' in the filter';
		}

		var type = this.fields[field];
		var value = this.request[field];

		var sanitizer = this.inflector.getSanitizer(type);
		this.request[field] = sanitizer(value);
	}
	catch(e)
	{
		Log.error('Exception for getValue');
		Log.error(e);
		throw e;
	}

	return this.request[field];
}

Filter.prototype.getInvalidFields = function()
{
	return this.errors;
}

Filter.prototype.validate = function()
{
	var self = this;
	self.errors = [];
	for (var i in self.required)
	{
		var required = self.required[i];
		if (!self.request[required])
		{
			self.errors.push(required);
		}
	}

	if (self.errors.length > 0)
	{
		return false;
	}

	return true;
}

module.exports = Filter;