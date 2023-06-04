import { $api } from 'shared/api';
import { IPurchesDevice } from 'shared/model/DeviceModel';

export const fetchPurchesDevcies = async () => {
   try {
      const response = await $api.get<IPurchesDevice[]>('/user/purches');
      return response.data;
   } catch (e) {
      console.log(e);
   }
};
