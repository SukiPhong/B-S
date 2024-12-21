const router = require('express').Router()
const verify = require("../middleware/verify_Token");
const RatingControllers = require('../controllers/rating')

router.post("/", verify.verifyToken,RatingControllers.createRating);
router.get('/:idPost',RatingControllers.getRatingsForPost)
router.delete('/:idPost',verify.verifyToken,verify.verifyTokenAdmin,RatingControllers.deleteRating)



module.exports= router