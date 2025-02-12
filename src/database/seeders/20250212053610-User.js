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

     await queryInterface.bulkInsert('users', [{
       id:1,
       name: 'John',
       lastname:'Doe',
       email:'veysel1@gmail.com',
       created_at: new Date(),
       updated_at: new Date(),
     },
     {
      id:2,
      name: 'John2',
      lastname:'Doe',
      email:'veysel2@gmail.com',
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

    await queryInterface.bulkDelete('users', null, {});
  }
};
