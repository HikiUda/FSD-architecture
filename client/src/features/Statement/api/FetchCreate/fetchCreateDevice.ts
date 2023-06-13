import { $api } from 'shared/api';

export const fetchCreateDevice = async (deviceInfo: string) => {
   try {
      const response = await $api.post<any>('/device', { deviceInfo });
      return response?.data;
   } catch (e) {
      throw e;
   }
};
