/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('ref_job_title', {
		Job_Title_Code: {
			type: DataTypes.STRING(200),
			allowNull: false,
			primaryKey: true
		},
		Job_Title_Description: {
			type: DataTypes.STRING(200),
			allowNull: true
		},
		IsActive: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: true
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'ref_job_title',
		freezeTableName: true,
		underscored: true,
		timestamps: false
	});
};
