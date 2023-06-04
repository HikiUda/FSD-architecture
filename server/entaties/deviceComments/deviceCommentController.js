const deviceCommentService = require('./deviceCommentService');

class DeviceCommentController {
   async get(req, res, next) {
      try {
         const { id } = req.params;
         const { limit = 10, page = 1 } = req.query;

         const data = await deviceCommentService.get(id, limit, page);
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async create(req, res, next) {
      try {
         const { id } = req.params;
         const { content } = req.body;
         const { id: userId, email } = req.user;

         const data = await deviceCommentService.create(id, content, userId);
         if (!data.userName) {
            data.userName = email;
         }
         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async update(req, res, next) {
      try {
         const { commentId } = req.params;
         const { content } = req.body;

         const data = await deviceCommentService.update(commentId, content);

         res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async delete(req, res, next) {
      try {
         const { commentId } = req.params;
         const data = await deviceCommentService.delete(commentId);

         res.json(data);
      } catch (e) {
         next(e);
      }
   }
}
module.exports = new DeviceCommentController();
