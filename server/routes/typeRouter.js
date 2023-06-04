const typeController = require('../entaties/type/typeController');
const { ADMIN } = require('../helpers/rolesConst');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRolesMiddleware = require('../middlewares/checkRolesMiddleware');
const Router = require('express').Router;
const router = Router();

router.post('/', authMiddleware, checkRolesMiddleware([ADMIN]), typeController.create);
router.put('/:typeId', authMiddleware, typeController.update);
router.get('/:typeId', typeController.getOne);
router.get('/', typeController.getSome);

module.exports = router;
