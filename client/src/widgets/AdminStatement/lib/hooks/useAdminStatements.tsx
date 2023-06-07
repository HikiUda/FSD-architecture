import { useState, useEffect } from 'react';
import { TempErrorText } from 'shared/lib/helpers/textTemplates';
import {
   IOneShortStatement,
   StatementsAppNumbers,
   StatementsStates,
} from 'shared/model/StatementModel';
import { fetchAdminStatements } from 'widgets/AdminStatement/api/fetchAdminStatements';

const useAdminStatements = (
   pageNumber: number,
   state: StatementsStates | null,
   appNumber: StatementsAppNumbers | null,
) => {
   const limit = 5;
   const [statements, setStatements] = useState<IOneShortStatement[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string>('');
   const [hasMore, setHasMore] = useState<boolean>(true);

   useEffect(() => {
      setHasMore(true);
      setStatements([]);
   }, [state, appNumber]);

   useEffect(() => {
      setLoading(true);
      setError('');
      const cancel = new AbortController();
      const params = { page: pageNumber, limit, state, appNumber };
      fetchAdminStatements(params, cancel.signal)
         .then((data) => {
            console.log(data.statements);
            setStatements((prev) => [...prev, ...data.statements]);
            if (data.count < limit * pageNumber) {
               setHasMore(false);
            }
         })
         .catch((e) => {
            setError(e?.message || TempErrorText);
         })
         .finally(() => {
            setLoading(false);
         });

      return () => cancel.abort();
   }, [pageNumber, state, appNumber]);

   return { statements, loading, error, hasMore };
};

export default useAdminStatements;
