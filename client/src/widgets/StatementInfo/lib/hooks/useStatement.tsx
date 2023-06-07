import { useEffect, useState } from 'react';
import { TempErrorText } from 'shared/lib/helpers/textTemplates';
import { IOneStatement } from 'shared/model/StatementModel';
import { fetchStatement } from 'widgets/StatementInfo/api/fetchStatement';

const useStatement = (id: number) => {
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string>('');
   const [statement, setStatement] = useState<IOneStatement | null>(null);

   useEffect(() => {
      setLoading(true);
      setError('');

      fetchStatement(id)
         .then((data) => {
            setStatement(data);
         })
         .catch((e) => {
            setError(e.message || TempErrorText);
         })
         .finally(() => {
            setLoading(false);
         });
   }, [id]);

   return { loading, error, statement };
};

export default useStatement;
