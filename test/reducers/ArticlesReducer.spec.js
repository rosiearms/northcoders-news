import {expect} from 'chai';
import ArticlesReducer from '../../src/reducers/ArticlesReducer';
import {
  fetchArticlesRequest,
  fetchArticlesSuccess,
  fetchArticlesFailure,
} from '../../src/actions/fetchArticles';
import {
  fetchArticlesByTopicRequest,
  fetchArticlesByTopicSuccess,
  fetchArticlesByTopicFailure,
} from '../../src/actions/fetchArticlesByTopic';
import {
  alterArticleVoteRequest,
  alterArticleVoteSuccess,
  alterArticleVoteFailure,
} from '../../src/actions/alterArticleVote';

describe('ArticlesReducer', () => {
  describe('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const prevState = false;
      const action = {type: 'whatever'};
      const newState = ArticlesReducer(prevState, action);
      expect(newState).to.equal(prevState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState = ArticlesReducer(undefined, action);
      expect(newState).to.eql({
        loading: false,
        error: null,
        data: []
      });
    });
  });
  describe('handles FETCH_ARTICLES actions', () => {
    it('handles FETCH_ARTICLES_REQUEST', () => {
      const action = fetchArticlesRequest();
      const newState = ArticlesReducer(undefined, action);
      expect(newState.loading).to.be.true;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql([]);
    });
    it('handles FETCH_ARTICLES_SUCCESS', () => {
      const prevState = ArticlesReducer(undefined, fetchArticlesRequest());
      const data = [1, 2, 3];
      const action = fetchArticlesSuccess(data);
      const newState = ArticlesReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql(data);
    });
    it('handles FETCH_ARTICLES_FAILURE', () => {
      const prevState = ArticlesReducer(undefined, fetchArticlesRequest());
      const error = 'Something went wrong';
      const action = fetchArticlesFailure(error);
      const newState = ArticlesReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.eql(error);
      expect(newState.data).to.eql([]);
    });
    it('handles FETCH_ARTICLES_BY_TOPIC_REQUEST', () => {
      const action = fetchArticlesByTopicRequest();
      const newState = ArticlesReducer(undefined, action);
      expect(newState.loading).to.be.true;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql([]);
    });
    it('handles FETCH_ARTICLES_BY_TOPIC_SUCCESS', () => {
      const prevState = ArticlesReducer(undefined, fetchArticlesByTopicRequest());
      const data = [1, 2, 3];
      const action = fetchArticlesByTopicSuccess(data);
      const newState = ArticlesReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql(data);
    });
    it('handles FETCH_ARTICLES_BY_TOPIC_FAILURE', () => {
      const prevState = ArticlesReducer(undefined, fetchArticlesByTopicRequest());
      const error = 'Something went wrong';
      const action = fetchArticlesByTopicFailure(error);
      const newState = ArticlesReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.eql(error);
      expect(newState.data).to.eql([]);
    });
    it('handles ALTER_ARTICLE_VOTE_REQUEST', () => {
      const action = alterArticleVoteRequest();
      const newState = ArticlesReducer(undefined, action);
      expect(newState.loading).to.be.true;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql([]);
    });
    it('handles ALTER_ARTICLE_VOTE_SUCCESS', () => {
      const prevState = ArticlesReducer(undefined, alterArticleVoteRequest());
      const data = [1, 2, 3];
      const action = alterArticleVoteSuccess(data);
      const newState = ArticlesReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql(data);
    });
    it('handles ALTER_ARTICLE_VOTE_FAILURE', () => {
      const prevState = ArticlesReducer(undefined, alterArticleVoteRequest());
      const error = 'Something went wrong';
      const action = alterArticleVoteFailure(error);
      const newState = ArticlesReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.eql(error);
      expect(newState.data).to.eql([]);
    });
  });
});