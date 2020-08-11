export const postActions = {
  SET_POSTS: 'SET_POSTS'
}

export const postReducer = (state, action) => {
  switch(action.type) {
    case postActions.SET_POSTS:
      return state.concat(action.payload);
    default:
      return state;
  }
}