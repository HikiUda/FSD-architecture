const CommonError = require('../../exceptions/CommonError');
const chatService = require('./chatService');

class ChatController {
   handleWSRequest(ws, req, aWss) {
      ws.send('You are connected!');
      ws.on('message', async (msg) => {
         let message = JSON.parse(msg);
         let { chatId } = message;
         switch (message.event) {
            case 'openChat':
               ws.id = chatId;
               ws.send(msg);
               break;
            case 'getSomeContent':
               const { limit = 20, portion = 1 } = message;
               const data = await chatService.getSomeMessage(chatId, limit, portion);
               const jsondata = JSON.stringify(data);
               ws.send(jsondata);
               break;
            case 'sendMessage':
               let { text } = message;
               let { id: userId } = req.user;
               await chatService.createMessage(aWss, text, userId, chatId);

               break;
            default:
               break;
         }
      });
   }
   async createChat(req, res, next) {
      try {
         const { id: userIdOne } = req.user;
         const { withUserId: userIdTwo } = req.body;
         if (userIdOne == userIdTwo) {
            throw CommonError.BadRequest('Нельзя открыть чат с самим собой!');
         }
         if (!userIdTwo) {
            throw CommonError.BadRequest('Некорректные данные');
         }
         const data = await chatService.createChat(userIdOne, userIdTwo);
         return res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async createChatWithAdmin(req, res, next) {
      try {
         const { id: userId } = req.user;
         const data = await chatService.createChatWithAdmin(userId);
         return res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async getUserChats(req, res, next) {
      try {
         const { id: userId } = req.user;
         const data = await chatService.getUserChats(userId);
         return res.json(data);
      } catch (e) {
         next(e);
      }
   }
   async getAdminChats(req, res, next) {
      try {
         const data = await chatService.getAdminChats();
         return res.json(data);
      } catch (e) {
         next(e);
      }
   }
}

module.exports = new ChatController();
