const asyncHandler = require("express-async-handler");
const db = require("../models");
const bcrypt = require("bcryptjs/dist/bcrypt");

const UserController = {
  getUser: asyncHandler(async (req, res) => {
    const { userId } = req.user;
    const response = await db.User.findByPk(userId, {
      attributes: {
        exclude: ["password", "resetPwExpiry", "resetPwToken"],
      },
      include: [
        {
          model: db.Pricing,
          as: "rPricing",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });

    return res.status(200).json({
      success: true,
      data: response,
    });
  }),
  updatePassword: asyncHandler(async (req, res) => {
    const { userId } = req.user;
    const { currentPassword, newPassword } = req.body;
    const checkUser = await db.User.findByPk(userId);
    if (!checkUser) throw new Error(" User not exit");
    const isPasswordValid = bcrypt.compareSync(
      currentPassword,
      checkUser.password
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password " });
    }

    const response = await db.User.update(
      { password: newPassword },
      { where: { id: userId } }
    );
    return res.status(200).json({
      success: response[0] > 0 ? true : false,
      message:
        response[0] > 0 ? "Update password success" : "Error update password ",
    });
  }),
  updatePatchUser: asyncHandler(async (req, res) => {
    const { userId } = req.user;
    const { ...data } = req.body;
    const user = await db.User.findByPk(userId);
    if (!user) throw new Error("User not found");
    const response =await user.update(data);
   
    return res.json({ success: false, message: "update thafnh cong" });
  }),
};
module.exports = UserController;
