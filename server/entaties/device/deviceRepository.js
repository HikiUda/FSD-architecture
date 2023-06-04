const { Op } = require('sequelize');
const { Device, DeviceInfo, DeviceInfoDescription, Brand, Type } = require('../../models');

class DeviceRepository {
   async createDevice(params) {
      try {
         const data = await Device.create(params);
         return data;
      } catch (e) {
         throw e;
      }
   }
   async createDeviceDescription(deviceId, infoArr) {
      try {
         infoArr.forEach(async (info) => {
            let title = info.title;
            const { id: deviceInfoId } = await DeviceInfo.create({ deviceId, title });
            info.description.forEach(async (descriptionItem, index) => {
               const params = {
                  deviceInfoId,
                  description: descriptionItem.description,
               };
               if (!index) {
                  params.selected = true;
               }
               const { id: descId } = await DeviceInfoDescription.create(params);
            });
         });
         return infoArr;
      } catch (e) {
         throw e;
      }
   }
   async getOneDevice(id) {
      try {
         const device = await Device.findOne({
            where: { id },
            include: [
               {
                  model: DeviceInfo,
                  as: 'info',
                  include: {
                     model: DeviceInfoDescription,
                     as: 'description',
                  },
               },
               { model: Brand, as: 'brand' },
               { model: Type, as: 'type' },
            ],
         });
         return device;
      } catch (e) {
         throw e;
      }
   }
   async getAllDevice(limit, offset, params) {
      try {
         const devices = await Device.findAll({
            where: params,
            limit,
            offset,

            order: [['rating', 'DESC']],
            include: [
               { model: Brand, as: 'brand' },
               { model: Type, as: 'type' },
            ],
         });

         return devices;
      } catch (e) {
         throw e;
      }
   }
   async updateDevice(id, params) {
      try {
         const data = await Device.update(params, {
            where: { id },
         });
         return data;
      } catch (e) {
         throw e;
      }
   }
   async updateDeviceCharacteristic(deviceId, infoArr) {
      try {
         let titles = infoArr.map((info) => info.title);
         await DeviceInfo.destroy({
            where: {
               deviceId,
               title: {
                  [Op.notIn]: titles,
               },
            },
         });

         await infoArr.forEach(async (info) => {
            let title = info.title;
            const [{ id: deviceInfoId }, created] = await DeviceInfo.findOrCreate({
               where: { deviceId, title },
               defaults: { title, deviceId },
            });

            if (created) {
               info.description.forEach(async (descriptionItem) => {
                  const { id: descId } = await DeviceInfoDescription.create({
                     deviceInfoId,
                     description: descriptionItem.description,
                  });
               });
            } else {
               let arrDescription = info.description.map((desc) => {
                  return { ...desc, description: String(desc.description) };
               });
               await this.updateDeviceDescription(deviceInfoId, arrDescription);
            }
         });

         await this.clearNullDeviceDescription();

         return infoArr;
      } catch (e) {
         throw e;
      }
   }
   async updateDeviceDescription(deviceInfoId, arrDescription) {
      try {
         const descriptions = arrDescription.map((desc) => desc.description);
         await DeviceInfoDescription.destroy({
            where: {
               deviceInfoId,
               description: {
                  [Op.notIn]: descriptions,
               },
            },
         });

         await arrDescription.forEach(async (descriptionItem) => {
            const [data, created] = await DeviceInfoDescription.findOrCreate({
               where: { deviceInfoId, description: descriptionItem.description },
               defaults: { deviceInfoId, description: descriptionItem.description },
            });
         });

         return;
      } catch (e) {
         throw e;
      }
   }

   async clearNullDeviceDescription() {
      try {
         await DeviceInfo.destroy({
            where: {
               deviceId: { [Op.is]: null },
            },
         });
         await DeviceInfoDescription.destroy({
            where: {
               deviceInfoId: { [Op.is]: null },
            },
         });
      } catch (e) {
         throw e;
      }
   }
   async getDateOfLastUpdated(deviceId) {
      try {
         const device = await Device.findOne({ where: { id: deviceId } });
         return device.updatedAt;
      } catch (e) {
         throw e;
      }
   }
   async updateQuantity(deviceId, quantity, countOfPurches) {
      try {
         const device = await Device.update(
            { quantity, countOfPurches },
            { where: { id: deviceId } },
         );
         return device;
      } catch (e) {
         throw e;
      }
   }
}

module.exports = new DeviceRepository();
