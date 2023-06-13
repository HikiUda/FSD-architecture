import axios from 'axios';
import { useEffect, useState } from 'react';
import { TempErrorText } from 'shared/lib/helpers/textTemplates';
import { IOneDevice } from 'shared/model/DeviceModel';
import { fetchMyProducts, fetchMyProductsParams } from 'widgets/MyProductPage/api/fetchMyProducts';

const useMyProducts = (page: number, search: string, brandId: number, typeId: number) => {
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string>('');
   const [myproducts, setMyproducts] = useState<IOneDevice[]>([]);
   const [hasMore, setHasMore] = useState<boolean>(true);
   const limit = 10;

   useEffect(() => {
      setMyproducts([]);
   }, [search, brandId, typeId]);

   useEffect(() => {
      const cansel = new AbortController();
      setLoading(true);
      setError('');
      const params: fetchMyProductsParams = { page, limit, signal: cansel.signal };
      if (brandId) {
         params.brandId = brandId;
      }
      if (typeId) {
         params.typeId = typeId;
      }
      if (search) {
         params.search = search;
      }
      fetchMyProducts(params)
         .then((data) => {
            setMyproducts((prevDevices) => [...prevDevices, ...data.devices]);
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

   return { loading, error, myproducts, hasMore };
};

export default useMyProducts;
