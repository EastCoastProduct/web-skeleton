import { TOKEN_GET_SUCCESS } from '../constants/actions';

export default (state = '', action) => {
  switch (action.type) {
    case TOKEN_GET_SUCCESS:
      return action.token;
    default:
      return state;
  }
};
