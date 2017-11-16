import { combineReducers } from 'redux';
import fetchArticlesReducer from './fetchArticlesReducer';
import fetchTopicsReducer from './fetchTopicsReducer';
import fetchArticlesByTopicReducer from './fetchArticlesByTopicReducer';
import fetchCommentsByArticleReducer from './fetchCommentsByArticleReducer';
import alterArticleVoteReducer from './alterArticleVoteReducer';
import fetchUserReducer from './fetchUserReducer';

const reducer = combineReducers({
  fetchArticlesReducer, fetchTopicsReducer, fetchArticlesByTopicReducer, fetchCommentsByArticleReducer, alterArticleVoteReducer, fetchUserReducer
});

export default reducer;