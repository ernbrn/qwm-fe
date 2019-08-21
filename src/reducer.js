import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authentication from 'authentication/authentication.reducer';
import workTypes from 'work-types/work-types.reducer';

export default function rootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    authentication,
    workTypes,
  });
}
