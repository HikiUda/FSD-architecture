import { useState, useEffect } from 'react';
import { TempErrorText } from 'shared/lib/helpers/textTemplates';
import { IOneDevice } from 'shared/model/DeviceModel';
import { fetchUserLiked } from 'widgets/UserLiked/api/fetchUserLiked';

const useLiked = () => {
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string>('');
   const [liked, setLiked] = useState<IOneDevice[]>([]);

   useEffect(() => {
      setLoading(true);
      setError('');
      fetchUserLiked()
         .then((data) => {
            setLiked(data);
         })
         .catch((e) => {
            setError(e.message || TempErrorText);
         })
         .finally(() => {
            setLoading(false);
         });
   }, []);

   return { liked, loading, error };
};

export default useLiked;
