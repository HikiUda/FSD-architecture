const roleRepository = require('./roleRepository');

class RoleController {
   async addVendor(req, res, next) {
      try {
         const { userId } = req.body;
         const data = await roleRepository.addVendor(userId);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async addAdmin(req, res, next) {
      try {
         const { userId } = req.body;
         const data = await roleRepository.addAdmin(userId);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
}

module.exports = new RoleController();
