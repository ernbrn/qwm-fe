import * as types from './authentication.constants';

// SIGN_IN
export function signInStart() {
  return {
    type: types.SIGN_IN_START,
  };
}

export function signInSuccess(payload) {
  return {
    type: types.SIGN_IN_SUCCESS,
    payload,
  };
}

// export function signInError() {
//   return ({
//     type: types.SIGN_IN_ERROR
//   });
// }

// SIGN_OUT
export function signOutSuccess() {
  return { type: types.SIGN_OUT_SUCCESS };
}
