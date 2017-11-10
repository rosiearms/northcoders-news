import {expect} from 'chai';
import fetchArticlesReducer from '../../src/reducers/fetchArticlesReducer';
import {
  fetchArticlesRequest,
  fetchArticlesSuccess,
  fetchArticlesFailure
} from '../../src/actions/fetchArticles';

describe('reducer', () => {
  describe('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const prevState = false;
      const action = {type: 'whatever'};
      const newState = fetchArticlesReducer(prevState, action);
      expect(newState).to.equal(prevState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState = fetchArticlesReducer(undefined, action);
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
      const newState = fetchArticlesReducer(undefined, action);
      expect(newState.loading).to.be.true;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql([]);
    });
    it('handles FETCH_ARTICLES_SUCCESS', () => {
      const prevState = fetchArticlesReducer(undefined, fetchArticlesRequest());
      const data = [1, 2, 3];
      const action = fetchArticlesSuccess(data);
      const newState = fetchArticlesReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql(data);
    });
    it('handles FETCH_ARTICLES_FAILURE', () => {
      const prevState = fetchArticlesReducer(undefined, fetchArticlesRequest());
      const error = 'Something went wrong';
      const action = fetchArticlesFailure(error);
      const newState = fetchArticlesReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.eql(error);
      expect(newState.data).to.eql([]);
    });
  });
});