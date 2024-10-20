'use strict';

const { enumData } = require('../utils/Constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idPost: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      province: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      district: {
        type: Sequelize.STRING
      },
      ward: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.BIGINT,
        defaultValue: 0,
        allowNull: false
      },
      priceUnits: {
        type: Sequelize.BIGINT,
        defaultValue: 0,
        allowNull: false
      },
      size: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },

      avgStar: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,

      },

      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      floor: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      bathroom: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      bedroom: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      isFurniture: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      ListingType: {
        type: Sequelize.ENUM,
        values: enumData.listingTypes
      },
      properType: {
        type: Sequelize.ENUM,
        values: enumData.propertyTypes
      },
      direction: {
        type: Sequelize.ENUM,
        values: enumData.directions
      },
      balonDirection: {
        type: Sequelize.ENUM,
        values: enumData.directions
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: Sequelize.ENUM,
        values: enumData.postStatus
      },
      expiredDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      expireBoost: {
        type: Sequelize.DATE
      },
      idUser: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
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
    await queryInterface.dropTable('Posts');
  }
};