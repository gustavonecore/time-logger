var AbstractBrick = require(APPROOT + "src/Lego/AbstractBrick");
var Builder = require(APPROOT + "src/Lego/Builder");

function GetAccountByUuidBrick(db, orm, builder)
{
	AbstractBrick.call(this, 'GetAccountByUuidBrick');

	this.db = db;
	this.orm = orm;
	this.builder = builder;
}

// Extends from AbstractBrick
require('util').inherits(GetAccountByUuidBrick , AbstractBrick);

GetAccountByUuidBrick.fromContainer = function(Container)
{
	return new GetAccountByUuidBrick(
		Container['db'],
		Container['orm'],
		Container['builder']
	);
};

GetAccountByUuidBrick.prototype.exe = function(params, next)
{
	var self = this;

	self.orm['account'].
	findOne({ where: {uuid: params.uuid} })
	.then(function(account)
	{
		next(null, {
			account: account
		});
	})
	.catch(function(e)
	{
		return next(e);
	});
};

Builder.registerBrick('GetAccountByUuidBrick', GetAccountByUuidBrick);

module.exports = GetAccountByUuidBrick;