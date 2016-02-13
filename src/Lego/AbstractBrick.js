var path = require('path');

function AbstractBrick(name)
{
	if (!name)
	{
		throw 'You must define the name of the Command';
	}

	this.name = name;
}

AbstractBrick.prototype = {
	name: null,
	params: null,

	fromContainer: function(services){
		throw 'You must implement the [fromContainer] method';
	},
	getName: function(){
		return this.name;
	},
	getPath: function(){
		return path.resolve(__dirname);
	},
	exe: function(options){
		throw 'You must implement the [exec] method';
	},
	setParams: function(params)
	{
		this.params = params;
	}
};

module.exports = AbstractBrick;