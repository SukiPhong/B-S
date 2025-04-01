const asyncHandler = require("express-async-handler");
const sendMail = require("./../utils/sendMail");
const db = require("../models");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { AccessToken, RefreshToken } = require("../middleware/verify_Token");
const bcrypt = require("bcryptjs/dist/bcrypt");
const token_Email = require("../utils/tokenEmail");

const AuthController = {
  loginWithGoogle: asyncHandler(async (req, res) => {
    const { email, avatar, fullname, password } = req.body;
    let userId;
    const alreadyUser = await db.User.findOne({ where: { email } });
    if (!alreadyUser) {
      const newUser = await db.User.create({
        email,
        fullname,
        avatar,
        password,
      });
      if (!newUser) throw new Error("Couldn't create");
      userId = newUser.id;
    } else {
      userId = alreadyUser.id;
    }
    // const token = jwt.sign(
    //     { userId },
    //     process.env.SECRET_KEY_JWT,
    //     { expiresIn: "1d" }
    // );
    const token = AccessToken(userId, (Role = false));
    return res.json({
      success: true,
      message: "Login successful",
      accessToken: token,
      message: token ? "Create password and login successful" : "Login failed",
    });
  }),
  checkUserFromEmail: asyncHandler(async (req, res) => {
    const { email } = req.params;
    const user = await db.User.findOne({ where: { email } });
    let token = null;
    if (user) token = AccessToken(user.id);
    return res.json({
      success: true,
      hashUser: !!user,
      accessToken: token,
      message: token ? "Login successful" : "New users",
    });
  }),
  register: asyncHandler(async (req, res) => {
    const { email = null, phone = null, password, fullname } = req.body;
    const checkUserExist = await db.User.findOne({
      where: {
        email,
      },
    });

    if (checkUserExist) throw new Error("Email or Phone was used");
    const newUser = await db.User.create({
      email: email || null,
      phone: phone || null,
      password,
      fullname,
    });
    return res.status(201).json({
      success: newUser ? true : false,
      message: newUser ? "Register successful" : "Register failed",
      data: newUser,
    });
  }),
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await db.User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User  has not registered" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password " });
    }

    const token = AccessToken(user.id, user.Role);
    const PwToken = RefreshToken(user.id);
    const PwExpiry = jwt.decode(PwToken).exp;
    const response = await db.User.update(
      { resetPwToken: PwToken, resetPwExpiry: PwExpiry },
      {
        where: { id: user.id },
      }
    );
    // await db.User.update({resetPwToken: PwToken}, { where: { id: user.id } })
    return res.status(200).json({
      success: response ? true : false,
      message: response ? "Login successfully" : "Login failed",
      AccessToken: token,
    });
  }),
  ForgotPassword: asyncHandler(async (req, res) => {
    const { email } = req.params;
    const user = await db.User.findOne({ where: { email } });
    if (!user) throw new Error("Email not set login");
    const RfToken = await token_Email(user);
    const html = ` Please click the link below to reset your password of you account. 
        <a href=${process.env.CLIENT_URL}/reset-password/${RfToken}>Click here</a>`;

    const data = {
      email,
      html,
    };
    const response = await sendMail(data);

    return res.status(200).json({
      success: response ? true : false,
      message: response
        ? "Password reset request sent. Check your email "
        : "Invalid or expired code. Please try again",
      user,
    });
  }),
  // Controller ResetPassword
  ResetPassword: asyncHandler(async (req, res) => {
    const { password, token } = req.body;
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await db.User.findOne({
      where: {
        resetPwToken: passwordResetToken,
        resetPwExpiry: { [Op.gte]: Date.now() },
      },
    });

    if (!user) throw new Error("Token không hợp lệ hoặc đã hết hạn");
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    await db.sequelize.query(
      'UPDATE "Users" SET password = :password, "resetPwToken" = NULL, "resetPwExpiry" = NULL WHERE id = :id',
      {
        replacements: { password: hashedPassword, id: user.id },
        type: db.Sequelize.QueryTypes.UPDATE,
      }
    );
    return res.status(200).json({
      success: true,
      message: "Reset mật khẩu thành công",
    });
  }),
};

module.exports = AuthController;
