const { User, Role, Liked, Basket } = require('../../models');

class AuthRepository {
   async getUser(email) {
      try {
         const user = await User.findOne({
            where: { email },
            include: { model: Role, as: 'roles' },
         });
         return user;
      } catch (e) {
         throw e;
      }
   }
   async createUser(email, password) {
      try {
         const user = await User.create({ email, password });
         return user;
      } catch (e) {
         throw e;
      }
   }
   async createUserLikedAndBasket(userId) {
      try {
         const liked = await Liked.create({ userId });
         const basket = await Basket.create({ userId });
         return { liked, basket };
      } catch (e) {
         throw e;
      }
   }
}

module.exports = new AuthRepository();
