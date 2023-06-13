import { StatementBrandType, StatementDevice, StatementRole } from 'features/Statement';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { TempErrorText } from 'shared/lib/helpers/textTemplates';
import { StatementsAppNumbers } from 'shared/model/StatementModel';
import useStatement from 'widgets/StatementInfo/lib/hooks/useStatement';

const StatementInfo = () => {
   const { statementId } = useParams();

   const { loading, error, statement } = useStatement(Number(statementId));

   if (loading) {
      return (
         <ClipLoader
            color={'#54fa34'}
            loading={true}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
         />
      );
   }
   if (error) {
      return <div>{error}</div>;
   }

   if (
      statement?.appNumber === StatementsAppNumbers.app4 ||
      statement?.appNumber === StatementsAppNumbers.app5
   ) {
      return <StatementBrandType statement={statement} />;
   }
   if (
      statement?.appNumber === StatementsAppNumbers.app1 ||
      statement?.appNumber === StatementsAppNumbers.app2
   ) {
      return <StatementRole statement={statement} />;
   }
   if (statement?.appNumber === StatementsAppNumbers.app3) {
      return <StatementDevice statement={statement} />;
   }

   return <div>{TempErrorText}</div>;
};

export default StatementInfo;
