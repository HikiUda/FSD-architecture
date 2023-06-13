import { $api } from 'shared/api';
import { IChat } from 'shared/model/chatModel';

export const fetchUserChats = async () => {
   try {
      const response = await $api.get<IChat[]>('/chat/mychat');
      return response.data;
   } catch (e) {
      throw e;
   }
};
