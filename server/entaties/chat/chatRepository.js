const { Op } = require('sequelize');
const { Chat, User, UserChat, ChatContent } = require('../../models');

class ChatRepository {
   async createChat(userIdOne, userIdTwo) {
      try {
         const { email: emailOne } = await User.findOne({ where: { id: userIdOne } });
         const { email: emailTwo } = await User.findOne({ where: { id: userIdTwo } });
         let chatName = `${emailOne}&&${emailTwo}`;
         const [chat, created] = await Chat.findOrCreate({
            where: { name: chatName },
            defaults: { name: chatName },
         });

         if (!created) {
            return chat;
         }
         await UserChat.create({ userId: userIdOne, chatId: chat.id });
         await UserChat.create({ userId: userIdTwo, chatId: chat.id });
         return chat;
      } catch (e) {
         throw e;
      }
   }
   async createChatWithAdmin(userId) {
      try {
         const { email } = await User.findOne({ where: { id: userId } });
         let chatName = `${email}&&Техподдержка`;
         const [chat, created] = await Chat.findOrCreate({
            where: { name: chatName },
            defaults: { name: chatName, withAdmin: true },
         });
         if (!created) {
            return chat;
         }
         await UserChat.create({ userId, chatId: chat.id });
         return chat;
      } catch (e) {
         throw e;
      }
   }
   async getUserChats(userId) {
      try {
         const { email } = await User.findOne({ where: { id: userId } });
         const chats = await Chat.findAll({
            where: {
               name: {
                  [Op.iLike]: `%${email}%`,
               },
            },
         });

         return chats;
      } catch (e) {
         throw e;
      }
   }
   async getChat(chatId) {
      try {
         const chat = await Chat.findOne({ where: { id: chatId } });
         return chat;
      } catch (e) {
         throw e;
      }
   }
   async getSupportChat(chatId) {
      try {
         const chat = await Chat.findOne({ where: { id: chatId, withAdmin: true } });
         return chat;
      } catch (e) {
         throw e;
      }
   }
   async getAdminChats() {
      try {
         const chats = await Chat.findAll({ where: { withAdmin: true } });
         return chats;
      } catch (e) {
         throw e;
      }
   }
   async getSomeMessage(chatId, limit, offset) {
      try {
         const data = await ChatContent.findAll({
            where: { chatId },
            limit,
            offset,
            order: [['createdAt', 'DESC']],
         });
         return data;
      } catch (e) {
         throw e;
      }
   }
   async createMessage(text, userId, chatId) {
      try {
         const data = await ChatContent.create({ text, userId, chatId });
         return data;
      } catch (e) {
         throw e;
      }
   }
}

module.exports = new ChatRepository();
