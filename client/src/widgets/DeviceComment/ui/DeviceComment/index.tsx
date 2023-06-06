import styles from './style.module.scss';
import { useCallback, useRef, useState } from 'react';
import { MainInput } from 'shared/ui/MainInput';
import { useInput } from 'shared/lib/hooks';
import { SimpleButton } from 'shared/ui/SimpleButton';
import CommentBlock from '../CommentBlock';
import { ClipLoader } from 'react-spinners';
import useCommetns from 'widgets/DeviceComment/lib/hooks/useComments';

interface DeviceCommentProps {
   deviceId: number;
}

const DeviceComment: React.FC<DeviceCommentProps> = ({ deviceId }) => {
   const [pageNumber, setPageNumber] = useState<number>(1);
   const { value: inputValue, changeValue: setInputValue } = useInput();
   const { comments, loading, error, maxPage, createComment, deleteComment, updateComment } =
      useCommetns(deviceId, pageNumber);
   const observer = useRef<IntersectionObserver | undefined>();
   const lastCommentElementRef = useCallback(
      (node: HTMLElement) => {
         if (loading) return;
         if (observer.current) observer.current.disconnect();
         observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !maxPage) {
               setPageNumber((prevPageNumber) => prevPageNumber + 1);
               observer.current?.unobserve(entries[0].target);
            }
         });
         if (node) observer.current.observe(node);
      },
      [loading, maxPage],
   );

   function handleCreateComment() {
      createComment(inputValue);
      setInputValue('');
   }

   return (
      <>
         <div className={styles.device_comment}>
            <div className={`${styles.device_comment__container} __container`}>
               <h3 className={`${styles.device_comment__big_title} perple-underline`}>
                  Комментарии
               </h3>
               <div className={styles.device_comment__form}>
                  <MainInput
                     value={inputValue}
                     setValue={setInputValue}
                     moreClass={styles.device_comment__input}
                     placeholder="Напишите свой отзыв..."
                  />
                  <SimpleButton onClick={() => handleCreateComment()}>Отправить</SimpleButton>
               </div>
               <CommentBlock
                  refElement={lastCommentElementRef}
                  comments={comments}
                  deleteFunc={deleteComment}
                  updateFunc={updateComment}
               />
               {loading && (
                  <ClipLoader
                     color={'#54fa34'}
                     loading={true}
                     size={150}
                     aria-label="Loading Spinner"
                     data-testid="loader"
                  />
               )}
               {error && (
                  <h3 className={`${styles.device_comment__big_title} perple-underline`}>
                     {error}
                  </h3>
               )}
            </div>
         </div>
      </>
   );
};

export default DeviceComment;
