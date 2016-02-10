var AbstractBrick = require(APPROOT + "src/Lego/AbstractBrick");

function TestBrick(db, orm, bus)
{
	AbstractBrick.call(this, 'TestBrick');

	this.db = db;
	this.orm = orm;
	this.bus = bus;
}

// Extends from AbstractBrick
require('util').inherits(CreateLocationHandler , AbstractBrick);

TestBrick.fromContainer = function(Container)
{
	return new TestBrick(
		Container['db'],
		Container['orm'],
		Container['bus']
	);
};

TestBrick.prototype.exe = function(next) {
	next(true);
	return;
};