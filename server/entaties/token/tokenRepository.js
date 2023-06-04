const { Token } = require('../../models');

class TokenRepository {
   async saveToken(userId, refreshToken) {
      try {
         const [tokenData, created] = await Token.findOrCreate({
            where: { userId },
            defaults: { refreshToken },
         });
         if (!created) {
            const token = await Token.update({ refreshToken }, { where: { id: tokenData.id } });
            return tokenData.refreshToken;
         }
         return tokenData.refreshToken;
      } catch (e) {
         throw e;
      }
   }
   async removeToken(userId) {
      try {
         await Token.destroy({ where: { userId } });
         return;
      } catch (e) {
         throw e;
      }
   }
   async findToken(userId) {
      try {
         const token = await Token.findOne({ where: { userId } });
         return token.dataValues.refreshToken;
      } catch (e) {
         throw e;
      }
   }
}

module.exports = new TokenRepository();
