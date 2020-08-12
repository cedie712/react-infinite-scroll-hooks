import React, {createContext, useReducer} from 'react';
import {postReducer} from '../reducers/posts';

export const PostContext = createContext();

const PostContextProvider = (props) => {
  const [posts, dispatch] = useReducer(postReducer, [])
  return (
    <PostContext.Provider value={{posts, postDispatch: dispatch}}>
      {props.children}
    </PostContext.Provider>
  );
}

export default PostContextProvider;