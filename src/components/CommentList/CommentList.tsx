import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments, removeComment } from '../../api/comments';
import { setCommentsList } from '../../store/actions';
import { getActivePostId, getCommentsList } from '../../store/selectors';
import './CommentList.scss';

export const CommentList: React.FC = () => {
  const dispatch = useDispatch();
  const activePostId = useSelector(getActivePostId);
  const comments = useSelector(getCommentsList);

  const loadComments = async (id: number) => {
    const commentsFromServer = await getComments(id);

    dispatch(setCommentsList(commentsFromServer));
  };

  const handlerDeleteComment = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;

    await removeComment(+value);
    loadComments(activePostId);
  };

  return (
    <ul className="CommentList">
      {
        comments.map(comment => (
          <li
            className="CommentList__item"
            key={comment.id}
          >
            <button
              type="button"
              className="CommentList__button button"
              value={comment.id}
              onClick={handlerDeleteComment}
            >
              X
            </button>
            <p>
              {comment.body}
            </p>
          </li>
        ))
      }
    </ul>
  );
};
