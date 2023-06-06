import { IDeviceComment } from 'widgets/DeviceComment/model/IDeviceComment';
import styles from './style.module.scss';
import { DeleteSVG, PencilSVG } from '../SVGcomp';
import { SVGButton } from 'shared/ui/SVGButton';
import { useAppSelector } from 'shared/lib/hooks';

interface CommentPorps {
   comment: IDeviceComment;
   updateFunc: (comment: IDeviceComment) => void;
   deleteFunc: (comment: IDeviceComment) => void;
   refElement?: (node: HTMLDivElement) => void;
}

const Comment: React.FC<CommentPorps> = ({ comment, deleteFunc, updateFunc, refElement }) => {
   const { user } = useAppSelector((state) => state.user);
   return (
      <div ref={refElement} className={styles.comment__card}>
         <div className={styles.comment__row}>
            <h5 className={styles.comment__user_name}>{comment.userName}</h5>
            {user.id === comment.userId ? (
               <div className={styles.comment__row}>
                  <SVGButton onClick={() => updateFunc(comment)}>
                     <PencilSVG />
                  </SVGButton>
                  <SVGButton onClick={() => deleteFunc(comment)}>
                     <DeleteSVG />
                  </SVGButton>
               </div>
            ) : null}
         </div>

         <div className={styles.comment__content}>{comment.content}</div>
      </div>
   );
};

export default Comment;
