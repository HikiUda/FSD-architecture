const AuthError = require('../../exceptions/AuthError');
const { UserDto } = require('./authModal');
const tokenRepository = require('../token/tokenRepository');
const bcrypt = require('bcrypt');
const tokenService = require('../token/tokenService');
const authRepository = require('./authRepository');
const roleRepository = require('../role/roleRepository');

class AuthService {
   async login(email, password) {
      try {
         const user = await authRepository.getUser(email);
         if (!user) {
            throw AuthError.BadRequest('Такого пользователя не существует');
         }

         const comparePassword = bcrypt.compareSync(password, user.password);
         if (!comparePassword) {
            throw AuthError.BadRequest('Неверный пароль');
         }

         const userDto = new UserDto(user);

         const tokens = await tokenService.generateToken({ ...userDto });
         await tokenRepository.saveToken(userDto.id, tokens.refreshToken);

         return { tokens, user: userDto };
      } catch (e) {
         throw e;
      }
   }
   async registration(email, password) {
      try {
         const candidate = await authRepository.getUser(email);
         if (candidate) {
            throw AuthError.BadRequest('Пользователь с таким email уже существует');
         }
         const hashPassword = bcrypt.hashSync(password, 5);
         const user = await authRepository.createUser(email, hashPassword);
         const likedBasket = await authRepository.createUserLikedAndBasket(user.id);
         const roles = await roleRepository.addUser(user.id);

         const userDto = new UserDto({ ...user.dataValues, roles });

         const tokens = await tokenService.generateToken({ ...userDto });
         await tokenRepository.saveToken(userDto.id, tokens.refreshToken);

         return { tokens, user: userDto };
      } catch (e) {
         throw e;
      }
   }
   async logout(refreshToken) {
      try {
         const userData = await tokenService.validateRefreshToken(refreshToken);
         tokenRepository.removeToken(userData.id);
         return;
      } catch (e) {
         throw e;
      }
   }
   async refresh(refreshToken) {
      try {
         const userData = await tokenService.validateRefreshToken(refreshToken);
         if (!userData) {
            throw AuthError.UnauthorizedError();
         }
         const tokenFromDB = await tokenRepository.findToken(userData.id);
         if (!tokenFromDB) {
            throw AuthError.UnauthorizedError();
         }
         const userDto = new UserDto(userData);

         const tokens = await tokenService.generateToken({ ...userDto });
         await tokenRepository.saveToken(userDto.id, tokens.refreshToken);

         return { tokens, user: userDto };
      } catch (e) {
         throw e;
      }
   }
}

module.exports = new AuthService();
