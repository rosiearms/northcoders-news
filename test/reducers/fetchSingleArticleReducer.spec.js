import {expect} from 'chai';
import fetchSingleArticleReducer from '../../src/reducers/fetchSingleArticleReducer';
import {
  fetchSingleArticleRequest,
  fetchSingleArticleSuccess,
  fetchSingleArticleFailure
} from '../../src/actions/fetchSingleArticle';

describe('reducer', () => {
  describe('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const prevState = false;
      const action = {type: 'whatever'};
      const newState = fetchSingleArticleReducer(prevState, action);
      expect(newState).to.equal(prevState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState = fetchSingleArticleReducer(undefined, action);
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
      const newState = fetchSingleArticleReducer(undefined, action);
      expect(newState.loading).to.be.true;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql([]);
    });
    it('handles FETCH_SINGLE_ARTICLE_SUCCESS', () => {
      const prevState = fetchSingleArticleReducer(undefined, fetchSingleArticleRequest());
      const data = [1, 2, 3];
      const action = fetchSingleArticleSuccess(data);
      const newState = fetchSingleArticleReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql(data);
      expect(newState.data).to.not.equal(prevState.data);
    });
    it('handles FETCH_SINGLE_ARTICLE_FAILURE', () => {
      const prevState = fetchSingleArticleReducer(undefined, fetchSingleArticleRequest());
      const error = 'Something went wrong';
      const action = fetchSingleArticleFailure(error);
      const newState = fetchSingleArticleReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.eql(error);
      expect(newState.data).to.eql([]);
      expect(newState.data).to.not.equal(prevState.data);
    });
  });
});