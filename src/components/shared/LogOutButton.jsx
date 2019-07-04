import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { signOut } from 'authentication/authentication.service';
import { connect } from 'react-redux';
import { signOutSuccess } from 'authentication/authentication.actions';
import { createStructuredSelector } from 'reselect';
import { selectSignedIn } from 'authentication/authentication.selectors';

function LogOutButton({ dispatchSignOutSuccess, signedIn }) {
  function logOut() {
    return signOut().then(() => {
      dispatchSignOutSuccess();
      localStorage.removeItem('jwt');
    });
  }

  return (
    <React.Fragment>
      {signedIn && (
        <Button variant="outlined" onClick={logOut}>
          Log out
        </Button>
      )}
    </React.Fragment>
  );
}

LogOutButton.propTypes = {
  dispatchSignOutSuccess: PropTypes.func.isRequired,
  signedIn: PropTypes.bool.isRequired,
};

export default connect(
  createStructuredSelector({
    signedIn: selectSignedIn,
  }),
  {
    dispatchSignOutSuccess: signOutSuccess,
  },
)(LogOutButton);
