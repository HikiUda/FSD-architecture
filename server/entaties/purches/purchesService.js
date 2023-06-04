const basketService = require('../basket/basketService');
const deviceService = require('../device/deviceService');
const { PurchesDto } = require('./purchesModal');
const purchesRepository = require('./purchesRepository');

class PurchesService {
   async buy(userId) {
      try {
         const devices = await basketService.getAll(userId);
         devices.forEach(async (device) => {
            const deviceId = device.deviceInfo.id;
            const countOfThing = device.deviceInfo.forPurches;
            const deviceJSON = JSON.stringify(device.deviceInfo);
            const data = await purchesRepository.buy(userId, deviceId, deviceJSON);
            await deviceService.purchesDevice(deviceId, countOfThing);
         });
         await basketService.purches(userId);
         return true;
      } catch (e) {
         throw e;
      }
   }
   async getAll(userId) {
      try {
         const pursheses = await purchesRepository.getAll(userId);
         const purchesesDto = pursheses.map((purshes) => {
            const purchesDto = new PurchesDto(purshes);

            return { ...purchesDto };
         });
         return purchesesDto;
      } catch (e) {
         throw e;
      }
   }
   async getOne(id) {
      try {
         const purshes = await purchesRepository.getOne(id);
         const purchesDto = new PurchesDto(purshes);

         return { ...purchesDto };
      } catch (e) {
         throw e;
      }
   }
}

module.exports = new PurchesService();
