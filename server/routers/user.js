const router = require('express').Router();
const UserController = require('../controllers/user')
const verify = require('../middleware/verify_Token')
router.get('/Current', verify.verifyToken, UserController.getUser)
module.exports = router