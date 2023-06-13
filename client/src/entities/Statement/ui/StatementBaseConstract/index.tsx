import { SimpleButton } from 'shared/ui/SimpleButton';
import styles from './styles.module.scss';

interface StatementBaseConstraProps {
   children?: React.ReactNode;
   onBackButton?: () => void;
   title: string;
}

const StatementBaseConstract: React.FC<StatementBaseConstraProps> = ({
   children,
   onBackButton,
   title,
}) => {
   return (
      <div className={styles.base}>
         <SimpleButton onClick={onBackButton} moreClass={styles.button}>
            Назад
         </SimpleButton>
         <h2 className={styles.title}>{title}</h2>
         {children}
      </div>
   );
};

export default StatementBaseConstract;
