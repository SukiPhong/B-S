const authRouter = require('./auth');
const userRouter = require('./user');
const postRouter = require('./post')
const paymentRouter = require("./payment");
const wishlistRouter = require("./wishlist");
const pricingRouter = require("./pricing");
const ratingRouter = require("./rating.js");
const notificationRouter = require("./notification");
const { notFound, errHandler } = require("../middleware/errorHandler.js")
const initRouters = (app) => {
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/user',userRouter)
    app.use('/api/v1/posts',postRouter)
    app.use('/api/v1/payment',paymentRouter)
    app.use('/api/v1/wishlist',wishlistRouter)
    app.use('/api/v1/pricing',pricingRouter)
    app.use('/api/v1/ratings',ratingRouter)
    app.use('/api/v1/notifications', notificationRouter)
    app.use(notFound);
    app.use(errHandler)
}
module.exports = initRouters
