import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from '../../api/comments';
import { getSelectedPostById } from '../../api/posts';
import { setCommentsList } from '../../store/actions';
import { getActivePostId, getCommentsList } from '../../store/selectors';
import { CommentList } from '../CommentList';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails: React.FC = () => {
  const dispatch = useDispatch();
  const activePostId = useSelector(getActivePostId);
  const comments = useSelector(getCommentsList);

  const [isHideComment, setHideComment] = useState(true);
  const [post, setPost] = useState<Post | null>(null);
  const [isLoader, setLoader] = useState(false);

  const loadComments = async (id: number) => {
    const commentsFromServer = await getComments(id);

    dispatch(setCommentsList(commentsFromServer));
  };

  const loadPostDetails = async (id: number) => {
    setLoader(true);
    const postFromServer = await getSelectedPostById(id);

    loadComments(activePostId);
    setPost(postFromServer);
    setLoader(false);
  };

  useEffect(() => {
    if (activePostId) {
      loadPostDetails(activePostId);
    }
  },
  [activePostId]);

  const handlerHideComment = () => {
    setHideComment((isHide) => (!isHide));
  };

  if (isLoader) {
    return (
      <Loader />
    );
  }

  return (
    <div className="PostDetails">
      <h2 className="subtitle PostDetails__subtitle">
        Post details:
      </h2>
      {
        post
          ? (
            <>
              <section className="PostDetails__post">
                <h3 className="subtitle PostDetails__post-title">
                  {post.title}
                </h3>
                <div className="PostDetails__post-body">
                  {post.body}
                </div>
              </section>

              {
                !!comments.length
                && (
                  <section className="PostDetails__comments">
                    <button
                      type="button"
                      className="button PostDetails__hide"
                      onClick={handlerHideComment}
                    >
                      {
                        isHideComment
                          ? (<>Hide </>)
                          : (<>Show </>)
                      }
                      {comments.length}
                      <> comments</>
                    </button>
                    {
                      isHideComment
                      && <CommentList />
                    }
                  </section>
                )
              }

              <section>
                <div className="PostDetails__form">
                  <NewCommentForm />
                </div>
              </section>
            </>
          )
          : (
            <span>
              Can not find post details
            </span>
          )
      }
    </div>
  );
};
