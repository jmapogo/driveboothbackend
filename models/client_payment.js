/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('client_payment', {
    Date_Of_Payment: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true
    },
    Payment_Amount: {
      type: "DOUBLE",
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
    Payment_Method_Code: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'ref_payment_method',
        key: 'Payment_Method_Code'
      }
    },
    Client_ID: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'client',
        key: 'Client_ID'
      }
    }
  }, {
    tableName: 'client_payment',
		freezeTableName: true,
		underscored: true,
		timestamps: false
  });
};
