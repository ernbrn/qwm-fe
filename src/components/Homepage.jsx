import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Login from 'Login';

export default function Homepage() {
  return (
    <Grid container spacing={2} direction="column" alignItems="center">
      <Grid item>
        <Typography variant="h2" component="h1" align="center">
          Welcome to the Queer Works Map!
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" align="center">
          This won't always be right here like some weird gate keeper, but please sign in!
        </Typography>
      </Grid>
      <Grid item>
        <Login />
      </Grid>
    </Grid>
  );
}
