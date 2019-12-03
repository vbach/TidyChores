'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chores = sequelize.define(
    'Chores',
    {
      description: DataTypes.STRING,
      points: DataTypes.STRING,
      day: DataTypes.ENUM(
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday'
      ),
      type: DataTypes.ENUM('true', 'false'),
      childId: DataTypes.INTEGER
    },
    {}
  );
  Chores.associate = function(models) {
    Chores.belongsTo(models.Children, { foreignKey: 'childId' });
  };
  return Chores;
};
