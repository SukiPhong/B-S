const router = require('express').Router();
const UserController = require('../controllers/user')
const verify = require('../middleware/verify_Token');
router.get('/Current', verify.verifyToken, UserController.getUser)
router.patch('/updatePassword',verify.verifyToken,UserController.updatePassword)
router.patch('/updatePatchUser',verify.verifyToken,UserController.updatePatchUser)

module.exports = router;

