import { $api } from 'shared/api';

export const fetchCreateBrand = async (info: string) => {
   try {
      const response = await $api.post<any>('/brand', { info });
      return response?.data;
   } catch (e) {
      throw e;
   }
};
