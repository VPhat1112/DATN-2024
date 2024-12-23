'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NewDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      new_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        onDelete : 'CASCADE',
        onUpdate: 'CASCADE',
        references:{
          model:'news',
          key:'id'
        }
      },
      Address: {
        type: Sequelize.STRING
      },
      typeJob: {
        type: Sequelize.STRING
      },
      Salary: {
        type: Sequelize.DECIMAL(10,2)
      },
      Min_Salary: {
        type: Sequelize.DECIMAL(10,2)
      },
      Max_Salary: {
        type: Sequelize.DECIMAL(10,2)
      },
      experience: {
        type: Sequelize.STRING
      },
      Education: {
        type: Sequelize.STRING
      },
      Welfare: {
        type: Sequelize.STRING
      },
      image_decscription: {
        type: Sequelize.TEXT('long')
      },
      Gender_requirements: {
        type: Sequelize.STRING
      },
      Age_requirements: {
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
    await queryInterface.dropTable('NewDetails');
  }
};