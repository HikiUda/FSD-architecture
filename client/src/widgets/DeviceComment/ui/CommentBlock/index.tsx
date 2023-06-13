import { IDeviceComment } from 'widgets/DeviceComment/model/IDeviceComment';
import styles from './style.module.scss';
import Comment from './../Comment';
import { ConfirmModal } from 'entities/ConfirmModal';
import { useState } from 'react';
import { useInput } from 'shared/lib/hooks';
import { InputModal } from 'features/InputModal';

interface CommentBlockProps {
   comments: IDeviceComment[];
   deleteFunc: (target: number) => void;
   updateFunc: (target: number, updateValue: string) => void;
   refElement: (node: HTMLElement) => void;
}

const CommentBlock: React.FC<CommentBlockProps> = ({
   comments,
   updateFunc,
   deleteFunc,
   refElement,
}) => {
   const [showDelete, setShowDelete] = useState<boolean>(false);
   const [showUpdate, setShowUpdate] = useState<boolean>(false);
   const [target, setTarget] = useState<number>(0);

   const { value: updateValue, changeValue: changeUpdateValue } = useInput();

   function deleteComment(decide: boolean) {
      if (decide) {
         deleteFunc(target);
      }
      setTarget(0);
   }
   function updateComment(decide: boolean) {
      if (decide) {
         updateFunc(target, updateValue);
      }
      changeUpdateValue('');
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
            {comments.map((comment, index) => {
               return comments.length === index + 1 ? (
                  <Comment
                     key={comment.id}
                     refElement={refElement}
                     comment={comment}
                     deleteFunc={() => handleDelete(comment.id)}
                     updateFunc={() => handleUpdate(comment)}
                  />
               ) : (
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
         <InputModal
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
