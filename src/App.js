import React from 'react';
import PostContextProvider from './contexts/posts';
import PostList from './components/post-list';

function App() {
  return (
    <div className="App">
      <PostContextProvider>
          <PostList />
      </PostContextProvider>
    </div>
  );
}

export default App;
