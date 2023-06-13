import { StatementsAppTitles } from 'shared/model/StatementModel';
import DeviceEditor from '../DeviceEditor';

const DeviceEditorCreate = () => {
   return (
      <DeviceEditor
         callback={(d, t) => console.log(d)}
         buttonName="Создать"
         title={StatementsAppTitles.app3}
      />
   );
};

export default DeviceEditorCreate;
