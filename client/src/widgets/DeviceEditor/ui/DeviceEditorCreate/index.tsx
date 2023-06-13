import DeviceEditor from '../DeviceEditor';

const DeviceEditorCreate = () => {
   return <DeviceEditor callback={(d, t) => console.log(d)} buttonName="Создать" />;
};

export default DeviceEditorCreate;
