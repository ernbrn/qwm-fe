import React from 'react';
import { Grid } from '@material-ui/core';
import WorkForm from 'work-form/WorkForm';

export default function Homepage() {
  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12} lg={8}>
        <WorkForm />
      </Grid>
    </Grid>
  );
}
