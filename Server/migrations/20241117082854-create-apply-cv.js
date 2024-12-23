'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ApplyCvs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      new_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'news',
          key:'id'
        }
      },
      cv_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        onDelete : 'CASCADE',
        onUpdate: 'CASCADE',
        references:{
          model:'cvs',
          key:'id'
        }
      },
      status: {
        type: Sequelize.ENUM,
        values:["Accept", "Waiting", "Deny"],
        allowNull: false,
        defaultValue:  "Waiting"
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
    await queryInterface.dropTable('ApplyCvs');
  }
};