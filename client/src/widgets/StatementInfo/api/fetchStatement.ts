import { $api } from 'shared/api';
import { IOneStatement } from 'shared/model/StatementModel';

export const fetchStatement = async (id: number) => {
   try {
      const response = await $api.get<IOneStatement>(`/statement/${id}`);
      return response.data;
   } catch (e) {
      throw e;
   }
};
