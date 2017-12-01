import axios from 'axios';
import * as types from './types';

const API_URL = 'http://localhost:3001/api';

export const deleteCommentRequest = (comment_id) => ({
  type: types.DELETE_COMMENT_REQUEST,
  payload: comment_id
});

export const deleteCommentSuccess = (data) => ({
  type: types.DELETE_COMMENT_SUCCESS,
  payload: data
});

export const deleteCommentFailure = (error) => ({
  type: types.DELETE_COMMENT_FAILURE,
  payload: error
});

export default (comment_id) => {
  return (dispatch) => {
    dispatch(deleteCommentRequest(comment_id));
    return axios.delete(`${API_URL}/comments/${comment_id}`)
      .then(res => {
        return dispatch(deleteCommentSuccess(res.data));
      })
      .catch(error => {
        return dispatch(deleteCommentFailure(error.message));
      });
  };
};