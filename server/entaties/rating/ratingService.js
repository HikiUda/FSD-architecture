const ratingRepository = require('./ratingRepository');

class RatingService {
   async toRate(deviceId, userId, rate) {
      try {
         const data = await ratingRepository.toRate(deviceId, userId, rate);
         const totalRate = await ratingRepository.updateDeviceRate(deviceId);
         return data;
      } catch (e) {
         throw e;
      }
   }
}

module.exports = new RatingService();
