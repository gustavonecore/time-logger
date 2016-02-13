"use strict";

module.exports = function(sequelize, DataTypes)
{
	return sequelize.define("project",
	{
		id: DataTypes.INTEGER,
		name: DataTypes.STRING,
		uuid: DataTypes.STRING
	});
};