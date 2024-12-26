'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      Notification.belongsTo(models.User, { foreignKey: "idUser", as: "rUser", onDelete: 'CASCADE', onUpdate: 'CASCADE' });
      Notification.belongsTo(models.Post, { foreignKey: "idPost", as: "rPost", onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    }
  }
  Notification.init({
    idUser: DataTypes.INTEGER,
    idPost: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    type: {
      type: DataTypes.STRING,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    data: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};

