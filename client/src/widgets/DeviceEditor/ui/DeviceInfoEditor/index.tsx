import { SimpleButton } from 'shared/ui/SimpleButton';
import styles from './styles.module.scss';
import { AddSVG } from '../SVGComponent';
import { SVGButton } from 'shared/ui/SVGButton';
import CrossSVG from 'shared/ui/SVGcomp';
import { IDeviceInfo } from 'shared/model/DeviceModel';

interface DeviceInfoEditorProps {
   info: IDeviceInfo[];
   setInfo: (info: IDeviceInfo[]) => void;
}

const DeviceInfoEditor: React.FC<DeviceInfoEditorProps> = ({ info, setInfo }) => {
   function addChar() {
      let newChar = {
         id: Date.now(),
         title: '',
         description: [{ id: Date.now(), description: '', selected: false }],
      };
      setInfo([...info, newChar]);
   }

   function deleteChar(id: number) {
      let newInfo = info.filter((item) => item.id !== id);
      setInfo(newInfo);
   }
   function addCharValue(itemId: number) {
      let newInfo = info.map((item) => {
         if (item.id === itemId) {
            let newDesc = { id: Date.now(), description: '', selected: false };
            return { ...item, description: [...item.description, newDesc] };
         } else {
            return item;
         }
      });
      setInfo(newInfo);
   }
   function deleteCharValue(itemId: number, descriptionId: number) {
      let newInfo = info.map((item) => {
         if (item.id === itemId) {
            let newDescription = item.description.filter((desc) => desc.id !== descriptionId);
            return { ...item, description: newDescription };
         } else {
            return item;
         }
      });
      setInfo(newInfo);
   }

   function changeChar(e: React.FormEvent<HTMLInputElement>, itemId: number) {
      let newInfo = info.map((item) => {
         if (item.id === itemId) {
            return { ...item, title: e.currentTarget.value };
         } else {
            return item;
         }
      });
      setInfo(newInfo);
   }
   function changeCharValue(e: React.FormEvent<HTMLInputElement>, itemId: number, descId: number) {
      let newInfo = info.map((item) => {
         if (item.id === itemId) {
            let newDescription = item.description.map((desc) => {
               if (desc.id === descId) {
                  return { ...desc, description: e.currentTarget.value };
               } else {
                  return desc;
               }
            });
            return { ...item, description: newDescription };
         } else {
            return item;
         }
      });
      setInfo(newInfo);
   }

   return (
      <div className={styles.char}>
         <h2 className={styles.small_title}>Добавить больше информации</h2>
         <SimpleButton onClick={addChar}>Добавить</SimpleButton>
         <div className={styles.char_block}>
            {info.map((item) => {
               return (
                  <div className={styles.char_item} key={item.id}>
                     <input
                        onChange={(e) => changeChar(e, item.id)}
                        value={item.title}
                        className={`${styles.char_title} perple-underline`}
                     />
                     :
                     {item.description.map((desc) => {
                        return (
                           <div className={`${styles.char_value} perple-underline`} key={desc.id}>
                              <input
                                 onChange={(e) => changeCharValue(e, item.id, desc.id)}
                                 className={styles.char_input_value}
                                 value={desc.description}
                              />

                              <SVGButton
                                 onClick={() => deleteCharValue(item.id, desc.id)}
                                 moreClass={styles.char_del_value}>
                                 <CrossSVG />
                              </SVGButton>
                           </div>
                        );
                     })}
                     <SVGButton onClick={() => addCharValue(item.id)}>
                        <AddSVG />
                     </SVGButton>
                     <SimpleButton onClick={() => deleteChar(item.id)}>Удалить</SimpleButton>
                  </div>
               );
            })}
         </div>
      </div>
   );
};

export default DeviceInfoEditor;
