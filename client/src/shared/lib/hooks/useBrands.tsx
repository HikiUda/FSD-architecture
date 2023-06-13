import { useEffect, useState } from 'react';
import { fetchBrands } from 'shared/api/';
import { IBrandType } from 'shared/model/BrandTypeModel';

export const useBrands = (search: string) => {
   const [brands, setBrands] = useState<IBrandType[]>([]);

   useEffect(() => {
      const cansel = new AbortController();
      fetchBrands(search, cansel.signal)
         .then((data) => setBrands(data))
         .catch((e) => {
            return;
         });
      return () => cansel.abort();
   }, [search]);

   return { brands };
};
