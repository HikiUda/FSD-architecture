const { Basket, BasketDevice } = require('../../models');

class BasketRepository {
   async findBasketId(userId) {
      try {
         const basket = await Basket.findOne({ where: { userId } });
         return basket.id;
      } catch (e) {
         throw e;
      }
   }
   async basketHaveDevice(basketId, deviceId) {
      try {
         const basket = await BasketDevice.findOne({ where: { basketId, deviceId } });
         return basket ? true : false;
      } catch (e) {
         throw e;
      }
   }
   async addInBasket(basketId, deviceId, deviceInfo) {
      try {
         const data = await BasketDevice.create({ basketId, deviceId, deviceInfo });

         return data;
      } catch (e) {
         throw e;
      }
   }
   async updateDeviceInfo(basketDeviceId, deviceInfo) {
      try {
         const data = await BasketDevice.update({ deviceInfo }, { where: { id: basketDeviceId } });
         return data;
      } catch (e) {
         throw e;
      }
   }
   async getOne(basketDeviceId) {
      try {
         const device = await BasketDevice.findOne({ where: { id: basketDeviceId } });
         return device;
      } catch (e) {
         throw e;
      }
   }
   async getAll(basketId) {
      try {
         const devices = await BasketDevice.findAll({ where: { basketId } });
         return devices;
      } catch (e) {
         throw e;
      }
   }
   async delete(basketDeviceId) {
      try {
         const data = await BasketDevice.destroy({ where: { id: basketDeviceId } });
         return data;
      } catch (e) {
         throw e;
      }
   }
   async deleteAll(basketId) {
      try {
         const data = await BasketDevice.destroy({ where: { basketId } });
         return data;
      } catch (e) {
         throw e;
      }
   }
}

module.exports = new BasketRepository();
