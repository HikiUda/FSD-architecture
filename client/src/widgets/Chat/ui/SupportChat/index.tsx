import { ClipLoader } from 'react-spinners';

import Chat from '../Chat';
import useSupportChat from 'widgets/Chat/lib/hooks/useSupportChat';

const SupportChat = () => {
   const { chat, loading, error } = useSupportChat();

   return (
      <>
         {chat && <Chat chat={chat} />}
         {loading && (
            <ClipLoader
               color={'#54fa34'}
               loading={true}
               size={150}
               aria-label="Loading Spinner"
               data-testid="loader"
            />
         )}
         {error || null}
      </>
   );
};

export default SupportChat;
