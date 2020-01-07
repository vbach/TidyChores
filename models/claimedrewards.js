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
      rewardDescription: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [3, 500],
            msg: 'A reward description is required.'
          }
        }
      },
      childId: DataTypes.UUID
    },
    {}
  );
  claimedRewards.associate = function(models) {
    claimedRewards.belongsTo(models.Children, { foreignKey: 'childId' });
  };
  return claimedRewards;
};
