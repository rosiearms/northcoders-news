import {expect} from 'chai';
import ArticleReducer from '../../src/reducers/ArticleReducer';
import {
  fetchSingleArticleRequest,
  fetchSingleArticleSuccess,
  fetchSingleArticleFailure
} from '../../src/actions/fetchSingleArticle';
import {
  alterArticleVoteRequest,
  alterArticleVoteSuccess,
  alterArticleVoteFailure
} from '../../src/actions/alterArticleVote';

describe('reducer', () => {
  describe('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const prevState = false;
      const action = {type: 'whatever'};
      const newState = ArticleReducer(prevState, action);
      expect(newState).to.equal(prevState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState = ArticleReducer(undefined, action);
      expect(newState).to.eql({
        loading: false,
        error: null,
        data: []
      });
    });
  });
  describe('handles FETCH_SINGLE_ARTICLE actions', () => {
    it('handles FETCH_SINGLE_ARTICLE_REQUEST', () => {
      const action = fetchSingleArticleRequest();
      const newState = ArticleReducer(undefined, action);
      expect(newState.loading).to.be.true;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql([]);
    });
    it('handles FETCH_SINGLE_ARTICLE_SUCCESS', () => {
      const prevState = ArticleReducer(undefined, fetchSingleArticleRequest());
      const data = [1, 2, 3];
      const action = fetchSingleArticleSuccess(data);
      const newState = ArticleReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql(data);
      expect(newState.data).to.not.equal(prevState.data);
    });
    it('handles FETCH_SINGLE_ARTICLE_FAILURE', () => {
      const prevState = ArticleReducer(undefined, fetchSingleArticleRequest());
      const error = 'Something went wrong';
      const action = fetchSingleArticleFailure(error);
      const newState = ArticleReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.eql(error);
      expect(newState.data).to.eql([]);
      expect(newState.data).to.not.equal(prevState.data);
    });
    it('handles ALTER_ARTICLE_VOTE_REQUEST', () => {
      const action = alterArticleVoteRequest();
      const newState = ArticleReducer(undefined, action);
      expect(newState.loading).to.be.true;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql([]);
    });
    it('handles ALTER_ARTICLE_VOTE_SUCCESS', () => {
      const prevState = ArticleReducer(undefined, alterArticleVoteRequest());
      const data = [1, 2, 3];
      const action = alterArticleVoteSuccess(data);
      const newState = ArticleReducer(prevState, action);
      console.log(newState, prevState);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.be.null;
      // expect(newState.data).to.eql(data);
      expect(newState.data).to.not.equal(prevState.data);
    });
    it('handles ALTER_ARTICLE_VOTE_FAILURE', () => {
      const prevState = ArticleReducer(undefined, alterArticleVoteRequest());
      const error = 'Something went wrong';
      const action = alterArticleVoteFailure(error);
      const newState = ArticleReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.eql(error);
      expect(newState.data).to.eql([]);
      expect(newState).to.not.equal(prevState);
    });
  });
});