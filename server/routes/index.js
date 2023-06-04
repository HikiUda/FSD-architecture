const Router = require('express').Router;
const router = Router();

const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const deviceRouter = require('./deviceRouter');
const typeRouter = require('./typeRouter');
const brandRouter = require('./brandRouter');
const basketRouter = require('./basketRouter');
const statementRouter = require('./statementRouter');
const chatRouter = require('./chatRouter');
const roleRouter = require('./roleRouter');
const authMiddleware = require('../middlewares/authMiddleware');

router.use('/auth', authRouter);
router.use('/user', authMiddleware, userRouter);
router.use('/device', deviceRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/basket', authMiddleware, basketRouter);
router.use('/statement', authMiddleware, statementRouter);
router.use('/chat', authMiddleware, chatRouter);
router.use('/role', authMiddleware, roleRouter);

module.exports = router;
