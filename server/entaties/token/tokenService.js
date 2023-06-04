const jwt = require('jsonwebtoken');

class TokenService {
   async generateToken(payload) {
      try {
         //In payload {id, email, roles: [...]}
         const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
            expiresIn: '1d',
         });
         const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: '1h' });
         return { refreshToken, accessToken };
      } catch (e) {
         throw e;
      }
   }
   async validateRefreshToken(token) {
      try {
         const userData = jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
         return userData;
      } catch (e) {
         return null;
      }
   }
   async validateAccessToken(token) {
      try {
         const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
         return userData;
      } catch (e) {
         return null;
      }
   }
}

module.exports = new TokenService();
