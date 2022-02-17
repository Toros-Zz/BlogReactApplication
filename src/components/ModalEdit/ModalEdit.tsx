import React, { useEffect, useState } from 'react';
import './ModalEdit.scss';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePostId, setAllPosts, setEditModel } from '../../store/actions';
import { getActivePostId, hasEditModal } from '../../store/selectors';
import { editPost, getPosts, getSelectedPostById } from '../../api/posts';

export const ModalEdit: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(hasEditModal);
  const activePostId = useSelector(getActivePostId);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const getPost = async () => {
    const post = await getSelectedPostById(activePostId);

    setPostTitle(post.title);
    setPostBody(post.body);
  };

  const loadPosts = async () => {
    const postsFromServer = await getPosts();

    dispatch(setActivePostId(0));
    dispatch(setAllPosts(postsFromServer));
  };

  useEffect(() => {
    getPost();
  }, []);

  const savePost = async () => {
    const post = {
      id: activePostId,
      title: postTitle,
      body: postBody,
    };

    await editPost(post, activePostId);
    loadPosts();
  };

  const isValid = () => {
    if (!postBody.trim()) {
      setPostBody(postBody.trim());

      return false;
    }

    if (!postTitle.trim()) {
      setPostTitle(postTitle.trim());

      return false;
    }

    return true;
  };

  const handlerCloseModal = () => {
    dispatch(setEditModel(false));
  };

  const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isValid()) {
      savePost();
      dispatch(setEditModel(false));
    }
  };

  const handlerInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = event.currentTarget;

    switch (name) {
      case 'body':
        setPostBody(value);
        break;
      case 'title':
        setPostTitle(value);
        break;
      default:
    }
  };

  Modal.setAppElement('#root');

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={handlerCloseModal}
        className="Modal"
      >
        <h2 className="subtitle Modal__title">
          Edit product
        </h2>

        <form
          className="Modal__form"
          onSubmit={handlerSubmit}
        >
          <label htmlFor="title">
            Title:
            &nbsp;
            <input
              className="input"
              type="text"
              required
              placeholder="Title"
              name="title"
              id="title"
              value={postTitle}
              onChange={handlerInput}
            />
          </label>
          <label htmlFor="body">
            Body:
            &nbsp;
            <textarea
              className="textarea Modal__textarea"
              required
              placeholder="Body"
              name="body"
              id="body"
              value={postBody}
              onChange={handlerInput}
            />
          </label>
          <section className="Modal__buttons">
            <button
              type="submit"
              className="button"
            >
              Save
            </button>
            <button
              type="button"
              className="button"
              onClick={handlerCloseModal}
            >
              Close
            </button>
          </section>
        </form>
      </Modal>
    </div>
  );
};
