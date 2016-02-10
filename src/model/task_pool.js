"use strict";

module.exports = function(sequelize, DataTypes)
{
	return sequelize.define("task_pool",
	{
		id: DataTypes.INTEGER,
		provider_id: DataTypes.INTEGER,
		title: DataTypes.STRING,
		description: DataTypes.STRING,
		project: DataTypes.STRING,
		branch: DataTypes.STRING,
		code: DataTypes.STRING,
		type: DataTypes.STRING,
		status: DataTypes.STRING,
		used: DataTypes.BOOLEAN,
		used_dt	: DataTypes.DATE,
		created_dt: DataTypes.DATE,
		extraction_dt: DataTypes.DATE
	});
};