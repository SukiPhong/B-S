const db = require("../models");
const asyncHandler = require("express-async-handler");
const RatingControllers = {
  createRating: asyncHandler(async (req, res) => {
    const { idPost, content, start } = req.body;
    const { userId } = req.user;
 
    const post = await db.Post.findByPk(idPost);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Kiểm tra xem người dùng có tồn tại không
    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(404).json({success:false, message: "User not found" });
    }

    // Tìm kiếm đánh giá đã tồn tại
    const existingRating = await db.Rating.findOne({
      where: { idPost, idUser: userId },
    });

    let rating;
   
    if (existingRating) {
      // Nếu đã tồn tại, cập nhật đánh giá
      await existingRating.update({ content, start });
      rating = existingRating;
    } else {
      // Nếu chưa tồn tại, tạo mới
      rating = await db.Rating.create({
        idPost,
        idUser: userId,
        content,
        start,
      });
    }

    // Tính toán lại avgStar của bài đăng
    const ratings = await db.Rating.findAll({ where: { idPost } });
    const avgStar =
      ratings.reduce((sum, rating) => sum + rating.start, 0) / ratings.length;

    await post.update({ avgStar });

    return res
      .status(200)
      .json({success:true, message: "Rating successfully saved", data:rating });
  }),
  deleteRating: asyncHandler(async (req, res) => {
    const { idRating } = req.params;

    const rating = await db.Rating.findByPk(idRating);
    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    await rating.destroy();
    return res.status(200).json({ message: "Rating deleted" });
  }),
  getRatingsForPost: async (req, res) => {
    const { idPost } = req.params;
    try {
      const ratings = await db.Rating.findAll({
        where: { idPost },
        include: [
          {
            model: db.User,
            as: "rUser",
            attributes: ["avatar", "email", "fullname"],
          },
        ],
      });
      if (ratings.length === 0) {
        return res
          .status(404)
          .json({success:false, message: "No ratings found for this post" });
      }

      return res.status(200).json({success:true,message:'Lấy dữ liệu thành công',data:ratings});
    } catch (error) {
      console.error(error);
      return res.status(500).json({success:false, message: "Server error" });
    }
  },
};
module.exports = RatingControllers;
