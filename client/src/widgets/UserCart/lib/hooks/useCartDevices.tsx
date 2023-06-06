import { useState, useEffect } from 'react';
import { TempErrorText } from 'shared/lib/helpers/textTemplates';
import { ICartDevice } from 'shared/model/DeviceModel';
import { fetchCartDevices } from 'widgets/UserCart/api/fetchCartDevices';

const useCartDevices = () => {
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string>('');
   const [devices, setDevices] = useState<ICartDevice[]>([]);

   useEffect(() => {
      setLoading(true);
      setError('');
      fetchCartDevices()
         .then((data) => {
            setDevices(data);
         })
         .catch((e) => {
            setError(e.message || TempErrorText);
         })
         .finally(() => {
            setLoading(false);
         });
   }, []);

   return { devices, loading, error };
};

export default useCartDevices;
