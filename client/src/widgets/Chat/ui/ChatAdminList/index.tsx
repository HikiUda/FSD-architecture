import useAdminChats from 'widgets/Chat/lib/hooks/useAdminChats';
import ChatList from '../ChatList';
import { ClipLoader } from 'react-spinners';

const ChatAdminList = () => {
   const { loading, error, chats } = useAdminChats();

   return (
      <>
         {chats && <ChatList chats={chats} />}
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

export default ChatAdminList;
