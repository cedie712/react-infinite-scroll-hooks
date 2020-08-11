import axios from 'axios';

export const getPosts = (offset=0, limit=10) => {
  return axios.get('https://jsonplaceholder.typicode.com/posts',
  {
    params: {
      _start: offset,
      _limit: limit
    }
  })
}

