'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Children', [
      {
        id: 'c426fde0-3155-4c8b-aaaf-a3b7177b7f16',
        name: 'Logan',
        avatar: 'boy_001',
        points: '150',
        parentId: '813ab8e8-3bc7-42a3-b9fa-0f46e3c2e8e3',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        id: '486cd5a3-01d2-4952-8609-a29fe2f8a6e6',
        name: 'Abigale',
        avatar: 'boy_002',
        points: '125',
        parentId: '813ab8e8-3bc7-42a3-b9fa-0f46e3c2e8e3',
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
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Child', null, {});
  }
};
