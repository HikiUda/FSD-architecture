const { isLiked } = require('./likedController');
const LikedDeviceDto = require('./likedModal');
const likedRepository = require('./likedRepository');

class LikedService {
   async changeLikedDevice(deviceId, userId) {
      try {
         const likedId = await likedRepository.getLikedId(userId);
         const data = await likedRepository.changeLikedDevice(deviceId, likedId);
         return data;
      } catch (e) {
         throw e;
      }
   }
   async isLiked(deviceId, userId) {
      try {
         const likedId = await likedRepository.getLikedId(userId);
         const IsLiked = await likedRepository.isLiked(deviceId, likedId);
         return { isLiked: IsLiked };
      } catch (e) {
         throw e;
      }
   }
   async getLikedDevice(userId) {
      try {
         const likedId = await likedRepository.getLikedId(userId);
         const likeds = await likedRepository.getLikedDevice(likedId);
         const likedsDto = likeds.map((liked) => {
            const likedDto = new LikedDeviceDto(liked);
            return { ...likedDto.device };
         });
         return likedsDto;
      } catch (e) {
         throw e;
      }
   }
}

module.exports = new LikedService();
