import { ListCard } from 'entities/ListCard';
import styles from './styles.module.scss';
import { IChat } from 'shared/model/chatModel';
import { useLocation, useNavigate } from 'react-router-dom';
import { P_ADMIN_CHAT, P_USER_CHAT } from 'shared/lib/pathes';

interface ListCardChatProps {
   chat: IChat;
}

const ListCardChat: React.FC<ListCardChatProps> = ({ chat }) => {
   const navigate = useNavigate();
   const location = useLocation();

   function toChat() {
      if (location.pathname.includes(P_ADMIN_CHAT)) {
         navigate(`${P_ADMIN_CHAT}/${chat.id}`);
      } else {
         navigate(`${P_USER_CHAT}/${chat.id}`);
      }
   }
   return (
      <ListCard title={chat.name} onClick={toChat}>
         <div className={styles.block_text}>Зайти в чат</div>
      </ListCard>
   );
};

export default ListCardChat;
