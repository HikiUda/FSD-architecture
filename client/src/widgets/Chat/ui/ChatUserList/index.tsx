import ChatList from '../ChatList';
import { ClipLoader } from 'react-spinners';
import useUserChats from 'widgets/Chat/lib/hooks/useUserChats';

const ChatUserList = () => {
   const { loading, error, chats } = useUserChats();

   if (loading || error) {
      <>
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
      </>;
   }

   return <>{chats && <ChatList chats={chats} />}</>;
};

export default ChatUserList;
