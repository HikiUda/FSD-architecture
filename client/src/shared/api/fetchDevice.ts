import { IOneDevice } from 'shared/model/DeviceModel';
import { $api } from './base';

export const fetchDevice = async (id: number) => {
   try {
      const response = await $api.get<IOneDevice>(`/device/${id}`);
      return response.data;
   } catch (e) {
      console.log(e);
   }
};
