import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { TextField, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing }) => ({
  cancelButton: {
    marginRight: spacing(2),
  },
}));

export default function CreatorForm({ onSubmit, onCancel, WorkSearch }) {
  const classes = useStyles();

  function callOnSubmit(data) {
    return onSubmit(data).catch((response) => {
      // handle the form errors here
      console.log(response);
    });
  }

  return (
    <Form onSubmit={callOnSubmit}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4} justify="center">
            <Grid item xs={12}>
              <Field name="name">
                {({ input }) => (
                  <TextField
                    {...input}
                    autoFocus
                    label="Name"
                    fullWidth
                    required
                    variant="outlined"
                  />
                )}
              </Field>
            </Grid>
            {WorkSearch && (
              <Grid item xs={12}>
                <Field name="work" component={WorkSearch} />
              </Grid>
            )}
            <Grid item>
              {onCancel && (
                <Button onClick={onCancel} color="primary" className={classes.cancelButton}>
                  Cancel
                </Button>
              )}
              <Button type="submit" color="primary" variant="contained">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Form>
  );
}

CreatorForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  WorkSearch: PropTypes.func,
};

CreatorForm.defaultProps = {
  onCancel: null,
  WorkSearch: null,
};
