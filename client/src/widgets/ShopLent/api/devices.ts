import { GenericAbortSignal } from 'axios';
import { $api } from 'shared/api';
import { IDevices } from 'shared/model/DeviceModel';

export interface fetchDevicesParams {
   limit: number;
   page: number;
   search?: string;
   brandId?: number;
   typeId?: number;
   signal?: GenericAbortSignal | undefined;
}

export async function fetchDevices(params: fetchDevicesParams) {
   try {
      const response = await $api.get<IDevices>('/device', { params });
      return response.data;
   } catch (e) {
      throw e;
   }
}
