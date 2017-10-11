/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contact', {
    Contact_ID: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    },
    Cell: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Cell_Alt: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    Email: {
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
    tableName: 'contact',
		freezeTableName: true,
		underscored: true,
		timestamps: false
  });
};
