import axios from 'axios';
import * as types from './types';

const API_URL = 'http://localhost:3001/api';

export const fetchSingleArticleRequest = (id) => ({
  type: types.FETCH_SINGLE_ARTICLE_REQUEST,
  payload: id
});

export const fetchSingleArticleSuccess = (data) => ({
  type: types.FETCH_SINGLE_ARTICLE_SUCCESS,
  payload: data
});

export const fetchSingleArticleFailure = (error) => ({
  type: types.FETCH_SINGLE_ARTICLE_FAILURE,
  payload: error
});

export default (id) => {
  return (dispatch) => {
    dispatch(fetchSingleArticleRequest(id));
    return axios.get(`${API_URL}/articles/${id}`)
      .then(res => {
        dispatch(fetchSingleArticleSuccess(res.data.article));
      })
      .catch(error => {
        dispatch(fetchSingleArticleFailure(error.message));
      });
  };
};