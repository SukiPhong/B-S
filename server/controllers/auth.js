const asyncHandler = require('express-async-handler');
const db = require('../models')

const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { AccessToken, RefreshToken } = require('../middleware/verify_Token');
const bcrypt = require('bcryptjs/dist/bcrypt');

const AuthController = {

    loginWithGoogle: asyncHandler(async (req, res) => {
        const { email, avatar, fullname, password } = req.body
        let userId
        const alreadyUser = await db.User.findOne({ where: { email } })
        if (!alreadyUser) {
            const newUser = await db.User.create(
                { email, fullname, avatar, password })
            if (!newUser) throw new Error("Couldn't create")
            userId = newUser.id
            console.log(newUser)
        } else {

            userId = alreadyUser.id
        }
        // const token = jwt.sign(
        //     { userId },
        //     process.env.SECRET_KEY_JWT,
        //     { expiresIn: "1d" }
        // );
        const token = AccessToken(userId)
        return res.json({
            success: true,
            message: 'Login successful',
            accessToken: token,
            message: token ? "Create password and login successful" : "Login failed"
        })

    }),
    checkUserFromEmail: asyncHandler(async (req, res) => {
        const { email } = req.params
        const user = await db.User.findOne({ where: { email } })
        let token = null;
        if (user)
            // token = jwt.sign(
            //     { userId: user.id },
            //     process.env.SECRET_KEY_JWT,
            //     { expiresIn: "1d" }
            // );
            token = AccessToken(user.id)


        return res.json({
            success: true,
            hashUser: !!user,
            accessToken: token,
            message: token ? "Login successful" : "New users"
        })
    }),
    register: asyncHandler(async (req, res) => {
        const { email = null, phone = null, password, fullname } = req.body
        const checkUserExist = await db.User.findOne({
            where: {
                [Op.and]: [
                    { email },
                    { phone }
                ]
            },
        })

        if (checkUserExist) throw new Error("Email or Phone was used")
        const newUser = await db.User.create({ email: email || null, phone: phone || null, password, fullname })
        return res.status(201).json({
            success: newUser ? true : false,
            message: newUser ? "Register successful" : "Register failed",
            data: newUser
        })
    }),
    login: asyncHandler(async (req, res) => {
        const { email = null, phone = null, password } = req.body
        const user = await db.User.findOne({
            where: {
                [Op.and]: [
                    { email },
                    { phone }
                ],
            },
        })
        if (!user) {
            return res.status(404).json({ success: false, message: "User  has not registered" });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        const token = AccessToken(user.id)
        const PwToken = RefreshToken(user.id)
        user.resetPwToken = PwToken
        const response = await db.User.update({ resetPwToken: PwToken, resetPwExpiry: new Date() }, {
            where: { id: user.id }, attributes: {
                exclude: ['password', 'resetPwExpiry', 'resetPwToken']
            }
        },)
        // await db.User.update({resetPwToken: PwToken}, { where: { id: user.id } })
        return res.status(200).json({
            success: response ? true : false,
            message: response ? "Login successfully" : "Login failed",
            AccessToken: token
        })
    }),
}

module.exports = AuthController;