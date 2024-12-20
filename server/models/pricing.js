'use strict';
const { enumData } = require('../utils/Constants');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pricing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Pricing.hasMany
    }
  }
  Pricing.init({
    name: {
      type: DataTypes.ENUM,
      values: enumData.Pricings,
    },
    isDisplayImmedialy: DataTypes.BOOLEAN,
    levelShowDescription: DataTypes.FLOAT,
    priority: DataTypes.INTEGER,
    requireScore: DataTypes.INTEGER,
    requireScoreNextLevel: DataTypes.INTEGER,
    price: DataTypes.BIGINT,
    expiredDay: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING,
    recommended:DataTypes.BOOLEAN,
    features:DataTypes.TEXT,  
  }, {
    sequelize,
    modelName: 'Pricing',
  });
  return Pricing;
};