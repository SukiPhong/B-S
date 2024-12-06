const  router = require("express").Router()
const  PostController = require('../controllers/post')
const verify = require('../middleware/verify_Token')
const {stringReq,  numberReq,} = require ('../utils/joi')
const validationDTO = require('../middleware/validation')
const Joi = require("joi")
router.post('/',verify.verifyToken, PostController.CreatePost)
router.get("/",verify.verifyToken,PostController.GetPosts)


module.exports = router
