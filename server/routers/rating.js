const router = require("express").Router();
const verify = require("../middleware/verify_Token");
const RatingControllers = require("../controllers/rating");

router.post("/", verify.verifyToken, RatingControllers.createRating);
router.get(
  "/",
  verify.verifyToken,
  verify.verifyTokenAdmin,
  RatingControllers.getRatings
);
router.get("/:idPost", RatingControllers.getRatingsForPost);
router.delete(
  "/:id",
  verify.verifyToken,
  verify.verifyTokenAdmin,
  RatingControllers.deleteRating
);

module.exports = router;
