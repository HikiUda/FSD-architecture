import styles from './styles.module.scss';

interface ListCardProps {
   title: string;
   children: React.ReactNode;
}

const ListCard: React.FC<ListCardProps> = ({ title, children }) => {
   return (
      <div className={styles.list_block}>
         <h3 className={styles.list_block__title}>{title}</h3>
         {children}
      </div>
   );
};

export default ListCard;
