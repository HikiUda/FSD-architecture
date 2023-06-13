import { $api } from 'shared/api';

export const fetchCreateType = async (info: string) => {
   try {
      const response = await $api.post<any>('/type', { info });
      return response?.data;
   } catch (e) {
      throw e;
   }
};
