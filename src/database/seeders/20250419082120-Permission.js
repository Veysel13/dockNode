'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
    */
    await queryInterface.bulkInsert('permissions', [
      {id:1,name: 'post.view', created_at: new Date(),updated_at: new Date()},
      {id:2,name: 'post.create', created_at: new Date(),updated_at: new Date()},
      {id:3,name: 'post.update', created_at: new Date(),updated_at: new Date()},
      {id:4,name: 'post.delete', created_at: new Date(),updated_at: new Date()},
      {id:5,name: 'comment.view', created_at: new Date(),updated_at: new Date()},
      {id:6,name: 'comment.create', created_at: new Date(),updated_at: new Date()},
      {id:7,name: 'comment.update', created_at: new Date(),updated_at: new Date()},
      {id:8,name: 'comment.delete', created_at: new Date(),updated_at: new Date()}
    ], {});

    await queryInterface.bulkInsert('role_permissions', [
      {role_id:1, permission_id: 1},
      {role_id:1, permission_id: 2},
      {role_id:1, permission_id: 3},
      {role_id:1, permission_id: 4},
      {role_id:1, permission_id: 5},
      {role_id:1, permission_id: 6},
      {role_id:1, permission_id: 7},
      {role_id:1, permission_id: 8}
    ], {});
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
