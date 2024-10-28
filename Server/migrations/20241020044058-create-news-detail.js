'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('newsDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      newDetail_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        onDelete : 'CASCADE',
        onUpdate: 'CASCADE',
        references:{
          model:'news',
          key:'news_id'
        }
      },
      Address: {
        type: Sequelize.STRING
      },
      typeJob: {
        type: Sequelize.STRING
      },
      Salary: {
        type: Sequelize.INTEGER
      },
      experience: {
        type: Sequelize.STRING
      },
      jobLevel: {
        type: Sequelize.STRING
      },
      Welfare: {
        type: Sequelize.STRING
      },
      job_description: {
        type: Sequelize.STRING
      },
      job_requirements: {
        type: Sequelize.STRING
      },
      another_information: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('newsDetails');
  }
};