'use strict';
module.exports = (sequelize, DataTypes) => {
  const Children = sequelize.define(
    'Children',
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
            args: [1, 500],
            msg: 'Child name should be at least 3 characters.'
          }
        }
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: { args: [1], msg: 'An avatar must be selected.' }
        }
      },
      points: {
        type: DataTypes.STRING,
        defaultValue: '0'
      },
      parentId: DataTypes.UUID
    },
    {}
  );
  Children.associate = function(models) {
    Children.belongsTo(models.Users, { foreignKey: 'parentId' });
    Children.hasMany(models.Chores, { foreignKey: 'childId' });
    Children.hasMany(models.claimedRewards, { foreignKey: 'childId' });
  };
  return Children;
};
