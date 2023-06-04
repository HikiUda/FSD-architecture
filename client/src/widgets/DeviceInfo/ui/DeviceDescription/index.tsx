import styles from './styles.module.scss';
import commonStyles from './../../styles/common.module.scss';

interface DeviceDescriptionProps {
   text: string;
}

const DeviceDescription: React.FC<DeviceDescriptionProps> = ({ text }) => {
   return (
      <div className={styles.description_block}>
         <h2 className={`${commonStyles.big_title} perple-underline`}>Описание</h2>
         <div className={styles.description}>{text}</div>
      </div>
   );
};

export default DeviceDescription;
