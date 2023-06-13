import { $api } from 'shared/api';
import { StatementsStates } from 'shared/model/StatementModel';

export const fetchChangeState = async (statementId: number, state: StatementsStates) => {
   try {
      const response = await $api.put<any>(`/statement/state/${statementId}`, { state });
      return response.data;
   } catch (e) {
      throw e;
   }
};
