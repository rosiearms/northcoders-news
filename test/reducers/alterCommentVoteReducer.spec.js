import {expect} from 'chai';
import alterCommentVoteReducer from '../../src/reducers/alterCommentVoteReducer';
import {
  alterCommentVoteRequest,
  alterCommentVoteSuccess,
  alterCommentVoteFailure
} from '../../src/actions/alterCommentVote';

describe('reducer', () => {
  describe('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const prevState = false;
      const action = {type: 'whatever'};
      const newState = alterCommentVoteReducer(prevState, action);
      expect(newState).to.equal(prevState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState = alterCommentVoteReducer(undefined, action);
      expect(newState).to.eql({
        loading: false,
        error: null,
        data: []
      });
    });
  });
  describe('handles ALTER_COMMENT_VOTE actions', () => {
    it('handles ALTER_COMMENT_VOTE_REQUEST', () => {
      const action = alterCommentVoteRequest();
      const newState = alterCommentVoteReducer(undefined, action);
      expect(newState.loading).to.be.true;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql([]);
    });
    it('handles ALTER_COMMENT_VOTE_SUCCESS', () => {
      const prevState = alterCommentVoteReducer(undefined, alterCommentVoteRequest());
      const data = [1, 2, 3];
      const action = alterCommentVoteSuccess(data);
      const newState = alterCommentVoteReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql(data);
    });
    it('handles ALTER_COMMENT_VOTE_FAILURE', () => {
      const prevState = alterCommentVoteReducer(undefined, alterCommentVoteRequest());
      const error = 'Something went wrong';
      const action = alterCommentVoteFailure(error);
      const newState = alterCommentVoteReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.eql(error);
      expect(newState.data).to.eql([]);
    });
  });
});