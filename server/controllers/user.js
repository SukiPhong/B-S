const asyncHandler = require('express-async-handler');
const db = require('../models')

const UserController = {

    getUser: asyncHandler(async (req, res) => {
        const { userId } = req.user
        const response = await db.User.findByPk(userId, {
            attributes: {
                exclude: ['password', 'resetPwExpiry', 'resetPwToken']
            },
            include: [{
                model: db.Pricing, as: 'rPricing', attributes: { exclude: ['createdAt', 'updatedAt'] }
            }]
        })

        return res.status(200).json({
            success: true,
            data: response
        })
    })
}
module.exports = UserController