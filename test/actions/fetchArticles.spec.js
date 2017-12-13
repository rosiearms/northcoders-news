import {expect} from 'chai';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import fetchArticles, {
  fetchArticlesRequest, fetchArticlesSuccess, fetchArticlesFailure
} from '../../src/actions/fetchArticles';

const API_URL = 'http://localhost:3001/api';

const mockStore = configureMockStore([thunk]);

describe('async action creators', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  describe('fetchAllArticles', () => {
    it('dispatches FETCH_ALL_ARTICLES_SUCCESS when fetching articles reponds with 200 and data', () => {
      nock(API_URL)
        .get('/articles')
        .reply(200, { articles: [1, 2, 3] });
      
      const expectedActions = [
        fetchArticlesRequest(),
        fetchArticlesSuccess([1, 2, 3])
      ];

      const store = mockStore();

      return store.dispatch(fetchArticles())
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
    it('dispatches FETCH_ALL_ARTICLES_FAILURE when fetching articles reponds with an error', () => {
      nock(API_URL)
        .get('/articles')
        .replyWithError({'message': 'error'});
      
      const expectedActions = [
        fetchArticlesRequest(),
        fetchArticlesFailure('error')
      ];

      const store = mockStore();

      return store.dispatch(fetchArticles())
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
  });
});