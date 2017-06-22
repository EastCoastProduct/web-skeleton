import React from 'react';
import renderer from 'react-test-renderer';
import { fromJS } from 'immutable';
import { EmailConfirmComponent } from './';

describe('EmailConfirm component snapshot', () => {
  const mockDispatch = () => createResolvedThenable();
  // jest.mock('../../actions/auth', () => ({
  //   emailConfirmFetch: () => createResolvedThenable(),
  // }));

  it('renders with pending request', () => {
    const tree = renderer.create(
      <EmailConfirmComponent
        auth={fromJS({
          emailConfirmationSuccess: false,
          emailConfirmationError: false,
        })}
        dispatch={mockDispatch}
        params={{}}
        router={{}}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders with success', () => {
    const tree = renderer.create(
      <EmailConfirmComponent
        auth={fromJS({
          emailConfirmationSuccess: true,
          emailConfirmationError: false,
        })}
        dispatch={mockDispatch}
        params={{}}
        router={{}}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders with error', () => {
    const tree = renderer.create(
      <EmailConfirmComponent
        auth={fromJS({
          emailConfirmationSuccess: false,
          emailConfirmationError: 'Token not found',
        })}
        dispatch={mockDispatch}
        params={{}}
        router={{}}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
