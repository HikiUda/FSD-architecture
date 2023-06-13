import React from 'react';
import './style.scss';

interface MainInputProps {
   placeholder?: string;
   type?: string;
   value: string;
   setValue: (e: React.FormEvent<HTMLInputElement>) => void;
   moreClass?: string;
   onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
   onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
   onMouseDown?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

export const MainInput: React.FC<MainInputProps> = ({
   placeholder = '',
   type = '',
   value,
   setValue,
   moreClass = '',
   onBlur,
   onFocus,
   onMouseDown,
}) => {
   return (
      <input
         autoComplete="on"
         placeholder={placeholder}
         type={type}
         value={value}
         onChange={setValue}
         onBlur={onBlur}
         onFocus={onFocus}
         onMouseDown={onMouseDown}
         className={`perple-underline main-input ${moreClass}`}
      />
   );
};
