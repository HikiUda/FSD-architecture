import { useAppSelector, useInput } from 'shared/lib/hooks';
import styles from './styles.module.scss';
import { MainInput } from 'shared/ui/MainInput';
import { SimpleButton } from 'shared/ui/SimpleButton';
import { IChat } from 'shared/model/chatModel';
import useWSChat from 'widgets/Chat/lib/hooks/useWSChat';
import { useCallback, useRef, useState } from 'react';
import { ClipLoader } from 'react-spinners';

interface ChatProps {
   chat: IChat;
}

const Chat: React.FC<ChatProps> = ({ chat }) => {
   const [portionNumber, setPortionNumber] = useState<number>(1);
   const { user } = useAppSelector((st) => st.user);
   const { value, changeValue } = useInput('');
   const { loading, error, sendMessage, hasMore, messages } = useWSChat(chat.id, portionNumber);

   const observer = useRef<IntersectionObserver | undefined>();
   const lastMessageElementRef = useCallback(
      (node: HTMLDivElement) => {
         if (loading) return;
         if (observer.current) observer.current.disconnect();
         observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
               setPortionNumber((prevPortionNumber) => prevPortionNumber + 1);
               observer.current?.unobserve(entries[0].target);
            }
         });
         if (node) observer.current.observe(node);
      },
      [loading, hasMore],
   );

   function handleSendMessage() {
      if (value) {
         sendMessage(value, user.id);
      }
   }

   return (
      <div className="chat">
         <h1 className={`${styles.chat__title} perple-underline`}>{chat.name}</h1>
         <div className={styles.chat__block}>
            {messages.map((message, index) => {
               return messages.length === index + 1 ? (
                  <div
                     ref={lastMessageElementRef}
                     key={message.id}
                     className={`${styles.chat__message} 
							${message.userId === user.id ? styles.chat__message_right : styles.chat__message_left} 
							${message.isRead ? styles.chat__message_unread : ''}`}>
                     {message.text}
                  </div>
               ) : (
                  <div
                     key={message.id}
                     className={`${styles.chat__message} 
							${message.userId === user.id ? styles.chat__message_right : styles.chat__message_left} 
							${message.isRead ? styles.chat__message_unread : ''}`}>
                     {message.text}
                  </div>
               );
            })}

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
         </div>
         <div className={styles.chat__send_block}>
            <MainInput value={value} setValue={changeValue} placeholder="Отправте сообщение..." />
            <SimpleButton onClick={handleSendMessage}>Отправить</SimpleButton>
         </div>
      </div>
   );
};

export default Chat;
