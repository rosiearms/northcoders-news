import {expect} from 'chai';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import fetchSingleArticle, {
  fetchSingleArticleRequest, fetchSingleArticleSuccess, fetchSingleArticleFailure
} from '../../src/actions/fetchSingleArticle';

const API_URL = 'http://localhost:3001/api';

const mockStore = configureMockStore([thunk]);

describe('async action creators', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  describe('fetchSingleArticle', () => {
    it('dispatches FETCH_SINGLE_ARTICLE_SUCCESS when fetching articles reponds with 200 and data', () => {
      nock(API_URL)
        .get('/articles/5a0f460fb01e0b0801900e75')
        .reply(200, { article: 'article' });
      
      const expectedActions = [
        fetchSingleArticleRequest('5a0f460fb01e0b0801900e75'),
        fetchSingleArticleSuccess('article')
      ];

      const store = mockStore();

      return store.dispatch(fetchSingleArticle('5a0f460fb01e0b0801900e75'))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
    it('dispatches FETCH_SINGLE_ARTICLE__FAILURE when fetching articles reponds with an error', () => {
      nock(API_URL)
        .get('/articles/fakeid')
        .replyWithError({'message': 'error'});
      
      const expectedActions = [
        fetchSingleArticleRequest('fakeid'),
        fetchSingleArticleFailure('error')
      ];

      const store = mockStore();

      return store.dispatch(fetchSingleArticle('fakeid'))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
  });
});