const { Op } = require('sequelize');
const { Brand } = require('../../models');

class BrandRepository {
   async create(name, userId) {
      try {
         const data = Brand.create({ name, userId });
         return data;
      } catch (e) {
         throw e;
      }
   }

   async update(name, brandId) {
      try {
         const data = Brand.update({ name }, { where: { id: brandId } });
         return data;
      } catch (e) {
         throw e;
      }
   }
   async getOne(brandId) {
      try {
         const data = Brand.findOne({ where: { id: brandId } });
         return data;
      } catch (e) {
         throw e;
      }
   }
   async getSome(search) {
      try {
         const data = Brand.findAll({ where: { name: { [Op.iLike]: search } }, limit: 5 });
         return data;
      } catch (e) {
         throw e;
      }
   }
   async getOne(brandId) {
      try {
         const data = Brand.findOne({ where: { id: brandId } });
         return data;
      } catch (e) {
         throw e;
      }
   }
}

module.exports = new BrandRepository();
