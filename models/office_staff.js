/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('office_staff', {
		Office_Staff_ID: {
			type: DataTypes.STRING(200),
			allowNull: false,
			primaryKey: true
		},
		Date_From: {
			type: DataTypes.DATE,
			allowNull: true
		},
		Date_To: {
			type: DataTypes.DATE,
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
		},
		Job_Title_Code: {
			type: DataTypes.STRING(200),
			allowNull: false,
			references: {
				model: 'ref_job_title',
				key: 'Job_Title_Code'
			}
		},
		Staff_ID: {
			type: DataTypes.STRING(200),
			allowNull: false,
			references: {
				model: 'staff',
				key: 'Staff_ID'
			}
		}
	}, {
		tableName: 'office_staff',
		freezeTableName: true,
		underscored: true,
		timestamps: false
	});
};
