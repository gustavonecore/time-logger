var AbstractBrick = require("../AbstractBrick");
var Builder = require("../Builder");

function SampleBrick(db, orm, bus)
{
	AbstractBrick.call(this, 'SampleBrick');

	this.db = db;
	this.orm = orm;
	this.bus = bus;
}

require('util').inherits(SampleBrick , AbstractBrick);

SampleBrick.fromContainer = function(Container)
{
	return new SampleBrick(
		Container['db'],
		Container['orm'],
		Container['bus']
	);
};

SampleBrick.prototype.exe = function(params, next)
{
	if (!params['data1'])
	{
		next({
			message:'data1 not defined',
			error: true
		});
		return;
	}

	next(null, {success:true});
	return;
};

Builder.registerBrick('SampleBrick', SampleBrick);

module.exports = SampleBrick;