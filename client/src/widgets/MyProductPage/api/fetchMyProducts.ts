import { GenericAbortSignal } from 'axios';
import { $api } from 'shared/api';
import { IDevices } from 'shared/model/DeviceModel';

export interface fetchMyProductsParams {
   limit: number;
   search?: string;
   page: number;
   brandId?: number;
   typeId?: number;
   signal?: GenericAbortSignal | undefined;
}

export const fetchMyProducts = async (params: fetchMyProductsParams) => {
   try {
      const response = await $api.get<IDevices>('/device/user', { params });
      return response.data;
   } catch (e) {
      throw e;
   }
};
