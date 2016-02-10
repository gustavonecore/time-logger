"use strict";

module.exports = function(sequelize, DataTypes)
{
	return sequelize.define("timesheet",
	{
		id: DataTypes.INTEGER,
		task_pool_id: DataTypes.INTEGER,
		user_id: DataTypes.INTEGER,
		id: DataTypes.INTEGER,
		description: DataTypes.STRING,
		start_date: DataTypes.DATEONLY,
		start_time: DataTypes.TIME,
		duration: DataTypes.TIME,
		created_dt: DataTypes.NOW,
		modified_dt: DataTypes.DATE,
	});
};