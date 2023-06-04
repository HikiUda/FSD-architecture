const AuthError = require('../../exceptions/AuthError');
const { validationResult } = require('express-validator');
const authService = require('./authService');

class AuthController {
   async login(req, res, next) {
      try {
         const { email, password } = req.body;
         if (!email || !password) {
            throw AuthError.BadRequest('Заполните все поля');
         }

         const data = await authService.login(email, password);
         res.cookie('refreshToken', data.tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
         });

         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async registration(req, res, next) {
      try {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            throw AuthError.BadRequest('Неправильный логин или пароль', errors.array());
         }
         const { email, password } = req.body;
         const data = await authService.registration(email, password);
         res.cookie('refreshToken', data.tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
         });

         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async logout(req, res, next) {
      try {
         const { refreshToken } = req.cookies;
         await authService.logout(refreshToken);
         res.clearCookie('refreshToken');
         res.status(200).json();
      } catch (e) {
         next(e);
      }
   }
   async refresh(req, res, next) {
      try {
         const { refreshToken } = req.cookies;
         if (!refreshToken) {
            throw AuthError.UnauthorizedError();
         }
         const data = await authService.refresh(refreshToken);
         res.cookie('refreshToken', data.tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
         });
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
}

module.exports = new AuthController();
