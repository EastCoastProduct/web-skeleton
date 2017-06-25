import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { EmailConfirmComponent } from './';
import * as Actions from '../../actions/auth';

describe('EmailConfirm component', () => {
  const mockDispatch = jest.fn(f => f);
  const mockRouter = {
    push: jest.fn(),
  };
  const wrapper = shallow(
    <EmailConfirmComponent
      auth={fromJS({
        emailConfirmationSuccess: false,
        emailConfirmationError: false,
      })}
      dispatch={mockDispatch}
      params={{ code: 'this.is.code' }}
      router={mockRouter}
    />
  );
  const instance = wrapper.instance();
  Actions.emailConfirmFetch = jest.fn(() => Promise.resolve());

  it('componentDidMount method', () => {
    instance.componentDidMount();

    expect(mockDispatch).toHaveBeenCalled();
    expect(Actions.emailConfirmFetch).toHaveBeenCalledWith({ token: 'this.is.code' });

    expect(mockRouter.push).not.toHaveBeenCalled();

    return mockDispatch.mock.calls[0][0].then(() => {
      jest.runAllTimers();
      expect(mockRouter.push).toHaveBeenCalledWith('/');
    });
  });
});
