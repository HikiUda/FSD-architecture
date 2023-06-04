const { Liked, LikedDevice, Device, Brand, Type } = require('../../models');

class LikedRepository {
   async getLikedId(userId) {
      try {
         const liked = await Liked.findOne({ where: { userId } });
         return liked.id;
      } catch (e) {
         throw e;
      }
   }
   async changeLikedDevice(deviceId, likedId) {
      try {
         const [data, created] = await LikedDevice.findOrCreate({
            where: { deviceId, likedId },
            defaults: { deviceId, likedId },
         });
         if (!created) {
            console.log(data);
            await LikedDevice.destroy({ where: { id: data.id } });
         }
         return created;
      } catch (e) {
         throw e;
      }
   }
   async isLiked(deviceId, likedId) {
      try {
         const IsLiked = await LikedDevice.findOne({ where: { deviceId, likedId } });
         return IsLiked ? true : false;
      } catch (e) {
         throw e;
      }
   }
   async getLikedDevice(likedId) {
      try {
         const data = await LikedDevice.findAll({
            where: { likedId },
            include: {
               model: Device,
               as: 'device',
               include: [
                  { model: Brand, as: 'brand' },
                  { model: Type, as: 'type' },
               ],
            },
         });
         return data;
      } catch (e) {
         throw e;
      }
   }
}

module.exports = new LikedRepository();
