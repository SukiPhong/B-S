const moment = require("moment");
const CryptoJS = require("crypto-js");
const QueryString = require("qs");
const asyncHandler = require("express-async-handler");
const db = require("../models");
const { Op } = require("sequelize");

const PricingController  ={
    getPricings: asyncHandler(async(req,res)=>{
        // const {Role}= req.user
        // if(!Role) return res.status(400).json({success:false ,message:'Bạn không có quyền'})
        const response =  await db.Pricing.findAll()
        return res.json({
            success:Boolean(response)?true:false,
            message:Boolean(response)? 'Lấy dữ liệu thành công':'Lấy dữ liệu thất bại',
            response
        })
    }),
    editPricing:asyncHandler(async(req,res)=>{
        const {Role} = req.user
        const {id,...data}=req.body
        if(!Role) return res.status(400).json({success:false ,message:'Bạn không có quyền'})
        const response =await db.Pricing.findByPk(id)
        if(response){
    await response.update({...data})
     
        }
        return res.json({
            success:'true',
            message:'Update thành công'
        })
    })
}
module.exports=PricingController