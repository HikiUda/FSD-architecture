const { Op } = require('sequelize');
const { Type } = require('../../models');

class TypeRepository {
   async create(name, userId) {
      try {
         const data = Type.create({ name, userId });
         return data;
      } catch (e) {
         throw e;
      }
   }

   async update(name, typeId) {
      try {
         const data = Type.update({ name }, { where: { id: typeId } });
         return data;
      } catch (e) {
         throw e;
      }
   }
   async getOne(typeId) {
      try {
         const data = Type.findOne({ where: { id: typeId } });
         return data;
      } catch (e) {
         throw e;
      }
   }
   async getSome(search) {
      try {
         const data = Type.findAll({ where: { name: { [Op.iLike]: search } }, limit: 5 });
         return data;
      } catch (e) {
         throw e;
      }
   }
}

module.exports = new TypeRepository();
