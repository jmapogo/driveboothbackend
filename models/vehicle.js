/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vehicle', {
    vehicle_reg_number: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    },
    make: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    model: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    type: {
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
    office_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'office',
        key: 'office_id'
      }
    }
  }, {
    tableName: 'vehicle'
  });
};
