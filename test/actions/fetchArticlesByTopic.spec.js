import {expect} from 'chai';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import fetchArticlesByTopic, {
  fetchArticlesByTopicRequest, fetchArticlesByTopicSuccess, fetchArticlesByTopicFailure
} from '../../src/actions/fetchArticlesByTopic';

const API_URL = 'https://northcoders-news-api.herokuapp.com/api';

const mockStore = configureMockStore([thunk]);

describe('async action creators', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  describe('fetchArticlesByTopic', () => {
    it('dispatches FETCH_ARTICLES_BY_TOPIC_SUCCESS when fetching articles reponds with 200 and data', () => {
      nock(API_URL)
        .get('/topics/football/articles')
        .reply(200, {articles: [1, 2, 3]});
      
      const expectedActions = [
        fetchArticlesByTopicRequest('football'),
        fetchArticlesByTopicSuccess([1, 2, 3])
      ];

      const store = mockStore();

      return store.dispatch(fetchArticlesByTopic('football'))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
    it('dispatches FETCH_ARTICLES_BY_TOPIC_FAILURE when fetching articles reponds with an error', () => {
      nock(API_URL)
        .get('/topics/football/articles')
        .replyWithError({'message': 'error'});
      
      const expectedActions = [
        fetchArticlesByTopicRequest('football'),
        fetchArticlesByTopicFailure('error')
      ];

      const store = mockStore();

      return store.dispatch(fetchArticlesByTopic('football'))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    }); 
  });
}); 