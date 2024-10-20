'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      emailVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      phoneVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      avatar: {
        type: Sequelize.STRING,

      },
      balance: {
        type: Sequelize.BIGINT,
        defaultValue: 0
      },
      score: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      resetPwToken: {
        type: Sequelize.STRING,
      },
      resetPwExpiry: {
        type: Sequelize.STRING,
      },
      idPricing: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Pricings',
          key: 'id'
        },
        defaultValue: 1
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
    await queryInterface.dropTable('Users');
  }
};