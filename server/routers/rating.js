const router = require('express').Router()
const verify = require('../middleware/verify_Token')
const RatingControllers = require('../controllers/rating')

router.get('/:idPost',RatingControllers.getRatingsForPost)

router.use(verify.AccessToken)
router.post('/',RatingControllers.createRating)
router.delete('/:idPost',verify.verifyTokenAdmin,RatingControllers.deleteRating)



module.exports= router