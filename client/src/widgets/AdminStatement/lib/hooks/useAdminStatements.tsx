import { useState, useEffect } from 'react';
import { TempErrorText } from 'shared/lib/helpers/textTemplates';
import { IOneShortStatement } from 'shared/model/StatementModel';
import { fetchAdminStatements } from 'widgets/AdminStatement/api/fetchAdminStatements';

const useAdminStatements = (pageNumber: number) => {
   const limit = 4;
   const [statements, setStatements] = useState<IOneShortStatement[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string>('');
   const [hasMore, setHasMore] = useState<boolean>(true);

   useEffect(() => {
      setLoading(true);
      setError('');
      const cancel = new AbortController();
      const params = { page: pageNumber, limit };
      if (hasMore) {
         fetchAdminStatements(params, cancel.signal)
            .then((data) => {
               setStatements(data.statements);
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
      }

      return () => cancel.abort();
   }, [pageNumber]);

   return { statements, loading, error, hasMore };
};

export default useAdminStatements;
