/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ref_payment_method', {
    Payment_Method_Code: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    },
    Payment_Method_Description: {
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
    tableName: 'ref_payment_method',
		freezeTableName: true,
		underscored: true,
		timestamps: false
  });
};
