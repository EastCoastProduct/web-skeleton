import { describe, it } from 'mocha';
import { expect } from 'chai';
import { fromJS } from 'immutable';
import reducer from './auth';
import * as types from '../constants/actions';

describe('auth reducer', () => {
  const fakeErr = 'This is error';
  const initState = fromJS({
    emailConfirmationError: null,
    emailConfirmationSuccess: false,
  });

  it('should return the initial state', () => {
    const nextState = reducer(undefined, {});

    expect(nextState.toJS()).to.deep.equal(
      {
        emailConfirmationError: null,
        emailConfirmationSuccess: false,
      },
    );
  });

  it('should handle EMAIL_CONFIRM_SUCCESS', () => {
    const prevState = reducer(initState, {
      type: types.EMAIL_CONFIRM_SUCCESS,
    });

    expect(prevState.toJS()).to.deep.equal(
      {
        emailConfirmationError: null,
        emailConfirmationSuccess: true,
      }
    );
  });

  it('should handle NEW_EMAIL_CONFIRM_SUCCESS', () => {
    const prevState = reducer(initState, {
      type: types.NEW_EMAIL_CONFIRM_SUCCESS,
    });

    expect(prevState.toJS()).to.deep.equal(
      {
        emailConfirmationError: null,
        emailConfirmationSuccess: true,
      }
    );
  });

  it('should handle EMAIL_CONFIRM_FAILED', () => {
    const prevState = reducer(initState, {
      type: types.EMAIL_CONFIRM_FAILED,
      error: fakeErr,
    });

    expect(prevState.toJS()).to.deep.equal(
      {
        emailConfirmationError: fakeErr,
        emailConfirmationSuccess: false,
      }
    );
  });
});
