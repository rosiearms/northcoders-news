import axios from 'axios';
import * as types from './types';

const API_URL = 'http://localhost:3001/api';

export const fetchCommentsByArticleRequest = (id) => ({
  type: types.FETCH_COMMENTS_BY_ARTICLE_REQUEST,
  payload: id
});
  
export const fetchCommentsByArticleSuccess = (data) => ({
  type: types.FETCH_COMMENTS_BY_ARTICLE_SUCCESS,
  payload: data
});
  
export const fetchCommentsByArticleFailure = (error) => ({
  type: types.FETCH_COMMENTS_BY_ARTICLE_FAILURE,
  payload: error
});

export default (id) => {
  return (dispatch) => {
    dispatch(fetchCommentsByArticleRequest(id));
    return axios.get(`${API_URL}/articles/${id}/comments`)
      .then(res => {

        return dispatch(fetchCommentsByArticleSuccess(res.data.comments));
      })
      .catch(error => {
        return dispatch(fetchCommentsByArticleFailure(error.message));
      });
  };
};