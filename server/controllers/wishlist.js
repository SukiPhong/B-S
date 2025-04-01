const db = require("../models");
const asyncHandler = require("express-async-handler");

const wishlistController = {
  getWishlist: asyncHandler(async (req, res) => {
    const { userId } = req.user;
    const { soft, ...query } = req.query;

    const options = {
      where: { idUser: userId },
      include: [
        {
          model: db.Post,
          as: "rPost",
          attributes: {
            exclude: ["bedroom", "bathroom","balonDirection",'ListingType','direction','floor'],
          },
        }
      ],
    };
    if (soft) {
      const order = soft
        .split(",")
        .map((el) =>
          el.startsWith("-")
            ? [{ model: db.Post, as: "rPost" }, el.replace("-", ""), "DESC"]
            : [{ model: db.Post, as: "rPost" }, el, "ASC"]
        );

      options.order = order;
    }

    const wishlist = await db.Wishlist.findAll(options);
    res.status(200).json(wishlist);
  }),

  addToWishlist: asyncHandler(async (req, res) => {
    const { userId } = req.user;

    const { idPost } = req.body;
    const existingItem = await db.Wishlist.findOne({
      where: { idUser: userId, idPost },
    });

    if (existingItem) {
      return res.status(400).json({ message: "Sản phẩm đã có trong wishlist" });
    }

    const newItem = await db.Wishlist.create({ idUser: userId, idPost });
    res.status(201).json(newItem);
  }),

  removeFromWishlist: asyncHandler(async (req, res) => {
    const userId = req.user;
    const { productId } = req.params;
    const itemToDelete = await db.Wishlist.findOne({
      where: { userId, productId },
    });

    if (!itemToDelete) {
      return res
        .status(404)
        .json({ message: "Sản phẩm không tồn tại trong wishlist" });
    }

    await itemToDelete.destroy();
    res.status(200).json({ message: "Sản phẩm đã được xóa khỏi wishlist" });
  }),

  toggleWishlist: asyncHandler(async (req, res) => {
    const { userId } = req.user;
    const { idPost } = req.params;
    const existingItem = await db.Wishlist.findOne({
      where: { idUser: userId, idPost },
    });

    if (existingItem) {
      await existingItem.destroy();
      return res.status(200).json({
        success: true,
        message: "Sản phẩm đã bị xóa khỏi wishlist",
        toggle: false,
      });
    } else {
      const newItem = await db.Wishlist.create({ idUser: userId, idPost });
      return res.status(201).json({
        success: true,
        message: "Thêm vào WishList thành công",
        toggle: true,
        
      });
    }
  }),
};
module.exports = wishlistController;
