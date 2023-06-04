import { $api } from 'shared/api';
import { ICartDevice } from 'shared/model/DeviceModel';

export const fetchCartDevices = async () => {
   try {
      const response = await $api.get<ICartDevice[]>('/basket');
      return response.data;
   } catch (e) {
      console.log(e);
   }
};
