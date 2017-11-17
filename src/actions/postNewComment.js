import axios from 'axios';
import * as types from './types';

// const API_URL = 'https://northcoders-news-api.herokuapp.com/api';
const API_URL = 'http://localhost:3001/api';

export const postNewCommentRequest = (comment, id) => ({
  type: types.POST_NEW_COMMENT_REQUEST,
  payload: { comment,
            id}
});
  
export const postNewCommentSuccess = (data) => ({
  type: types.POST_NEW_COMMENT_SUCCESS,
  payload: data
});
  
export const postNewCommentFailure = (error) => ({
  type: types.POST_NEW_COMMENT_FAILURE,
  payload: error
});

export default (comment, id) => {
  return (dispatch) => {
    dispatch(postNewCommentRequest(comment, id));
    return axios.post(`${API_URL}/articles/${id}/comments`, {comment:comment})
      .then(res => {
        return dispatch(postNewCommentSuccess(res.data.comments));
      })
      .catch(error => {
        return dispatch(postNewCommentFailure(error.message));
      });
  };
};