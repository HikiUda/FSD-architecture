import { useEffect, useState } from 'react';
import { TempErrorText } from 'shared/lib/helpers/textTemplates';
import { IChat } from 'shared/model/chatModel';
import { fetchUserChats } from 'widgets/Chat/api/fetchUserChats';

const useUserChats = () => {
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string>('');
   const [chats, setChats] = useState<IChat[]>([]);

   useEffect(() => {
      setLoading(true);
      setError('');
      fetchUserChats()
         .then((data) => setChats(data))
         .catch((e) => setError(e?.message || TempErrorText))
         .finally(() => {
            setLoading(false);
         });
   }, []);

   return { loading, error, chats };
};

export default useUserChats;
