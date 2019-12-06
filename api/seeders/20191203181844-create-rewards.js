'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Rewards', [
      {
        id: '9c99c103-66f0-448d-b909-4fa66ce3eee3',
        description: 'Movie Tickets',
        claimed: false,
        claimedBy: 'Audrey',
        value: 15,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        id: 'f8006345-05c7-4f98-b8f8-dc5f041c54f2',
        description: 'Zoo Trip',
        claimed: false,
        claimedBy: null,
        value: 20,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        id: '309c0904-519c-4cf9-850c-9be849df7db9',
        description: 'Candy Bar',
        claimed: true,
        claimedBy: 'Abby',
        value: 5,
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
    return queryInterface.bulkDelete('Reward', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
