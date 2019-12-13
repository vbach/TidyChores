'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
        validate: {
          isUUID: { args: 4, msg: 'Id not valid, please try again' }
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 120],
            msg: 'Name should be at least 3 characters.'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { args: true, msg: 'Email is already in use' },
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 120],
            msg: 'Passwords must be at least 6 characters.'
          }
        }
      },
      zipcode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5, 5],
            msg: 'Zipcodes may only consist of 5 characters.'
          }
        }
      }
    },
    {}
  );
  Users.associate = function(models) {
    Users.hasMany(models.Children, { foreignKey: 'parentId' });
  };
  return Users;
};
