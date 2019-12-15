'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rewards = sequelize.define(
    'Rewards',
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
            msg: 'A reward description is required.'
          }
        }
      },
      claimed: { type: DataTypes.BOOLEAN, defaultValue: false },
      claimedBy: { type: DataTypes.STRING, defaultValue: '' },
      value: {
        type: DataTypes.STRING,
        defaultValue: '0',
        validate: {
          len: {
            args: [1, 6],
            msg: 'A reward must have a total cash out value.'
          }
        }
      },
      parentId: DataTypes.UUID
    },
    {}
  );
  Rewards.associate = function(models) {
    Rewards.belongsTo(models.Users, { foreignKey: 'parentId' });
  };
  return Rewards;
};
