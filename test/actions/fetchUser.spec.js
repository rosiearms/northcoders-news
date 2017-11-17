import {expect} from 'chai';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import fetchUser, {
  fetchUserRequest, fetchUserSuccess, fetchUserFailure
} from '../../src/actions/fetchUser';

// const API_URL = 'https://northcoders-news-api.herokuapp.com/api';
const API_URL = 'http://localhost:3001/api';

const mockStore = configureMockStore([thunk]);

describe('async action creators', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  describe('fetchUser', () => {
    it('dispatches FETCH_USER_SUCCESS when fetching articles reponds with 200 and data', () => {
      nock(API_URL)
        .get('/users/tickle1222')
        .reply(200, [1, 2, 3]);
      
      const expectedActions = [
        fetchUserRequest('tickle1222'),
        fetchUserSuccess([1, 2, 3])
      ];

      const store = mockStore();

      return store.dispatch(fetchUser('tickle1222'))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
    it('dispatches FETCH_USER_FAILURE when fetching articles reponds with an error', () => {
      nock(API_URL)
        .get('/users/tickle1222')
        .replyWithError({'message': 'error'});
      
      const expectedActions = [
        fetchUserRequest('tickle1222'),
        fetchUserFailure('error')
      ];

      const store = mockStore();

      return store.dispatch(fetchUser('tickle1222'))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
  });
});