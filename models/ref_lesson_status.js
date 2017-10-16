/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ref_lesson_status', {
    lesson_status_code: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    },
    lesson_status_description: {
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
    tableName: 'ref_lesson_status'
  });
};
