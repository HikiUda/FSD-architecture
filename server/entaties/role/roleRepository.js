const { USER, VENDOR, ADMIN, MAINADMIN } = require('../../helpers/rolesConst');
const { Role, UserRole } = require('../../models');

class RoleRepository {
   async addUser(userId) {
      try {
         const { id: roleId } = await Role.findOne({ where: { name: USER } });
         const userRole = await UserRole.create({ userId, roleId });
         return [USER];
      } catch (e) {
         throw e;
      }
   }
   async addVendor(userId) {
      try {
         const { id: roleId } = await Role.findOne({ where: { name: VENDOR } });
         const userRole = await UserRole.create({ userId, roleId });
         return [VENDOR];
      } catch (e) {
         throw e;
      }
   }
   async addAdmin(userId) {
      try {
         try {
            const { id: roleId } = await Role.findOne({ where: { name: ADMIN } });
            const userRole = await UserRole.create({ userId, roleId });
            return [ADMIN];
         } catch (e) {
            throw e;
         }
      } catch (e) {
         throw e;
      }
   }
   async addMainAdmin(userId) {
      try {
         try {
            const { id: roleId } = await Role.findOne({ where: { name: MAINADMIN } });
            const userRole = await UserRole.create({ userId, roleId });
            return [MAINADMIN];
         } catch (e) {
            throw e;
         }
      } catch (e) {
         throw e;
      }
   }
}

module.exports = new RoleRepository();
