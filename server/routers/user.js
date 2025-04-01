const router = require("express").Router();
const UserController = require("../controllers/user");
const verify = require("../middleware/verify_Token");
router.use(verify.verifyToken);
router.get("/Current", UserController.getUser);
router.patch("/updatePassword", UserController.updatePassword);
router.patch("/updatePatchUser", UserController.updatePatchUser);
router.post("/sendOTP", UserController.handleSendOTP);
router.patch("/verifyOTP", UserController.verifyOTP);
router.post("/sendOTPEmail/", UserController.sendOTPEmail);
router.patch("/verifyOTPEmail", UserController.verifyOTPEmail);
router.get("/", verify.verifyTokenAdmin, UserController.getUsers);
router.post(
  "/chartUser",
  verify.verifyTokenAdmin,
  UserController.chartUserRegistrations
);
router.post("/NewUser", verify.verifyTokenAdmin, UserController.NewUserByAdmin);
router.patch(
  "/upUserByAdmin",
  verify.verifyTokenAdmin,
  UserController.updateUserByAdmin
);
router.delete("/:uid", verify.verifyTokenAdmin, UserController.deleteUser);
module.exports = router;
