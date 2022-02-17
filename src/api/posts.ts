import {
  addData,
  editData,
  getData,
  removeData,
} from './api';

export function getPosts(): Promise<Post[]> {
  return getData<Post[]>('/posts');
}

export function getSelectedPostById(postId: number): Promise<Post> {
  return getData<Post>(`/posts/${postId}`);
}

export function addPost(data: Post): Promise<Post> {
  return addData<Post>('/posts', data);
}

export function editPost(data: Post, id: number): Promise<Post> {
  return editData<Post>(`/posts/${id}`, data);
}

export function removePost(id: number): Promise<Post> {
  return removeData<Post>(`/posts/${id}`);
}
