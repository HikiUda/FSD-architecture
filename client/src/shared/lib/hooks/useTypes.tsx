import { useEffect, useState } from 'react';
import { fetchTypes } from 'shared/api/';
import { IBrandType } from 'shared/model/BrandTypeModel';

export const useTypes = (search: string) => {
   const [types, setTypes] = useState<IBrandType[]>([]);

   useEffect(() => {
      const cansel = new AbortController();
      fetchTypes(search, cansel.signal)
         .then((data) => setTypes(data))
         .catch((e) => {
            return;
         });
      return () => cansel.abort();
   }, [search]);

   return { types };
};
