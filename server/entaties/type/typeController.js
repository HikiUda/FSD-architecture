const DeviceError = require('../../exceptions/DeviceError');
const typeService = require('./typeService');

class TypeController {
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
         const data = await typeService.create(name, userId);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async update(req, res, next) {
      try {
         const { name } = req.body;
         const { typeId } = req.params;
         const { id: userId } = req.user;
         const data = await typeService.update(name, typeId, userId);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async getOne(req, res, next) {
      try {
         const { typeId } = req.params;
         const data = await typeService.getOne(typeId);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async getSome(req, res, next) {
      try {
         const { search = '' } = req.query;
         const data = await typeService.getSome(search);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
}

module.exports = new TypeController();
