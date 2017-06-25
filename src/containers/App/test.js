import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { AppComponent } from './';
import * as Actions from '../../actions/auth';

describe('App component', () => {
  const children = <div>Test</div>;
  const mockDispatch = jest.fn(f => f);
  const mockRouter = {
    push: jest.fn(),
  };
  const wrapper = shallow(
    <AppComponent
      dispatch={mockDispatch}
      router={mockRouter}
    >{children}</AppComponent>
  );
  const instance = wrapper.instance();
  Actions.logoutAction = jest.fn(() => Promise.resolve());

  it('handleLogout method', () => {
    const mockPreventDefault = jest.fn();
    const event = {
      preventDefault: mockPreventDefault,
    };
    instance.handleLogout(event);

    expect(mockPreventDefault).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalled();
    expect(Actions.logoutAction).toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();

    return mockDispatch.mock.calls[0][0].then(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/login');
    });
  });
});
