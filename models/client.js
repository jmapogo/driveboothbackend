/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('client', {
    client_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    },
    date_became_customer: {
      type: DataTypes.DATE,
      allowNull: true
    },
    date_last_contact: {
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
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'client'
  });
};
