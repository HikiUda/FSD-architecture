import { ListCard } from 'entities/ListCard';
import styles from './styles.module.scss';
import { IOneShortStatement, StatementsStates } from 'shared/model/StatementModel';

interface ListCardStatementProps {
   statement: IOneShortStatement;
}

const ListCardStatement: React.FC<ListCardStatementProps> = ({ statement }) => {
   return (
      <ListCard title={statement.title}>
         <div className={styles.info}>
            {statement.state === StatementsStates.ACCEPT && (
               <span className={`${styles.state} ${styles.state_success}`}>Принято</span>
            )}
            {statement.state === StatementsStates.PENDING && (
               <span className={`${styles.state} ${styles.state_pending}`}>В ожидании</span>
            )}
            {statement.state === StatementsStates.REJECTED && (
               <span className={`${styles.state} ${styles.state_rejected}`}>отклонено</span>
            )}
            <span className={styles.more}>подробнее...</span>
         </div>
      </ListCard>
   );
};

export default ListCardStatement;
