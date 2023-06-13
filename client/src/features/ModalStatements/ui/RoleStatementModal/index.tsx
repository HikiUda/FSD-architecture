import { useInput } from 'shared/lib/hooks';
import { StatementsAppNumbers, StatementsAppTitles } from 'shared/model/StatementModel';
import { MainInput } from 'shared/ui/MainInput';
import { Modal } from 'shared/ui/Modal';
import { SVGButton } from 'shared/ui/SVGButton';
import CrossSVG from 'shared/ui/SVGcomp';
import styles from './styles.module.scss';
import { SimpleButton } from 'shared/ui/SimpleButton';
import { useState } from 'react';
import { fetchRoleStatement } from 'features/ModalStatements/api/fetchRoleStatement';

interface BrandTypeStatementModalProps {
   show: boolean;
   onHide: () => void;
   appNumber: StatementsAppNumbers;
}

const BrandTypeStatementModal: React.FC<BrandTypeStatementModalProps> = ({
   show,
   onHide,
   appNumber,
}) => {
   const { value: description, changeValue: setDescription } = useInput('');
   const [error, setError] = useState<string>('');

   function sendStatement() {
      if (description) {
         setError('');
         fetchRoleStatement(appNumber, description);
         setDescription('');
         onHide();
      } else {
         setError('Заполните все поля!');
      }
   }

   return (
      <Modal show={show} onHide={onHide}>
         <SVGButton onClick={onHide}>
            <CrossSVG />
         </SVGButton>
         <h3 className={styles.title}>
            {appNumber === 1 ? StatementsAppTitles.app1 : StatementsAppTitles.app2}
         </h3>
         <div className={styles.block}>
            <MainInput
               value={description}
               setValue={setDescription}
               placeholder={`Почему вы захотели стать ${
                  appNumber === 1 ? 'админом' : 'продовцом'
               }?`}
            />
            {error && <h3 className={styles.title}>{error}</h3>}

            <div className={styles.row}>
               <SimpleButton onClick={sendStatement}>Отправить</SimpleButton>
               <SimpleButton onClick={onHide}>Отмена</SimpleButton>
            </div>
         </div>
      </Modal>
   );
};

export default BrandTypeStatementModal;
