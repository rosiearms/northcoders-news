import axios from 'axios';
import * as types from './types';

const API_URL = 'https://northcoders-news-api.herokuapp.com/api';

export const alterArticleVoteRequest = (id, vote) => ({
  type: types.ALTER_ARTICLE_VOTE_REQUEST,
  payload: {id,
  vote}
});

export const alterArticleVoteSuccess = (data) => ({
  type: types.ALTER_ARTICLE_VOTE_SUCCESS,
  payload: data
});

export const alterArticleVoteFailure = (error) => ({
  type: types.ALTER_ARTICLE_VOTE_FAILURE,
  payload: error
});

export default (id, vote) => {
  return (dispatch) => {
    dispatch(alterArticleVoteRequest(id, vote));
    return axios.put(`${API_URL}/articles/${id}?vote=${vote}`)
      .then(res => {
        return dispatch(alterArticleVoteSuccess(res.data));
      })
      .catch(error => {
        return dispatch(alterArticleVoteFailure(error.message));
      });
  };
};