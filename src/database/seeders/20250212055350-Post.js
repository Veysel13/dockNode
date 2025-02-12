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

    await queryInterface.bulkInsert('posts', [{
      id:1,
      title: 'Post 1',
      description:'Post 1',
      user_id:1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id:2,
      title: 'Post 2',
      description:'Post 2',
      user_id:1,
      created_at: new Date(),
      updated_at: new Date(),
   },
   {
      id:3,
      title: 'Post 3',
      description:'Post 3',
      user_id:2,
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

    await queryInterface.bulkDelete('posts', null, {});
  }
};
