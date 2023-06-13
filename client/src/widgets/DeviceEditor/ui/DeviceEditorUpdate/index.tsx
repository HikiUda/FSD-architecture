import { ConfirmModal } from 'entities/ConfirmModal';
import DeviceEditor from '../DeviceEditor';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUpdateDevice } from 'widgets/DeviceEditor/api/fetchUpdateDevice';

const DeviceEditorUpdate = () => {
   const [show, setShow] = useState<boolean>(false);
   const [formData, setFormData] = useState<FormData | null>(null);
   const { deviceId } = useParams();

   function handleData(deviceInfo: string, image: File | string) {
      let newFormData = new FormData();
      newFormData.append('deviceInfo', deviceInfo);
      newFormData.append('img', image);
      setFormData(newFormData);
      setShow(true);
   }

   function sendData(decide: boolean) {
      if (decide && formData && !!Number(deviceId)) {
         fetchUpdateDevice(Number(deviceId), formData);
      }
   }

   return (
      <>
         <DeviceEditor
            callback={handleData}
            buttonName="Изменить"
            title={'Редоктирование дивайса'}
         />
         <ConfirmModal
            show={show}
            onHide={() => setShow(false)}
            title="Вы уверены?"
            toDecide={sendData}
         />
      </>
   );
};

export default DeviceEditorUpdate;
