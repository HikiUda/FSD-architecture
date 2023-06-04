const roleController = require('../entaties/role/roleController');
const checkRolesMiddleware = require('../middlewares/checkRolesMiddleware');
const { ADMIN, MAINADMIN } = require('../helpers/rolesConst');

const Router = require('express').Router;
const router = Router();

router.post('/admin', checkRolesMiddleware([MAINADMIN]), roleController.addAdmin);
router.post('/vendor', checkRolesMiddleware([ADMIN]), roleController.addVendor);

module.exports = router;
