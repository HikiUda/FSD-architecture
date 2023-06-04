import React, { useCallback, useState } from 'react';

export const useInput = (initialValue = '') => {
   const [value, setValue] = useState<string>(initialValue);
   const changeValue = useCallback((e: React.FormEvent<HTMLInputElement> | string) => {
      if (typeof e === 'string') {
         setValue(e);
      } else {
         setValue(e.currentTarget.value);
      }
   }, []);
   return { value, changeValue };
};
