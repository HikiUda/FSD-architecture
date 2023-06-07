import { ListCard } from 'entities/ListCard';
import styles from './styles.module.scss';
import { IOneShortStatement, StatementsStates } from 'shared/model/StatementModel';
import { useNavigate } from 'react-router-dom';
import { P_ADMIN_STATEMENT } from 'shared/lib/pathes';

interface ListCardStatementProps {
   statement: IOneShortStatement;
   refElement?: (node: HTMLDivElement) => void;
}

const ListCardStatement: React.FC<ListCardStatementProps> = ({ statement, refElement }) => {
   const navigate = useNavigate();
   return (
      <ListCard title={statement.title}>
         <div ref={refElement} className={styles.info}>
            {statement.state === StatementsStates.ACCEPT && (
               <span className={`${styles.state} ${styles.state_success}`}>Принято</span>
            )}
            {statement.state === StatementsStates.PENDING && (
               <span className={`${styles.state} ${styles.state_pending}`}>В ожидании</span>
            )}
            {statement.state === StatementsStates.REJECTED && (
               <span className={`${styles.state} ${styles.state_rejected}`}>отклонено</span>
            )}
            <span
               onClick={() => navigate(`${P_ADMIN_STATEMENT}/${statement.id}`)}
               className={styles.more}>
               подробнее...
            </span>
         </div>
      </ListCard>
   );
};

export default ListCardStatement;
