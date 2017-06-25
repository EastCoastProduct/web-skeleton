import store from 'store';
import { SIGNUP_LOGIN_SUCCESS, LOGOUT_SUCCESS, EMAIL_CONFIRM_SUCCESS,
  EMAIL_CONFIRM_FAILED, EMAIL_RESEND_FETCHING, EMAIL_RESEND_SUCCESS,
  EMAIL_RESEND_FAILED } from '../constants/actions';
import { API_URL } from '../constants/application';
import parseErrors from '../utils/parseErrors';
import fetch from '../utils/fetch';

const throwParsed = (error) => {
  throw parseErrors(error);
};

export const signupLoginSuccess = user => ({
  type: SIGNUP_LOGIN_SUCCESS,
  user,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const emailConfirmSuccess = user => ({
  type: EMAIL_CONFIRM_SUCCESS,
  user,
});

export const emailConfirmFailed = error => ({
  type: EMAIL_CONFIRM_FAILED,
  error,
});

export const emailResendFetching = () => ({
  type: EMAIL_RESEND_FETCHING,
});

export const emailResendSuccess = () => ({
  type: EMAIL_RESEND_SUCCESS,
});

export const emailResendFailed = error => ({
  type: EMAIL_RESEND_FAILED,
  error,
});

export const authenticate = (values, dispatch) =>
  fetch(`${API_URL}/authenticate`, {
    method: 'POST',
    body: JSON.stringify(values),
  })
  .catch(throwParsed)
  .then((resp) => {
    store.set('token', `Bearer ${resp.token}`);
    store.set('user', resp.user);
    dispatch(signupLoginSuccess(resp.user));
  });

export const signupFetch = values =>
  dispatch =>
    fetch(`${API_URL}/users`, {
      method: 'POST',
      body: JSON.stringify(values),
    })
    .catch(throwParsed)
    .then(() => authenticate(values, dispatch));

export const loginFetch = values =>
  dispatch =>
    authenticate(values, dispatch);

export const logoutAction = () =>
  (dispatch) => {
    store.clear();
    dispatch(logoutSuccess());
    return Promise.resolve();
  };

export const forgotPasswordFetch = values =>
  () =>
    fetch(`${API_URL}/recoverPassword`, {
      method: 'POST',
      body: JSON.stringify(values),
    })
    .catch(throwParsed);

export const recoverPasswordFetch = (values, code) =>
  () =>
    fetch(`${API_URL}/recoverPassword/${code}`, {
      method: 'POST',
      body: JSON.stringify(values),
    })
    .catch(throwParsed);

export const emailConfirmFetch = values =>
  dispatch =>
    fetch(`${API_URL}/emailConfirm`, {
      method: 'POST',
      body: JSON.stringify(values),
    })
    .catch((err) => {
      dispatch(emailConfirmFailed(err.message));
      throw parseErrors(err);
    })
    .then((resp) => {
      const user = store.get('user');
      user.email = resp.email;
      user.confirmed = true;
      store.set('user', user);
      dispatch(emailConfirmSuccess(user));
    });

export const emailResendFetch = userId =>
  (dispatch) => {
    dispatch(emailResendFetching());
    return fetch(`${API_URL}/users/${userId}/resendConfirmation`, {
      method: 'POST',
    }).then(() =>
      dispatch(emailResendSuccess()),
    ).catch(err =>
      dispatch(emailResendFailed(err.message)),
    );
  };
