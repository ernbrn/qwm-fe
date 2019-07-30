import React from 'react';
import { Grid } from '@material-ui/core';
import AddWork from './AddWork';
import AddCreator from './AddCreator';

export default function Homepage() {
  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        <AddWork />
      </Grid>
      <Grid item xs={12} lg={8}>
        <AddCreator />
      </Grid>
    </Grid>
  );
}
