import React, { useState } from 'react';
import { addPost } from '../../api/posts';
import './AddPost.scss';

export const AddPost: React.FC = () => {
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const resetFields = () => {
    setPostTitle('');
    setPostBody('');
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

  const pushPost = async () => {
    const post = {
      title: postTitle,
      body: postBody,
    };

    if (isValid()) {
      await addPost(post);
      resetFields();
    }
  };

  const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    pushPost();
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

  return (
    <form
      className="AddPost__form"
      onSubmit={handlerSubmit}
    >
      <label htmlFor="title">
        Title:
        &nbsp;
        <input
          className="input AddPost__input"
          type="text"
          id="title"
          name="title"
          required
          value={postTitle}
          placeholder="Type title here"
          onChange={handlerInput}
        />
      </label>
      <label htmlFor="body">
        Body:
        &nbsp;
        <textarea
          className="textarea AddPost__textarea"
          required
          id="body"
          name="body"
          value={postBody}
          placeholder="Type body here"
          onChange={handlerInput}
        />
      </label>
      <button
        type="submit"
        className="button AddPost__button"
      >
        Add post
      </button>
    </form>
  );
};
