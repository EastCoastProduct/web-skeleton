import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import { LOGOUT_SUCCESS } from '../constants/actions';
import emailConfirm from './emailConfirm';
import token from './token';
import user from './user';

const appReducer = combineReducers(fromJS({
  emailConfirm,
  form,
  token,
  user,
}));

const rootReducer = (state, action) => {
  let newState = state;
  if (action.type === LOGOUT_SUCCESS) {
    newState = undefined;
  }

  return appReducer(newState, action);
};

export default rootReducer;
