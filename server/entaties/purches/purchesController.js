const purchesService = require('./purchesService');

class PurchesController {
   async buy(req, res, next) {
      try {
         const { id: userId } = req.user;
         const data = await purchesService.buy(userId);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async getOne(req, res, next) {
      try {
         const { id } = req.params;
         const data = await purchesService.getOne(id);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async getAll(req, res, next) {
      try {
         const { id: userId } = req.user;
         const data = await purchesService.getAll(userId);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
}

module.exports = new PurchesController();
