import { useParams } from 'react-router-dom';
import { StatementsAppNumbers } from 'shared/model/StatementModel';
import useStatement from 'widgets/StatementInfo/lib/hooks/useStatement';

const StatementInfo = () => {
   const { statementId } = useParams();

   const { loading, error, statement } = useStatement(Number(statementId));

   if (
      statement?.appNumber === StatementsAppNumbers.app4 ||
      statement?.appNumber === StatementsAppNumbers.app5
   ) {
      return <div>brand and type</div>;
   }
   if (
      statement?.appNumber === StatementsAppNumbers.app1 ||
      statement?.appNumber === StatementsAppNumbers.app2
   ) {
      return <div>admin and vendor</div>;
   }
   if (statement?.appNumber === StatementsAppNumbers.app3) {
      return <div>device</div>;
   }

   return null;
};

export default StatementInfo;
