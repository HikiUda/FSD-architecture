import { $api } from 'shared/api';
import { IChat } from 'shared/model/chatModel';

export const fetchSupportChat = async () => {
   try {
      const response = await $api.get<IChat | null>(`/chat/support`);
      if (!response.data) {
         const response2 = await $api.post<IChat>('/chat/adminchat');
         return response2.data;
      } else {
         return response.data;
      }
   } catch (e) {
      throw e;
   }
};
