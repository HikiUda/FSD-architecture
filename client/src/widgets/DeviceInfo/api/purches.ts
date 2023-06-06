import { $api } from 'shared/api';
import { IPurchesDevice } from 'shared/model/DeviceModel';

export const fetchOnePurchesDevice = async (purchesId: number) => {
   try {
      const response = await $api.get<IPurchesDevice>(`user/purches/${purchesId}`);
      return response.data;
   } catch (e) {
      throw e;
   }
};
