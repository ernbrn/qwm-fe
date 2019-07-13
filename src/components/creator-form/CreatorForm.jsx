import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import {
  TextField, Grid, Button, Typography,
} from '@material-ui/core';

export default function CreatorForm({ onSubmit }) {
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
            <Grid item>
              <Typography variant="h6">Add a creator</Typography>
            </Grid>
            <Grid item xs={12}>
              <Field name="name">
                {({ input }) => (
                  <TextField {...input} label="Name" fullWidth required variant="outlined" />
                )}
              </Field>
            </Grid>
            <Grid item>
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
};
