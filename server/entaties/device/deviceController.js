const DeviceError = require('../../exceptions/DeviceError');
const deviceService = require('./deviceService');

class DeviceController {
   async createDevice(req, res, next) {
      try {
         const { deviceInfo } = req.body;
         if (!deviceInfo) {
            throw DeviceError.IncorectData();
         }
         const data = await deviceService.createDevice(deviceInfo);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async getOneDevice(req, res, next) {
      try {
         const { id } = req.params;
         const data = await deviceService.getOneDevice(id);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async getAllDevice(req, res, next) {
      try {
         const { limit = 10, page = 1, search = '', typeId = 0, brandId = 0 } = req.query;

         const data = await deviceService.getAllDevice(limit, page, search, typeId, brandId);

         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async getUserDevice(req, res, next) {
      try {
         const { limit = 10, page = 1, search = '', typeId = 0, brandId = 0 } = req.query;
         const { id: userId } = req.user;

         const data = await deviceService.getAllDevice(
            limit,
            page,
            search,
            typeId,
            brandId,
            userId,
         );
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async updateDevice(req, res, next) {
      try {
         const { id } = req.params;
         const { deviceInfo } = req.body;
         if (!deviceInfo) {
            throw DeviceError.IncorectData();
         }

         let img = '';
         if (req?.files?.img) {
            img = req.files.img;
         }
         const data = await deviceService.updateDevice(id, deviceInfo, img);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
}

module.exports = new DeviceController();
