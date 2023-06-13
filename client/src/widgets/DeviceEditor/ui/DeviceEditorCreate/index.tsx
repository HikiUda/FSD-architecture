import { StatementsAppNumbers, StatementsAppTitles } from 'shared/model/StatementModel';
import DeviceEditor from '../DeviceEditor';
import { useState } from 'react';
import { ConfirmModal } from 'entities/ConfirmModal';
import { fetchCreateDeviceStatement } from 'widgets/DeviceEditor/api/fetchCreateDeviceStatement';
import { MainInput } from 'shared/ui/MainInput';
import { useInput } from 'shared/lib/hooks';

import styles from './styles.module.scss';

const DeviceEditorCreate = () => {
   const { value: description, changeValue: setDescription } = useInput('');
   const [show, setShow] = useState<boolean>(false);
   const [formData, setFormData] = useState<FormData | null>(null);

   function handleData(deviceInfo: string, image: File | string) {
      if (image instanceof File) {
         let newFormData = new FormData();
         newFormData.append('deviceInfo', deviceInfo);
         newFormData.append('img', image);
         newFormData.append('appNumber', String(StatementsAppNumbers.app3));
         setFormData(newFormData);
         setShow(true);
      }
   }

   function sendData(decide: boolean) {
      if (decide && formData) {
         formData.append('description', description);
         fetchCreateDeviceStatement(formData);
      }
   }

   return (
      <>
         <DeviceEditor
            callback={handleData}
            buttonName="Создать"
            title={StatementsAppTitles.app3}
         />
         <ConfirmModal
            show={show}
            onHide={() => setShow(false)}
            title="Вы уверены?"
            toDecide={sendData}>
            <>
               <h4 className={styles.small_title}>Дополнительная информация</h4>
               <MainInput value={description} setValue={setDescription} />
            </>
         </ConfirmModal>
      </>
   );
};

export default DeviceEditorCreate;
