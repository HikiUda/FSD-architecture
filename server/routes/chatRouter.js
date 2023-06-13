const chatController = require('../entaties/chat/chatController');
const { ADMIN } = require('../helpers/rolesConst');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRolesMiddleware = require('../middlewares/checkRolesMiddleware');
const Router = require('express').Router;
const router = Router();

router.get('/mychat', chatController.getUserChats);
router.get('/adminchat', checkRolesMiddleware([ADMIN]), chatController.getAdminChats);
router.get('/support', chatController.getSupportChat);
router.post('/mychat', chatController.createChat);
router.post('/adminchat', chatController.createChatWithAdmin);
router.get('/:chatId', chatController.getChat);

module.exports = router;
