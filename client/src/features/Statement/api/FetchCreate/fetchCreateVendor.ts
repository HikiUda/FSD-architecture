import { $api } from 'shared/api';

export const fetchCreateVendor = async (userId: number) => {
   try {
      const response = await $api.post<any>('/role/vendor', { userId });
      return response?.data;
   } catch (e) {
      throw e;
   }
};
