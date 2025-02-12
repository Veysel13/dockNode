'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('comments', [{
      id:1,
      description:'Comment 1',
      rating:4,
      post_id:1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id:2,
      description:'Comment 2',
      rating:5,
      post_id:1,
      created_at: new Date(),
      updated_at: new Date(),
   },
   {
      id:3,
      description:'Comment 3',
      rating:3,
      post_id:2,
      created_at: new Date(),
      updated_at: new Date(),
    }
   ], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('comments', null, {});
  }
};
