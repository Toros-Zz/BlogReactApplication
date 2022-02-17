import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getComments } from '../../api/comments';
import { setCommentsList } from '../../store/actions';
import { getActivePostId } from '../../store/selectors';
import './NewCommentForm.scss';

export const NewCommentForm: React.FC = () => {
  const dispatch = useDispatch();
  const activePostId = useSelector(getActivePostId);

  const [commentBody, setCommentBody] = useState('');

  const loadComments = async (id: number) => {
    const commentsFromServer = await getComments(id);

    dispatch(setCommentsList(commentsFromServer));
  };

  const hendlerInputs = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentBody(event.currentTarget.value);
  };

  const resetFields = () => {
    setCommentBody('');
  };

  const isValid = () => {
    if (!commentBody.trim()) {
      setCommentBody(commentBody.trim());

      return false;
    }

    return true;
  };

  const pushNewComment = async () => {
    await addComment({
      postId: activePostId,
      body: commentBody,
    });

    if (isValid()) {
      resetFields();
      loadComments(activePostId);
    }
  };

  const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    pushNewComment();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handlerSubmit}
    >
      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="textarea"
          value={commentBody}
          onChange={hendlerInputs}
          required
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__button button"
      >
        Add a comment
      </button>
    </form>
  );
};
