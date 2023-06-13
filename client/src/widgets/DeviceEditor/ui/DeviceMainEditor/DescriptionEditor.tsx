import styles from './styles.module.scss';

interface DescriptionEditorProsp {
   description: string;
   setDescription: (value: string) => void;
}

const DescriptionEditor: React.FC<DescriptionEditorProsp> = ({ description, setDescription }) => {
   return (
      <div className={styles.description_block}>
         <h2 className={styles.small_title}>Описание</h2>
         <textarea
            value={description}
            onChange={(e: React.FormEvent<HTMLTextAreaElement>) =>
               setDescription(e.currentTarget.value)
            }
            className={`${styles.description} perple-underline`}></textarea>
      </div>
   );
};

export default DescriptionEditor;
