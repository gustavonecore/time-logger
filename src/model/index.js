"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var config = require('config');

var env = config.get('enviroment');
var database = config.get('database');
var sequelize = new Sequelize(database[env].name, database[env].user, database[env].password,
{
	host: database[env].host,
	dialect: 'mysql',
	omitNull: true,
	define: {
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