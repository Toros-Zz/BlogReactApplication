import { createStore, AnyAction } from 'redux';
import {
  SET_ACTIVE_POST_ID,
  SET_ALL_POSTS,
  SET_COMMENTS,
  SET_MODEL_EDIT,
  SET_MODEL_REMOVE,
} from './actions';

export type RootState = {
  posts: Post[];
  activePostId: number,
  comments: CommentPost[];
  isEditModel: boolean;
  isRemoveModel: boolean;
};

export const initialState: RootState = {
  posts: [],
  activePostId: 0,
  comments: [],
  isEditModel: false,
  isRemoveModel: false,
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_MODEL_EDIT:
      return { ...state, isEditModel: action.payloud };

    case SET_MODEL_REMOVE:
      return { ...state, isRemoveModel: action.payloud };

    case SET_COMMENTS:
      return { ...state, comments: action.payloud };

    case SET_ALL_POSTS:
      return { ...state, posts: action.payloud };

    case SET_ACTIVE_POST_ID:
      return { ...state, activePostId: action.payloud };

    default:
      return state;
  }
};

export const store = createStore(
  rootReducer,
);
