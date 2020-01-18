'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chores = sequelize.define(
    'Chores',
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
        validate: {
          isUUID: { args: 4, msg: 'Id not valid, please try again' }
        }
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [3, 500],
            msg: 'A chore description is required.'
          }
        }
      },
      points: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [1, 6],
            msg: 'A chore must have a point value.'
          }
        }
      },
      day: DataTypes.ENUM(
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ),
      type: { type: DataTypes.ENUM('true', 'false'), defaultValue: 'false' },
      childId: {
        type: DataTypes.UUID,
        validate: {
          isUUID: { args: 4, msg: 'Id not valid, please try again' }
        }
      }
    },
    {}
  );
  Chores.associate = function(models) {
    Chores.belongsTo(models.Children, { foreignKey: 'childId' });
    Chores.hasMany(models.Steps, { foreignKey: 'choreId' });
  };
  return Chores;
};
