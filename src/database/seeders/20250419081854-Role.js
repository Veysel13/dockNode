'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     * Example:
     */
     
     await queryInterface.bulkInsert('roles', [{
        id:1,
        name: 'Role 1',
        created_at: new Date(),
        updated_at: new Date(),
     }], {});


     await queryInterface.bulkInsert('user_roles', [{
      user_id: 1,
      role_id:1
   }], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
