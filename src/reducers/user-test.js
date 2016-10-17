import { describe, it } from 'mocha';
import { expect } from 'chai';
import { fromJS } from 'immutable';
import reducer from './user';
import * as types from '../constants/actions';

describe('user reducer', () => {
  const initState = fromJS({});

  it('should return the initial state', () => {
    const nextState = reducer(undefined, {});

    expect(nextState.toJS()).to.deep.equal({});
  });

  it('should handle SIGNUP_LOGIN_SUCCESS', () => {
    const prevState = reducer(initState, {
      type: types.SIGNUP_LOGIN_SUCCESS,
    });

    expect(prevState.toJS()).to.deep.equal({});
  });

  it('should handle EMAIL_CONFIRM_SUCCESS', () => {
    const prevState = reducer(initState, {
      type: types.EMAIL_CONFIRM_SUCCESS,
    });

    expect(prevState.toJS()).to.deep.equal({});
  });

  it('should handle PROFILE_UPDATE_SUCCESS', () => {
    const prevState = reducer(initState, {
      type: types.PROFILE_UPDATE_SUCCESS,
    });

    expect(prevState.toJS()).to.deep.equal({});
  });

  it('should handle NEW_EMAIL_CONFIRM_SUCCESS', () => {
    const prevState = reducer(initState, {
      type: types.NEW_EMAIL_CONFIRM_SUCCESS,
    });

    expect(prevState.toJS()).to.deep.equal({});
  });

  it('should handle LOGOUT_SUCCESS', () => {
    const prevState = reducer(initState, {
      type: types.LOGOUT_SUCCESS,
    });

    expect(prevState.toJS()).to.deep.equal({});
  });
});
