import { useEffect, useState } from 'react';

import { TempErrorText } from 'shared/lib/helpers/textTemplates';
import { IChatMessege } from 'shared/model/chatModel';

const useWSChat = (chatId: number, portionNumber: number) => {
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string>('');
   const [messages, setMessages] = useState<IChatMessege[]>([]);
   const [hasMore, setHasMore] = useState<boolean>(true);
   const [socket, setSocket] = useState<WebSocket | null>(null);
   const limit = 10;

   useEffect(() => {
      const sck = new WebSocket(`ws://localhost:5000/chat`);
      sck.onopen = (e) => {
         const letter = { chatId, event: 'openChat' };
         const sealLetter = JSON.stringify(letter);
         sck.send(sealLetter);
      };
      sck.onerror = (e) => {
         setError(TempErrorText);
      };

      sck.onmessage = (e) => {
         const data = JSON.parse(e.data);
         switch (data.event) {
            case 'openChat':
               const letter = { chatId, limit, portion: portionNumber, event: 'getSomeContent' };
               const sealLetter = JSON.stringify(letter);
               sck.send(sealLetter);
               break;
            case 'getSomeContent':
               if (data?.messages?.length === 0) {
                  setHasMore(false);
               } else {
                  setMessages((prevMessages) => [
                     ...prevMessages,
                     ...(data.messages as IChatMessege[]),
                  ]);
               }
               setLoading(false);
               break;
            case 'sendMessage':
               setMessages((prevMessages) => [data.message as IChatMessege, ...prevMessages]);
               setLoading(false);
               break;
         }
      };

      setSocket(sck);

      return () => {
         if (socket) {
            socket.close();
         }
      };
   }, []);

   useEffect(() => {
      if (socket) {
         setLoading(true);
         const letter = { chatId, limit, portion: portionNumber, event: 'getSomeContent' };
         const sealLetter = JSON.stringify(letter);
         socket.send(sealLetter);
      }
   }, [portionNumber]);

   function sendMessage(text: string, userId: number) {
      if (socket) {
         setLoading(true);
         const letter = { chatId, text, userId, event: 'sendMessage' };
         const sealLetter = JSON.stringify(letter);
         socket.send(sealLetter);
      }
   }

   return { loading, error, hasMore, messages, sendMessage };
};

export default useWSChat;
