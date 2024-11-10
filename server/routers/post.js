const  router = require(express).Router()
const  PostController = require('../controllers/post')
router.post('/', PostController.CreatePost())

module.exports = router