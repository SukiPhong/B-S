const router = require("express").Router();
const PostController = require("../controllers/post");
const verify = require("../middleware/verify_Token");
const { stringReq, numberReq } = require("../utils/joi");
const validationDTO = require("../middleware/validation");
const rateLimiter =require ('../middleware/rateLimiter');
const Joi = require("joi");
router.get("/", PostController.GetPosts);
router.get("/randomPost", PostController.GetPostFeatured);
router.get('/limit-info', verify.verifyToken, PostController.GetPostLimitInfo);
router.patch("/", verify.verifyToken, PostController.UpdatePatchPost);
router.post("/", verify.verifyToken,rateLimiter, PostController.CreatePost);
router.post(
  "/chart",
  verify.verifyToken,
  verify.verifyTokenAdmin,
  PostController.PostChartDataToMoths
);
router.get("/:idPost", PostController.GetPostDetail);
router.delete("/:pid", verify.verifyToken, PostController.DeletePost);  
router.patch(
  "/approve/:pid",
  verify.verifyToken,
  verify.verifyTokenAdmin,
  PostController.ApprovePost
);
module.exports = router;
