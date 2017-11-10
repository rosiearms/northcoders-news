import {expect} from 'chai';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import fetchTopics, {
  fetchTopicsRequest, fetchTopicsSuccess, fetchTopicsFailure
} from '../../src/actions/fetchTopics';

const API_URL = 'https://northcoders-news-api.herokuapp.com/api';

const mockStore = configureMockStore([thunk]);

describe('async action creators', () => {
  afterEach(() => { 
    nock.cleanAll();
  });
  describe('fetchTopics', () => {
    it('dispatches FETCH_TOPICS_SUCCESS when fetching articles reponds with 200 and data', () => {
      nock(API_URL)
        .get('/topics')
        .reply(200, { topics: [1, 2, 3] });
      
      const expectedActions = [
        fetchTopicsRequest(),
        fetchTopicsSuccess([1, 2, 3])
      ];

      const store = mockStore();

      return store.dispatch(fetchTopics())
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
    it('dispatches FETCH_TOPICS_FAILURE when fetching articles reponds with an error', () => {
      nock(API_URL)
        .get('/topics')
        .replyWithError({'message': 'error'});
      
      const expectedActions = [
        fetchTopicsRequest(),
        fetchTopicsFailure('error')
      ];

      const store = mockStore();

      return store.dispatch(fetchTopics())
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
  });
});