import styles from './styles.module.scss';

interface ListCardWrapperProps {
   children: React.ReactNode;
}

const ListCardWrapper: React.FC<ListCardWrapperProps> = ({ children }) => {
   return <div className={styles.list}>{children}</div>;
};

export default ListCardWrapper;
