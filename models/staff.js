/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('staff', {
    Staff_ID: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Nickname: {
      type: DataTypes.STRING(200),
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
    Last_Name: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    Date_Of_Birth: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    Date_Joined_Staff: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    Date_Left_Staff: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    Gender: {
      type: DataTypes.CHAR(1),
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
    Office_ID: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'office',
        key: 'Office_ID'
      }
    },
    Address_ID: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'address',
        key: 'Address_ID'
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
    tableName: 'staff',
		freezeTableName: true,
		underscored: true,
		timestamps: false
  });
};
