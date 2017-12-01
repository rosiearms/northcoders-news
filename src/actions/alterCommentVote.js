import axios from 'axios';
import * as types from './types';

const API_URL = 'http://localhost:3001/api';

export const alterCommentVoteRequest = (id, vote) => ({
  type: types.ALTER_COMMENT_VOTE_REQUEST,
  payload: {id,
    vote}
});

export const alterCommentVoteSuccess = (data) => ({
  type: types.ALTER_COMMENT_VOTE_SUCCESS,
  payload: data
});

export const alterCommentVoteFailure = (error) => ({
  type: types.ALTER_COMMENT_VOTE_FAILURE,
  payload: error
});

export default (id, vote) => {
  return (dispatch) => {
    dispatch(alterCommentVoteRequest(id, vote));
    return axios.put(`${API_URL}/comments/${id}?vote=${vote}`)
      .then(res => {
        return dispatch(alterCommentVoteSuccess(res.data));
      })
      .catch(error => {
        return dispatch(alterCommentVoteFailure(error.message));
      });
  };
};