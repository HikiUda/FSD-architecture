import styles from './styles.module.scss';

interface ListCardConsoleProps {
   children: React.ReactNode;
}

const ListCardConsole: React.FC<ListCardConsoleProps> = ({ children }) => {
   return <div className={styles.console_block}>{children}</div>;
};

export default ListCardConsole;
