import {expect} from 'chai';
import TopicsReducer from '../../src/reducers/TopicsReducer';
import {
  fetchTopicsRequest,
  fetchTopicsSuccess,
  fetchTopicsFailure
} from '../../src/actions/fetchTopics';

describe('reducer', () => {
  describe('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const prevState = false;
      const action = {type: 'whatever'};
      const newState = TopicsReducer(prevState, action);
      expect(newState).to.equal(prevState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState = TopicsReducer(undefined, action);
      expect(newState).to.eql({
        loading: false,
        error: null,
        data: []
      });
    });
  });
  describe('handles FETCH_TOPICS actions', () => {
    it('handles FETCH_TOPICS_REQUEST', () => {
      const action = fetchTopicsRequest();
      const newState = TopicsReducer(undefined, action);
      expect(newState.loading).to.be.true;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql([]);
    });
    it('handles FETCH_TOPICS_SUCCESS', () => {
      const prevState = TopicsReducer(undefined, fetchTopicsRequest());
      const data = [1, 2, 3];
      const action = fetchTopicsSuccess(data);
      const newState = TopicsReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql(data);
      expect(newState.data).to.not.equal(prevState.data);
    });
    it('handles FETCH_TOPICS_FAILURE', () => {
      const prevState = TopicsReducer(undefined, fetchTopicsRequest());
      const error = 'Something went wrong';
      const action = fetchTopicsFailure(error);
      const newState = TopicsReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.eql(error);
      expect(newState.data).to.eql([]);
      expect(newState.data).to.not.equal(prevState.data);
    });
  });
});