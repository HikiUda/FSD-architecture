import { useState, useEffect } from 'react';
import { TempErrorText } from 'shared/lib/helpers/textTemplates';
import { IPurchesDevice } from 'shared/model/DeviceModel';
import { fetchOnePurchesDevice } from '../../api/purches';

const usePurchesDevice = (id: number) => {
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string>('');
   const [device, setDevice] = useState<IPurchesDevice | null>(null);

   useEffect(() => {
      setLoading(true);
      setError('');
      fetchOnePurchesDevice(id)
         .then((data) => {
            setDevice(data);
         })
         .catch((e) => {
            setError(e.message || TempErrorText);
         })
         .finally(() => {
            setLoading(false);
         });
   }, [id]);

   return { device, loading, error };
};

export default usePurchesDevice;
