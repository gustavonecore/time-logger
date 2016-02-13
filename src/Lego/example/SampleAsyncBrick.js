var AbstractBrick = require("../AbstractBrick");
var Builder = require("../Builder");

function SampleAsyncBrick(db, orm, builder)
{
	AbstractBrick.call(this, 'SampleAsyncBrick');

	this.db = db;
	this.orm = orm;
	this.builder = builder;
}

require('util').inherits(SampleAsyncBrick , AbstractBrick);

SampleAsyncBrick.fromContainer = function(Container)
{
	return new SampleAsyncBrick(
		Container['db'],
		Container['orm'],
		Container['builder']
	);
};

SampleAsyncBrick.prototype.exe = function(params, next) {
	var self = this;

	this.db.query({}, function(err, response)
	{
		if (err)
		{
			try
			{
				self.builder.process('sample', {
					data1:1,
					data2:2,
					data3:3});
			}
			catch(e)
			{
				console.log('Exception ', e)
				next(e);
				return;
			}

			next(err);
			return;
		}

		next(null, response);
	});
};

Builder.registerBrick('SampleAsyncBrick', SampleAsyncBrick);

module.exports = SampleAsyncBrick;