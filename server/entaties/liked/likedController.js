const likedService = require('./likedService');

class LikedController {
   async changeLikedDevice(req, res, next) {
      try {
         const { deviceId } = req.params;
         const { id: userId } = req.user;
         const data = await likedService.changeLikedDevice(deviceId, userId);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async isLiked(req, res, next) {
      try {
         const { deviceId } = req.params;
         const { id: userId } = req.user;
         const data = await likedService.isLiked(deviceId, userId);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async getLikedDevice(req, res, next) {
      try {
         const { id: userId } = req.user;
         const data = await likedService.getLikedDevice(userId);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
}

module.exports = new LikedController();
