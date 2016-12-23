import { fromJS } from 'immutable';
import { EMAIL_CONFIRM_SUCCESS, EMAIL_CONFIRM_FAILED, EMAIL_RESEND_FETCHING,
  EMAIL_RESEND_SUCCESS, EMAIL_RESEND_FAILED } from '../constants/actions';

const initialState = fromJS({
  confirmationError: null,
  confirmationSuccess: false,
  resendError: null,
  resendSuccess: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_CONFIRM_SUCCESS:
      return state.merge(fromJS({
        confirmationError: null,
        confirmationSuccess: true,
      }));
    case EMAIL_CONFIRM_FAILED:
      return state.merge(fromJS({
        confirmationError: action.error,
        confirmationSuccess: false,
      }));
    case EMAIL_RESEND_FETCHING:
      return initialState;
    case EMAIL_RESEND_SUCCESS:
      return state.merge(fromJS({
        resendError: null,
        resendSuccess: true,
      }));
    case EMAIL_RESEND_FAILED:
      return state.merge(fromJS({
        resendError: action.error,
        resendSuccess: false,
      }));
    default:
      return state;
  }
};
