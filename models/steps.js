'use strict';
module.exports = (sequelize, DataTypes) => {
  const Steps = sequelize.define(
    'Steps',
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
        validate: {
          isUUID: { args: 4, msg: 'Id not valid, please try again' }
        }
      },
      stepDescription: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [3, 500],
            msg: 'A reward description is required.'
          }
        }
      },
      choreId: {
        type: DataTypes.UUID,
        validate: {
          isUUID: { args: 4, msg: 'Id not valid, please try again' }
        }
      }
    },
    {}
  );
  Steps.associate = function(models) {
    Steps.belongsTo(models.Chores, { foreignKey: 'choreId' });
  };
  return Steps;
};
