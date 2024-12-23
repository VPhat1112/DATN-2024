'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      account_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        onDelete : 'CASCADE',
        onUpdate: 'CASCADE',
        references:{
          model:'accounts',
          key:'id'
        }
      },
      nameCompany: {
        type: Sequelize.STRING
      },
      typeCompany: {
        type: Sequelize.STRING
      },
      numberEmployees: {
        type: Sequelize.STRING
      },
      National: {
        type: Sequelize.STRING
      },
      Address: {
        type: Sequelize.STRING
      },
      Company_description: {
        type: Sequelize.STRING
      },
      contactPerson: {
        type: Sequelize.STRING
      },
      phoneContact: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.TEXT('long')
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
    await queryInterface.dropTable('Companies');
  }
};