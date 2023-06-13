import { useInput } from 'shared/lib/hooks';
import { StatementsAppNumbers, StatementsAppTitles } from 'shared/model/StatementModel';
import { MainInput } from 'shared/ui/MainInput';
import { Modal } from 'shared/ui/Modal';
import { SVGButton } from 'shared/ui/SVGButton';
import CrossSVG from 'shared/ui/SVGcomp';
import styles from './styles.module.scss';
import { SimpleButton } from 'shared/ui/SimpleButton';
import { fetchBrandTypeStatement } from 'features/ModalStatements/api/fetchBrandTypeStatement';
import { useState } from 'react';

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
   const { value: name, changeValue: setName } = useInput('');
   const { value: description, changeValue: setDescription } = useInput('');
   const [error, setError] = useState<string>('');

   function sendStatement() {
      if (name && description) {
         setError('');
         fetchBrandTypeStatement(appNumber, name, description);
         setDescription('');
         setName('');
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
            {appNumber === 4 ? StatementsAppTitles.app4 : StatementsAppTitles.app5}
         </h3>
         <div className={styles.block}>
            <MainInput
               value={name}
               setValue={setName}
               placeholder={`Введите название ${appNumber === 4 ? 'брэнда' : 'типа'}`}
            />
            <MainInput
               value={description}
               setValue={setDescription}
               placeholder={`Опишите свой ${appNumber === 4 ? 'брэнд' : 'тип'}`}
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
