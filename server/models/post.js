"use strict";
const { enumData } = require("../utils/Constants");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init(
    {
      idPost: DataTypes.STRING,
      title: DataTypes.STRING,
      address: DataTypes.STRING,
      province: DataTypes.STRING,
      district: DataTypes.STRING,
      ward: DataTypes.STRING,
      price: DataTypes.BIGINT,
      priceUnits: DataTypes.STRING,
      size: DataTypes.INTEGER,
      avgStar: DataTypes.FLOAT,
      description: DataTypes.TEXT,
      floor: DataTypes.INTEGER,
      bathroom: DataTypes.INTEGER,
      bedroom: DataTypes.INTEGER,
      interior: {
        type:DataTypes.ENUM,
        values:enumData.interiors
      },
      ListingType: {
        type: DataTypes.ENUM,
        values: enumData.listingTypes,
      },
      properType: {
        type: DataTypes.ENUM,
        values: enumData.propertyTypes,
      },
      direction: {
        type: DataTypes.ENUM,
        values: enumData.directions,
      },
      balonDirection: {
        type: DataTypes.ENUM,
        values: enumData.directions,
      },
      verified: DataTypes.BOOLEAN,
      expiredDate: DataTypes.DATE,
      expireBoost: DataTypes.DATE,
      images: DataTypes.ARRAY(DataTypes.STRING),
      status: {
        type: DataTypes.ENUM,
       values: enumData.statusPost,
      },
      idUser: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
