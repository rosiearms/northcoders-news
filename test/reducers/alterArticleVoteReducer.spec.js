import {expect} from 'chai';
import alterArticleVoteReducer from '../../src/reducers/alterArticleVoteReducer';
import {
  alterArticleVoteRequest,
  alterArticleVoteSuccess,
  alterArticleVoteFailure
} from '../../src/actions/alterArticleVote';

describe('reducer', () => {
  describe('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const prevState = false;
      const action = {type: 'whatever'};
      const newState = alterArticleVoteReducer(prevState, action);
      expect(newState).to.equal(prevState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState = alterArticleVoteReducer(undefined, action);
      expect(newState).to.eql({
        loading: false,
        error: null,
        data: 0
      });
    });
  });
  describe('handles ALTER_ARTICLE_VOTE actions', () => {
    it('handles ALTER_ARTICLE_VOTE_REQUEST', () => {
      const action = alterArticleVoteRequest();
      const newState = alterArticleVoteReducer(undefined, action);
      expect(newState.loading).to.be.true;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql(0);
    });
    it('handles ALTER_ARTICLE_VOTE_SUCCESS', () => {
      const prevState = alterArticleVoteReducer(undefined, alterArticleVoteRequest());
      const data = [1, 2, 3];
      const action = alterArticleVoteSuccess(data);
      const newState = alterArticleVoteReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql(data);
      expect(newState.data).to.not.equal(prevState.data);
    });
    it('handles ALTER_ARTICLE_VOTE_FAILURE', () => {
      const prevState = alterArticleVoteReducer(undefined, alterArticleVoteRequest());
      const error = 'Something went wrong';
      const action = alterArticleVoteFailure(error);
      const newState = alterArticleVoteReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.eql(error);
      expect(newState.data).to.eql(0);
      expect(newState).to.not.equal(prevState);
    });
  });
});