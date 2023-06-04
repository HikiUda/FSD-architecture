const { Rating, Device } = require('../../models');

class RatingRepository {
   async toRate(deviceId, userId, rate) {
      try {
         const [data, created] = await Rating.findOrCreate({
            where: { deviceId, userId },
            defaults: { deviceId, userId, rate },
         });
         if (!created) {
            await Rating.update({ rate }, { where: { id: data.id } });
         }
         return rate;
      } catch (e) {
         throw e;
      }
   }
   async updateDeviceRate(deviceId) {
      try {
         const sum = await Rating.sum('rate', { where: { deviceId } });
         const count = await Rating.count({ where: { deviceId } });
         const totalRate = (sum / count).toFixed(2);
         const data = await Device.update({ rating: totalRate }, { where: { id: deviceId } });
         return totalRate;
      } catch (e) {
         throw e;
      }
   }
}

module.exports = new RatingRepository();
