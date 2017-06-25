import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { RecoverPasswordComponent, validate } from './';
import * as Actions from '../../actions/auth';

describe('RecoverPassword component', () => {
  const mockDispatch = jest.fn(f => f);
  const mockRouter = {
    push: jest.fn(),
  };
  const wrapper = shallow(
    <RecoverPasswordComponent
      dispatch={mockDispatch}
      form="Form"
      handleSubmit={() => {}}
      params={{ code: 'this.is.code' }}
      router={mockRouter}
      submitSucceeded={false}
      submitting={false}
    />
  );
  const instance = wrapper.instance();
  Actions.recoverPasswordFetch = jest.fn(() => Promise.resolve());

  it('validate function success', () => {
    const values = fromJS({
      password: 'Aa123456',
      confirmation: 'Aa123456',
    });
    const errors = validate(values);

    expect(errors).toEqual({ password: null, confirmation: null });
  });

  it('validate function fail', () => {
    const values = fromJS({
      password: 'wrong',
      confirmation: 'Bb123456',
    });
    const errors = validate(values);

    expect(errors).toEqual({
      password: 'Password has to be at least 8 characters long and contain at' +
        ' least one uppercase, lowercase and numeric character.',
      confirmation: 'Confirmation Password has to be equal.',
    });
  });

  it('handleChangePassword method', () => {
    const values = fromJS({
      password: 'Aa123456',
      confirmation: 'Aa123456',
    });
    const expected = values.delete('confirmation');
    instance.handleRecoverPassword(values);

    expect(mockDispatch).toHaveBeenCalled();
    expect(Actions.recoverPasswordFetch).toHaveBeenCalledWith(expected, 'this.is.code');
    expect(mockRouter.push).not.toHaveBeenCalled();

    return mockDispatch.mock.calls[0][0].then(() => {
        jest.runAllTimers();
        expect(mockRouter.push).toHaveBeenCalledWith('/login');
    });
  });
});
