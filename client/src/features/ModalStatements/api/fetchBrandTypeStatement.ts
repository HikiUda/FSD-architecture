import { $api } from 'shared/api';
import { StatementsAppNumbers } from 'shared/model/StatementModel';

export const fetchBrandTypeStatement = async (
   appNumber: StatementsAppNumbers,
   name: string,
   description: string,
) => {
   try {
      const response = await $api.post('/statement/typebrand', { appNumber, description, name });
      return response.data;
   } catch (e) {
      throw e;
   }
};
