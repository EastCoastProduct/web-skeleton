'use strict';

import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { describe, it } from 'mocha';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import EditProfile from './EditProfile';

const mockStore = configureStore();
const getState = {};
const store = mockStore(getState);
const CustomProvider = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

describe('Component EditProfile', () => {
  it('should render EditProfile', () => {
    const wrapper = shallow(
      <CustomProvider>
        <EditProfile />
      </CustomProvider>);

    expect(wrapper.find(EditProfile)).to.have.length(1);
  });
});
