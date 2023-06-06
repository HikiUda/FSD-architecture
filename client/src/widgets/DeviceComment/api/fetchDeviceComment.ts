import { $api } from 'shared/api';
import { IDeviceCommentsObj } from '../model/IDeviceComment';
import { GenericAbortSignal } from 'axios';

export const fetchDeviceComment = async (
   deviceId: number,
   limit: number = 10,
   page: number = 1,
   signal?: GenericAbortSignal | undefined,
) => {
   try {
      const response = await $api.get<IDeviceCommentsObj>(`/device/${deviceId}/comment`, {
         params: { limit, page },
         signal: signal,
      });
      return response.data;
   } catch (e) {
      throw e;
   }
};
