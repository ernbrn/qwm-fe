import * as types from './work-types.constants';

export const initialState = {
  workTypes: {},
};

export default function workTypes(state = initialState, action) {
  switch (action.type) {
    case types.GET_WORK_TYPES_SUCCESS:
      return {
        ...state,
        workTypes: {
          ...state.workTypes,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}
