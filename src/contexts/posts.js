import React, {createContext, useEffect, useReducer} from 'react';
import {http} from '../utils/helpers';
import {getPosts} from '../services/posts';
import {postReducer, postActions} from '../reducers/posts';

export const PostContext = createContext();

const PostContextProvider = (props) => {
  const [posts, dispatch] = useReducer(postReducer, [])
  const setPosts = async (offset=0, limit=10) => {
    const payload = await http(getPosts(offset, limit))
    dispatch({
      type: postActions.SET_POSTS,
      payload
    })
    return payload;
  }
  useEffect(() => {
    setPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <PostContext.Provider value={{posts, setPosts}}>
      {props.children}
    </PostContext.Provider>
  );
}

export default PostContextProvider;