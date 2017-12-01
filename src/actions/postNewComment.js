import axios from 'axios';
import * as types from './types';

const API_URL = 'http://localhost:3001/api';

export const postNewCommentRequest = (article_id, comment) => ({
  type: types.POST_NEW_COMMENT_REQUEST,
  payload: {article_id,
    comment}
});
  
export const postNewCommentSuccess = (data) => ({
  type: types.POST_NEW_COMMENT_SUCCESS,
  payload: data
});
  
export const postNewCommentFailure = (error) => ({
  type: types.POST_NEW_COMMENT_FAILURE,
  payload: error
});

export default (article_id, comment) => {
  return (dispatch) => {
    dispatch(postNewCommentRequest(article_id, comment));
    return axios.post(`${API_URL}/articles/${article_id}/comments`, {comment:comment})
      .then(res => {
        return dispatch(postNewCommentSuccess([res.data.comment]));
      })
      .catch(error => {
        return dispatch(postNewCommentFailure(error.message));
      });
  };
};