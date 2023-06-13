import { IOneStatement, StatementsAppNumbers } from 'shared/model/StatementModel';
import StatementInfoBlock from '../StatementInfoBlock';
import commonStyles from './../../styles/commonStyles.module.scss';
import { useEffect, useState } from 'react';

interface StatementBrandTypeProps {
   statement: IOneStatement;
}

const StatementBrandType: React.FC<StatementBrandTypeProps> = ({ statement }) => {
   const [info, setInfo] = useState<{ name: string } | null>(null);

   useEffect(() => {
      setInfo(JSON.parse(statement.info));
   }, []);

   return (
      <StatementInfoBlock statement={statement}>
         <div className={`${commonStyles.title} perple-underline`}>
            {statement.appNumber === StatementsAppNumbers.app4 ? 'Брэнд:' : 'Тип:'} {info?.name}
         </div>
      </StatementInfoBlock>
   );
};

export default StatementBrandType;
