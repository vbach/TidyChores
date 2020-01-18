'use strict';
module.exports = (sequelize, DataTypes) => {
  const claimedRewards = sequelize.define(
    'claimedRewards',
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
      claimedBy: { type: DataTypes.STRING, defaultValue: '' },
      parentId: {
        type: DataTypes.UUID,
        validate: {
          isUUID: { args: 4, msg: 'Id not valid, please try again' }
        }
      }
    },
    {}
  );
  claimedRewards.associate = function(models) {
    claimedRewards.belongsTo(models.Users, { foreignKey: 'parentId' });
  };
  return claimedRewards;
};
