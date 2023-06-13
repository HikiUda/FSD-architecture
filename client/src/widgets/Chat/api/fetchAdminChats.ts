import { $api } from 'shared/api';
import { IChat } from 'shared/model/chatModel';

export const fetchAdminChats = async () => {
   try {
      const response = await $api.get<IChat[]>('/chat/adminchat');
      return response.data;
   } catch (e) {
      throw e;
   }
};
