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
   async getChat(chatId) {
      try {
         const chat = await chatRepository.getChat(chatId);
         const chatDto = new ChatDto(chat);
         return chatDto;
      } catch (e) {
         throw e;
      }
   }
   async getSupportChat(userId) {
      try {
         const chat = await chatRepository.getSupportChat(userId);

         if (!chat) {
            return null;
         }
         const chatDto = new ChatDto(chat);
         return chatDto;
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
         return { messages: messagesDto };
      } catch (e) {
         throw e;
      }
   }
   async createMessage(aWss, text, userId, chatId) {
      try {
         const data = await chatRepository.createMessage(text, userId, chatId);
         aWss.clients.forEach((client) => {
            if (client.id === chatId) {
               const message = {
                  text,
                  userId,
                  isRead: true,
                  id: Date.now(),
                  chatId,
                  createdAt: Date.now(),
               };
               const mes = JSON.stringify({
                  event: 'sendMessage',
                  message,
               });
               client.send(mes);
            }
         });
         return data;
      } catch (e) {
         throw e;
      }
   }
}

module.exports = new ChatService();
