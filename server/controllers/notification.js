const asyncHandler = require("express-async-handler");
const db = require("../models");

const NotificationController = {
  createNotification: asyncHandler(async (req, res) => {
    const { idUser, idPost, content, type } = req.body;
    console.log(idUser); //10
    const notification = await db.Notification.create({
      idUser,
      idPost,
      content,
      type,
    });

    // Emit to specific user
    const io = req.app.get("io");
    if (io && idUser) {
      io.to(`user_${idUser}`).emit("newNotification", notification);
    }

    return res.status(201).json({
      success: true,
      message: "Notification created successfully",
      data: notification,
    });
  }),

  getUserNotifications: asyncHandler(async (req, res) => {
    const { userId } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const notifications = await db.Notification.findAndCountAll({
      where: { idUser: userId },
      include: [
        {
          model: db.Post,
          as: "rPost",
          attributes: ["title", "address"],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    return res.status(200).json({
      success: true,
      message: "Notifications retrieved successfully",
      data: {
        notifications: notifications.rows,
        totalCount: notifications.count,
        currentPage: parseInt(page),
        totalPages: Math.ceil(notifications.count / limit),
      },
    });
  }),

  markNotificationAsRead: asyncHandler(async (req, res) => {
    const { notificationId } = req.params;
    const { userId } = req.user;

    const notification = await db.Notification.findOne({
      where: { id: notificationId, idUser: userId },
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    await notification.update({ isRead: true });

    return res.status(200).json({
      success: true,
      message: "Notification marked as read",
    });
  }),
  markAllNotificationsAsRead: asyncHandler(async (req, res) => {
    const { userId } = req.user;

    const notification = await db.Notification.findAll({
      where: { idUser: userId, isRead: false },
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }
    await db.Notification.update(
      { isRead: true },
      { where: { idUser: userId, isRead: false } } // Chỉ cập nhật những thông báo chưa đọc
    );

    return res.status(200).json({
      success: true,
      message: "Notification marked as read",
    });
  }),
  getUnreadNotificationsCount: asyncHandler(async (req, res) => {
    const { userId } = req.user;

    const count = await db.Notification.count({
      where: { idUser: userId, isRead: false },
    });

    return res.status(200).json({
      success: true,
      data: { unreadCount: count },
    });
  }),

  createSystemNotification: asyncHandler(async (req, res) => {
    const { content, type } = req.body;

    const notification = await db.Notification.create({
      content,
      type: type || "system",
      isSystemWide: true,
    });

    // Emit to all admins
    req.app.get("io").to("admin_room").emit("systemNotification", notification);

    return res.status(201).json({
      success: true,
      message: "System notification created successfully",
      data: notification,
    });
  }),
  deleteAllNotifications: asyncHandler(async (req, res) => {
    const { userId } = req.user;
    if (!userId)
      return res.json({ success: false, message: "Bạn không có quyền !!!" });
    const response = await db.Notification.destroy({
      where: { idUser: userId },
    });
    return res.json({
      success: response > 0, // Successful if at least one notification was deleted
      message: response > 0 ? "Xóa thành công" : "Xóa thất bại",
    });
  }),
  deleteNotification: asyncHandler(async (req, res) => {
    const { userId } = req.user;
    const { nid } = req.query;
    if (!userId)
      return res.json({ success: false, message: "Bạn không có quyền !!!" });
    const response = await db.Notification.destroy({
      where: { id: nid, idUser: userId },
    });
    return res.json({
      success: Boolean(response) ? true : false,
      message: Boolean(response) ? "Xóa thành công " : "Xóa thất bại",
    });
  }),
};

module.exports = NotificationController;
