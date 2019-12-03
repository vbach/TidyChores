'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rewards = sequelize.define(
    'Rewards',
    {
      description: DataTypes.STRING,
      claimed: DataTypes.ENUM('true', 'false'),
      claimedBy: DataTypes.INTEGER,
      value: DataTypes.STRING
    },
    {}
  );
  Rewards.associate = function(models) {
    Rewards.belongsTo(models.Children, { foreignKey: 'claimedBy' });
  };
  return Rewards;
};
