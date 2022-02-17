import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { getPosts } from '../../api/posts';
import {
  setActivePostId,
  setAllPosts,
  setEditModel,
  setRemoveModal,
} from '../../store/actions';
import {
  getActivePostId,
  getAllPosts,
  hasEditModal,
  hasRemoveModal,
} from '../../store/selectors';
import { Loader } from '../Loader';
import { ModalEdit } from '../ModalEdit';
import './PostsList.scss';
import { ModalRemove } from '../ModalRemove';

export const PostsList: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector(getAllPosts);
  const isEditModal = useSelector(hasEditModal);
  const isRemoveModal = useSelector(hasRemoveModal);
  const activePostId = useSelector(getActivePostId);
  const [isLoader, setLoader] = useState(false);

  const loadPosts = async () => {
    const postsFromServer = await getPosts();

    dispatch(setAllPosts(postsFromServer));
  };

  const loadAllData = async () => {
    setLoader(true);
    await loadPosts();
    setLoader(false);
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handlerOpenDetails = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;

    if (activePostId === +value) {
      dispatch(setActivePostId(0));
    } else {
      dispatch(setActivePostId(+value));
    }
  };

  const handlerEditPost = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setActivePostId(+event.currentTarget.value));
    dispatch(setEditModel(true));
  };

  const handlerRemovePost = async (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setActivePostId(+event.currentTarget.value));
    dispatch(setRemoveModal(true));
  };

  if (isLoader) {
    return (
      <Loader />
    );
  }

  return (
    <div className="PostsList">
      <h2 className="subtitle PostsList__subtitle">
        Posts:
      </h2>
      <ul className="PostsList__list">
        {posts.map(post => (
          <li key={post.id} className="PostsList__item">
            <section className="PostsList__post">
              <h3 className="subtitle">
                {post.title}
              </h3>
              <div className="PostsList__body">
                {post.body}
              </div>
            </section>
            <button
              type="button"
              className={classNames(
                'button PostsList__button-open',
                { 'is-active': activePostId === post.id },
              )}
              value={post.id}
              onClick={handlerOpenDetails}
            >
              {
                activePostId === post.id
                  ? <>Close</>
                  : <>Open</>
              }
            </button>
            <div className="PostsList__buttons">
              <button
                type="button"
                className="button"
                value={post.id}
                onClick={handlerEditPost}
              >
                Edit
              </button>
              <button
                type="button"
                className="button"
                value={post.id}
                onClick={handlerRemovePost}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {
        isEditModal && <ModalEdit />
      }
      {
        isRemoveModal && <ModalRemove />
      }
    </div>
  );
};
