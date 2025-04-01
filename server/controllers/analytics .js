const asyncHandler = require("express-async-handler");
const { Op, Sequelize } = require("sequelize");
const db = require("../models");
const moment = require("moment");

const Analytics = {
  getRevenue: asyncHandler(async (req, res) => {
    const { type = 'month', date = new Date() } = req.query;
    const { Role } = req.user;

    if (!Role) {
      return res.status(403).json({
        success: false,
        message: "Bạn không có quyền truy cập"
      });
    }

    let startDate, endDate;
    
    if (type === 'month') {
      startDate = moment(date).startOf('month').toDate();
      endDate = moment(date).endOf('month').toDate();
    } else if (type === 'year') {
      startDate = moment(date).startOf('year').toDate();
      endDate = moment(date).endOf('year').toDate();
    }

    // Tính tổng doanh thu
    // const revenueData = await db.HistoryPayment.findAll({
    //   where: {
    //     createdAt: {
    //       [Op.between]: [startDate, endDate]
    //     },
    //     status: "Thành công"
    //   },
    //   attributes: [
    //     [db.sequelize.fn('SUM', db.sequelize.col('data.vnp_Amount')), 'totalAmount'],
    //     [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'totalTransactions']
    //   ],
    //   raw: true
    // });

    // Tính số người dùng mới
    const newUsers = await db.User.count({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate]
        }
      }
    });

    // Tính tổng doanh thu của tháng trước để so sánh
    const previousStartDate = moment(startDate).subtract(1, type).toDate();
    const previousEndDate = moment(endDate).subtract(1, type).toDate();

    const previousRevenue = await db.HistoryPayment.findAll({
      where: {
        createdAt: {
          [Op.between]: [previousStartDate, previousEndDate]
        },
        status: "Thành công"
      },
      attributes: [
        [db.sequelize.fn('SUM', db.sequelize.col('data.vnp_Amount')), 'totalAmount']
      ],
      raw: true
    });

    // const currentRevenue = revenueData[0].totalAmount || 0;
    const lastRevenue = previousRevenue[0].totalAmount || 0;
    // const revenueGrowth = lastRevenue ? 
    //   ((currentRevenue - lastRevenue) / lastRevenue * 100).toFixed(2) : 0;

    return res.json({
      success: true,
      message: "Lấy dữ liệu thành công",
      data: {
        revenue: {
          total: currentRevenue,
          transactions: revenueData[0].totalTransactions,
          growth: `${revenueGrowth}%`,
          period: type
        },
        newUsers: {
          total: newUsers,
          period: type
        }
      }
    });
  }),

  getDashboardStats: asyncHandler(async (req, res) => {
    const { Role } = req.user;

    if (!Role) {
      return res.status(403).json({
        success: false,
        message: "Bạn không có quyền truy cập"
      });
    }

    // Lấy thống kê cho tháng hiện tại
    const currentDate = new Date();
    const startOfMonth = moment(currentDate).startOf('month').toDate();
    const endOfMonth = moment(currentDate).endOf('month').toDate();

    // Tổng doanh thu tháng hiện tại
    // const payments = await db.HistoryPayment.findAll({
    //   where: {
    //     createdAt: {
    //       [Op.between]: [startOfMonth, endOfMonth],
    //     },
    //     status: "Thành công",
    //   },

    // });
    // const currentRevenue = payments.reduce((sum, payment) => {
    //   let vnpAmount = 0;
    
      // Kiểm tra và parse nếu cần thiết
    //   if (typeof payment.data === 'string') {
    //     vnpAmount = JSON.parse(payment.data)?.vnp_Amount;
    //   } else if (typeof payment.data === 'object') {
    //     vnpAmount = payment.data?.vnp_Amount;
    //   }
    
    //   return sum + parseFloat(vnpAmount || 0);
    // }, 0);
    // Tổng doanh thu tháng trước
     const lastMonthStart = moment(startOfMonth).subtract(1, 'month').toDate();
     const lastMonthEnd = moment(endOfMonth).subtract(1, 'month').toDate();
    // const lastMonthRevenue = await db.HistoryPayment.sum('data->>vnp_Amount', {
      // where: {
      //   createdAt: {
    //       [Op.between]: [lastMonthStart, lastMonthEnd]
    //     },
    //     status: "Thành công"
    //   }
    // });

    // // Tính tỷ lệ tăng trưởng doanh thu
    // const revenueGrowth = lastMonthRevenue ? 
    //   ((currentRevenue - lastMonthRevenue) / lastMonthRevenue * 100).toFixed(2) : 0;

    // Thống kê người dùng mới
    const newUsers = await db.User.count({
      where: {
        createdAt: {
          [Op.between]: [startOfMonth, endOfMonth]
        }
      }
    });

    // Số người dùng mới tháng trước
    const lastMonthNewUsers = await db.User.count({
      where: {
        createdAt: {
          [Op.between]: [lastMonthStart, lastMonthEnd]
        }
      }
    });

    // Tính tỷ lệ tăng trưởng người dùng mới
    const userGrowth = lastMonthNewUsers ? 
      ((newUsers - lastMonthNewUsers) / lastMonthNewUsers * 100).toFixed(2) : 0;
    const  totalUser =await db.User.count()
    return res.json({
      success: true,
      message: "Lấy dữ liệu thành công",
      data: {
        // revenue: {
        //   current: currentRevenue || 0,
        //   growth: `${revenueGrowth}%`,
        //   trend: revenueGrowth >= 0 ? 'up' : 'down'
        // },
        users: {
          new: newUsers,
          growth: `${userGrowth}%`,
          trend: userGrowth >= 0 ? 'up' : 'down',
          totalUser:totalUser
        },
        period: {
          start: startOfMonth,
          end: endOfMonth
        }
      }
    });
  })
};

module.exports = Analytics;

