import ListCardWrapper from 'entities/ListCard/ui/ListCardWrapper';
import { ListCardChat } from 'features/ListCard';

import { IChat } from 'shared/model/chatModel';

interface ChatListProps {
   chats: IChat[];
}
const ChatList: React.FC<ChatListProps> = ({ chats }) => {
   return (
      <>
         <ListCardWrapper>
            {chats.map((chat) => {
               return <ListCardChat key={chat.id} chat={chat} />;
            })}
         </ListCardWrapper>
      </>
   );
};

export default ChatList;
