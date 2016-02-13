"use strict";

module.exports = function(sequelize, DataTypes)
{
	return sequelize.define("timesheet",
	{
		id: DataTypes.INTEGER,
		uuid: DataTypes.STRING,
		task_pool_id: DataTypes.INTEGER,
		account_id: DataTypes.INTEGER,
		project_id: DataTypes.INTEGER,
		description: DataTypes.STRING,
		start_date: DataTypes.DATEONLY,
		start_time: DataTypes.TIME,
		duration: DataTypes.TIME,
		created_dt: DataTypes.DATE,
		modified_dt: DataTypes.DATE
	});
};