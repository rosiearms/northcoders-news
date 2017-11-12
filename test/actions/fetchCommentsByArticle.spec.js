import {expect} from 'chai';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import fetchCommentsByArticle, {
  fetchCommentsByArticleRequest, fetchCommentsByArticleSuccess, fetchCommentsByArticleFailure
} from '../../src/actions/fetchCommentsByArticle';

const API_URL = 'https://northcoders-news-api.herokuapp.com/api';

const mockStore = configureMockStore([thunk]);

describe('async action creators', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  describe('fetchCommentsByArticle', () => {
    it('dispatches FETCH_COMMENTS_BY_ARTICLE_SUCCESS when fetching articles reponds with 200 and data', () => {
      nock(API_URL)
        .get('/articles/583412925905f02e4c8e6e00/comments')
        .reply(200, {comments: [1, 2, 3]});
      
      const expectedActions = [
        fetchCommentsByArticleRequest('583412925905f02e4c8e6e00'),
        fetchCommentsByArticleSuccess([1, 2, 3])
      ];

      const store = mockStore();

      return store.dispatch(fetchCommentsByArticle('583412925905f02e4c8e6e00'))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
    it('dispatches FETCH_COMMENTS_BY_ARTICLE_FAILURE when fetching articles reponds with an error', () => {
      nock(API_URL)
        .get('/articles/583412925905f02e4c8e6e00/comments')
        .replyWithError({'message': 'error'});
      
      const expectedActions = [
        fetchCommentsByArticleRequest('583412925905f02e4c8e6e00'),
        fetchCommentsByArticleFailure('error')
      ];

      const store = mockStore();

      return store.dispatch(fetchCommentsByArticle('583412925905f02e4c8e6e00'))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    }); 
  });
}); 