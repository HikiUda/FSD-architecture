import styles from './styles.module.scss';
import commonStyles from './../../styles/commonStyles.module.scss';
import { SimpleButton } from 'shared/ui/SimpleButton';
import { IOneStatement, StatementsStates } from 'shared/model/StatementModel';
import { useState } from 'react';
import { fetchChangeState } from '../../api/fetchChangeState';
import { TempErrorText } from 'shared/lib/helpers/textTemplates';
import { useLocation } from 'react-router-dom';
import { P_ADMIN_STATEMENT } from 'shared/lib/pathes';
import { fetchCreate } from 'features/Statement/api/FetchCreate/fetchCreate';

interface StateButtonsProps {
   statement: IOneStatement;
}

const st = {
   [StatementsStates.PENDING]: styles.state_pending,
   [StatementsStates.REJECTED]: styles.state_reject,
   [StatementsStates.ACCEPT]: styles.state_accept,
};

const StateButtons: React.FC<StateButtonsProps> = ({ statement }) => {
   const [state, setState] = useState<StatementsStates>(statement.state);
   const [error, setError] = useState<string>('');
   const location = useLocation();

   function changeState(newState: StatementsStates) {
      if (newState === StatementsStates.ACCEPT) {
         fetchCreate(statement);
      }
      fetchChangeState(statement.id, newState)
         .then((data) => {
            setState(newState);
         })
         .catch((e) => {
            setError(e?.message || TempErrorText);
            setTimeout(() => {
               setError('');
            }, 5000);
         });
   }
   return (
      <>
         <div className={commonStyles.row}>
            <div className={`${styles.state}`}>
               Состояние: <span className={`${st[state]}`}>{state}</span>
            </div>
            {location.pathname.includes(P_ADMIN_STATEMENT) && state === StatementsStates.PENDING ? (
               <>
                  <SimpleButton onClick={() => changeState(StatementsStates.ACCEPT)}>
                     Принять
                  </SimpleButton>
                  <SimpleButton onClick={() => changeState(StatementsStates.REJECTED)}>
                     Отклонить
                  </SimpleButton>
               </>
            ) : null}
         </div>
         {error ? <div className={commonStyles.row}>{error}</div> : null}
      </>
   );
};

export default StateButtons;
