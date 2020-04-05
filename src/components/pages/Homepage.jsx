import React from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function Homepage() {
  return (
    <Grid container spacing={2} justify="center" align="center">
      <Grid item xs={12} md={3}>
        <Link to="/works/new">Add a work</Link>
      </Grid>
      <Grid item xs={12} md={3}>
        <Link to="/creators/new">Add a creator</Link>
      </Grid>
      <Grid item xs={12} md={3}>
        <Link to="/collections/new">Build a collection</Link>
      </Grid>
      <Grid item xs={12} md={3}>
        <Link to="/references/new">Make a connection</Link>
      </Grid>
    </Grid>
  );
}
