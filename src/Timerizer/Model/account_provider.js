"use strict";

module.exports = function(sequelize, DataTypes)
{
	return sequelize.define("account_provider",
	{
		id: DataTypes.INTEGER,
		account_id: DataTypes.INTEGER,
		provider_id: DataTypes.INTEGER,
		username: DataTypes.STRING,
		password: DataTypes.STRING,
		created_dt: DataTypes.DATE
	});
};