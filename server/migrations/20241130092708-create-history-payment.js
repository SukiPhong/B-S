'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HistoryPayments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transactionId: {
        type: Sequelize.STRING
      },
      idUser: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'Users',
        //   key: 'id'
        // }
        allowNull:false
      },
      fullnameUser:{
        type:Sequelize.STRING,
       allowNull:false
      },
      phoneUser:{
        type:Sequelize.STRING,
      },
      status:{
        type:Sequelize.STRING,
      },
      TYPE:{
        type:Sequelize.STRING,
      },
      data:{
        type: Sequelize.JSONB,
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
    await queryInterface.dropTable('HistoryPayments');
  }
};