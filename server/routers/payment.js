const router = require("express").Router();
const paymentController = require("../controllers/Payment");
const verify = require('../middleware/verify_Token');
router.post("/create_payment_url", paymentController.createPaymentUrl);
router.post("/payment_return", verify.verifyToken, paymentController.returnPayMent);
router.get("/getHistory",verify.verifyToken ,paymentController.getHistory)
router.get('/',verify.verifyToken,verify.verifyTokenAdmin,paymentController.getHistorys)
module.exports = router;
