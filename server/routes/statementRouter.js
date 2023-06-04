const statementsController = require('../entaties/statements/statementsController');
const { ADMIN, VENDOR } = require('../helpers/rolesConst');
const checkRolesMiddleware = require('../middlewares/checkRolesMiddleware');
const Router = require('express').Router;
const router = Router();

router.post('/role', statementsController.createRoleStatement);
router.post('/device', checkRolesMiddleware([VENDOR]), statementsController.createDeviceStatement);
router.post(
   '/typebrand',
   checkRolesMiddleware([VENDOR]),
   statementsController.createBrandOrTypeStatement,
);
router.put(
   '/admin-comment/:id',
   checkRolesMiddleware([ADMIN]),
   statementsController.addAdminComment,
);
router.put('/state/:id', checkRolesMiddleware([ADMIN]), statementsController.changeState);
router.get('/:id', checkRolesMiddleware([ADMIN]), statementsController.getOne);
router.get('/', checkRolesMiddleware([ADMIN]), statementsController.getSome);

module.exports = router;
