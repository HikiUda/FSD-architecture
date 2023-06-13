import { useEffect, useState } from 'react';
import { TempErrorText } from 'shared/lib/helpers/textTemplates';
import { IChat } from 'shared/model/chatModel';
import { fetchSupportChat } from 'widgets/Chat/api/fetchSupportChat';

const useChat = () => {
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string>('');
   const [chat, setChat] = useState<IChat | null>(null);

   useEffect(() => {
      setLoading(true);
      setError('');
      fetchSupportChat()
         .then((data) => setChat(data))
         .catch((e) => setError(e?.message || TempErrorText))
         .finally(() => {
            setLoading(false);
         });
   }, []);

   return { loading, error, chat };
};

export default useChat;
