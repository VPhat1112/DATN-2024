'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('new_spes', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
      },
      newsId: {
        type: Sequelize.INTEGER,
        // primaryKey:true,
        references:{
          model:'news',
          key:'id'
        }
      },
      specializedId: {
        type: Sequelize.INTEGER,
        // primaryKey:true,
        references:{
          model:'specializeds',
          key:'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('new_spes');
  }
};