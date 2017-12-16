import { combineReducers } from 'redux';
import ArticlesReducer from './ArticlesReducer';
import ArticleReducer from './ArticleReducer';
import TopicsReducer from './TopicsReducer';
import CommentsReducer from './CommentsReducer';
import CommentReducer from './CommentReducer';
import UserReducer from './UserReducer';


const reducer = combineReducers({
  ArticlesReducer, TopicsReducer, CommentsReducer, UserReducer, ArticleReducer, CommentReducer
});

export default reducer;