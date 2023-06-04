const { CommentDto } = require('./deviceCommentModal');
const deviceCommentRepository = require('./deviceCommentRepository');

class DeviceCommentService {
   async get(deviceId, limit, page) {
      try {
         const offset = limit * page - limit;

         const comments = await deviceCommentRepository.get(deviceId, limit, offset);
         const commentsDto = comments.rows.map((comment) => {
            let commentDto = new CommentDto(comment);
            return { ...commentDto };
         });
         return { count: comments.count, comments: commentsDto };
      } catch (e) {
         throw e;
      }
   }
   async create(deviceId, content, userId) {
      try {
         const data = await deviceCommentRepository.create(deviceId, content, userId);
         console.log(data);
         let commentDto = new CommentDto(data);
         return { ...commentDto };
      } catch (e) {
         throw e;
      }
   }
   async update(commentId, content) {
      try {
         const data = await deviceCommentRepository.update(commentId, content);
         return data;
      } catch (e) {
         throw e;
      }
   }
   async delete(commentId) {
      try {
         const data = await deviceCommentRepository.delete(commentId);
         return data;
      } catch (e) {
         throw e;
      }
   }
}
module.exports = new DeviceCommentService();
