/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lessons', {
    lesson_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    },
    lesson_datetime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fee: {
      type: "DOUBLE",
      allowNull: true
    },
    client_progress_made: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    mileage_used: {
      type: "DOUBLE",
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
    client_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'client',
        key: 'client_id'
      }
    },
    staff_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'staff',
        key: 'staff_id'
      }
    },
    lesson_status_code: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'ref_lesson_status',
        key: 'lesson_status_code'
      }
    },
    vehicle_reg_number: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'vehicle',
        key: 'vehicle_reg_number'
      }
    }
  }, {
    tableName: 'lessons'
  });
};
