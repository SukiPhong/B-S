const router = require('express').Router();
const wishlistController = require('../controllers/wishlist')
const verify = require('../middleware/verify_Token');
router.use(verify.verifyToken)
router.get('/', wishlistController.getWishlist);  // Lấy wishlist của 
router.post('/', wishlistController.addToWishlist);  // Thêm sản phẩm vào wishlist
router.delete('/:id', wishlistController.removeFromWishlist);  // Xóa sản phẩm khỏi wishlist
router.post('/toggle/:idPost', wishlistController.toggleWishlist); 
module.exports = router;
