import {expect} from 'chai';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import alterArticleVote, {
  alterArticleVoteRequest, alterArticleVoteSuccess, alterArticleVoteFailure
} from '../../src/actions/alterArticleVote';

const API_URL = 'http://localhost:3001/api';

const mockStore = configureMockStore([thunk]);

describe('async action creators', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  describe('alterArticleVote', () => {
    it('dispatches ALTER_ARTICLE_VOTE_SUCCESS when fetching articles reponds with 200 and data', () => {
      nock(API_URL)
        .put('/articles/583412925905f02e4c8e6e00?vote=up')
        .reply(200, {_id: '583412925905f02e4c8e6e00', vote: 'up'});
      
      const expectedActions = [
        alterArticleVoteRequest('583412925905f02e4c8e6e00', 'up'),
        alterArticleVoteSuccess({_id: '583412925905f02e4c8e6e00', vote: 'up'})
      ];

      const store = mockStore();

      return store.dispatch(alterArticleVote('583412925905f02e4c8e6e00', 'up'))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
    it('dispatches ALTER_ARTICLE_VOTE_FAILURE when fetching articles reponds with an error', () => {
      nock(API_URL)
        .put('/articles/583412925905f02e4c8e6e00?vote=up')
        .replyWithError({'message': 'error'});
      
      const expectedActions = [
        alterArticleVoteRequest('583412925905f02e4c8e6e00', 'up'),
        alterArticleVoteFailure('error')
      ];

      const store = mockStore();

      return store.dispatch(alterArticleVote('583412925905f02e4c8e6e00', 'up'))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    }); 
  });
}); 