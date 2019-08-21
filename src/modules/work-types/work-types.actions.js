import * as types from './work-types.constants';

// WORK_TYPES
export function getWorkTypesSuccess(payload) {
  return {
    type: types.GET_WORK_TYPES_SUCCESS,
    payload,
  };
}
