const basketController = require('../entaties/basket/basketController');
const authMiddleware = require('../middlewares/authMiddleware');
const Router = require('express').Router;
const router = Router();

router.post('/', basketController.addInBasket);
router.get('/:basketDeviceId', basketController.getOne);
router.get('/have/:deviceId', basketController.basketHaveDevice);
router.get('/', basketController.getAll);
router.put('/:basketDeviceId', basketController.updateDeviceInfo);
router.delete('/:basketDeviceId', basketController.delete);

module.exports = router;
