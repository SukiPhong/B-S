'use strict';
const { enumData } = require('../utils/Constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pricings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.ENUM,
        values: enumData.Pricings,

      },
      isDisplayImmedialy: {
        type: Sequelize.BOOLEAN,
      },
      levelShowDescription: {
        type: Sequelize.FLOAT
      },
      priority: {
        type: Sequelize.INTEGER
      },
      requireScore: {
        type: Sequelize.INTEGER
      },
      requireScoreNextLevel: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.BIGINT
      },
      expiredDay: {
        type: Sequelize.INTEGER
      },
      imgUrl: {
        type: Sequelize.STRING
      },
      recommended:{
        type:Sequelize.BOOLEAN
      },
      features:{
        type:Sequelize.TEXT
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
    await queryInterface.dropTable('Pricings');
  }
};