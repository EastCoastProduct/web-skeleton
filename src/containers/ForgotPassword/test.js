import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { ForgotPasswordComponent, validate } from './';
import * as Actions from '../../actions/auth';

describe('ForgotPassword component', () => {
  const mockDispatch = jest.fn();
  const mockHandleSubmit = jest.fn(cb => cb());
  const wrapper = shallow(
    <ForgotPasswordComponent
      dispatch={mockDispatch}
      form="Form"
      handleSubmit={mockHandleSubmit}
      submitSucceeded={false}
      submitting={false}
    />
  );
  const instance = wrapper.instance();
  Actions.forgotPasswordFetch = jest.fn(() => ({}));

  it('validate function success', () => {
    const values = fromJS({ email: 'test@email.com' });
    const errors = validate(values);

    expect(errors).toEqual({ email: null });
  });

  it('validate function fails', () => {
    const values = fromJS({ email: 'notAnEmail' });
    const errors = validate(values);

    expect(errors).toEqual({ email: 'Invalid e-mail address.' });
  });

  it('handleSend method', () => {
    const values = fromJS({ email: 'test@email.com' });
    instance.handleSend(values);

    expect(Actions.forgotPasswordFetch).toHaveBeenCalledWith(values);
    expect(mockDispatch).toHaveBeenCalled();
  });
});
