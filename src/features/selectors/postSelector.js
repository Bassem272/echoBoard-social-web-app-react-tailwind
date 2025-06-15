// memoized process is preferred in case on calculations on the redux store to optimize performance ok 
export const selectPostById = (state, postId) =>
    state.posts.list.find(p => p._id === postId); 