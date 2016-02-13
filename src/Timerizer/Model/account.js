"use strict";

module.exports = function(sequelize, DataTypes)
{
	return sequelize.define("account",
	{
		id: DataTypes.INTEGER,
		uuid: DataTypes.STRING,
		names: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		created_dt: DataTypes.DATE,
		modified_dt: DataTypes.DATE
	});
};