import * as types from './authentication.constants';

export const initialState = {
  signedIn: !!localStorage.getItem('jwt'),
  currentUser: {},
};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case types.SIGN_IN_SUCCESS:
      return {
        ...state,
        signedIn: true,
        currentUser: action.payload,
      };
    case types.SIGN_OUT_SUCCESS:
      return {
        ...state,
        signedIn: false,
        currentUser: {},
      };
    default:
      return state;
  }
}
