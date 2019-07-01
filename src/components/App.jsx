import React from 'react';
import CenteredAppContainer from 'shared/CenteredAppContainer';
import { Typography } from '@material-ui/core';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from 'configureStore';

export default function App() {
  return (
    <Provider store={configureStore()}>
      <ConnectedRouter history={history}>
        <CenteredAppContainer>
          <Typography variant="h2" component="h1" align="center">
            Hello World!
          </Typography>
        </CenteredAppContainer>
      </ConnectedRouter>
    </Provider>
  );
}
