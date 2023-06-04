const basketService = require('./basketService');

class BasketController {
   async addInBasket(req, res, next) {
      try {
         const { id: userId } = req.user;
         const { deviceId, deviceInfo } = req.body;

         const data = await basketService.addInBasket(userId, deviceId, deviceInfo);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async updateDeviceInfo(req, res, next) {
      try {
         const { deviceInfo } = req.body;
         const { basketDeviceId } = req.params;

         const data = await basketService.updateDeviceInfo(basketDeviceId, deviceInfo);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async basketHaveDevice(req, res, next) {
      try {
         const { id: userId } = req.user;
         const { deviceId } = req.params;

         const data = await basketService.basketHaveDevice(userId, deviceId);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }

   async getOne(req, res, next) {
      try {
         const { basketDeviceId } = req.params;

         const data = await basketService.getOne(basketDeviceId);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async getAll(req, res, next) {
      try {
         const { id: userId } = req.user;

         const data = await basketService.getAll(userId);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async delete(req, res, next) {
      try {
         const { basketDeviceId } = req.params;

         const data = await basketService.delete(basketDeviceId);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
}

module.exports = new BasketController();
