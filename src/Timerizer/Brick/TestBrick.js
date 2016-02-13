var AbstractBrick = require(APPROOT + "src/Lego/AbstractBrick");
var Builder = require(APPROOT + "src/Lego/Builder");

function TestBrick(db, orm, builder)
{
	AbstractBrick.call(this, 'TestBrick');

	this.db = db;
	this.orm = orm;
	this.builder = builder;
}

// Extends from AbstractBrick
require('util').inherits(TestBrick , AbstractBrick);

TestBrick.fromContainer = function(Container)
{
	return new TestBrick(
		Container['db'],
		Container['orm'],
		Container['builder']
	);
};

TestBrick.prototype.exe = function(params, next)
{
	var self = this;

	self.db.query('SELECT * FROM project',
	{
		replacements: {},
		type: 'SELECT' // @todo - replace this with the proper Sequelize QueryType
	})
	.then(function(response)
	{
		return next(null, response);
	})
	.catch(function(e)
	{
		return next(e);
	});
};

Builder.registerBrick('TestBrick', TestBrick);

module.exports = TestBrick;