const { Op } = require('sequelize');
const DeviceError = require('../../exceptions/DeviceError');
const { OneDeviceDto } = require('./deviceModal');
const deviceRepository = require('./deviceRepository');
const { saveImage } = require('../../helpers/function/saveImage');

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
   async getAllDevice(limit, page, search, typeId, brandId, userId = null) {
      try {
         const offset = limit * page - limit;
         search = search ? `%${search}%` : '%';

         const params = {
            name: {
               [Op.iLike]: search,
            },
         };

         if (typeId) {
            params.typeId = { [Op.eq]: typeId };
         }
         if (brandId) {
            params.brandId = { [Op.eq]: brandId };
         }
         if (userId) {
            params.userId = { [Op.eq]: userId };
         } else {
            params.onSale = {
               [Op.is]: true,
            };
         }

         const devices = await deviceRepository.getAllDevice(limit, offset, params);
         const devicesDto = devices.rows.map((device) => {
            const deviceDto = new OneDeviceDto(device);
            return { ...deviceDto };
         });
         return { devices: devicesDto, count: devices.count };
      } catch (e) {
         throw e;
      }
   }
   async updateDevice(id, deviceInfoJSON, image) {
      try {
         const deviceInfo = JSON.parse(deviceInfoJSON);
         if (typeof image !== 'string') {
            let imgId = await saveImage(image);
            deviceInfo.img = imgId;
         }

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
