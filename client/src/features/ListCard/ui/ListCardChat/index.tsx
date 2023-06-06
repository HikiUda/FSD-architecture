import { ListCard } from 'entities/ListCard';
import styles from './styles.module.scss';

const ListCardChat = () => {
   return (
      <ListCard title={'User & user'}>
         <div className={styles.block_text}>Привет! Да, товар действительно качественные.</div>
      </ListCard>
   );
};

export default ListCardChat;
