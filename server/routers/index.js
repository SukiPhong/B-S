const authRouter = require('./auth');
const userRouter = require('./user');
const postRouter = require('./post')
const { notFound, errHandler } = require("../middleware/errorHandler.js")
const initRouters = (app) => {
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/user', userRouter)
    app.use('/api/v1/posts',postRouter)
    app.use(notFound);
    app.use(errHandler)
}
module.exports = initRouters
