"use strict";

module.exports = function(sequelize, DataTypes)
{
	return sequelize.define("provider",
	{
		id: DataTypes.INTEGER,
		name: DataTypes.STRING
	});
};