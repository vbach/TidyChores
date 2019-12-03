'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Chores', [
      {
        description: 'Mop Kitchen',
        points: '15',
        day: 'sunday',
        type: 'true',
        childId: 1,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        description: 'Walk Dog',
        points: '5',
        day: 'sunday',
        type: 'true',
        childId: 1,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        description: 'Put away dishes',
        points: '10',
        day: 'monday',
        type: 'false',
        childId: 1,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        description: 'Take out trash',
        points: '5',
        day: 'tuesday',
        type: 'true',
        childId: 1,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        description: 'Clean bedroom',
        points: '5',
        day: 'wednesday',
        type: 'false',
        childId: 1,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        description: 'Fold laundry',
        points: '5',
        day: 'thursday',
        type: 'true',
        childId: 1,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        description: 'Help with dinner',
        points: '0',
        day: 'friday',
        type: 'false',
        childId: 1,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        description: 'Sweep carpet',
        points: '10',
        day: 'saturday',
        type: 'false',
        childId: 1,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        description: 'Help with dinner',
        points: '0',
        day: 'friday',
        type: 'false',
        childId: 1,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        description: 'Sweep carpet',
        points: '10',
        day: 'saturday',
        type: 'false',
        childId: 1,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
    ]);
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Chore', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
