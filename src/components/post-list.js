import React, {useContext, useEffect, useState} from 'react';
import {PostContext} from '../contexts/posts';
import PostDetails from './post-details';
import Loader from './loader';

const PostList = () => {
  const {posts, setPosts} = useContext(PostContext);
  const [page, setPage] = useState({offset: 0, limit:10, isFetching: false})
  let returnCount = posts.length
  let offset = page.offset
  const fetchMore = () => {
    const postListWrapper = document
    console.log(scrollTop)
    console.log(document.body.offsetHeight)
    if ((window.scrollTop + window.offsetHeight) >= document.body.offsetHeight) {
      if (!page.isFetching) {
        offset += 10
        setPage({offset: offset, isFetching: true})
        setPosts(offset, 10)
        .then((payload) => {
          console.log('here')
          returnCount = payload.length
          setPage({isFetching: false})
        })
      }
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', fetchMore)
    // componentWillUnmount like thingy
    return () => {
      window.removeEventListener('scroll', fetchMore, false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="post-list" id="post-list">
      {posts.length ? (
        <ul>
          {posts.map(post => <PostDetails key={post.id} post={post} />)}
        </ul>
      ) : ''}
      {/* {page.isFetching && returnCount !== 0 ? <Loader /> : ''} */}
      {page.isFetching && returnCount !== 0 ? <Loader /> : ''}
    </div>
  );
}

export default PostList