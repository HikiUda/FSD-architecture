import { IOneDevice } from 'shared/model/DeviceModel';
import { Modal } from 'shared/ui/Modal';

import styles from './styles.module.scss';
import commonStyles from './../../styles/commonStyles.module.scss';
import { BASE_URL } from 'shared/api';
import CrossSVG from 'shared/ui/SVGcomp';
import { SVGButton } from 'shared/ui/SVGButton';

interface DeviceModalProps {
   device: IOneDevice;
   show: boolean;
   onHide: () => void;
}

const DeviceModal: React.FC<DeviceModalProps> = ({ device, show, onHide }) => {
   return (
      <Modal show={show} onHide={onHide}>
         <SVGButton moreClass={styles.back_button} onClick={onHide}>
            <CrossSVG />
         </SVGButton>

         <div>
            <div className={commonStyles.row}>
               <div className={styles.img_block}>
                  <img src={`${BASE_URL}/${device.img}`} alt="img" />
               </div>
               <div>
                  <h4 className={`${styles.small_title} perple-underline`}>
                     Название: {device.name}{' '}
                  </h4>
                  <h4 className={`${styles.small_title} perple-underline`}>
                     Брэнд: {device.brandName}{' '}
                  </h4>
                  <h4 className={`${styles.small_title} perple-underline`}>
                     Тип: {device.typeName}
                  </h4>
                  <h4 className={`${styles.small_title} perple-underline`}>Цена: {device.price}</h4>
               </div>
            </div>
            <div className={styles.description_block}>
               <h3 className={styles.big_title}>Описание</h3>
               <div className={`${styles.description} perple-underline`}>{device.description}</div>
            </div>

            <div className={styles.item_block}>
               <h3 className={styles.big_title}>Характеристики</h3>
               {device.info &&
                  device.info.map((item) => {
                     return (
                        <div key={item.id} className={styles.item}>
                           <span>{item.title}: </span>
                           {item.description.map((desc) => {
                              return <span key={desc.id}>{desc.description}</span>;
                           })}
                        </div>
                     );
                  })}
            </div>
         </div>
      </Modal>
   );
};

export default DeviceModal;
