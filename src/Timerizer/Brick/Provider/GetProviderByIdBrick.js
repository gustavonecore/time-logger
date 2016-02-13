var AbstractBrick = require(APPROOT + "src/Lego/AbstractBrick");
var Builder = require(APPROOT + "src/Lego/Builder");

function GetProviderByIdBrick(db, orm, builder)
{
	AbstractBrick.call(this, 'GetProviderByIdBrick');

	this.db = db;
	this.orm = orm;
	this.builder = builder;
}

// Extends from AbstractBrick
require('util').inherits(GetProviderByIdBrick , AbstractBrick);

GetProviderByIdBrick.fromContainer = function(Container)
{
	return new GetProviderByIdBrick(
		Container['db'],
		Container['orm'],
		Container['builder']
	);
};

GetProviderByIdBrick.prototype.exe = function(params, next)
{
	var self = this;

	self.orm['provider'].
	findOne({ where: {id: params.id} })
	.then(function(provider)
	{
		next(null, {
			provider: provider
		});
	})
	.catch(function(e)
	{
		return next(e);
	});
};

Builder.registerBrick('GetProviderByIdBrick', GetProviderByIdBrick);

module.exports = GetProviderByIdBrick;