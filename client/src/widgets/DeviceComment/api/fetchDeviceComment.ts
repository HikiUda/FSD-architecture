import { $api } from 'shared/api';
import { IDeviceComment, IDeviceCommentsObj } from '../model/IDeviceComment';

export const fetchDeviceComment = async (
   deviceId: number,
   limit: number = 10,
   page: number = 1,
) => {
   try {
      const response = await $api.get<IDeviceCommentsObj>(`/device/${deviceId}/comment`, {
         params: { limit, page },
      });
      return response.data;
   } catch (e) {
      console.log(e);
   }
};
