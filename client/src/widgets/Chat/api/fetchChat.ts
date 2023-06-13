import { $api } from 'shared/api';
import { IChat } from 'shared/model/chatModel';

export const fetchChat = async (chatId: number) => {
   try {
      const response = await $api.get<IChat>(`/chat/${chatId}`);
      return response.data;
   } catch (e) {
      throw e;
   }
};
