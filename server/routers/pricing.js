const router  = require('express').Router()
const pricingController = require('../controllers/pricing')
const verify=  require('../middleware/verify_Token')

router.use(verify.verifyToken)
router.get('/',pricingController.getPricings)
router.patch('/',verify.verifyTokenAdmin,pricingController.editPricing)
module.exports=router