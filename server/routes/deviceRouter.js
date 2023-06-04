const deviceController = require('../entaties/device/deviceController');
const deviceCommentController = require('../entaties/deviceComments/deviceCommentController');
const ratingController = require('../entaties/rating/ratingController');
const { ADMIN } = require('../helpers/rolesConst');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRolesMiddleware = require('../middlewares/checkRolesMiddleware');
const Router = require('express').Router;
const router = Router();

router.post('/', authMiddleware, checkRolesMiddleware([ADMIN]), deviceController.createDevice);
router.get('/', deviceController.getAllDevice);
router.get('/:id', deviceController.getOneDevice);
router.put('/:id', authMiddleware, deviceController.updateDevice);
router.post('/:id/comment', authMiddleware, deviceCommentController.create);
router.get('/:id/comment', deviceCommentController.get);
router.put('/:id/comment/:commentId', authMiddleware, deviceCommentController.update);
router.delete('/:id/comment/:commentId', authMiddleware, deviceCommentController.delete);
router.put('/:id/rate', authMiddleware, ratingController.toRate);

module.exports = router;
