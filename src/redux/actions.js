export function getPosts() {
  return async (dispatch, getState, api) => {
    try {
      const posts = await api.getPosts();

      dispatch({
        type: 'SAVE_POSTS',
        payload: posts,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
