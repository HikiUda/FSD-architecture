import { $api } from 'shared/api';
import { IDeviceComment } from '../model/IDeviceComment';
import { GenericAbortSignal } from 'axios';

export const fetchCreateComment = async (
   deviceId: number,
   content: string,
   signal?: GenericAbortSignal | undefined,
) => {
   try {
      const response = await $api.post<IDeviceComment>(`/device/${deviceId}/comment`, { content });
      return response.data;
   } catch (e) {
      throw e;
   }
};
