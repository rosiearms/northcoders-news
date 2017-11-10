import { combineReducers } from 'redux';
import fetchArticlesReducer from './fetchArticlesReducer';
import fetchTopicsReducer from './fetchTopicsReducer';
import fetchArticlesByTopicReducer from './fetchArticlesByTopicReducer';

const reducer = combineReducers({
  fetchArticlesReducer, fetchTopicsReducer, fetchArticlesByTopicReducer
});

export default reducer;