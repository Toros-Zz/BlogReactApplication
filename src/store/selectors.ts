import { RootState } from '.';

export const getAllPosts = (state: RootState) => state.posts;
export const getActivePostId = (state: RootState) => state.activePostId;
export const getCommentsList = (state: RootState) => state.comments;
export const hasEditModal = (state: RootState) => state.isEditModel;
