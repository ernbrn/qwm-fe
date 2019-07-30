import React from 'react';
import { Grid } from '@material-ui/core';
import WorkForm from 'work-form/WorkForm';
import CreatorSelect from 'creator-form/CreatorSelect';
import AddCreator from './AddCreator';

export default function Homepage() {
  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        <WorkForm CreatorSearch={CreatorSelect} />
      </Grid>
      <Grid item xs={12} lg={8}>
        <AddCreator />
      </Grid>
    </Grid>
  );
}
