"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var config = require(APPROOT + 'config/settings');

var database = config.database;
var sequelize = new Sequelize(database.name, database.user, database.password,
{
	host: database.host,
	dialect: 'mysql',
	omitNull: true,
	define: {
		freezeTableName: true,
		timestamps: false,
	}
});

var db = {};

fs.readdirSync(__dirname)
	.filter(function(file)
	{
		return (file.indexOf(".") !== 0) && (file !== "index.js");
	})
	.forEach(function(file)
	{
		var model = sequelize["import"](path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach(function(modelName)
{
	if ("associate" in db[modelName])
	{
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;