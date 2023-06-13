import { $api } from 'shared/api';

export const fetchCreateDeviceStatement = async (data: FormData) => {
   try {
      await $api.post('/statement/device', data);
   } catch (e) {
      throw e;
   }
};
