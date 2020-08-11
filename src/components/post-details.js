import React from 'react';

const PostDetails = ({post}) => {
  return (
    <li>
      <div className="post-title">
      <h2>{post.id}. {post.title}</h2>
      </div>
      <div className="post-body">
        <p>{post.body}</p>
      </div>
    </li>
  );
}

export default PostDetails;