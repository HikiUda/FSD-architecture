const { PurchesDevice } = require('../../models');

class PurchesRepository {
   async buy(userId, deviceId, deviceInfo) {
      try {
         const data = PurchesDevice.create({ userId, deviceId, deviceInfo });
         return data;
      } catch (e) {
         throw e;
      }
   }
   async getAll(userId) {
      try {
         const pursheses = await PurchesDevice.findAll({ where: { userId } });
         return pursheses;
      } catch (e) {
         throw e;
      }
   }
   async getOne(id) {
      try {
         const purshes = await PurchesDevice.findOne({ where: { id } });
         return purshes;
      } catch (e) {
         throw e;
      }
   }
}

module.exports = new PurchesRepository();
