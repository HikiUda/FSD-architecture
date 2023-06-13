import styles from './styles.module.scss';
import commonStyles from './../../styles/commonStyles.module.scss';
import { SimpleButton } from 'shared/ui/SimpleButton';
import { useState } from 'react';
import { IOneStatement } from 'shared/model/StatementModel';
import { InputModal } from 'features/InputModal';
import { useInput } from 'shared/lib/hooks';
import { fetchSendAdminComment } from 'features/Statement/api/fetchSendAdminComment';
import { TempErrorText } from 'shared/lib/helpers/textTemplates';
import { useLocation } from 'react-router-dom';
import { P_ADMIN_STATEMENT } from 'shared/lib/pathes';

interface AdminCommentBlockProps {
   statement: IOneStatement;
}

const AdminCommentBlock: React.FC<AdminCommentBlockProps> = ({ statement }) => {
   const [adminComment, setAdminComment] = useState<string>(statement.adminComment);
   const [error, setError] = useState<string>('');
   const [show, setShow] = useState<boolean>(false);
   const { value, changeValue } = useInput(statement.adminComment);
   const location = useLocation();

   function changeAdminComment(decide: boolean) {
      if (decide) {
         fetchSendAdminComment(statement.id, value).catch((e) => {
            setError(e?.message || TempErrorText);
            setTimeout(() => {
               setError('');
            }, 5000);
         });
         setAdminComment(value);
      } else {
         changeValue(adminComment);
      }
   }

   return (
      <>
         <div className={commonStyles.row}>
            <div className={`${styles.admin_comment} perple-underline`}>
               {adminComment ? adminComment : 'Комментарий отсутствует'}
            </div>
            {location.pathname.includes(P_ADMIN_STATEMENT) && (
               <SimpleButton onClick={() => setShow(true)}>
                  {adminComment ? 'Изменить комментарий' : 'Прекрепить комментарий'}
               </SimpleButton>
            )}
         </div>
         {location.pathname.includes(P_ADMIN_STATEMENT) && (
            <InputModal
               show={show}
               onHide={() => setShow(false)}
               value={value}
               setValue={changeValue}
               toDecide={changeAdminComment}
            />
         )}

         <div className={commonStyles.row}>{error}</div>
      </>
   );
};

export default AdminCommentBlock;
