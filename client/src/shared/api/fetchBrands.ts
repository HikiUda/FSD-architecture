import { IBrandType } from 'shared/model/BrandTypeModel';
import { $api } from './base';
import { GenericAbortSignal } from 'axios';

export const fetchBrands = async (search: string, signal?: GenericAbortSignal | undefined) => {
   try {
      const response = await $api.get<IBrandType[]>('/brand', { signal, params: { search } });
      return response.data;
   } catch (e) {
      throw e;
   }
};
