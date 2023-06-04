const likedController = require('../entaties/liked/likedController');
const purchesController = require('../entaties/purches/purchesController');

const Router = require('express').Router;
const router = Router();

router.post('/liked/:deviceId', likedController.changeLikedDevice);
router.get('/liked/:deviceId', likedController.isLiked);
router.get('/liked', likedController.getLikedDevice);
router.get('/purches', purchesController.getAll);
router.get('/purches/:id', purchesController.getOne);
router.post('/purches', purchesController.buy);

module.exports = router;
