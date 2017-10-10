/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('client', {
		Client_ID: {
			type: DataTypes.STRING(200),
			allowNull: false,
			primaryKey: true
		},
		Date_Became_Customer: {
			type: DataTypes.DATE,
			allowNull: true
		},
		Date_Last_Contact: {
			type: DataTypes.DATE,
			allowNull: true
		},
		Date_Of_Birth: {
			type: DataTypes.DATE,
			allowNull: true
		},
		First_Name: {
			type: DataTypes.STRING(200),
			allowNull: true
		},
		Middle_Name: {
			type: DataTypes.STRING(200),
			allowNull: true
		},
		Email_Address: {
			type: DataTypes.STRING(200),
			allowNull: true
		},
		Home_Phone_Number: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		Cell_Mobile_Phone_Number: {
			type: DataTypes.STRING(20),
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
		Address_ID: {
			type: DataTypes.STRING(200),
			allowNull: false,
			references: {
				model: 'address',
				key: 'Address_ID'
			}
		},
		Office_ID: {
			type: DataTypes.STRING(200),
			allowNull: false,
			references: {
				model: 'office',
				key: 'Office_ID'
			}
		},
		Contact_ID: {
			type: DataTypes.STRING(200),
			allowNull: false,
			references: {
				model: 'contact',
				key: 'Contact_ID'
			}
		}
	}, {
		tableName: 'client',
		freezeTableName: true,
		underscored: true,
		timestamps: false
	});
};
