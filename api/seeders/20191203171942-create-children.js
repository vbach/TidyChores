'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Children', [
      {
        id: 'c426fde0-3155-4c8b-aaaf-a3b7177b7f16',
        name: 'Logan',
        avatar: 'boy_001',
        points: '150',
        parentId: '1',
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
