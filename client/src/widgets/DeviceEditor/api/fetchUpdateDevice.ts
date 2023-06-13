import { $api } from 'shared/api';

export const fetchUpdateDevice = async (deviceId: number, data: FormData) => {
   try {
      await $api.put(`/device/${deviceId}`, data);
   } catch (e) {
      throw e;
   }
};
