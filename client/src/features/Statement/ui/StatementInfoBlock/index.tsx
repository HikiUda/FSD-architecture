import { StatementBaseConstract } from 'entities/Statement';
import { IOneStatement } from 'shared/model/StatementModel';
import StatementUserInfo from '../StatementUserInfo';
import { useLocation, useNavigate } from 'react-router-dom';
import { P_ADMIN_STATEMENT, P_USER_STATEMENT } from 'shared/lib/pathes';
import StatementAdminInfo from '../StatementAdminInfo';

interface StatementInfoBlockProps {
   statement: IOneStatement;
   children: React.ReactNode;
}

const StatementInfoBlock: React.FC<StatementInfoBlockProps> = ({ statement, children }) => {
   const location = useLocation();
   const navigate = useNavigate();

   function onBack() {
      if (location.pathname.includes(P_ADMIN_STATEMENT)) {
         navigate(P_ADMIN_STATEMENT);
      } else if (location.pathname.includes(P_USER_STATEMENT)) {
         navigate(P_USER_STATEMENT);
      }
   }

   return (
      <StatementBaseConstract title={statement.title} onBackButton={onBack}>
         <>
            <StatementUserInfo statement={statement} />
            {children}
            <StatementAdminInfo statement={statement} />
         </>
      </StatementBaseConstract>
   );
};

export default StatementInfoBlock;
