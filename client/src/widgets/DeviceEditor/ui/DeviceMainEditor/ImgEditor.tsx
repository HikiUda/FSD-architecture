import { BASE_URL } from 'shared/api';
import styles from './styles.module.scss';

interface ImgEditorProps {
   image: File | null | string;
   setImage: (img: File) => void;
}

const ImgEditor: React.FC<ImgEditorProps> = ({ image, setImage }) => {
   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (e.target.files) {
         setImage(e.target.files[0]);
      }
   }

   return (
      <div className={styles.block}>
         {image && (
            <div className={styles.image_block}>
               {image instanceof File ? (
                  <img src={URL.createObjectURL(image)} alt="img" />
               ) : (
                  <img src={`${BASE_URL}/${image}`} alt="img" />
               )}
            </div>
         )}

         <input type="file" onChange={handleChange} />
      </div>
   );
};

export default ImgEditor;
