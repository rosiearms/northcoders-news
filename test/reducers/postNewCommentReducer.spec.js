import {expect} from 'chai';
import postNewCommentReducer from '../../src/reducers/postNewCommentReducer';
import {
  postNewCommentRequest,
  postNewCommentSuccess,
  postNewCommentFailure
} from '../../src/actions/postNewComment';

describe('reducer', () => {
  describe('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const prevState = false;
      const action = {type: 'whatever'};
      const newState = postNewCommentReducer(prevState, action);
      expect(newState).to.equal(prevState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState = postNewCommentReducer(undefined, action);
      expect(newState).to.eql({
        loading: false,
        error: null,
        data: []
      });
    });
  });
  describe('handles POST_NEW_COMMENT actions', () => {
    it('handles POST_NEW_COMMENT_REQUEST', () => {
      const action = postNewCommentRequest();
      const newState = postNewCommentReducer(undefined, action);
      expect(newState.loading).to.be.true;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql([]);
    });
    it('handles POST_NEW_COMMENT_SUCCESS', () => {
      const prevState = postNewCommentReducer(undefined, postNewCommentRequest());
      const data = [1, 2, 3];
      const action = postNewCommentSuccess(data);
      const newState = postNewCommentReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql(data);
      expect(newState.data).to.not.equal(prevState.data);
    });
    it('handles POST_NEW_COMMENT_FAILURE', () => {
      const prevState = postNewCommentReducer(undefined, postNewCommentRequest());
      const error = 'Something went wrong';
      const action = postNewCommentFailure(error);
      const newState = postNewCommentReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.eql(error);
      expect(newState.data).to.eql([]);
      expect(newState.data).to.not.equal(prevState.data);
    });
  });
});