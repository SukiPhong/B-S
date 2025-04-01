const moment = require("moment");
const CryptoJS = require("crypto-js");
const QueryString = require("qs");
const asyncHandler = require("express-async-handler");
const db = require("../models");
const { Op } = require("sequelize");
const Payment = {
  createPaymentUrl: asyncHandler((req, res) => {
    var ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
    let date = new Date();
    let createDate = moment(date).format("YYYYMMDDHHmmss");
    let expiredDate = moment(new Date(Date.now() + 10 * 60 * 1000)).format(
      "YYYYMMDDHHmmss"
    );

    let tmnCode = process.env.VNP_TMN_CODE || "";
    let secretKey = process.env.VNP_HASH_SECRET || "";
    let vnpUrl = process.env.VNP_URL || "";
    let returnUrl = process.env.VNP_RETURN_URL || "";
    let orderId = moment(date).format("DDHHmmss");
    let amount = req.body.amount; ///  Insert  value amount  by Req.body
    let locale = "vn";
    let currCode = "VND";
    let vnp_Params = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = "Thanh toan cho hoa don: " + orderId;
    vnp_Params["vnp_OrderType"] = "other";
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    vnp_Params["vnp_ExpireDate"] = expiredDate;
    vnp_Params["vnp_BankCode"] = "VNBANK";
    vnp_Params = sortObject(vnp_Params);

    let signData = QueryString.stringify(vnp_Params, { encode: false });

    let signed = CryptoJS.HmacSHA512(signData, secretKey).toString(
      CryptoJS.enc.Hex
    );

    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + QueryString.stringify(vnp_Params, { encode: false });
    return res.json({
      success: true,
      url: vnpUrl,
    });
  }),

  returnPayMent: asyncHandler(async (req, res) => {
    const { vnp_Params } = req.body;

    const { userId } = req.user;
    const user = await db.User.findByPk(userId);
    let {
      vnp_TxnRef,
      vnp_Amount,
      vnp_ResponseCode,
      vnp_TransactionStatus,
      vnp_SecureHash,
      vnp_TmnCode,
      vnp_BankCode,
      vnp_BankTranNo,
      vnp_CardType,
      vnp_PayDate,
      vnp_OrderInfo,
      vnp_TransactionNo,
    } = vnp_Params;

    if (
      !vnp_SecureHash ||
      !vnp_TxnRef ||
      !vnp_Amount ||
      !vnp_ResponseCode ||
      !vnp_TmnCode
    ) {
      throw new Error("Missing Input");
    }
    let secureHash = vnp_SecureHash;
    let tmnCode = process.env.VNP_TMN_CODE || "";
    let secretKey = process.env.VNP_HASH_SECRET || "";
    vnp_Params["vnp_SecureHash"] = undefined;
    let signData = QueryString.stringify(vnp_Params, { encode: false });
    let signed = CryptoJS.HmacSHA512(signData, secretKey).toString(
      CryptoJS.enc.Hex
    );
    if (secureHash !== signed) {
      return 2;
    }
    vnp_Amount = (vnp_Amount * 1) / 100;
    vnp_Params["vnp_Amount"] = vnp_Amount;
    const status = vnp_ResponseCode === "00" ? "Thành công" : "Thất bại";

    // Insert History
    const response = await db.HistoryPayment.create({
      transactionId: vnp_BankTranNo,
      data: vnp_Params,
      TYPE: "VNPAY",
      idUser: user.id,
      fullnameUser: user.fullname,
      phoneUser: user.phone,
      status,
    });
    return res.json({
      success: Boolean(response) ? true : false,
      message: Boolean(response) ? "Tạo thành công" : "Tạo thất bại",
      status: response.status,
      amount: vnp_Amount,
    });
  }),
  getHistory: asyncHandler(async (req, res) => {
    const { userId } = req.user;
    const response = await db.HistoryPayment.findAll({
      where: { idUser: userId },
      attributes: {
        exclude: ["phoneUser", "fullnameUser", "updatedAt"],
      },
    });
    return res.json({
      success: response ? true : false,
      message: response ? "Call api success" : "failed",
      data: response,
    });
  }),
  getHistorys: asyncHandler(async (req, res) => {
    const { Role } = req.user;
    const { limit, page, fullname } = req.query;
    if (!Role)
      return res
        .status(400)
        .json({ success: false, message: "Bạn không có quyền truy cập" });

        let fullnameUser
    if (fullname) {
       fullnameUser = Sequelize.where(
        Sequelize.fn("LOWER", Sequelize.col("fullnameUser")),
        "LIKE",
        `%${fullnameUser.toLocaleLowerCase()}%`
      );
    }

    const response = await db.HistoryPayment.findAndCountAll({
      limit: +limit,
      offset: (page && +page > 1 ? +page - 1 : 0) * limit,
      where: fullnameUser,
    });
    return res.json({
      success: Boolean(response) ? true : false,
      message: Boolean(response)
        ? "Lấy dữ liệu thành công"
        : "Lấy dữ liệu thất bại",
      data: { ...response, limit: +limit, page: +page ? +page : 1 },
    });
  }),
};
module.exports = Payment;
function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
