import React from 'react';
import './ModalRemove.scss';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePostId, setAllPosts, setRemoveModal } from '../../store/actions';
import { getActivePostId, hasRemoveModal } from '../../store/selectors';
import { getPosts, removePost } from '../../api/posts';

export const ModalRemove: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(hasRemoveModal);
  const activePostId = useSelector(getActivePostId);

  const loadPosts = async () => {
    const postsFromServer = await getPosts();

    dispatch(setActivePostId(0));
    dispatch(setAllPosts(postsFromServer));
  };

  const handlerCloseModal = () => {
    dispatch(setRemoveModal(false));
  };

  const handlerDeleteModal = async () => {
    await removePost(activePostId);
    loadPosts();
    dispatch(setRemoveModal(false));
    dispatch(setActivePostId(0));
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
          Are you sure?
        </h2>
        <section className="Modal__buttons">
          <button
            type="button"
            className="button"
            onClick={handlerDeleteModal}
          >
            Delete
          </button>
          <button
            type="button"
            className="button"
            onClick={handlerCloseModal}
          >
            Close
          </button>
        </section>
      </Modal>
    </div>
  );
};
