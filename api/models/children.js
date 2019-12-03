'use strict';
module.exports = (sequelize, DataTypes) => {
  const Children = sequelize.define(
    'Children',
    {
      name: DataTypes.STRING,
      avatar: DataTypes.STRING,
      points: DataTypes.STRING,
      parentId: DataTypes.STRING
    },
    {}
  );
  Children.associate = function(models) {
    Children.hasMany(models.Chores, { foreignKey: 'childId' });
    Children.hasMany(models.Rewards, { foreignKey: 'claimedBy' });
  };
  return Children;
};
