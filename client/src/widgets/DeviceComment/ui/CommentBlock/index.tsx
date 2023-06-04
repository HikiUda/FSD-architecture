import { IDeviceComment } from 'widgets/DeviceComment/model/IDeviceComment';
import styles from './style.module.scss';
import Comment from './../Comment';
import { ConfirmModal } from 'entities/ConfirmModal';
import { useState } from 'react';
import { fetchDeleteComment } from 'widgets/DeviceComment/api/fetchDeleteComment';
import UpdateCommentModal from '../UpdateCommentModal';
import { useInput } from 'shared/lib/hooks';
import { fetchUpdateComment } from 'widgets/DeviceComment/api/fetchUpdateComment';

interface CommentBlockProps {
   comments: IDeviceComment[];
   setComments: (comment: IDeviceComment[]) => void;
   deviceId: number;
}

const CommentBlock: React.FC<CommentBlockProps> = ({ comments, setComments, deviceId }) => {
   const [showDelete, setShowDelete] = useState<boolean>(false);
   const [showUpdate, setShowUpdate] = useState<boolean>(false);
   const [target, setTarget] = useState<number>(0);

   const { value: updateValue, changeValue: changeUpdateValue } = useInput();

   function deleteComment(decide: boolean) {
      if (decide) {
         fetchDeleteComment(deviceId, target);
         setComments(comments.filter((com) => com.id !== target));
      }
      setTarget(0);
   }
   function updateComment(decide: boolean) {
      if (decide) {
         fetchUpdateComment(deviceId, target, updateValue);
         setComments(
            comments.map((com) =>
               com.id === target ? { ...com, content: (com.content = updateValue) } : com,
            ),
         );
      }
      setTarget(0);
   }

   function handleDelete(commentId: number) {
      setTarget(commentId);
      setShowDelete(true);
   }
   function handleUpdate(comment: IDeviceComment) {
      setTarget(comment.id);
      changeUpdateValue(comment.content);
      setShowUpdate(true);
   }

   return (
      <>
         <div className={styles.device_comment__block}>
            {comments.map((comment) => {
               return (
                  <Comment
                     key={comment.id}
                     comment={comment}
                     deleteFunc={() => handleDelete(comment.id)}
                     updateFunc={() => handleUpdate(comment)}
                  />
               );
            })}
         </div>
         <ConfirmModal
            show={showDelete}
            onHide={() => setShowDelete(false)}
            toDecide={deleteComment}
            title="Вы уверены?"
         />
         <UpdateCommentModal
            value={updateValue}
            setValue={changeUpdateValue}
            toDecide={updateComment}
            show={showUpdate}
            onHide={() => setShowUpdate(false)}
         />
      </>
   );
};

export default CommentBlock;
