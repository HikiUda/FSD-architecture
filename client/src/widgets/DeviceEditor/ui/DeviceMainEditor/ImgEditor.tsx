import styles from './styles.module.scss';

interface ImgEditorProps {
   image: File | null;
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
               <img src={URL.createObjectURL(image)} alt="img" />
            </div>
         )}

         <input type="file" onChange={handleChange} />
      </div>
   );
};

export default ImgEditor;
