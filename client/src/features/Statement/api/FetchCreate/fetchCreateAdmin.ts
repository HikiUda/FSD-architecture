import { $api } from 'shared/api';

export const fetchCreateAdmin = async (userId: number) => {
   try {
      const response = await $api.post<any>('/role/admin', { userId });
      return response?.data;
   } catch (e) {
      throw e;
   }
};
