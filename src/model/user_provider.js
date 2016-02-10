"use strict";

module.exports = function(sequelize, DataTypes)
{
	return sequelize.define("user_provider",
	{
		id: DataTypes.INTEGER,
		user_id: DataTypes.INTEGER,
		provider_id: DataTypes.INTEGER,
		username: DataTypes.STRING,
		password: DataTypes.STRING,
		created_dt: DataTypes.DATE
	});
};