import {expect} from 'chai';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import postNewComment, {
  postNewCommentRequest, postNewCommentSuccess, postNewCommentFailure
} from '../../src/actions/postNewComment';

const API_URL = 'http://localhost:3001/api';

const mockStore = configureMockStore([thunk]);

describe('async action creators', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  describe('postNewComment', () => {
    const article_id = '5a0f460fb01e0b0801900e75';
    const comment = 'that was interesting';
    it('dispatches POST_NEW_COMMENT_SUCCESS when fetching articles reponds with 200 and data', () => {
      nock(API_URL)
        .post(`/articles/${article_id}/comments`, {comment})
        .reply(201, {comment: {
          body: comment,
          created_by: 'northcoder'
        }});

      const expectedActions = [
        postNewCommentRequest(article_id, comment),
        postNewCommentSuccess([{body: comment, created_by: 'northcoder'}])
      ];

      const store = mockStore();

      return store.dispatch(postNewComment(article_id, comment))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
    it('dispatches POST_NEW_COMMENT_FAILURE when fetching articles reponds with an error', () => {
      nock(API_URL)
        .post('/articles/583412925905f02e49999999/comments', {comment:'that was interesting'})
        .replyWithError({'message': 'INVALID_INPUT'});
      
      const expectedActions = [
        postNewCommentRequest('583412925905f02e49999999', 'that was interesting'),
        postNewCommentFailure('INVALID_INPUT')
      ];

      const store = mockStore();

      return store.dispatch(postNewComment('583412925905f02e49999999', 'that was interesting'))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    }); 
  });
}); 