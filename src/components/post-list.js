import React, {useContext, useEffect, useState} from 'react';
import {PostContext} from '../contexts/posts';
import PostDetails from './post-details';
import Loader from './loader';
import InfiniteScroll from '../utils/infinite-scroll';
import { postActions } from '../reducers/posts';
import { http } from '../utils/helpers';
import { getPosts } from '../services/posts';

const PostList = () => {
  const {posts, postDispatch} = useContext(PostContext);
  const [loadMore, setLoadMore] = useState(false);

  const [offset, wrapper, loader] = InfiniteScroll({
    list: posts,
    chunks: 10,
    bottomTriggerDistance: 0,
    threshold: 0.5,
    loadMore,
  })

  useEffect(() => {
    const setPosts = async () => {
      const payload = await http(getPosts(offset, 10))
      if (payload.length !== 0) {
        setLoadMore(true);
      }
      else {
        setLoadMore(false)
      }
      postDispatch({
        type: postActions.SET_POSTS,
        payload
      })
    }
    setPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset])

  return (
    <div className="post-list" id="list-wrapper" ref={wrapper}>
      <ul id="list-content">
        {posts.length ? 
          posts.map(post => <PostDetails key={post.id} post={post} />)
         : ''}
      </ul>
      {loadMore ? <Loader loader={loader} /> : '' }
    </div>
  );
}

export default PostList