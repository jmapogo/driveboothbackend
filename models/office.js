/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('office', {
    office_id: {
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
    office_name: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    address_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'address',
        key: 'address_id'
      }
    }
  }, {
    tableName: 'office'
  });
};
