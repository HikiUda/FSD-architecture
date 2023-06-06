import { useState } from 'react';
import styles from './styles.module.scss';

interface DropDownProps {}

const DropDown: React.FC<DropDownProps> = ({}) => {
   const [value, setValue] = useState<string>('none');
   const [active, setActive] = useState<boolean>(false);

   function chooseValue(target: string) {
      setValue(target);
      setActive(false);
   }

   return (
      <div className={styles.dropdown_block}>
         <h3
            className={`${styles.dropdown_block__title} perple-underline`}
            onClick={() => setActive(true)}>
            {value}
         </h3>
         <ul
            className={`${styles.dropdown_block__list} ${
               active ? styles.dropdown_block__list_active : ''
            }`}>
            <li className={styles.dropdown_block__item} onClick={() => chooseValue('pending')}>
               pending
            </li>
            <li className={styles.dropdown_block__item} onClick={() => chooseValue('accept')}>
               accept
            </li>
            <li className={styles.dropdown_block__item} onClick={() => chooseValue('reject')}>
               reject
            </li>
         </ul>
      </div>
   );
};

export default DropDown;
