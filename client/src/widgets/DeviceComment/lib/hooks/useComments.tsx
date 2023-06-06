import axios from 'axios';
import { useEffect, useState } from 'react';
import { TempErrorText } from 'shared/lib/helpers/textTemplates';
import { fetchCreateComment } from 'widgets/DeviceComment/api/fetchCreateComment';
import { fetchDeleteComment } from 'widgets/DeviceComment/api/fetchDeleteComment';
import { fetchDeviceComment } from 'widgets/DeviceComment/api/fetchDeviceComment';
import { fetchUpdateComment } from 'widgets/DeviceComment/api/fetchUpdateComment';
import { IDeviceComment } from 'widgets/DeviceComment/model/IDeviceComment';

const useCommetns = (deviceId: number, pageNumber: number) => {
   const limit = 6;
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string>('');
   const [maxPage, setMaxPage] = useState<boolean>(false);
   const [comments, setComments] = useState<IDeviceComment[]>([]);

   function createComment(inputValue: string) {
      if (inputValue) {
         fetchCreateComment(deviceId, inputValue)
            .then((data) => {
               if (data) {
                  setComments([data, ...comments]);
               }
            })
            .catch((e) => {
               setError(e?.message || TempErrorText);
            });
      }
   }

   function deleteComment(target: number) {
      fetchDeleteComment(deviceId, target).catch((e) => {
         setError(e?.message || TempErrorText);
      });
      setComments(comments.filter((com) => com.id !== target));
   }
   function updateComment(target: number, updateValue: string) {
      fetchUpdateComment(deviceId, target, updateValue).catch((e) => {
         setError(e?.message || TempErrorText);
      });
      setComments(
         comments.map((com) =>
            com.id === target ? { ...com, content: (com.content = updateValue) } : com,
         ),
      );
   }

   useEffect(() => {
      const cansel = new AbortController();
      setLoading(true);
      setError('');
      if (!maxPage) {
         fetchDeviceComment(deviceId, limit, pageNumber, cansel.signal)
            .then((data) => {
               setComments((prevComments) => [...prevComments, ...data.comments]);
               if (data.count < limit * pageNumber) {
                  setMaxPage(true);
               }

               setLoading(false);
            })
            .catch((e) => {
               setLoading(false);
               if (axios.isCancel(e)) return;
               setError(e?.message || TempErrorText);
            });
      }

      return () => cansel.abort();
   }, [pageNumber]);

   return { loading, error, maxPage, comments, createComment, deleteComment, updateComment };
};

export default useCommetns;
