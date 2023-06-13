import { IOneStatement } from 'shared/model/StatementModel';
import StatementInfoBlock from '../StatementInfoBlock';

interface StatementRoleProps {
   statement: IOneStatement;
}

const StatementRole: React.FC<StatementRoleProps> = ({ statement }) => {
   return <StatementInfoBlock statement={statement}>{null}</StatementInfoBlock>;
};

export default StatementRole;
