/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('staff', {
    staff_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date_joined_staff: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    date_left_staff: {
      type: DataTypes.STRING(200),
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
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'staff'
  });
};
