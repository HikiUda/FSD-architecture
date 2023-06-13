import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { IBrandType } from 'shared/model/BrandTypeModel';
import { MainInput } from 'shared/ui/MainInput';

interface DropDownProps {
   list: IBrandType[];
   callback: (id: number) => void;
   searchValue: string;
   setSearchValue: (e: React.FormEvent<HTMLInputElement> | string) => void;
   placeholder?: string;
}

const DropDown: React.FC<DropDownProps> = ({
   list,
   callback,
   searchValue,
   setSearchValue,
   placeholder,
}) => {
   const [active, setActive] = useState<boolean>(false);

   function chooseValue(item: IBrandType) {
      setSearchValue(item.name);
      setActive(false);
      callback(item.id);
   }

   function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
      setTimeout(() => setActive(false), 200);
   }

   useEffect(() => {
      if (!searchValue) {
         callback(0);
      }
   }, [searchValue]);

   return (
      <div className={styles.dropdown_block}>
         <MainInput
            placeholder={placeholder}
            onFocus={() => setActive(true)}
            onBlur={handleBlur}
            value={searchValue}
            setValue={setSearchValue}
         />
         <ul
            className={`${styles.dropdown_block__list} ${
               active ? styles.dropdown_block__list_active : ''
            }`}>
            {list.map((item) => {
               return (
                  <li
                     key={item.id}
                     className={styles.dropdown_block__item}
                     onClick={() => chooseValue(item)}>
                     {item.name}
                  </li>
               );
            })}
         </ul>
      </div>
   );
};

export default DropDown;
