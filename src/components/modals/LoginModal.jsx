import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogTitle, DialogContent, Grid, TextField,
} from '@material-ui/core';
import { Form, Field } from 'react-final-form';
import { signIn } from 'authentication/authentication.service';
import { FORM_ERROR } from 'final-form';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { signInSuccess } from 'authentication/authentication.actions';
import { selectSignedIn } from 'authentication/authentication.selectors';
import { createStructuredSelector } from 'reselect';

const useStyles = makeStyles(({ spacing }) => ({
  button: {
    margin: spacing(2),
  },
}));

function LoginModal({ dispatchSignInSuccess, signedIn }) {
  const [open, setOpen] = React.useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function onSubmit(user) {
    return signIn(user).then(
      // do something else
      (data) => {
        dispatchSignInSuccess(data);
        handleClose();
      },
      error => ({ [FORM_ERROR]: error.response.data.message }),
    );
  }

  const classes = useStyles();

  return (
    <React.Fragment>
      {!signedIn && (
        <Button variant="outlined" color="primary" onClick={handleOpen}>
          Log in
        </Button>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="sign-in-modal">Log in</DialogTitle>
        <DialogContent>
          <Form onSubmit={onSubmit}>
            {({ handleSubmit, submitError }) => (
              <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Field name="email">
                      {({ input }) => (
                        <TextField
                          {...input}
                          label="Email"
                          fullWidth
                          required
                          error={!!submitError}
                          variant="outlined"
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="password">
                      {({ input }) => (
                        <TextField
                          id="password"
                          {...input}
                          required
                          label="Password"
                          fullWidth
                          type="password"
                          error={!!submitError}
                          FormHelperTextProps={{ error: !!submitError }}
                          helperText={submitError}
                          variant="outlined"
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} align="center">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

LoginModal.propTypes = {
  dispatchSignInSuccess: PropTypes.func.isRequired,
  signedIn: PropTypes.bool.isRequired,
};

export default connect(
  createStructuredSelector({
    signedIn: selectSignedIn,
  }),
  {
    dispatchSignInSuccess: signInSuccess,
  },
)(LoginModal);
