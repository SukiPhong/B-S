const { query } = require("express");
const db = require("../models");
const asyncHandler = require("express-async-handler");
const { Op, Sequelize, where } = require("sequelize");
const { handleRangeFilter } = require("../utils/fn.js");
const { enumData } = require("../utils/Constants");
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
    const {
      limit,
      province,
      page,
      fields,
      soft,
      properType,
      status,
      price,
      size,
      ...query
    } = req.query;
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
    if (province) {
      query.title = Sequelize.where(
        Sequelize.fn("LOWER", Sequelize.col("province")),
        "LIKE",
        `%${province.toLocaleLowerCase()}%`
      );
    }
   
    if (price) {
      query.price = handleRangeFilter(price);
    }
    if (size) {
      query.size = handleRangeFilter(size);
    }
    console.log(size)
    if (properType) {
      const types = properType.split(","); // Tách danh sách giá trị bằng dấu phẩy
      query.properType = { [Sequelize.Op.in]: types }; // Sử dụng toán tử IN
    }
    if (status) {
      const types = status.split(",");
      query.status = { [Sequelize.Op.notIn]: types }; // Sử dụng toán tử notIN
    }

    //query.expiredDate = { [Sequelize.Op.gt]: new Date() };

    //sorting
    if (soft) {
      const order = soft
        .split(",")
        .map((el) =>
          el.startsWith("-") ? [el.replace("-", ""), "DESC"] : [el, "ASC"]
        );

      options.order = order;
    }
    options.include = [
      {
        model: db.User,
        as: "rUser",
        attributes: ["fullname", "avatar", "phone"],
        include: [
          {
            model: db.Pricing,
            as: "rPricing",
            attributes: ["priority", "name"],
          },
        ],
      },
    ];

    if (!limit) {
      const response = await db.Post.findAll({ where: query, ...options });
      return res.status(200).json({
        success: response ? true : false,
        message: response ? "true1" : "false2",
        data: response,
      });
    }

    //pagination

    const offset = (page && +page > 1 ? +page - 1 : 0) * limit;
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
  GetPostDetail: asyncHandler(async (req, res) => {
    const { idPost } = req.params;
    const response = await db.Post.findOne({
      where: { idPost },
      include: [
        {
          model: db.User,
          as: "rUser",
          attributes: ["fullname", "avatar", "phone", "email"],
        },
      ],
    });
    return res.json({
      success: Boolean(response) ? true : false,

      data: response,
    });
  }),
  UpdatePatchPost: asyncHandler(async (req, res) => {
    const { userId, Role } = req.user;

    const { idPost, ...payload } = req.body;

    const checkEditRight = await db.Post.findOne({
      where: { idUser: userId, idPost },
    });
    if (!payload || Object.keys(payload).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Bạn không nhập thông tin để cập nhật.",
      });
    }

    if (checkEditRight) {
      await checkEditRight.update({ ...payload });
      return res.json({ success: true, data: checkEditRight });
    }
    if (Role) {
      const response = await db.Post.findOne({ where: { idPost } });
      if (!response) {
        return res
          .status(404)
          .json({ success: false, message: "Bài viết không tồn tại" });
      }
      await response.update({ ...payload });
      return res.json({ success: true, data: response });
    }

    return res
      .status(403)
      .json({ success: false, message: "Bạn không có quyền chỉnh sửa" });
  }),
  DeletePost: asyncHandler(async (req, res) => {
    const { userId, Role } = req.user;
    const { pid } = req.params;
    const userPost = await db.Post.findOne({
      where: { idUser: userId, id: pid },
    });
    if (userPost) {
      await userPost.destroy();
      return res.json({ success: true, message: "Xóa thành công" });
    }
    if (Role) {
      const response = await db.Post.findByPk(pid);
      if (response) {
        await response.destroy();
        return res.json({ success: true, message: "Xóa thành công" });
      }
      return res
        .status(404)
        .json({ success: false, message: "Bài viết không tồn tại." });
    }
    return res.json({
      success: false,
      message: "Bạn không có quyền",
    });
  }),
  ApprovePost: asyncHandler(async (req, res) => {
    const { Role } = req.user;
    const { pid } = req.params;
    if (!Role)
      return res
        .status(403)
        .json({ success: false, message: "Bạn không có quyền" });

    const post = await db.Post.findByPk(pid);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Bài viết không tồn tại" });
    }
    await post.update({ status: "Còn trống" });
    return res.json({ success: true, message: "Bài viết đã được duyệt" });
  }),
  GetPostFeatured: asyncHandler(async (req, res) => {
    const response = await db.Post.findAll({
      include: [
        {
          model: db.User,
          as: "rUser",
          attributes: ["fullname"],
          include: [
            {
              model: db.Pricing,
              as: "rPricing",
              attributes: ["name", "priority"],
              where: {
                priority: 5,
              },
              required: true, // Thêm dòng này để yêu cầu phải có Pricing với priority = 5
            },
          ],
        },
      ],
      where: {
        "$rUser.rPricing.priority$": 5, // Thêm điều kiện này để lọc bài viết theo người dùng có gói ưu tiên 5
        status: {
          [Op.notIn]: ["Chờ duyệt", "Nháp"],
        },
      },
    });

    return res.json({
      success: response ? true : false,
      message: response ? "Lấy dữ liệu thành công" : "Lấy dữ liệu thất bại",
      data: response,
    });
  }),
  PostChartDataToMoths: asyncHandler(async (req, res) => {
    const { Role } = req.user;
    const { period } = req.body;
    console.log(period)
    // Thời gian: 'month' hoặc '6months'
    // Lấy thời gian hiện tại và tính toán phạm vi thời gian cho query
    const now = new Date();
    let startDate;
  
    // Xác định ngày bắt đầu tùy thuộc vào 'month' hoặc '6months'
    if (period === "6months") {
      startDate = new Date();
      startDate.setMonth(now.getMonth() - 6); // Lấy 6 tháng trước
    } else {
      startDate = new Date();
      startDate.setMonth(now.getMonth() - 1); // Lấy 1 tháng trước
    }
  
    // Lọc các bài đăng được tạo trong khoảng thời gian từ startDate trở đi
    const posts = await db.Post.findAll({
      where: {
        createdAt: { [Op.gte]: startDate },
      },
    });
  
    // Tạo đối tượng dữ liệu cho chart
    const chartData = {
      pending: 0,
      approved: 0,
      rejected: 0,
      months: [], // Mảng chứa các tháng hoặc 6 tháng
      pendingData: [],
      statusEmptyData: [],
      statusUpdatingData: [],
      statusHandedOverData: [],
      statusDaftData: [],
    };
  
    const getMonthName = (monthIndex) => {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return months[monthIndex];
    };
  
    // Phân loại bài đăng theo trạng thái và tháng
    posts.forEach((post) => {
      const postMonth = post.createdAt.getMonth(); // Lấy tháng của bài viết
      const postYear = post.createdAt.getFullYear(); // Lấy năm của bài viết
  
      const monthKey = `${getMonthName(postMonth)} ${postYear}`;
  
      // Kiểm tra xem tháng đã có trong chartData.months chưa
      if (!chartData.months.includes(monthKey)) {
        chartData.months.push(monthKey);
        chartData.pendingData.push(0);
        chartData.statusEmptyData.push(0);
        chartData.statusUpdatingData.push(0);
        chartData.statusHandedOverData.push(0);
        chartData.statusDaftData.push(0);
      }
  
      const index = chartData.months.indexOf(monthKey);
  
      // Sử dụng switch để phân loại theo trạng thái bài viết
      switch (post.status) {
        case enumData.statusPost[0]: // "Chờ duyệt" => pending
          chartData.pendingData[index]++;
          break;
        case enumData.statusPost[1]: // "Còn trống" => statusEmpty
          chartData.statusEmptyData[index]++;
          break;
        case enumData.statusPost[2]: // "Đã bàn giao" => approved
          chartData.statusHandedOverData[index]++;
          break;
        case enumData.statusPost[3]: // "Nháp" => statusDaft
          chartData.statusDaftData[index]++;
          break;
        case enumData.statusPost[4]: // "Đang cập nhật" => statusUpdating
          chartData.statusUpdatingData[index]++;
          break;
        default:
          // Nếu không phải trạng thái trên, bạn có thể xử lý thêm (hoặc bỏ qua)
          break;
      }
    });
    console.log(chartData.pendingData)
    // Trả về kết quả dữ liệu cho biểu đồ
    return res.status(200).json({
      success: chartData ? true : false,
      data: {
        labels: chartData.months,
        datasets: [
          {
            label: `${enumData.statusPost[0]}`,
            data: chartData.pendingData[0],
          },
          {
            label: `${enumData.statusPost[1]}`,
            data: chartData.statusEmptyData[0],
          },
          {
            label: `${enumData.statusPost[2]}`,
            data: chartData.statusHandedOverData[0],
          },
          {
            label: `${enumData.statusPost[3]}`,
            data: chartData.statusDaftData[0],
          },
          {
            label: `${enumData.statusPost[4]}`,
            data: chartData.statusUpdatingData[0],
          },
        ],
      },
    });
  })
};
module.exports = PostController;
