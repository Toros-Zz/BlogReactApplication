import React from 'react';
import './App.scss';
import { NavLink, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { AddPost } from './components/AddPost';
import { getActivePostId } from './store/selectors';

export const App: React.FC = () => {
  const activePostId = useSelector(getActivePostId);

  return (
    <div className="App">
      <header className="App__header">
        <h1 className="title App__title">
          React/Redux Blog
        </h1>
        <NavLink
          to="/"
          className="button App__button"
        >
          Posts
        </NavLink>
        <NavLink
          to="/addpost"
          className="button App__button"
        >
          Add post
        </NavLink>
      </header>
      <main className="App__main">
        <Routes>
          <Route
            path="/addpost"
            element={(
              <>
                <div className="App__content">
                  <AddPost />
                </div>
              </>
            )}
          />
          <Route
            path="/"
            element={(
              <>
                <div className="App__sidebar">
                  <PostsList />
                </div>

                <div className="App__content">
                  {
                    activePostId
                      ? <PostDetails />
                      : (
                        <h3 className="subtitle">
                          Select post
                        </h3>
                      )
                  }
                </div>
              </>
            )}
          />
        </Routes>
      </main>
    </div>
  );
};
