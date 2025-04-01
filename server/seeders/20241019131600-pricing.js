'use strict';

const { pricings } = require('../utils/Constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Pricings', pricings, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pricings', null, {});
  }
};
