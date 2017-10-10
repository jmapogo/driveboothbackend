/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('lessons', {
		Lesson_ID: {
			type: DataTypes.STRING(200),
			allowNull: false,
			primaryKey: true
		},
		Lesson_DateTime: {
			type: DataTypes.DATE,
			allowNull: true
		},
		Fee: {
			type: "DOUBLE",
			allowNull: true
		},
		Client_Progress_Made: {
			type: DataTypes.STRING(200),
			allowNull: true
		},
		Mileage_Used: {
			type: "DOUBLE",
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
		},
		Client_ID: {
			type: DataTypes.STRING(200),
			allowNull: false,
			references: {
				model: 'client',
				key: 'Client_ID'
			}
		},
		Staff_ID: {
			type: DataTypes.STRING(200),
			allowNull: false,
			references: {
				model: 'staff',
				key: 'Staff_ID'
			}
		},
		Lesson_Status_Code: {
			type: DataTypes.STRING(200),
			allowNull: false,
			references: {
				model: 'ref_lesson_status',
				key: 'Lesson_Status_Code'
			}
		},
		Vehicle_Reg_Number: {
			type: DataTypes.STRING(200),
			allowNull: false,
			references: {
				model: 'vehicle',
				key: 'Vehicle_Reg_Number'
			}
		}
	}, {
		tableName: 'lessons',
		freezeTableName: true,
		underscored: true,
		timestamps: false
	});
};
