const { query } = require("express");
const db = require("../models");
const asyncHandler = require("express-async-handler");
const { Op, Sequelize, where } = require("sequelize");
const PostController = {
  CreatePost: asyncHandler(async (req, res) => {
    const { userId } = req.user;
    const postData = { ...req.body, idUser: userId };
    const response = await db.Post.create(postData);
    return res.status(200).json({
      success: !!response,
      message: response ? "Post created successfully" : "Post creation failed",
    });
  }),
  GetPosts: asyncHandler(async (req, res) => {
    const { limit, title, page, fields, soft, ...query } = req.query;
    const options = {};
    //limit fields
    if (fields) {
      const attributes = fields.split(",");
      const isExclude = attributes.some((el) => el.startsWith("-"));
      if (isExclude)
        options.attributes = {
          exclude: attributes.map((el) => el.replace("-", "")),
        };
      else options.attributes = attributes;
    }
    //Filter by client queries
    if (title) {
      query.title = Sequelize.where(
        Sequelize.fn("LOWER", Sequelize.col("title")),
        "LIKE",
        `%${title.toLocaleLowerCase()}%`
      );
    }

    query.expiredDate = { [Sequelize.Op.gt]: new Date() };

    //sorting
    if (soft) {
      const order = soft
        .split(",")
        .map((el) =>
          el.startsWith("-") ? [el.replace("-", ""), "DESC"] : [el, "ASC"]
        );

      options.order = order;
    }

    if (!limit) {
      const response = await db.Post.findAll({ where: query, ...options });
      return res.status(200).json({
        success: response ? true : false,
        message: response ? "true1" : "false2",
        data: response,
      });
    }

    //pagination

    const offset = (page && +page > 1 ? +page - 1 : 0 ) * limit;
    if (offset) options.offset = offset;
    options.limit = +limit;
    const response = await db.Post.findAndCountAll({
      where: query,
      ...options,
    });
    return res.status(200).json({
      success: response ? true : false,
      message: response ? "Got" : "Cannot got",
      data: response
        ? { ...response, limit: +limit, page: +page ? +page : 1 }
        : null,
    });
  }),
};
module.exports = PostController;
