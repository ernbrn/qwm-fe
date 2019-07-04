import { createSelector } from 'reselect';

export const selectSlice = state => state.authentication;
export const selectSignedIn = createSelector(
  selectSlice,
  state => state.signedIn,
);
export const selectCurrentUser = createSelector(
  selectSlice,
  state => state.currentUser,
);
