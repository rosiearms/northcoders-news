import {expect} from 'chai';
import fetchArticlesByTopicReducer from '../../src/reducers/fetchArticlesByTopicReducer';
import {
  fetchArticlesByTopicRequest,
  fetchArticlesByTopicSuccess,
  fetchArticlesByTopicFailure
} from '../../src/actions/fetchArticlesByTopic';

describe('reducer', () => {
  describe('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const prevState = false;
      const action = {type: 'whatever'};
      const newState = fetchArticlesByTopicReducer(prevState, action);
      expect(newState).to.equal(prevState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState = fetchArticlesByTopicReducer(undefined, action);
      expect(newState).to.eql({
        loading: false,
        error: null,
        data: []
      });
    });
  });
  describe('handles FETCH_ARTICLES_BY_TOPIC actions', () => {
    it('handles FETCH_ARTICLES_BY_TOPIC_REQUEST', () => {
      const action = fetchArticlesByTopicRequest();
      const newState = fetchArticlesByTopicReducer(undefined, action);
      expect(newState.loading).to.be.true;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql([]);
    });
    it('handles FETCH_ARTICLES_BY_TOPIC_SUCCESS', () => {
      const prevState = fetchArticlesByTopicReducer(undefined, fetchArticlesByTopicRequest());
      const data = [1, 2, 3];
      const action = fetchArticlesByTopicSuccess(data);
      const newState = fetchArticlesByTopicReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql(data);
      expect(newState.data).to.not.equal(prevState.data);
    });
    it('handles FETCH_ARTICLES_BY_TOPIC_FAILURE', () => {
      const prevState = fetchArticlesByTopicReducer(undefined, fetchArticlesByTopicRequest());
      const error = 'Something went wrong';
      const action = fetchArticlesByTopicFailure(error);
      const newState = fetchArticlesByTopicReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.eql(error);
      expect(newState.data).to.eql([]);
      expect(newState.data).to.not.equal(prevState.data);
    });
  });
});