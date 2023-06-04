const { Op } = require('sequelize');
const DeviceError = require('../../exceptions/DeviceError');
const { OneDeviceDto } = require('./deviceModal');
const deviceRepository = require('./deviceRepository');

class DeviceService {
   async createDevice(device) {
      try {
         const deviceInfo = JSON.parse(device);
         const data = await deviceRepository.createDevice(deviceInfo);
         deviceRepository.createDeviceDescription(data.id, deviceInfo.info);
         return device;
      } catch (e) {
         throw e;
      }
   }
   async getOneDevice(id) {
      try {
         const device = await deviceRepository.getOneDevice(id);
         if (!device) {
            throw DeviceError.IncorectData();
         }
         const deviceDto = new OneDeviceDto(device);
         return { ...deviceDto };
      } catch (e) {
         throw e;
      }
   }
   async getAllDevice(limit, page, search, typeId, brandId) {
      try {
         const offset = limit * page - limit;
         search = search ? `%${search}%` : '%';

         const params = {
            name: {
               [Op.iLike]: search,
            },
            onSale: {
               [Op.is]: true,
            },
         };
         if (typeId) {
            params.typeId = { [Op.eq]: typeId };
         }
         if (brandId) {
            params.brandId = { [Op.eq]: brandId };
         }

         const devices = await deviceRepository.getAllDevice(limit, offset, params);
         const devicesDto = devices.map((device) => {
            const deviceDto = new OneDeviceDto(device);
            return { ...deviceDto };
         });
         return devicesDto;
      } catch (e) {
         throw e;
      }
   }
   async updateDevice(id, deviceInfo) {
      try {
         await deviceRepository.updateDevice(id, deviceInfo);
         await deviceRepository.updateDeviceCharacteristic(id, deviceInfo.info);
         return deviceInfo;
      } catch (e) {
         throw e;
      }
   }
   async purchesDevice(deviceId, countOfThing) {
      try {
         const device = await deviceRepository.getOneDevice(deviceId);
         const quantity = device.quantity - countOfThing;
         const countOfPurches = device.countOfPurches + countOfThing;
         await deviceRepository.updateQuantity(deviceId, quantity, countOfPurches);
         return device;
      } catch (e) {
         throw e;
      }
   }
}

module.exports = new DeviceService();