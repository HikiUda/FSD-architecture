import { useEffect } from 'react';

interface UseScrollProps {
   callback: () => void;
   parentNode: HTMLElement | null;
   childNode: HTMLElement | null;
}

export const useScroll = ({ callback, parentNode, childNode }: UseScrollProps) => {
   useEffect(() => {
      if (parentNode && childNode) {
         let options = {
            root: parentNode,
            rootMargin: '0px',
            threshold: 0,
         };

         const observer = new IntersectionObserver((entries) => {
            const lastChild = entries[0];
            if (!lastChild.isIntersecting) return;
            callback();
            observer.unobserve(lastChild.target);
            console.log('all-------------------------------------');
         }, options);
         observer.observe(childNode);
      }
      console.log(childNode);
      return () => {
         ///observer.unobserve(childNode);
      };
   }, [childNode, callback, parentNode]);
};
