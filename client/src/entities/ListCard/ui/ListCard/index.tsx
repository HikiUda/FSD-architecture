import styles from './styles.module.scss';

interface ListCardProps {
   title: string;
   children: React.ReactNode;
   onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ListCard: React.FC<ListCardProps> = ({ title, children, onClick }) => {
   return (
      <div onClick={onClick} className={styles.list_block}>
         <h3 className={styles.list_block__title}>{title}</h3>
         {children}
      </div>
   );
};

export default ListCard;
