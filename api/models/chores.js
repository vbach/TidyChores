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
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday'
      ),
      type: { type: DataTypes.ENUM('true', 'false'), defaultValue: 'false' },
      childId: DataTypes.INTEGER // change to UUID
    },
    {}
  );
  Chores.associate = function(models) {
    Chores.belongsTo(models.Children, { foreignKey: 'childId' });
  };
  return Chores;
};
