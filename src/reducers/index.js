import { combineReducers } from 'redux';
import ArticlesReducer from './ArticlesReducer';
import fetchTopicsReducer from './fetchTopicsReducer';
import fetchCommentsByArticleReducer from './fetchCommentsByArticleReducer';
import fetchUserReducer from './fetchUserReducer';
import deleteCommentReducer from './deleteCommentReducer';

const reducer = combineReducers({
  ArticlesReducer, fetchTopicsReducer, fetchCommentsByArticleReducer, fetchUserReducer, deleteCommentReducer
});

export default reducer;