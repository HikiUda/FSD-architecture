import React from 'react';
import './style.scss';

interface MainInputProps {
   placeholder?: string;
   type?: string;
   value: string;
   setValue: (e: React.FormEvent<HTMLInputElement>) => void;
   moreClass?: string;
}

export const MainInput: React.FC<MainInputProps> = ({
   placeholder = '',
   type = '',
   value,
   setValue,
   moreClass = '',
}) => {
   return (
      <input
         autoComplete="on"
         placeholder={placeholder}
         type={type}
         value={value}
         onChange={setValue}
         className={`perple-underline main-input ${moreClass}`}
      />
   );
};
