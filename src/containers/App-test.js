'use strict';

import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { describe, it } from 'mocha';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './App';

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

describe('Component App', () => {
  it('should render App', () => {
    const wrapper = shallow(
      <CustomProvider>
        <App />
      </CustomProvider>);

    expect(wrapper.find(App)).to.have.length(1);
  });
});
