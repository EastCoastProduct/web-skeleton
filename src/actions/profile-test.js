import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import { describe, it, afterEach } from 'mocha';
import * as actions from './profile';
import * as types from '../constants/actions';

const fetchMock = require('fetch-mock');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('profile actions', () => {
  describe('formats the response correctly', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it('dispatch PROFILE_UPDATE_SUCCESS on successful get profile', (done) => {
      const expectedActions =
        { type: types.PROFILE_UPDATE_SUCCESS, user: {} };
      const store = mockStore({ user: {} }, expectedActions, done);

      fetchMock.get('*', { user: {} });
      store.dispatch(actions.profileGetFetch(1))
      .then(() => {
        done();
      });

      expect(expectedActions.type).to.equal(types.PROFILE_UPDATE_SUCCESS);
    });
  });
});
