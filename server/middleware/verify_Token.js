const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const db = require('../models')
const verifyToken = asyncHandler(async (req, res, next) => {

    if (req?.headers?.authorization?.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, process.env.SECRET_KEY_JWT, (err, user) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "Token is not valid",

                })
            }
            req.user = user;
            next();
        })
    }
    else
        return res.status(401).json({
            success: false,
            message: "Token is not provided",
        });

})

const verifyTokenAdmin = asyncHandler(async (req, res, next) => {
    const { Role } = req.user;

    if (Role !== true) // true:admin false: not admin
        return res.status(401).json({
            mes: "U're not Admin ",
            sucess: false
        })
    next();
})
const AccessToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.SECRET_KEY_JWT,
        { expiresIn: "1d" }
    );
}
const RefreshToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.SECRET_KEY_JWT,
        { expiresIn: "7d" }
    );
}

module.exports = {
    verifyTokenAdmin,
    verifyToken,
    AccessToken,
    RefreshToken
}