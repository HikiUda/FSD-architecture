import { useState } from 'react';
import styles from './styles.module.scss';

interface liProps {
   title: string;
   func: () => void;
}

interface DropDownProps {
   list: liProps[];
   moreTitleClasses?: string;
}

const DropDown: React.FC<DropDownProps> = ({ list, moreTitleClasses = '' }) => {
   const [value, setValue] = useState<string>('none');
   const [active, setActive] = useState<boolean>(false);

   function chooseValue(target: string, callback: () => void) {
      setValue(target);
      setActive(false);
      callback();
   }

   return (
      <div className={styles.dropdown_block}>
         <h3
            className={`${styles.dropdown_block__title} perple-underline ${moreTitleClasses}`}
            onClick={() => setActive((prev) => !prev)}>
            {value}
         </h3>
         <ul
            className={`${styles.dropdown_block__list} ${
               active ? styles.dropdown_block__list_active : ''
            }`}>
            {list.map((item) => {
               return (
                  <li
                     key={item.title}
                     className={styles.dropdown_block__item}
                     onClick={() => chooseValue(item.title, item.func)}>
                     {item.title}
                  </li>
               );
            })}
         </ul>
      </div>
   );
};

export default DropDown;
