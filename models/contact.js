/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contact', {
    contact_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    },
    cell: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    cell_alt: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    email: {
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
    home_number: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    work_number: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    tableName: 'contact'
  });
};
