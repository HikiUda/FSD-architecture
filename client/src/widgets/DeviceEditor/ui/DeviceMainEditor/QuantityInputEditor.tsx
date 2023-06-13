import { MainInput } from 'shared/ui/MainInput';

interface QuantityInputEditorProps {
   value: string;
   setValue: (e: React.FormEvent<HTMLInputElement> | string) => void;
}

const QuantityInputEditor: React.FC<QuantityInputEditorProps> = ({ value, setValue }) => {
   function changePrice(e: React.FormEvent<HTMLInputElement>) {
      let newPrice = e.currentTarget.value;
      if (newPrice === '') {
         setValue('0');
         return;
      }
      if (!!Number(newPrice)) {
         setValue(String(Number(newPrice)));
      }
   }

   function focus() {
      let newPrice = value.match(/\d*/)?.toString();
      if (newPrice) {
         setValue(newPrice);
      }
   }
   function blur() {
      setValue(value + ' шт.');
   }

   return (
      <MainInput
         value={value}
         onBlur={blur}
         onFocus={focus}
         setValue={changePrice}
         placeholder="Количество"
      />
   );
};

export default QuantityInputEditor;
