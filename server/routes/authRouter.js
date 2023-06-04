const authController = require('../entaties/auth/authController');
const Router = require('express').Router;
const router = Router();
const { body } = require('express-validator');

router.post('/login', authController.login);
router.post(
   '/registration',
   body('email').isEmail(),
   body('password').isLength({ min: 8, max: 24 }),
   authController.registration,
);
router.post('/logout', authController.logout);
router.get('/refresh', authController.refresh);

module.exports = router;
