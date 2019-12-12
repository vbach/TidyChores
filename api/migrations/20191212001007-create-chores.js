'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Chores', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID
      },
      description: {
        type: Sequelize.STRING
      },
      points: {
        type: Sequelize.STRING
      },
      day: {
        type: Sequelize.ENUM(
          'sunday',
          'monday',
          'tuesday',
          'wednesday',
          'thursday',
          'friday',
          'saturday'
        )
      },
      type: {
        type: Sequelize.ENUM('true', 'false')
      },
      childId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Children',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Chores');
  }
};
