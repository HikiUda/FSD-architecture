import { IOneStatement } from 'shared/model/StatementModel';
import styles from './styles.module.scss';

interface StatementUserInfoProps {
   statement: IOneStatement;
}

const StatementUserInfo: React.FC<StatementUserInfoProps> = ({ statement }) => {
   return (
      <div className={styles.user_info_block}>
         <h3 className={styles.title}>От {statement.userName}:</h3>
         <div className={`${styles.description} perple-underline`}>{statement.description}</div>
      </div>
   );
};

export default StatementUserInfo;
