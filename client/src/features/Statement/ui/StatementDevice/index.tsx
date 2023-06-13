import { IOneStatement } from 'shared/model/StatementModel';
import StatementInfoBlock from '../StatementInfoBlock';
import { useEffect, useState } from 'react';
import { IOneDevice } from 'shared/model/DeviceModel';
import DeviceModal from '../DeviceModal';
import { SimpleButton } from 'shared/ui/SimpleButton';
import commonStyles from './../../styles/commonStyles.module.scss';
import styles from './styles.module.scss';
import { useLocation } from 'react-router-dom';
import { P_ADMIN_STATEMENT } from 'shared/lib/pathes';

interface StatementDeviceProps {
   statement: IOneStatement;
}

const StatementDevice: React.FC<StatementDeviceProps> = ({ statement }) => {
   const [device, setDevice] = useState<IOneDevice | null>(null);
   const [show, setShow] = useState<boolean>(false);

   useEffect(() => {
      setDevice(JSON.parse(statement.info));
   }, []);

   return (
      <>
         <StatementInfoBlock statement={statement}>
            <h3 className={`${commonStyles.title} perple-underline`}>Device: {device?.name}</h3>
            <SimpleButton onClick={() => setShow(true)} moreClass={styles.button}>
               Показать больше...
            </SimpleButton>
         </StatementInfoBlock>
         {device && <DeviceModal show={show} onHide={() => setShow(false)} device={device} />}
      </>
   );
};

export default StatementDevice;
