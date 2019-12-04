'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Chores', [
      {
        id: 'fe9eb2ba-a3f9-47c8-9984-a6858b4cd819',
        description: 'Mop Kitchen',
        points: '15',
        day: 'sunday',
        type: 'true',
        childId: 'c426fde0-3155-4c8b-aaaf-a3b7177b7f16',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        id: 'fe9eb2ba-a3f9-47c8-9984-a6858b4fd741',
        description: 'Walk Dog',
        points: '5',
        day: 'sunday',
        type: 'true',
        childId: 'c426fde0-3155-4c8b-aaaf-a3b7177b7f16',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        id: 'd5979219-c86d-4aa0-b224-a8a9b94e96e2',
        description: 'Put away dishes',
        points: '10',
        day: 'monday',
        type: 'false',
        childId: 'c426fde0-3155-4c8b-aaaf-a3b7177b7f16',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        id: '5f15f730-4cfc-48a2-a7a5-855914449eb8',
        description: 'Take out trash',
        points: '5',
        day: 'tuesday',
        type: 'true',
        childId: 'c426fde0-3155-4c8b-aaaf-a3b7177b7f16',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        id: '05416217-e193-4864-8437-9df84dcb1eb6',
        description: 'Clean bedroom',
        points: '5',
        day: 'wednesday',
        type: 'false',
        childId: 'c426fde0-3155-4c8b-aaaf-a3b7177b7f16',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        id: '8a3a9045-6660-47f1-adda-0813aa8e64e7',
        description: 'Fold laundry',
        points: '5',
        day: 'thursday',
        type: 'true',
        childId: 'c426fde0-3155-4c8b-aaaf-a3b7177b7f16',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        id: '24545cfa-550c-4d87-8950-9fec47838d5e',
        description: 'Help with dinner',
        points: '0',
        day: 'friday',
        type: 'false',
        childId: 'c426fde0-3155-4c8b-aaaf-a3b7177b7f16',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        id: '940f8e5b-a179-417c-a00c-1ebfe9c13fae',
        description: 'Sweep carpet',
        points: '10',
        day: 'saturday',
        type: 'false',
        childId: 'c426fde0-3155-4c8b-aaaf-a3b7177b7f16',
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
