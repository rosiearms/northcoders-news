import {expect} from 'chai';
import fetchCommentsByArticleReducer from '../../src/reducers/fetchCommentsByArticleReducer';
import {
  fetchCommentsByArticleRequest,
  fetchCommentsByArticleSuccess,
  fetchCommentsByArticleFailure
} from '../../src/actions/fetchCommentsByArticle';

describe('reducer', () => {
  describe('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const prevState = false;
      const action = {type: 'whatever'};
      const newState = fetchCommentsByArticleReducer(prevState, action);
      expect(newState).to.equal(prevState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState = fetchCommentsByArticleReducer(undefined, action);
      expect(newState).to.eql({
        loading: false,
        error: null,
        data: []
      });
    });
  });
  describe('handles FETCH_COMMENTS_BY_ARTICLE actions', () => {
    it('handles FETCH_COMMENTS_BY_ARTICLE_REQUEST', () => {
      const action = fetchCommentsByArticleRequest();
      const newState = fetchCommentsByArticleReducer(undefined, action);
      expect(newState.loading).to.be.true;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql([]);
    });
    it('handles FETCH_COMMENTS_BY_ARTICLE_SUCCESS', () => {
      const prevState = fetchCommentsByArticleReducer(undefined, fetchCommentsByArticleRequest());
      const data = [1, 2, 3];
      const action = fetchCommentsByArticleSuccess(data);
      const newState = fetchCommentsByArticleReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql(data);
      expect(newState.data).to.not.equal(prevState.data);
    });
    it('handles FETCH_COMMENTS_BY_ARTICLE_FAILURE', () => {
      const prevState = fetchCommentsByArticleReducer(undefined, fetchCommentsByArticleRequest());
      const error = 'Something went wrong';
      const action = fetchCommentsByArticleFailure(error);
      const newState = fetchCommentsByArticleReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.eql(error);
      expect(newState.data).to.eql([]);
      expect(newState.data).to.not.equal(prevState.data);
    });
  });
});