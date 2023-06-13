import axios from 'axios';
import { useEffect, useState } from 'react';
import { TempErrorText } from 'shared/lib/helpers/textTemplates';
import { IOneDevice } from 'shared/model/DeviceModel';
import { fetchDevices, fetchDevicesParams } from 'widgets/ShopLent/api/devices';

const useDevices = (page: number, search: string, brandId: number, typeId: number) => {
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string>('');
   const [devices, setDevices] = useState<IOneDevice[]>([]);
   const [hasMore, setHasMore] = useState<boolean>(true);
   const limit = 10;

   useEffect(() => {
      setDevices([]);
   }, [search, brandId, typeId]);

   useEffect(() => {
      const cansel = new AbortController();
      setLoading(true);
      setError('');
      const params: fetchDevicesParams = { page, limit, signal: cansel.signal };
      if (brandId) {
         params.brandId = brandId;
      }
      if (typeId) {
         params.typeId = typeId;
      }
      if (search) {
         params.search = search;
      }
      fetchDevices(params)
         .then((data) => {
            setDevices((prevDevices) => [...prevDevices, ...data.devices]);
            if (data.count < limit * page) {
               setHasMore(false);
            }

            setLoading(false);
         })
         .catch((e) => {
            setLoading(false);
            if (axios.isCancel(e)) return;
            setError(e?.message || TempErrorText);
         });

      return () => cansel.abort();
   }, [page, search, brandId, typeId]);

   return { loading, error, devices, hasMore };
};

export default useDevices;
