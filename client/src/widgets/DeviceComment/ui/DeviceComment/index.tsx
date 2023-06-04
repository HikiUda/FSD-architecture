import { IDeviceComment } from 'widgets/DeviceComment/model/IDeviceComment';
import styles from './style.module.scss';
import { fetchDeviceComment } from 'widgets/DeviceComment/api/fetchDeviceComment';
import { useEffect, useState } from 'react';
import { MainInput } from 'shared/ui/MainInput';
import { useInput } from 'shared/lib/hooks';
import { fetchCreateComment } from 'widgets/DeviceComment/api/fetchCreateComment';
import { SimpleButton } from 'shared/ui/SimpleButton';
import CommentBlock from '../CommentBlock';
import { ClipLoader } from 'react-spinners';

interface DeviceCommentProps {
   deviceId: number;
}

const DeviceComment: React.FC<DeviceCommentProps> = ({ deviceId }) => {
   const [comments, setComments] = useState<IDeviceComment[]>([]);
   const { value: inputValue, changeValue: setInputValue } = useInput();
   const [infoRequest, setInfoRequest] = useState<{ limit: number; portion: number }>({
      limit: 5,
      portion: 1,
   });

   const getSomeComments = () => {
      fetchDeviceComment(deviceId, infoRequest.limit, infoRequest.portion).then((data) => {
         if (data) {
            setComments((prev) => [...prev, ...data.comments]);
            setInfoRequest({ ...infoRequest, portion: infoRequest.portion + 1 });
         }
      });
   };

   useEffect(() => {
      getSomeComments();
   }, []);

   function createComment() {
      if (inputValue) {
         fetchCreateComment(deviceId, inputValue).then((data) => {
            if (comments && data) {
               setComments([data, ...comments]);
            }
            setInputValue('');
         });
      }
   }

   if (!comments.length) {
      return (
         <div className={styles.device_comment}>
            <div className={`${styles.device_comment__container} __container`}>
               <ClipLoader
                  color={'#54fa34'}
                  loading={true}
                  size={150}
                  aria-label="Loading Spinner"
                  data-testid="loader"
               />
            </div>
         </div>
      );
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
                  <SimpleButton onClick={() => createComment()}>Отправить</SimpleButton>
               </div>
               <CommentBlock deviceId={deviceId} setComments={setComments} comments={comments} />
            </div>
         </div>
      </>
   );
};

export default DeviceComment;
