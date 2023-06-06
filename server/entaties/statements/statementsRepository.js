const { Statements, User } = require('../../models');

class StatementsRepository {
   async createStatement(params) {
      try {
         const data = await Statements.create(params);
         return data;
      } catch (e) {
         throw e;
      }
   }
   async addAdminComment(adminComment, id) {
      try {
         const data = await Statements.update({ adminComment }, { where: { id } });
         return data;
      } catch (e) {
         throw e;
      }
   }
   async changeState(state, id) {
      try {
         const data = await Statements.update({ state }, { where: { id } });
         return data;
      } catch (e) {
         throw e;
      }
   }
   async getOne(id) {
      try {
         const data = await Statements.findOne({
            where: { id },
            include: { model: User, as: 'user' },
         });
         return data;
      } catch (e) {
         throw e;
      }
   }
   async getSome(limit, offset, params) {
      try {
         const data = await Statements.findAndCountAll({
            where: params,
            limit,
            offset,
         });
         return data;
      } catch (e) {
         throw e;
      }
   }
}

module.exports = new StatementsRepository();
