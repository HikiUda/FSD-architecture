import { useState, useEffect } from 'react';
import { TempErrorText } from 'shared/lib/helpers/textTemplates';
import { IPurchesDevice } from 'shared/model/DeviceModel';
import { fetchPurchesDevcies } from 'widgets/UserPurches/api/purches';

const usePurches = () => {
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string>('');
   const [purches, setPurches] = useState<IPurchesDevice[]>([]);

   useEffect(() => {
      setLoading(true);
      setError('');
      fetchPurchesDevcies()
         .then((data) => {
            setPurches(data);
         })
         .catch((e) => {
            setError(e.message || TempErrorText);
         })
         .finally(() => {
            setLoading(false);
         });
   }, []);

   return { purches, loading, error };
};

export default usePurches;
