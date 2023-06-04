import { IDeviceInfo } from 'shared/model/DeviceModel';
import commonStyles from './../../styles/common.module.scss';
import styles from './styles.module.scss';

interface InfoDescriptionProps {
   info: IDeviceInfo[];
}

const InfoDescriptionPurches: React.FC<InfoDescriptionProps> = ({ info }) => {
   return (
      <div className={styles.info_block}>
         <h2 className={`${commonStyles.big_title} perple-underline`}>Характеристики</h2>
         {info.map((item) => (
            <div key={item.id} className={styles.characteristic}>
               <h4 className={styles.characteristic_title}>{item.title}:</h4>

               <div className={styles.characteristic_info}>
                  {item.description.map((descItem) => {
                     return (
                        <span key={descItem.id} className={descItem.selected ? styles._active : ''}>
                           {descItem.description}
                        </span>
                     );
                  })}
               </div>
            </div>
         ))}
      </div>
   );
};

export default InfoDescriptionPurches;
