'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HistoryPayment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
//    1 user    have  history  1 -n  History.
//  1  hasMany   n: belongsTo
        HistoryPayment.belongsTo(models.User, {foreignKey: "idUser", as: 'rUser'})
    }
  }
  HistoryPayment.init({
    transactionId: DataTypes.STRING,
    data: DataTypes.JSONB,
    idUser: DataTypes.INTEGER,
    TYPE:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'HistoryPayment',
  });
  return HistoryPayment;
};