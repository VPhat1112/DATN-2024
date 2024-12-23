'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Information_Jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      seeker_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        onDelete : 'CASCADE',
        onUpdate: 'CASCADE',
        references:{
          model:'seekers',
          key:'id'
        }
      },
      Desired_level: {
        type: Sequelize.STRING
      },
      Salary: {
        type: Sequelize.STRING
      },
      type_Work: {
        type: Sequelize.STRING
      },
      work_methods: {
        type: Sequelize.STRING
      },
      Industry: {
        type: Sequelize.STRING
      },
      Workplace: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Information_Jobs');
  }
};