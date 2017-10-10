/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('office', {
		Office_ID: {
			type: DataTypes.STRING(200),
			allowNull: false,
			primaryKey: true
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
		},
		Office_Name: {
			type: DataTypes.STRING(200),
			allowNull: true
		},
		Address_ID: {
			type: DataTypes.STRING(200),
			allowNull: false,
			references: {
				model: 'address',
				key: 'Address_ID'
			}
		}
	}, {
		tableName: 'office',
		freezeTableName: true,
		underscored: true,
		timestamps: false
	});
};
