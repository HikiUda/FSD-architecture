import { $api } from 'shared/api';
import { IOneDevice } from 'shared/model/DeviceModel';

export async function fetchDevices(limit: number = 10, page: number = 1, search: string = '') {
   try {
      const response = await $api.get<IOneDevice[]>('/device', { params: { limit, page, search } });
      return response.data;
   } catch (e) {
      console.log(e);
   }
}
