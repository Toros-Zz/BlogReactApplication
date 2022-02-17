export const SET_ALL_POSTS = 'SET_ALL_POSTS';
export const SET_ACTIVE_POST_ID = 'SET_ACTIVE_POST_ID';
export const SET_COMMENTS = 'SET_COMMENTS';
export const SET_MODEL_EDIT = 'SET_MODEL_EDIT';

export const setAllPosts = (payloud: Post[]) => ({ type: SET_ALL_POSTS, payloud });
export const setActivePostId = (payloud: number) => ({ type: SET_ACTIVE_POST_ID, payloud });
export const setCommentsList = (payloud: CommentPost[]) => ({ type: SET_COMMENTS, payloud });
export const setEditModel = (payloud: boolean) => ({ type: SET_MODEL_EDIT, payloud });
