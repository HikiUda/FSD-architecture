import { useRef } from 'react';

export const useDebounce = (callback: () => void, del: number) => {
   const timer = useRef<ReturnType<typeof setTimeout>>();

   return () => {
      if (timer.current) {
         clearTimeout(timer.current);
      }
      timer.current = setTimeout(callback, del);
   };
};
