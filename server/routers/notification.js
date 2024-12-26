const router = require('express').Router();
const NotificationController = require('../controllers/notification');
const verify = require('../middleware/verify_Token');

router.use(verify.verifyToken);
router.get('/', NotificationController.getUserNotifications);
router.patch('/:notificationId/read', NotificationController.markNotificationAsRead);
router.patch('/mark-all-read', NotificationController.markAllNotificationsAsRead);
router.get('/unread-count', NotificationController.getUnreadNotificationsCount);
router.post('/',NotificationController.createNotification)
router.delete('/',NotificationController.deleteNotification)
router.delete('/All',NotificationController.deleteAllNotifications)

module.exports = router;

