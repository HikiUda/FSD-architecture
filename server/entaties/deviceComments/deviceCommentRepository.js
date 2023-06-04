const { DeviceComments, User } = require('../../models');

class DeviceCommentRepository {
   async get(deviceId, limit, offset) {
      try {
         const comments = await DeviceComments.findAndCountAll({
            where: { deviceId },
            include: { model: User, as: 'user' },
            limit,
            offset,
         });
         return comments;
      } catch (e) {
         throw e;
      }
   }
   async create(deviceId, content, userId) {
      try {
         const data = await DeviceComments.create({ deviceId, content, userId });
         return data;
      } catch (e) {
         throw e;
      }
   }
   async update(commentId, content) {
      try {
         const data = await DeviceComments.update({ content }, { where: { id: commentId } });
         return data;
      } catch (e) {
         throw e;
      }
   }
   async delete(commentId) {
      try {
         const data = await DeviceComments.destroy({ where: { id: commentId } });
         return data;
      } catch (e) {
         throw e;
      }
   }
}

module.exports = new DeviceCommentRepository();
