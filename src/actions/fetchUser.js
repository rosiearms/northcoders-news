import axios from 'axios';
import * as types from './types';

// const API_URL = 'https://northcoders-news-api.herokuapp.com/api';
const API_URL = 'http://localhost:3001/api';

export const fetchUserRequest = (username) => ({
  type: types.FETCH_USER_REQUEST,
  payload: username
});

export const fetchUserSuccess = (data) => ({
  type: types.FETCH_USER_SUCCESS,
  payload: data
});

export const fetchUserFailure = (error) => ({
  type: types.FETCH_USER_FAILURE,
  payload: error
});

export default (username) => {
  return (dispatch) => {
    dispatch(fetchUserRequest(username));
    return axios.get(`${API_URL}/users/${username}`)
      .then(res => {
        dispatch(fetchUserSuccess(res.data));
      })
      .catch(error => {
        dispatch(fetchUserFailure(error.message));
      });
  };
};