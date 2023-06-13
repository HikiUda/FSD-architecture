import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import useChat from 'widgets/Chat/lib/hooks/useChat';
import Chat from '../Chat';
import { SimpleButton } from 'shared/ui/SimpleButton';
import { P_ADMIN_CHAT, P_USER_CHAT } from 'shared/lib/pathes';

const PreChat = () => {
   const { chatId } = useParams();
   const navigate = useNavigate();
   const location = useLocation();
   const { chat, loading, error } = useChat(Number(chatId));

   function toBack() {
      if (location.pathname.includes(P_ADMIN_CHAT)) {
         navigate(P_ADMIN_CHAT);
      } else {
         navigate(P_USER_CHAT);
      }
   }

   return (
      <>
         <SimpleButton onClick={toBack}>Назад</SimpleButton>
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

export default PreChat;
