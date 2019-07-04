import React from 'react';
import { Grid, Typography } from '@material-ui/core';

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
          More things soon
        </Typography>
      </Grid>
    </Grid>
  );
}
