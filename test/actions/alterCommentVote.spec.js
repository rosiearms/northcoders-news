import {expect} from 'chai';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import alterCommentVote, {
  alterCommentVoteRequest, alterCommentVoteSuccess, alterCommentVoteFailure
} from '../../src/actions/alterCommentVote';

// const API_URL = 'https://northcoders-news-api.herokuapp.com/api';
const API_URL = 'http://localhost:3001/api';

const mockStore = configureMockStore([thunk]);

describe('async action creators', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  describe('alterCommentVote', () => {
    it('dispatches ALTER_COMMENT_VOTE_SUCCESS when fetching comments reponds with 200 and data', () => {
      nock(API_URL)
        .put('/comments/583412975905f02e4c8e6e24?vote=up')
        .reply(200, {_id: '583412975905f02e4c8e6e24', vote: 'up'}
);
      
      const expectedActions = [
        alterCommentVoteRequest('583412975905f02e4c8e6e24', 'up'),
        alterCommentVoteSuccess({_id: '583412975905f02e4c8e6e24', vote: 'up'})
      ];

      const store = mockStore();

      return store.dispatch(alterCommentVote('583412975905f02e4c8e6e24', 'up'))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
    it('dispatches ALTER_COMMENT_VOTE_FAILURE when fetching comments reponds with an error', () => {
      nock(API_URL)
        .put('/comments/583412975905f02e4c8e6e24?vote=up')
        .replyWithError({'message': 'error'});
      
      const expectedActions = [
        alterCommentVoteRequest('583412975905f02e4c8e6e24', 'up'),
        alterCommentVoteFailure('error')
      ];

      const store = mockStore();

      return store.dispatch(alterCommentVote('583412975905f02e4c8e6e24', 'up'))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    }); 
  });
}); 