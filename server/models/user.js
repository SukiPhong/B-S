'use strict';
const bcrypt = require('bcryptjs/dist/bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Pricing, { foreignKey: "idPricing", as: 'rPricing' });
    }
  }
  User.init({
    email: DataTypes.STRING,
    fullname: DataTypes.STRING,
    phone: DataTypes.STRING,
    emailVerified: DataTypes.BOOLEAN,
    phoneVerified: DataTypes.BOOLEAN,
    password: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('password', bcrypt.hashSync(value, bcrypt.genSaltSync(10)));
      }
    },
    balance: DataTypes.BIGINT,
    score: DataTypes.INTEGER,
    resetPwToken: DataTypes.STRING,
    avatar: DataTypes.STRING,
    resetPwExpiry: DataTypes.DATE,
    idPricing: DataTypes.INTEGER,


  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};