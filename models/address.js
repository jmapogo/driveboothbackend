/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('address', {
    address_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    line_1_number_building: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    line_2_number_street: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    line_3_area_locality: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    postal_code: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    province: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    country: {
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
    tableName: 'address'
  });
};
