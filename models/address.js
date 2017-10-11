/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('address', {
    Address_ID: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Line_1_Number_Building: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Line_2_Number_Street: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Line_3_Area_Locality: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    City: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    Postal_Code: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    Province: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    Country: {
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
    }
  }, {
    tableName: 'address',
		freezeTableName: true,
		underscored: true,
		timestamps: false
  });
};
