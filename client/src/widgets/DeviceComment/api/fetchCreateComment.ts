import { $api } from 'shared/api';
import { IDeviceComment } from '../model/IDeviceComment';

export const fetchCreateComment = async (deviceId: number, content: string) => {
   try {
      const response = await $api.post<IDeviceComment>(`/device/${deviceId}/comment`, { content });
      return response.data;
   } catch (e) {
      console.log(e);
   }
};
