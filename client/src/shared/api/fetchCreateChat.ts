import { IChat } from 'shared/model/chatModel';
import { $api } from './base';

export const fetchCreateChat = async (withUserId: number) => {
   try {
      const response = await $api.post<IChat>('/chat/mychat', { withUserId });
      return response.data;
   } catch (e) {
      throw e;
   }
};
