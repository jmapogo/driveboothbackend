/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ref_job_title', {
    job_title_code: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    },
    job_title_description: {
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
    }
  }, {
    tableName: 'ref_job_title'
  });
};
