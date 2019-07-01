import React from 'react';
import CenteredAppContainer from 'shared/CenteredAppContainer';
import { Typography } from '@material-ui/core';


export default function App() {
  return (
    <CenteredAppContainer>
      <Typography variant="h2" component="h1" align="center">
        Hello World!
      </Typography>
    </CenteredAppContainer>
  );
}
