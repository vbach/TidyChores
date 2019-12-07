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
        id: 'b2fcac11-ac38-4094-9c7a-b6c76610082d',
        description: 'Walk Dog',
        points: '5',
        day: 'sunday',
        type: 'true',
        childId: '486cd5a3-01d2-4952-8609-a29fe2f8a6e6',
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
        id: '07eb0341-f47d-4b43-8296-e3ef6ab92627',
        description: 'Walk Dog',
        points: '10',
        day: 'monday',
        type: 'true',
        childId: '486cd5a3-01d2-4952-8609-a29fe2f8a6e6',
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
        id: '7a75a69b-fdb2-42c0-8366-254cc1466668',
        description: 'Empty Dishwasher',
        points: '5',
        day: 'tuesday',
        type: 'true',
        childId: '486cd5a3-01d2-4952-8609-a29fe2f8a6e6',
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
        id: '3da901a2-0e29-40c0-b5d0-d1372feab8db',
        description: 'Clean bedroom',
        points: '5',
        day: 'wednesday',
        type: 'false',
        childId: '486cd5a3-01d2-4952-8609-a29fe2f8a6e6',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        id: '8a3a9045-6660-47f1-adda-0813aa8e64e7',
        description: 'Fold laundry',
        points: '5',
        day: 'thursday',
        type: 'true',
        childId: '486cd5a3-01d2-4952-8609-a29fe2f8a6e6',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        id: '98cbd496-893c-4c4c-bc1d-34c07108f555',
        description: 'Vacuum living room',
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
        id: '32967999-4697-469e-bfaa-baa270d8ceec',
        description: 'Take out trash',
        points: '0',
        day: 'friday',
        type: 'false',
        childId: '486cd5a3-01d2-4952-8609-a29fe2f8a6e6',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        id: '940f8e5b-a179-417c-a00c-1ebfe9c13fae',
        description: 'Sweep carpet',
        points: '10',
        day: 'saturday',
        type: 'false',
        childId: '486cd5a3-01d2-4952-8609-a29fe2f8a6e6',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        id: '8c911d54-db90-4a97-9244-90cd63a7053a',
        description: 'Pick up toy room.',
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
