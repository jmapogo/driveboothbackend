/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('vehicle', {
		Vehicle_Reg_Number: {
			type: DataTypes.STRING(200),
			allowNull: false,
			primaryKey: true
		},
		Make: {
			type: DataTypes.STRING(200),
			allowNull: true
		},
		Model: {
			type: DataTypes.STRING(200),
			allowNull: true
		},
		Type: {
			type: DataTypes.STRING(200),
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
		},
		Office_ID: {
			type: DataTypes.STRING(200),
			allowNull: false,
			references: {
				model: 'office',
				key: 'Office_ID'
			}
		}
	}, {
		tableName: 'vehicle',
		freezeTableName: true,
		underscored: true,
		timestamps: false
	});
};
