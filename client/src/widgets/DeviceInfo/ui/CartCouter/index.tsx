import { DeleteSVG, MinusSVG, PlusSVG } from '../SVGcomp';
import { SVGButton } from 'shared/ui/SVGButton';
import styles from './styles.module.scss';
import { IOneDeviceCart } from 'shared/model/DeviceModel';
import { useState } from 'react';

interface CartCouterProps {
   device: IOneDeviceCart;
   deleteFromCart: () => void;
}

const CartCouter: React.FC<CartCouterProps> = ({ device, deleteFromCart }) => {
   const [value, setValue] = useState<number>(device.forPurches);

   function increment() {
      if (value < device.quantity) {
         setValue((prev) => (prev += 1));
         device.forPurches++;
      }
   }
   function decrement() {
      if (value === 1) {
         deleteFromCart();
         return;
      }
      if (value > 0) {
         setValue((prev) => (prev -= 1));
         device.forPurches--;
      }
   }

   return (
      <div className={styles.cart_block}>
         В корзине
         <SVGButton onClick={increment}>
            <PlusSVG />
         </SVGButton>
         {value}шт.
         <SVGButton onClick={decrement}>
            <MinusSVG />
         </SVGButton>
         <SVGButton onClick={deleteFromCart}>
            <DeleteSVG />
         </SVGButton>
      </div>
   );
};

export default CartCouter;
