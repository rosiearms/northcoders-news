import {expect} from 'chai';
import CommentReducer from '../../src/reducers/CommentReducer';
import {
  alterCommentVoteRequest,
  alterCommentVoteSuccess,
  alterCommentVoteFailure
} from '../../src/actions/alterCommentVote';
import {
  postNewCommentRequest,
  postNewCommentSuccess,
  postNewCommentFailure
} from '../../src/actions/postNewComment';
import {
  deleteCommentRequest,
  deleteCommentSuccess,
  deleteCommentFailure
} from '../../src/actions/deleteComment';

describe('reducer', () => {
  describe('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const prevState = false;
      const action = {type: 'whatever'};
      const newState = CommentReducer(prevState, action);
      expect(newState).to.equal(prevState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState = CommentReducer(undefined, action);
      expect(newState).to.eql({
        loading: false,
        error: null,
        data: 0
      });
    });
  });
  describe('handles ALTER_COMMENT_VOTE actions', () => {
    it('handles ALTER_COMMENT_VOTE_REQUEST', () => {
      const action = alterCommentVoteRequest();
      const newState = CommentReducer(undefined, action);
      expect(newState.loading).to.be.true;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql(0);
    });
    it('handles ALTER_COMMENT_VOTE_SUCCESS', () => {
      const prevState = CommentReducer(undefined, alterCommentVoteRequest());
      const data = [1, 2, 3];
      const action = alterCommentVoteSuccess(data);
      const newState = CommentReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql(data);
      expect(newState.data).to.not.equal(prevState.data);
    });
    it('handles ALTER_COMMENT_VOTE_FAILURE', () => {
      const prevState = CommentReducer(undefined, alterCommentVoteRequest());
      const error = 'Something went wrong';
      const action = alterCommentVoteFailure(error);
      const newState = CommentReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.eql(error);
      expect(newState.data).to.eql(0);
      expect(newState).to.not.equal(prevState);
    });
  });
  describe('handles POST_NEW_COMMENT actions', () => {
    it('handles POST_NEW_COMMENT_REQUEST', () => {
      const action = postNewCommentRequest();
      const newState = CommentReducer(undefined, action);
      expect(newState.loading).to.be.true;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql([]);
    });
    it('handles POST_NEW_COMMENT_SUCCESS', () => {
      const prevState = CommentReducer(undefined, postNewCommentRequest());
      const data = [1, 2, 3];
      const action = postNewCommentSuccess(data);
      const newState = CommentReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql(data);
      expect(newState.data).to.not.equal(prevState.data);
    });
    it('handles POST_NEW_COMMENT_FAILURE', () => {
      const prevState = CommentReducer(undefined, postNewCommentRequest());
      const error = 'Something went wrong';
      const action = postNewCommentFailure(error);
      const newState = CommentReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.eql(error);
      expect(newState.data).to.eql([]);
      expect(newState.data).to.not.equal(prevState.data);
    });
  });
  describe('handles DELETE_COMMENT actions', () => {
    it('handles DELETE_COMMENT_REQUEST', () => {
      const action = deleteCommentRequest();
      const newState = CommentReducer(undefined, action);
      expect(newState.loading).to.be.true;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql([]);
    });
    it('handles DELETE_COMMENT_SUCCESS', () => {
      const prevState = CommentReducer(undefined, postNewCommentRequest());
      const data = [1, 2, 3];
      const action = deleteCommentSuccess(data);
      const newState = CommentReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql(data);
      expect(newState.data).to.not.equal(prevState.data);
    });
    it('handles DELETE_COMMENT_FAILURE', () => {
      const prevState = CommentReducer(undefined, deleteCommentRequest());
      const error = 'Something went wrong';
      const action = deleteCommentFailure(error);
      const newState = CommentReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.eql(error);
      expect(newState.data).to.eql([]);
      expect(newState.data).to.not.equal(prevState.data);
    });
  });
});