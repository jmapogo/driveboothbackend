/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    first_name: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    middle_name: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: true
    },
    IsActive: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    contact_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'contact',
        key: 'contact_id'
      }
    },
    address_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'address',
        key: 'address_id'
      }
    },
    office_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'office',
        key: 'office_id'
      }
    }
  }, {
    tableName: 'users'
  });
};
