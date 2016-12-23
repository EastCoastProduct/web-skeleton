import { fromJS } from 'immutable';
import { SIGNUP_LOGIN_SUCCESS, EMAIL_CONFIRM_SUCCESS, PROFILE_UPDATE_SUCCESS }
  from '../constants/actions';

export default (state = fromJS({}), action) => {
  switch (action.type) {
    case SIGNUP_LOGIN_SUCCESS:
    case EMAIL_CONFIRM_SUCCESS:
    case PROFILE_UPDATE_SUCCESS:
      return state.merge(fromJS(action.user));
    default:
      return state;
  }
};
