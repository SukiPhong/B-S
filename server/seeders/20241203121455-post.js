'use strict';

const { postFakes } = require('../utils/Constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Posts',postFakes, {});
  },
  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Posts', null, {});
     
  }
};
