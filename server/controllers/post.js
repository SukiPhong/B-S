const db = require('../models')
const  asyncHandler =  require('express-async-handler')
const PostController ={
    CreatePost : asyncHandler(async(req,res) => {
      
            const response =  await db.Post.CreateOrUpdate(req.body)
            return res.status(200).json({
                success: response?true:false,
                message:  response ? " true1" :" false 2"

            })
    }),
    GetPost: asyncHandler (async(req,res)) => {
        const {Pid}  = req.params
        const response = await db.Post.findOne({where: {idPost:Pid}})
        return res.status(200).json({
            success: response ? true: false,
            message: response  ? "true1": "false2"
        })
    }
}
module.exports = PostController