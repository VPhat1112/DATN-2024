'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      news_id: {
        type: Sequelize.INTEGER
      },
      seekers_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        onDelete : 'CASCADE',
        onUpdate: 'CASCADE',
        references:{
          model:'seekers',
          key:'id'
        }
      },
      cv_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('histories');
  }
};