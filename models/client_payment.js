/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('client_payment', {
    date_of_payment: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true
    },
    payment_amount: {
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
    payment_method_code: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'ref_payment_method',
        key: 'payment_method_code'
      }
    },
    client_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'client',
        key: 'client_id'
      }
    }
  }, {
    tableName: 'client_payment'
  });
};
