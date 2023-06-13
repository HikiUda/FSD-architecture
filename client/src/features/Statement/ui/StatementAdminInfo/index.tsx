import { IOneStatement } from 'shared/model/StatementModel';
import styles from './styles.module.scss';
import commonStyles from './../../styles/commonStyles.module.scss';
import StateButtons from '../StateButtons';
import AdminCommentBlock from '../AdminCommentBlock';

interface StatementAdminInfoProps {
   statement: IOneStatement;
}

const StatementAdminInfo: React.FC<StatementAdminInfoProps> = ({ statement }) => {
   return (
      <div className={styles.admin_info_block}>
         <h3 className={commonStyles.title}>Комментарий админа</h3>
         <AdminCommentBlock statement={statement} />
         <StateButtons statement={statement} />
      </div>
   );
};

export default StatementAdminInfo;
