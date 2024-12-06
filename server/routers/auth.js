const router = require('express').Router()
const Joi = require('joi')
const AuthController = require('../controllers/auth')
const validationDTO = require('../middleware/validation')
const {
    EmailDTO,
    PhoneDTO,
    PasswordDTO,
    stringReq
} = require('../utils/joi')
router.post('/googleLogin', AuthController.loginWithGoogle)
router.get('/check-user/:email', AuthController.checkUserFromEmail)
router.post('/register', validationDTO(Joi.object({
    email: EmailDTO,
    password: PasswordDTO,
    fullname: stringReq,
}).xor('email', 'phone')), AuthController.register);
router.post('/login', validationDTO(Joi.object({
    email: EmailDTO,
    password: PasswordDTO,
}).xor('email', 'phone')), AuthController.login)
router.post('/forgot/:email',AuthController.ForgotPassword)
router.post('/reset-password', AuthController.ResetPassword)

module.exports = router