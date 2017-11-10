import { combineReducers } from 'redux';
import fetchArticlesReducer from './fetchArticlesReducer';
import fetchTopicsReducer from './fetchTopicsReducer'

const reducer = combineReducers({
  fetchArticlesReducer, fetchTopicsReducer
});

export default reducer;