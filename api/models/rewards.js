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
      claimed: DataTypes.ENUM('true', 'false'),
      claimedBy: DataTypes.INTEGER,
      value: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [1, 6],
            msg: 'A reward must have a total cash out value.'
          }
        }
      }
    },
    {}
  );
  Rewards.associate = function(models) {
    Rewards.belongsTo(models.Children, { foreignKey: 'claimedBy' });
  };
  return Rewards;
};
