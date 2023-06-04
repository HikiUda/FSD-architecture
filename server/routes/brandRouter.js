const brandController = require('../entaties/brand/brandController');
const authMiddleware = require('../middlewares/authMiddleware');
const Router = require('express').Router;
const router = Router();

router.post('/', authMiddleware, brandController.create);
router.put('/:brandId', authMiddleware, brandController.update);
router.get('/:brandId', brandController.getOne);
router.get('/', brandController.getSome);

module.exports = router;
