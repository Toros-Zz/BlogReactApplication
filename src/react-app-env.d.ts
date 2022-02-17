// <reference types=react-scripts />

type Post = {
  id?: number,
  title: string,
  body: string,
};

type CommentPost = {
  id?: number,
  postId: number,
  body: string,
};
