import { combineReducers } from 'redux';
import fetchArticlesReducer from './fetchArticlesReducer';
import fetchTopicsReducer from './fetchTopicsReducer';
import fetchArticlesByTopicReducer from './fetchArticlesByTopicReducer';
import fetchCommentsByArticleReducer from './fetchCommentsByArticleReducer';

const reducer = combineReducers({
  fetchArticlesReducer, fetchTopicsReducer, fetchArticlesByTopicReducer, fetchCommentsByArticleReducer
});

export default reducer;