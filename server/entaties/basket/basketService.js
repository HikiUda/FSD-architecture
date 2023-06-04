const deviceRepository = require('../device/deviceRepository');
const deviceService = require('../device/deviceService');
const basketRepository = require('./basketRepository');

class BasketService {
   async addInBasket(userId, deviceId, deviceInfo) {
      try {
         const basketId = await basketRepository.findBasketId(userId);
         if (!deviceInfo) {
            deviceInfo = await deviceService.getOneDevice(deviceId);
            deviceInfo.forPurches = 1;
         }
         const deviceInfoJSON = JSON.stringify(deviceInfo);
         const data = await basketRepository.addInBasket(basketId, deviceId, deviceInfoJSON);
         return data;
      } catch (e) {
         throw e;
      }
   }
   async updateDeviceInfo(basketDeviceId, deviceInfo) {
      try {
         const deviceInfoJSON = JSON.stringify(deviceInfo);

         const data = await basketRepository.updateDeviceInfo(basketDeviceId, deviceInfoJSON);
         return data;
      } catch (e) {
         throw e;
      }
   }
   async basketHaveDevice(userId, deviceId) {
      try {
         const basketId = await basketRepository.findBasketId(userId);
         const data = await basketRepository.basketHaveDevice(basketId, deviceId);
         return { inCart: data };
      } catch (e) {
         throw e;
      }
   }
   async getOne(basketDeviceId) {
      try {
         const device = await basketRepository.getOne(basketDeviceId);

         const handleDevice = await this.checkLastUpdated(device);

         return handleDevice;
      } catch (e) {
         throw e;
      }
   }
   async getAll(userId) {
      try {
         const basketId = await basketRepository.findBasketId(userId);
         const devices = await basketRepository.getAll(basketId);
         const handleDevices = await this.checkAllLastUpdated(devices);
         return handleDevices;
      } catch (e) {
         throw e;
      }
   }
   async delete(basketDeviceId) {
      try {
         const data = await basketRepository.delete(basketDeviceId);
         return data;
      } catch (e) {
         throw e;
      }
   }
   async checkLastUpdated(device) {
      try {
         const deviceId = device.deviceId;
         const basketId = device.basketId;
         const DeviceLastDateOfUpdated = await deviceRepository.getDateOfLastUpdated(deviceId);

         if (DeviceLastDateOfUpdated > device.updatedAt) {
            const newDeviceData = await deviceService.getOneDevice(deviceId);
            newDeviceData.forPurches = 1;

            const deviceInfoJSON = JSON.stringify(newDeviceData);
            await basketRepository.addInBasket(basketId, deviceId, deviceInfoJSON);

            return { basketDeviceId: device.id, deviceInfo: newDeviceData };
         }

         const deviceInfo = JSON.parse(device.deviceInfo);
         return { basketDeviceId: device.id, deviceInfo };
      } catch (e) {
         throw e;
      }
   }
   async checkAllLastUpdated(devices) {
      try {
         let data = [];
         await Promise.all(
            devices.map(async (device) => {
               const handleDevice = await this.checkLastUpdated(device);
               return handleDevice;
            }),
         ).then((res) => (data = res));
         return data;
      } catch (e) {
         throw e;
      }
   }
   async purches(userId) {
      try {
         const basketId = await basketRepository.findBasketId(userId);
         const data = await basketRepository.deleteAll(basketId);
         return data;
      } catch (e) {
         throw e;
      }
   }
}

module.exports = new BasketService();
