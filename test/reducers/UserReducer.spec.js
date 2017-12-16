import {expect} from 'chai';
import UserReducer from '../../src/reducers/UserReducer';
import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure
} from '../../src/actions/fetchUser';

describe('reducer', () => {
  describe('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const prevState = false;
      const action = {type: 'whatever'};
      const newState = UserReducer(prevState, action);
      expect(newState).to.equal(prevState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState = UserReducer(undefined, action);
      expect(newState).to.eql({
        loading: false,
        error: null,
        data: []
      });
    });
  });
  describe('handles FETCH_USER actions', () => {
    it('handles FETCH_USER_REQUEST', () => {
      const action = fetchUserRequest();
      const newState = UserReducer(undefined, action);
      expect(newState.loading).to.be.true;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql([]);
    });
    it('handles FETCH_USER_SUCCESS', () => {
      const prevState = UserReducer(undefined, fetchUserRequest());
      const data = [1, 2, 3];
      const action = fetchUserSuccess(data);
      const newState = UserReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql(data);
      expect(newState.data).to.not.equal(prevState.data);
    });
    it('handles FETCH_USER_FAILURE', () => {
      const prevState = UserReducer(undefined, fetchUserRequest());
      const error = 'Something went wrong';
      const action = fetchUserFailure(error);
      const newState = UserReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.eql(error);
      expect(newState.data).to.eql([]);
      expect(newState.data).to.not.equal(prevState.data);
    });
  });
});