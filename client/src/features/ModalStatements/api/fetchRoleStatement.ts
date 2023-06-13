import { $api } from 'shared/api';
import { StatementsAppNumbers } from 'shared/model/StatementModel';

export const fetchRoleStatement = async (appNumber: StatementsAppNumbers, description: string) => {
   try {
      const response = await $api.post('/statement/role', { appNumber, description });
      return response.data;
   } catch (e) {
      throw e;
   }
};
