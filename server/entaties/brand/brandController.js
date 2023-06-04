const brandService = require('./brandService');

class BrandController {
   async create(req, res, next) {
      try {
         const { info } = req.body;
         if (!info) {
            throw DeviceError.IncorectData();
         }
         const { userId, name } = JSON.parse(info);
         if (!userId || !name) {
            throw DeviceError.IncorectData();
         }
         const data = await brandService.create(name, userId);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async update(req, res, next) {
      try {
         const { name } = req.body;
         const { brandId } = req.params;
         const { id: userId } = req.user;
         const data = await brandService.update(name, brandId, userId);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async getOne(req, res, next) {
      try {
         const { brandId } = req.params;
         const data = await brandService.getOne(brandId);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async getSome(req, res, next) {
      try {
         const { search = '' } = req.query;
         const data = await brandService.getSome(search);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
}

module.exports = new BrandController();
