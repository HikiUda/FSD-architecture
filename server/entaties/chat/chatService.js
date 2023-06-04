const { ChatDto, ChatContentDto } = require('./chatModal');
const chatRepository = require('./chatRepository');

class ChatService {
   async createChat(userIdOne, userIdTwo) {
      try {
         const data = await chatRepository.createChat(userIdOne, userIdTwo);

         const chatDto = new ChatDto(data);
         return { ...chatDto };
      } catch (e) {
         throw e;
      }
   }
   async createChatWithAdmin(userId) {
      try {
         const data = await chatRepository.createChatWithAdmin(userId);
         const chatDto = new ChatDto(data);
         return { ...chatDto };
      } catch (e) {
         throw e;
      }
   }
   async getUserChats(userId) {
      try {
         const chats = await chatRepository.getUserChats(userId);
         const chatsDto = chats.map((chat) => {
            const chatDto = new ChatDto(chat);
            return { ...chatDto };
         });
         return chatsDto;
      } catch (e) {
         throw e;
      }
   }
   async getAdminChats() {
      try {
         const chats = await chatRepository.getAdminChats();
         const chatsDto = chats.map((chat) => {
            const chatDto = new ChatDto(chat);
            return { ...chatDto };
         });
         return chatsDto;
      } catch (e) {
         throw e;
      }
   }
   async getSomeMessage(chatId, limit, portion) {
      try {
         const offset = portion * limit - limit;
         const messages = await chatRepository.getSomeMessage(chatId, limit, offset);
         const messagesDto = messages.map((message) => {
            const messageDto = new ChatContentDto(message);
            return { ...messageDto };
         });
         return messagesDto;
      } catch (e) {
         throw e;
      }
   }
   async createMessage(aWss, text, userId, chatId) {
      try {
         const data = await chatRepository.createMessage(text, userId, chatId);
         aWss.clients.forEach((client) => {
            if (client.id === chatId) {
               const message = JSON.stringify({
                  event: 'sendMessage',
                  text,
                  chatId,
               });
               client.send(message);
            }
         });
         return data;
      } catch (e) {
         throw e;
      }
   }
}

module.exports = new ChatService();
