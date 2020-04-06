import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import {
 TextField, Grid, Button, FormHelperText 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing }) => ({
  cancelButton: {
    marginRight: spacing(2),
  },
}));

export default function CreatorForm({ onSubmit, onCancel, WorkSearch }) {
  const classes = useStyles();

  const [errors, setErrors] = useState(0);

  function callOnSubmit(data) {
    setErrors(false);
    return onSubmit(data).catch((error) => {
      // handle the form errors here
      const { data: errorData } = error.response;
      const keys = Object.keys(errorData);

      setErrors(errorData[keys[0]][0]);
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
                    id="creator-name"
                    error={!!errors}
                    {...input}
                    autoFocus
                    label="Name"
                    fullWidth
                    required
                    variant="outlined"
                  />
                )}
              </Field>
              {!!errors && (
                <FormHelperText error={!!errors} id="creator-name">
                  {errors}
                </FormHelperText>
              )}
            </Grid>
            {WorkSearch && (
              <Grid item xs={12}>
                <Field name="works" component={WorkSearch} />
              </Grid>
            )}
            <Grid item>
              {onCancel && (
                <Button
                  onClick={onCancel}
                  color="primary"
                  className={classes.cancelButton}
                >
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
