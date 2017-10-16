/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('permissions', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    permission_name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    role_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id'
      }
    }
  }, {
    tableName: 'permissions'
  });
};
