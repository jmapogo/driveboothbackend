/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('ref_lesson_status', {
		Lesson_Status_Code: {
			type: DataTypes.STRING(200),
			allowNull: false,
			primaryKey: true
		},
		Lesson_Status_Description: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		IsActive: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: true
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'ref_lesson_status',
		freezeTableName: true,
		underscored: true,
		timestamps: false
	});
};
