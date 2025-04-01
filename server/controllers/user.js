const asyncHandler = require("express-async-handler");
const db = require("../models");
const bcrypt = require("bcryptjs/dist/bcrypt");
const { Sequelize, Op, BOOLEAN, where } = require("sequelize");
const otpGenerator = require("otp-generator");
const twilio = require("twilio");
const redisClient = require("../configs/redis.config");
const { verify } = require("crypto");
const { getMonthName } = require("../utils/fn");
const sendMail = require("../utils/sendMail");
const UserController = {
  getUser: asyncHandler(async (req, res) => {
    const { userId } = req.user;

    const user = await db.User.findByPk(userId, {
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

    if (user && user.idPricing > 1) {
      const currentDate = new Date();
      if (
        user.packageExprideday &&
        new Date(user.packageExprideday) < currentDate
      ) {
        await user.update({
          idPricing: 1,
          packageExprideday: null,
        });
      }
    }

    return res.status(200).json({
      success: true,
      data: user,
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
    const { idPricing, ...data } = req.body; // Lấy idPricing và các dữ liệu khác từ req.body
    const user = await db.User.findByPk(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    let response;
    // Kiểm tra nếu có idPricing và idPricing lớn hơn 1
    if (!idPricing || idPricing <= 1) {
      response = await user.update(data);
      return res.json({
        success: Boolean(response),
        message: Boolean(response)
          ? "Update thành công"
          : "Update thất bại !!!",
      });
    }
    if (idPricing === user.idPricing) {
      data.packageExprideday = user.packageExprideday
        ? new Date(user.packageExprideday.getTime() + 30 * 24 * 60 * 60 * 1000)
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    } else if (idPricing > user.idPricing) {
      // Nếu idPricing mới lớn hơn idPricing hiện tại
      data.idPricing = idPricing; // Cập nhật idPricing mới
      data.packageExprideday = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Thiết lập thời gian hết hạn mới
    }
    // Cập nhật thông tin người dùng
    response = await user.update(data);
    return res.json({
      success: Boolean(response),
      message: Boolean(response) ? "Update thành công" : "Update thất bại !!!",
    });
  }),
  getUsers: asyncHandler(async (req, res) => {
    const { Role } = req.user;
    const { limit, page, phone, fullname, email } = req.query;
    if (!Role)
      return res.json({ success: false, message: "Bạn không có quyền" });
    const query = {}; // Initialize query

    // Helper function for adding search conditions
    const addSearchCondition = (field, value) => {
      if (value) {
        query[field] = Sequelize.where(
          Sequelize.fn("LOWER", Sequelize.col(field)),
          { [Op.like]: `%${value.toLowerCase()}%` }
        );
      }
    };
    phone && addSearchCondition("phone", phone);
    fullname && addSearchCondition("fullname", fullname);
    email && addSearchCondition("email", email);
    const response = await db.User.findAndCountAll({
      where: query,
      limit: +limit, // Giới hạn số lượng bản ghi trả về
      offset: (page && +page > 1 ? +page - 1 : 0) * limit, // Tính toán offset
      attributes: {
        exclude: ["password", "resetPwExpiry", "resetPwToken"],
      },
    });

    return res.json({
      success: Boolean(response) ? true : false,
      message: Boolean(response)
        ? "Lấy dữ liệu thành công"
        : "Lất dữ liệu thất bại",
      data: { ...response, limit: +limit, page: +page ? +page : 1 },
    });
  }),
  deleteUser: async (req, res) => {
    const { Role } = req.user;
    const { uid } = req.params;
    if (!Role)
      return res.json({ success: false, message: "Bạn không có quyền" });
    try {
      // Xóa đồng thời tất cả bài viết và tài khoản liên quan
      const [deletePosts, deleteUser, deleteRating, deleteWishlist] =
        await Promise.all([
          db.Post.destroy({ where: { idUser: uid } }), // Xóa bài viết liên quan
          db.User.destroy({ where: { id: uid } }), // Xóa người dùng
          db.Rating.destroy({ where: { idUser: uid } }),
          db.Wishlist.destroy({ where: { idUser: uid } }),
        ]);
      if (deleteUser) {
        return res.json({
          success: true,
          message: "Xóa tài khoản và bài viết liên quan thành công",
        });
      }

      return res.json({
        success: false,
        message: "Không tìm thấy tài khoản để xóa",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi trong quá trình xóa tài khoản",
        error: error.message,
      });
    }
  },
  NewUserByAdmin: asyncHandler(async (req, res) => {
    const { email, fullname, phone, password, idPricing, Role } = req.body;
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }
    const newUser = await db.User.create({
      email,
      fullname,
      phone,
      password, // Password will be hashed by the model
      idPricing: idPricing || 1, // Default to basic pricing if not provided
      Role: Role || false, // Default to regular user if not provided
      emailVerified: false,
      phoneVerified: false,
      balance: 0,
      score: 0,
    });
    res.status(201).json({
      success: newUser ? true : false,
      message: newUser
        ? "User created successfully"
        : "User created not success",
      data: newUser,
    });
  }),
  updateUserByAdmin: asyncHandler(async (req, res) => {
    const { Role } = req.user;
    const { id, ...payload } = req.body;
    if (!Role)
      return res
        .status(400)
        .json({ success: false, message: "Bạn không có quyền" });
    const user = await db.User.findByPk(id);
    if (user) await user.update({ ...payload });
    return res.json({
      success: true,
      message: "cập nhật thông tin thành công",
    });
  }),
  handleSendOTP: asyncHandler(async (req, res) => {
    const { userId } = req.user;
    const { phone } = req.body;
    const coverPhoneNumber = phone.startsWith("0")
      ? "+84" + phone.slice(1)
      : phone;
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
    const client = twilio(accountSid, authToken);

    const user = await db.User.findByPk(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const exitPhoneUser = await db.User.findOne({ where: { phone: phone } });
    if (exitPhoneUser && exitPhoneUser.id !== userId)
      return res.json({ success: false, message: "SĐT này đã được  sử dụng" });
    if (user.phone === phone && user.phoneVerified)
      return res.json({
        success: false,
        message: "SĐT này đã được xác thực ",
      });

    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const lastSendTime = await redisClient.get(`otp_last_send:${phone}`);
    const currentTime = Date.now();

    const cooldown = 5 * 60 * 1000;
    if (lastSendTime && currentTime - parseInt(lastSendTime) < cooldown) {
      const remainingTime = Math.ceil(
        (cooldown - (currentTime - parseInt(lastSendTime))) / 1000
      );
      return res.status(429).json({
        success: false,
        message: `Vui lòng đợi ${remainingTime} giây trước khi gửi lại OTP.`,
      });
    }

    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: twilioPhone,
      to: coverPhoneNumber,
    }),
      await Promise.all([
        redisClient.setEx(phone, 600, otp.toString()), // OTP hết hạn sau 10 phút
        redisClient.set(`otp_last_send_Phone:${phone}`, currentTime.toString()), // Lưu thời gian gửi OTP
      ]);
    return res.json({
      success: true,
      messages: "OTP đã gữi tới máy bạn",
    });
  }),
  verifyOTP: asyncHandler(async (req, res) => {
    const { userId } = req.user;
    const { phone, otp } = req.body;
    // Validate input
    if (!phone || !otp) {
      return res.status(400).json({ message: "Phone and OTP are required" });
    }

    // Fetch user and stored OTP
    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const storedOtp = await redisClient.get(phone);
    // Verify OTP
    if (storedOtp === otp) {
      await Promise.all([
        user.update({ phoneVerified: true, phone }),
        redisClient.del(phone),
        redisClient.del(`otp_last_send:${phone}`),
      ]);
      return res
        .status(200)
        .json({ success: true, message: "SĐT đã cập nhật thành công" });
    }
    return res.status(400).json({ message: "Invalid OTP" });
  }),
  chartUserRegistrations: asyncHandler(async (req, res) => {
    const { period } = req.body; // If it's passed as a query param
    const now = new Date();
    let startDate;

    // Determine start date based on the period ('month' or '6months')
    if (period === "6months") {
      startDate = new Date();
      startDate.setMonth(now.getMonth() - 6); // 6 months ago
    } else {
      startDate = new Date();
      startDate.setMonth(now.getMonth() - 1); // 1 month ago
    }

    // Query to get user registrations

    // Query to get user registrations
    /*  SELECT DATE_PART('month', "createdAt") AS "month",
         DATE_PART('year', "createdAt") AS "year",
         COUNT("id") AS "userCount"
  from "Users"
  WHERE "createdAt" >= :startDate
  GROUP BY "year", "month"
  ORDER BY "year" DESC, "month" DESC */
    const registrations = await db.User.findAll({
      attributes: [
        [
          db.sequelize.fn("DATE_PART", "month", db.sequelize.col("createdAt")),
          "month",
        ],
        [
          db.sequelize.fn("DATE_PART", "year", db.sequelize.col("createdAt")),
          "year",
        ],
        [db.sequelize.fn("COUNT", db.sequelize.col("id")), "userCount"],
      ],
      where: {
        createdAt: { [Op.gte]: startDate },
      },
      group: [
        db.sequelize.fn("DATE_PART", "year", db.sequelize.col("createdAt")),
        db.sequelize.fn("DATE_PART", "month", db.sequelize.col("createdAt")),
      ],
      order: [
        [
          db.sequelize.fn("DATE_PART", "year", db.sequelize.col("createdAt")),
          "ASC",
        ],
        [
          db.sequelize.fn("DATE_PART", "month", db.sequelize.col("createdAt")),
          "ASC",
        ],
      ],
    });

    // Check if there are no registrations
    if (!registrations.length) {
      return res.status(200).json([]);
    }

    return res.status(200).json({
      success: registrations ? true : false,
      data: registrations,
      year: registrations[0].year,
    });
  }),
  sendOTPEmail: asyncHandler(async (req, res) => {
    const { email } = req.query; // Extract email from query
    const { userId } = req.user; // Extract userId from authenticated user (req.user)
    // Check if the user exists
    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser && existingUser.id !== userId) {
      return res.json({
        success: false,
        message: "Email này đã được sử dụng bởi một tài khoản khác.",
      });
    }
    if (user.email === email && user.emailVerified) {
      return res.json({
        success: false,
        message: "Email này đã được xác thực",
      });
    }

    // Generate a 6-digit OTP
    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    // OTP cooldown logic
    const currentTime = Date.now();
    const lastSendTime = await redisClient.get(`otp_last_send:${email}`);
    const cooldown = process.env.REDIS_TIME_RESET; // 5 minutes in milliseconds

    if (lastSendTime && currentTime - parseInt(lastSendTime) < cooldown) {
      const remainingTime = Math.ceil(
        (cooldown - (currentTime - parseInt(lastSendTime))) / 1000
      );
      return res.status(429).json({
        success: false,
        message: `Vui lòng đợi ${remainingTime} giây trước khi gửi lại OTP.`,
      });
    }

    // Prepare email content
    const html = `Your OTP is <strong>${otp}</strong>`;
    const isChangeLabel = true;
    const data = { email, html, isChangeLabel };

    // Send the email
    const response = await sendMail(data);

    // Store OTP and send time in Redis
    await Promise.all([
      redisClient.setEx(email, 300, otp.toString()), // OTP expires in 5 minutes (300 seconds)
      redisClient.set(`otp_last_send:${email}`, currentTime.toString()), // Save current send time
    ]);

    // Respond to the client
    return res.status(200).json({
      success: !!response, // `true` if email was sent successfully
      message: response
        ? "OTP sent. Check your email."
        : "Failed to send OTP. Please try again.",
    });
  }),
  verifyOTPEmail: asyncHandler(async (req, res) => {
    const { userId } = req.user;
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    // Fetch user and stored OTP
    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const storedOtp = await redisClient.get(email);
    // Verify OTP
    if (storedOtp === otp) {
      await Promise.all([
        user.update({ emailVerified: true, email }),
        redisClient.del(email),
        redisClient.del(`otp_last_send:${email}`),
      ]);
      return res
        .status(200)
        .json({ success: true, message: "Email xác thực thành công" });
    }
    return res.status(400).json({ message: "Invalid OTP" });
  }),
};
module.exports = UserController;
