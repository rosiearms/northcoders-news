import { combineReducers } from 'redux';
import ArticlesReducer from './ArticlesReducer';
import fetchSingleArticleReducer from './fetchSingleArticleReducer';
import fetchTopicsReducer from './fetchTopicsReducer';
// import fetchArticlesByTopicReducer from './fetchArticlesByTopicReducer';
import fetchCommentsByArticleReducer from './fetchCommentsByArticleReducer';
import alterArticleVoteReducer from './alterArticleVoteReducer';
import fetchUserReducer from './fetchUserReducer';
import deleteCommentReducer from './deleteCommentReducer';

const reducer = combineReducers({
  ArticlesReducer, fetchTopicsReducer, fetchCommentsByArticleReducer, alterArticleVoteReducer, fetchUserReducer, deleteCommentReducer, fetchSingleArticleReducer
});

export default reducer;