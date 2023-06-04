const ratingService = require('./ratingService');

class RatingController {
   async toRate(req, res, next) {
      try {
         const { id: deviceId } = req.params;
         const { rate } = req.body;

         const { id: userId } = req.user;

         const data = await ratingService.toRate(deviceId, userId, rate);
         console.log(data);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
}

module.exports = new RatingController();
