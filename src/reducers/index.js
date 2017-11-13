import { combineReducers } from 'redux';
import fetchArticlesReducer from './fetchArticlesReducer';
import fetchTopicsReducer from './fetchTopicsReducer';
import fetchArticlesByTopicReducer from './fetchArticlesByTopicReducer';
import fetchCommentsByArticleReducer from './fetchCommentsByArticleReducer';
import alterArticleVoteReducer from './alterArticleVoteReducer';

const reducer = combineReducers({
  fetchArticlesReducer, fetchTopicsReducer, fetchArticlesByTopicReducer, fetchCommentsByArticleReducer, alterArticleVoteReducer
});

export default reducer;