/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('office_staff', {
    office_staff_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    },
    date_from: {
      type: DataTypes.DATE,
      allowNull: true
    },
    date_to: {
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
    office_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'office',
        key: 'office_id'
      }
    },
    job_title_code: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'ref_job_title',
        key: 'job_title_code'
      }
    },
    staff_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'staff',
        key: 'staff_id'
      }
    }
  }, {
    tableName: 'office_staff'
  });
};
